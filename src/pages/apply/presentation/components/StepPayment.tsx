import { useEffect, useState } from 'react';
import { Icon } from '@/shared/components/ui/Icon';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { useToast } from '@/shared/hooks/useToast';
import { COURSE_FEE, PAY_WINDOW_MINUTES, BANK_DETAILS, PROMO_CODES } from '@/shared/constants/academyData';
import { formatNaira } from '@/shared/utils/format';
import type { ApplyFormState } from '../ApplyForm.types';

interface Props {
  form: ApplyFormState;
  update: (patch: Partial<ApplyFormState>) => void;
  onPaid: () => void;
}

function discountOf(form: ApplyFormState): number {
  const promo = form.appliedPromo;
  if (!promo) return 0;
  if (promo.pct) return Math.round((COURSE_FEE * promo.pct) / 100);
  return Math.min(promo.flat ?? 0, COURSE_FEE);
}

export function StepPayment({ form, update, onPaid }: Props) {
  const { showToast } = useToast();
  const [promoError, setPromoError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(PAY_WINDOW_MINUTES * 60);
  const discount = discountOf(form);
  const due = COURSE_FEE - discount;

  useEffect(() => {
    if (form.paymentMethod !== 'transfer' || form.paid) return;
    const id = window.setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [form.paymentMethod, form.paid]);

  function applyPromo() {
    const code = form.promoCode.trim().toUpperCase();
    const entry = PROMO_CODES[code];
    if (!code) {
      setPromoError('Enter a discount code');
      return;
    }
    if (!entry) {
      setPromoError("That code isn't valid or has expired");
      return;
    }
    update({ appliedPromo: { code, label: entry.label, pct: entry.pct, flat: entry.flat }, promoCode: '' });
    setPromoError('');
    showToast(`${code} applied: ${entry.label}`);
  }

  function payOnline() {
    update({ paymentMethod: 'online' });
    window.setTimeout(() => {
      update({ paid: true, reference: `TFN-${Math.floor(70000 + Math.random() * 9000)}` });
      onPaid();
    }, 900);
  }

  function markTransferSent() {
    update({ paymentMethod: 'transfer', reference: `TFN-${Math.floor(70000 + Math.random() * 9000)}` });
  }

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl bg-mist p-5 dark:bg-white/5">
        <div className="flex justify-between py-1.5 text-sm">
          <span className="text-muted">Course fee</span>
          <span className="font-bold">{formatNaira(COURSE_FEE)}</span>
        </div>
        {form.appliedPromo && (
          <div className="flex justify-between py-1.5 text-sm">
            <span className="text-muted">Discount ({form.appliedPromo.code})</span>
            <span className="font-bold text-ok">&minus;{formatNaira(discount)}</span>
          </div>
        )}
        <div className="mt-1 flex justify-between border-t border-line-2 pt-2 text-base dark:border-white/15">
          <span className="font-bold">Total due</span>
          <span className="font-extrabold text-brand">{formatNaira(due)}</span>
        </div>
      </div>

      {!form.appliedPromo && (
        <div>
          <div className="flex gap-2">
            <Input placeholder="Enter discount code" value={form.promoCode} onChange={(e) => update({ promoCode: e.target.value })} error={promoError} />
            <Button variant="line" onClick={applyPromo}>
              Apply
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted">Demo codes: TFN10, EARLYBIRD, WELCOME5000</p>
        </div>
      )}

      {!form.paid && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Button onClick={payOnline} icon={<Icon name="lock" size={17} />}>
            Pay {formatNaira(due)} securely
          </Button>
          <Button variant="line" onClick={markTransferSent}>
            I'll pay by bank transfer
          </Button>
        </div>
      )}

      {form.paymentMethod === 'transfer' && !form.paid && (
        <div className="rounded-2xl border border-line p-5 dark:border-white/10">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-bold">Transfer to this account</span>
            <span className="flex items-center gap-1.5 rounded-full bg-warn-soft px-3 py-1 text-sm font-bold text-warn">
              <Icon name="timer" size={14} /> {mm}:{ss}
            </span>
          </div>
          <dl className="grid gap-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Bank</dt>
              <dd className="font-semibold">{BANK_DETAILS.bank}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Account name</dt>
              <dd className="font-semibold">{BANK_DETAILS.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Account number</dt>
              <dd className="font-semibold">{BANK_DETAILS.no}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Amount</dt>
              <dd className="font-semibold">{formatNaira(due)}</dd>
            </div>
          </dl>
          <Button
            className="mt-4 w-full justify-center"
            onClick={() => {
              update({ paid: true });
              onPaid();
            }}
          >
            I have sent the transfer
          </Button>
        </div>
      )}
    </div>
  );
}
