import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BANK,
  COURSE_FEE,
  EMAIL_REGEX,
  HUB_ADDRESS,
  NG_PHONE_REGEX,
  PAY_WINDOW_MIN,
  PROMOS,
  SCHOLS,
  SEATS,
  STATES,
  TRACKS,
  WHATSAPP_LINK,
  findCategory,
  findTrack,
} from '@/shared/constants/academyData';
import type { PromoCode, Scholarship } from '@/shared/types/academy';
import { Icon } from '@/shared/components/ui/Icon';
import { CustomDropdown, OdTag } from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';
import { useToast } from '@/shared/context/ToastContext';

const ngn = (n: number) => 'NGN ' + n.toLocaleString('en-NG');
const fdate = (s: string) =>
  s
    ? new Date(s + 'T00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
const pad2 = (n: number) => String(n).padStart(2, '0');
const ymd = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const covShort = (x: Scholarship) => x.pct + '%';
const covLong = (x: Scholarship) =>
  x.pct === 100 ? 'Full tuition (100%)' : `Partial (${x.pct}%)`;
const seatsOf = (slug: string) => SEATS[slug] ?? 10;

function ageOf(dob: string): number | null {
  if (!dob) return null;
  const d = new Date(dob + 'T00:00');
  if (isNaN(d.getTime())) return null;
  const n = new Date();
  let a = n.getFullYear() - d.getFullYear();
  const m = n.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && n.getDate() < d.getDate())) a--;
  return a;
}

const esc = (s: unknown) =>
  String(s ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] || c,
  );

interface ActiveDiscount extends PromoCode {
  code: string;
}

interface PayState {
  method: '' | 'online' | 'transfer';
  deadline: number;
  state: 'idle' | 'waiting' | 'processing' | 'verifying' | 'expired';
  ref: string;
}

interface ApplyFormState {
  step: number;
  type: 'paid' | 'scholarship';
  schol: string;
  t: string;
  start: string;
  name: string;
  gender: string;
  dob: string;
  guardian: string;
  gphone: string;
  email: string;
  phone: string;
  wa: string;
  state: string;
  address: string;
  edu: string;
  status: string;
  heard: string;
  env: string;
  motive: string;
  support: string;
  fin: string;
  cv: string;
  consent: boolean;
  prev: boolean;
  disc: ActiveDiscount | null;
  pay: PayState;
}

interface AppliedRecord extends ApplyFormState {
  ref: string;
  kind: 'paid' | 'scholarship';
  method?: string;
  paidAt?: string;
  amount?: number;
  discount?: number;
}

const freshApply = (): ApplyFormState => ({
  step: 1,
  type: 'paid',
  schol: '',
  t: '',
  start: '',
  name: '',
  gender: '',
  dob: '',
  guardian: '',
  gphone: '',
  email: '',
  phone: '',
  wa: '',
  state: '',
  address: '',
  edu: '',
  status: '',
  heard: '',
  env: 'inperson',
  motive: '',
  support: '',
  fin: '',
  cv: '',
  consent: false,
  prev: true,
  disc: null,
  pay: { method: '', deadline: 0, state: 'idle', ref: '' },
});

function receiptHTML(a: AppliedRecord) {
  const t = findTrack(a.t);
  const sc = a.kind === 'scholarship' ? SCHOLS.find((x) => x.id === a.schol) : undefined;
  const paid = a.kind === 'paid';
  const rows: Array<[string, string]> = [
    ['Reference', a.ref],
    ['Date', a.paidAt || new Date().toLocaleString('en-GB')],
    ['Applicant', a.name],
    ['Email', a.email],
    ['Phone', a.phone],
    ['Programme', t?.short || ''],
    ...(a.start ? ([['Starting point', a.start]] as Array<[string, string]>) : []),
    ['Training', 'In-person, TFN Hub, Awka'],
    ...(paid
      ? ([
          ['Course fee', ngn(COURSE_FEE)],
          ...(a.discount && a.disc
            ? ([['Discount (' + a.disc.code + ')', '-' + ngn(a.discount)]] as Array<
                [string, string]
              >)
            : []),
          ['Amount paid', ngn(a.amount || 0)],
          ['Payment method', a.method || ''],
          ['Status', 'Paid and confirmed'],
        ] as Array<[string, string]>)
      : ([
          ['Scholarship', sc?.n || ''],
          [
            'Coverage if awarded',
            sc ? `${covShort(sc)} (${ngn(Math.round((COURSE_FEE * sc.pct) / 100))})` : '',
          ],
          ['Status', 'Application received'],
        ] as Array<[string, string]>)),
  ];

  return `<!doctype html><html lang="en"><meta charset="utf-8"><title>${paid ? 'Payment receipt' : 'Application receipt'} ${esc(a.ref)}</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:680px;margin:40px auto;padding:0 20px;color:#0B1230}h1{margin:0}small{color:#5C668A}table{width:100%;border-collapse:collapse;margin-top:24px}td{padding:10px 8px;border-bottom:1px solid #E3E7F2}td:first-child{color:#5C668A;width:42%}.b{display:inline-block;margin-top:14px;padding:6px 14px;border-radius:99px;background:#FFE9D6;font-weight:700}</style><body><h1>TFN Academy</h1><small>A subsidiary of TFN Solutions</small><h2>${paid ? 'Payment receipt' : 'Scholarship application receipt'}</h2><span class="b">${esc(a.ref)}</span><table>${rows.map(([k, v]) => `<tr><td>${esc(k)}</td><td><b>${esc(v)}</b></td></tr>`).join('')}</table><p style="margin-top:28px"><small>${paid ? 'Join your cohort community using the WhatsApp link sent with this receipt. Admissions will share your onboarding details.' : 'We will contact you about the online aptitude test. You will receive a decision within 5 working days.'}<br>Office B31, 4th Floor, Awka Trade Centre Complex, Plot 71 Emeka Anyaoku Boulevard, Aroma Junction, 420110, Awka.</small></p></body></html>`;
}

export default function ApplyPage() {
  const { showToast } = useToast();
  const { applyPreset } = useSite();

  const [A, setA] = useState<ApplyFormState>(freshApply);
  const [err, setErr] = useState<Record<string, string>>({});
  const [applied, setApplied] = useState<AppliedRecord | null>(null);
  const [promoText, setPromoText] = useState('');
  const [promoErr, setPromoErr] = useState('');
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (applyPreset.key > 0) {
      setApplied(null);
      setErr({});
      setPromoText('');
      setPromoErr('');
      const base = freshApply();
      if (applyPreset.type === 'scholarship') {
        base.type = 'scholarship';
        base.schol = applyPreset.schol || '';
      } else if (applyPreset.t) {
        const tr = findTrack(applyPreset.t);
        base.t = applyPreset.t;
        base.start = tr && tr.levels.length === 1 ? 'Beginner' : '';
      }
      setA(base);
    }
  }, [applyPreset]);

  useEffect(() => {
    if (
      applied ||
      A.step !== 5 ||
      A.pay.method !== 'transfer' ||
      A.pay.state !== 'waiting'
    ) {
      return;
    }
    const timer = setInterval(() => {
      const current = Date.now();
      setNowMs(current);
      if (A.pay.deadline - current <= 0) {
        setA((prev) => ({
          ...prev,
          pay: { ...prev.pay, state: 'expired' },
        }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [applied, A.step, A.pay.method, A.pay.state, A.pay.deadline]);

  const updateField = <K extends keyof ApplyFormState>(key: K, val: ApplyFormState[K]) => {
    setA((prev) => ({ ...prev, [key]: val }));
    setErr((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const discountOf = (state: ApplyFormState) => {
    const d = state.disc;
    if (!d) return 0;
    return d.pct ? Math.round((COURSE_FEE * d.pct) / 100) : Math.min(d.flat || 0, COURSE_FEE);
  };
  const payDue = (state: ApplyFormState) => Math.max(0, COURSE_FEE - discountOf(state));

  const validateStep = (step: number): boolean => {
    const e: Record<string, string> = {};
    const sc = A.type === 'scholarship' ? SCHOLS.find((x) => x.id === A.schol) : undefined;
    const a = ageOf(A.dob);
    const t = A.t ? findTrack(A.t) : undefined;

    if (step === 1) {
      if (A.type === 'scholarship' && !A.schol) e.schol = 'Choose a scholarship to continue.';
      if (!A.t) e.t = 'Choose a programme to continue.';
      else if (t && t.levels.length === 2 && !A.start) {
        e.start = 'Tell us where you’re starting from.';
      }
    }
    if (step === 2) {
      if (A.name.trim().split(/\s+/).length < 2) e.name = 'Enter your first and last name.';
      if (!A.gender) e.gender = 'Choose one option.';
      if (a === null) e.dob = 'Enter your date of birth.';
      else if (a < 0 || a > 100) e.dob = 'Enter a valid date of birth.';

      if (!EMAIL_REGEX.test(A.email.trim())) {
        e.email = 'Enter an email address like name@example.com.';
      }
      if (!NG_PHONE_REGEX.test(A.phone.replace(/[\s-]/g, ''))) {
        e.phone = 'Enter a Nigerian number starting with 07, 08 or 09, or +234.';
      }
      if (A.wa.trim() && !NG_PHONE_REGEX.test(A.wa.replace(/[\s-]/g, ''))) {
        e.wa = 'Enter a Nigerian WhatsApp number, or leave blank to use your phone.';
      }
      if (!A.state) e.state = 'Choose one option.';
      if (!A.address.trim()) e.address = 'Enter your home address or city.';
      if (!A.edu) e.edu = 'Choose one option.';
      if (!A.status) e.status = 'Choose one option.';

      if (a !== null && a < 18) {
        if (A.guardian.trim().split(/\s+/).length < 2) {
          e.guardian = 'Enter the parent or guardian’s first and last name.';
        }
        if (!NG_PHONE_REGEX.test(A.gphone.replace(/[\s-]/g, ''))) {
          e.gphone = 'Enter a Nigerian phone number.';
        }
      }

      if (sc) {
        if (A.motive.trim().length < 30) {
          e.motive = 'Please write a few sentences (at least 30 characters).';
        }
        if (A.support.trim().length < 10) e.support = 'Please add a little more detail.';
        if (sc.fin && A.fin.trim().length < 10) {
          e.fin = 'Please briefly explain your circumstances.';
        }
        if (sc.rule === 'female' && A.gender && A.gender !== 'Female') {
          e.gender =
            'This scholarship is for women. Choose another scholarship or check your details.';
        }
        if (sc.rule === 'age1830' && a !== null && (a < 18 || a > 30) && !e.dob) {
          e.dob = 'The Merit Excellence Award is open to ages 18 to 30.';
        }
        if (sc.rule === 'minor' && a !== null && a >= 18 && !e.dob) {
          e.dob = 'The Young Innovators Bursary is for children and teenagers under 18.';
        }
      }

      if (!A.consent) e.consent = 'Tick the box so we can process your application.';
    }

    setErr(e);
    return !Object.keys(e).length;
  };

  const focusFirstError = () => {
    setTimeout(() => {
      const f = document.querySelector<HTMLElement>(
        '.fld.err .inp, .fld.err .dd-btn, .check.err input',
      );
      if (f) {
        f.scrollIntoView({ block: 'center' });
        f.focus({ preventScroll: true });
      }
    }, 20);
  };

  const handleNext = () => {
    if (!validateStep(A.step)) {
      focusFirstError();
      return;
    }
    if (A.step === 4) {
      if (A.type === 'scholarship') {
        const rec: AppliedRecord = {
          ...A,
          ref: 'SCH-' + String(Math.floor(10000 + Math.random() * 90000)),
          kind: 'scholarship',
        };
        setApplied(rec);
        setA(freshApply());
        window.scrollTo(0, 0);
        showToast('Application submitted');
      } else {
        setA((prev) => ({
          ...prev,
          step: 5,
          pay: { method: '', deadline: 0, state: 'idle', ref: '' },
        }));
        window.scrollTo(0, 0);
      }
      return;
    }
    setA((prev) => ({ ...prev, step: prev.step + 1 }));
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setErr({});
    setA((prev) => ({ ...prev, step: prev.step - 1 }));
    window.scrollTo(0, 0);
  };

  const finishPayment = (method: string) => {
    setApplied({
      ...A,
      ref: 'TFN-' + String(Math.floor(10000 + Math.random() * 90000)),
      kind: 'paid',
      method,
      paidAt: new Date().toLocaleString('en-GB'),
      amount: payDue(A),
      discount: discountOf(A),
    });
    setA(freshApply());
    window.scrollTo(0, 0);
    showToast('Payment confirmed');
  };

  const downloadReceipt = () => {
    if (!applied) return;
    const el = document.createElement('a');
    el.href = URL.createObjectURL(new Blob([receiptHTML(applied)], { type: 'text/html' }));
    el.download = `TFN-Academy-receipt-${applied.ref}.html`;
    document.body.appendChild(el);
    el.click();
    el.remove();
    setTimeout(() => URL.revokeObjectURL(el.href), 2000);
    showToast('Receipt downloaded');
  };

  if (applied) {
    const t = findTrack(applied.t) || TRACKS[0];
    const sc =
      applied.kind === 'scholarship' ? SCHOLS.find((x) => x.id === applied.schol) : undefined;
    const first = applied.name.split(' ')[0];

    if (applied.kind === 'paid') {
      return (
        <section className="sec">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="panel">
              <div className="okmark">
                <Icon name="check" />
              </div>
              <h2 style={{ fontSize: '2.3rem' }}>Payment confirmed</h2>
              <p className="muted">
                Welcome to TFN Academy, {first}. Your seat for {t.short} is secured.
              </p>
              <div className="ref">
                <Icon name="flag" />
                <span>{applied.ref}</span>
                <button
                  type="button"
                  className="iconbtn sm"
                  aria-label="Copy admission number"
                  title="Copy admission number"
                  onClick={() => {
                    (navigator.clipboard
                      ? navigator.clipboard.writeText(applied.ref)
                      : Promise.reject()
                    ).then(
                      () => showToast('Admission number copied'),
                      () => showToast('Copy not available. Please copy it manually.'),
                    );
                  }}
                >
                  <Icon name="copy" />
                </button>
              </div>
              <div className="wa">
                <span className="wa-ic">
                  <Icon name="message-circle" />
                </span>
                <div>
                  <b>Join your cohort community</b>
                  <p>
                    Connect with your classmates and instructors in the current cohort WhatsApp
                    group.
                  </p>
                </div>
                <a
                  className="btn btn-accent"
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener"
                >
                  Join WhatsApp community
                </a>
              </div>

              <dl className="summary" style={{ marginTop: 22 }}>
                <div>
                  <dt>Programme</dt>
                  <dd>{t.short}</dd>
                  <span />
                </div>
                {applied.discount && applied.disc ? (
                  <div>
                    <dt>Discount ({applied.disc.code})</dt>
                    <dd>−{ngn(applied.discount)}</dd>
                    <span />
                  </div>
                ) : null}
                <div>
                  <dt>Amount paid</dt>
                  <dd>{ngn(applied.amount || 0)}</dd>
                  <span />
                </div>
                <div>
                  <dt>Payment method</dt>
                  <dd>{applied.method}</dd>
                  <span />
                </div>
                <div>
                  <dt>Paid on</dt>
                  <dd>{applied.paidAt}</dd>
                  <span />
                </div>
                <div>
                  <dt>Training</dt>
                  <dd>In-person, TFN Hub, Awka</dd>
                  <span />
                </div>
              </dl>

              <h3 style={{ marginTop: 32 }}>What happens next</h3>
              <div className="next">
                <div>
                  <i>1</i>
                  <span>
                    <b>Join the WhatsApp community</b>
                    <br />
                    <span className="muted">Use the button above to meet your cohort.</span>
                  </span>
                </div>
                <div>
                  <i>2</i>
                  <span>
                    <b>Admissions shares your onboarding details</b>
                    <br />
                    <span className="muted">
                      You will receive your start date and timetable on WhatsApp or email (
                      {applied.wa || applied.phone}).
                    </span>
                  </span>
                </div>
                <div>
                  <i>3</i>
                  <span>
                    <b>Get set up</b>
                    <br />
                    <span className="muted">Install your programme’s tools: {t.tools}</span>
                  </span>
                </div>
              </div>

              <div className="wnav">
                <button type="button" className="btn btn-accent" onClick={downloadReceipt}>
                  <Icon name="download" />
                  Download receipt
                </button>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link className="btn btn-line" to={`/programmes/${t.slug}`}>
                    Back to {t.short}
                  </Link>
                  <button
                    type="button"
                    className="btn btn-brand"
                    onClick={() => {
                      setApplied(null);
                      setA(freshApply());
                      window.scrollTo(0, 0);
                    }}
                  >
                    Start another application
                  </button>
                </div>
              </div>
              <div className="review-only">
                <OdTag id="OD-04" />
              </div>
            </div>
          </div>
        </section>
      );
    }

    const cov = sc ? Math.round((COURSE_FEE * sc.pct) / 100) : 0;
    return (
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="panel">
            <div className="okmark">
              <Icon name="check" />
            </div>
            <h2 style={{ fontSize: '2.3rem' }}>Application received</h2>
            <p className="muted">
              Thank you, {first}. We have your {sc?.n} application for {t.short}, and we will get in
              touch soon.
            </p>
            <div className="ref">
              <Icon name="flag" />
              <span>{applied.ref}</span>
              <button
                type="button"
                className="iconbtn sm"
                aria-label="Copy admission number"
                title="Copy admission number"
                onClick={() => {
                  (navigator.clipboard
                    ? navigator.clipboard.writeText(applied.ref)
                    : Promise.reject()
                  ).then(
                    () => showToast('Admission number copied'),
                    () => showToast('Copy not available. Please copy it manually.'),
                  );
                }}
              >
                <Icon name="copy" />
              </button>
            </div>
            <div className="callout" style={{ marginTop: 22 }}>
              <Icon name="download" />
              <span>
                <b>Keep your application receipt.</b> Download it now for your records.
              </span>
            </div>
            <div style={{ marginTop: 14 }}>
              <button type="button" className="btn btn-accent" onClick={downloadReceipt}>
                <Icon name="download" />
                Download application receipt
              </button>
            </div>
            <h3 style={{ marginTop: 32 }}>What happens next</h3>
            <div className="next">
              <div>
                <i>1</i>
                <span>
                  <b>We review your application</b>
                  <br />
                  <span className="muted">
                    Our team checks your details against the scholarship requirements.
                  </span>
                </span>
              </div>
              <div>
                <i>2</i>
                <span>
                  <b>Online aptitude test</b>
                  <br />
                  <span className="muted">We will send you the link. It takes about 45 minutes.</span>
                </span>
              </div>
              <div>
                <i>3</i>
                <span>
                  <b>Decision within 5 working days</b>
                  <br />
                  <span className="muted">
                    If awarded, {sc?.n} covers {sc ? covShort(sc) : ''} ({ngn(cov)}). The balance of{' '}
                    {ngn(COURSE_FEE - cov)} is paid online or by bank transfer.
                  </span>
                </span>
              </div>
            </div>
            <div className="wnav">
              <Link className="btn btn-line" to="/scholarship">
                Back to scholarships
              </Link>
              <button
                type="button"
                className="btn btn-brand"
                onClick={() => {
                  setApplied(null);
                  setA(freshApply());
                  window.scrollTo(0, 0);
                }}
              >
                Start another application
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const st =
    A.type === 'scholarship'
      ? ['Course', 'Your details', 'Environment', 'Review']
      : ['Course', 'Your details', 'Environment', 'Review', 'Payment'];
  const pct = Math.round((A.step / st.length) * 100);
  const t = A.t ? findTrack(A.t) : undefined;
  const sc = A.type === 'scholarship' ? SCHOLS.find((x) => x.id === A.schol) : undefined;
  const age = ageOf(A.dob);
  const minor = age !== null && age < 18;

  const progOptsSeats = TRACKS.map((tr) => ({
    v: tr.slug,
    l: tr.short,
    ic: tr.ic,
    g: findCategory(tr.cat)?.name,
    r: `${seatsOf(tr.slug)} seats left`,
    rc: seatsOf(tr.slug) < 8 ? 'low' : '',
  }));

  const nextLabel =
    A.step === 4
      ? A.type === 'scholarship'
        ? 'Submit application'
        : 'Continue to payment'
      : 'Continue';

  const handleApplyPromo = () => {
    if (['processing', 'verifying'].includes(A.pay.state)) return;
    const code = promoText.trim().toUpperCase();
    const p = PROMOS[code];
    if (!code) {
      setPromoErr('Enter a discount code.');
    } else if (!p) {
      setPromoErr('That code isn’t valid or has expired.');
    } else {
      setA((prev) => ({ ...prev, disc: { code, ...p } }));
      setPromoErr('');
      setPromoText('');
      showToast(`${code} applied: ${p.label}`);
    }
  };

  return (
    <>
      <section className="phead" style={{ paddingBottom: 32 }}>
        <div className="wrap">
          <div className="crumbs">
            <Link to="/">Home</Link>
            <Icon name="chevron-down" />
            <span>Apply</span>
          </div>
          <h1 style={{ maxWidth: 'none' }}>
            {A.type === 'scholarship' ? 'Apply for a scholarship' : 'Apply to TFN Academy'}
          </h1>
        </div>
      </section>

      <section className="sec-end">
        <div className="wrap apply">
          <ol className="stepper" style={{ ['--n' as string]: st.length }}>
            {st.map((s, i) => (
              <li
                key={s}
                className={A.step === i + 1 ? 'cur' : A.step > i + 1 ? 'done' : ''}
              >
                <span className="d">{A.step > i + 1 ? <Icon name="check" /> : i + 1}</span>
                <span className="l">{s}</span>
              </li>
            ))}
          </ol>

          <div>
            <div className="aprog">
              <div className="ap-top">
                <b>
                  Step {A.step} of {st.length}: {st[A.step - 1]}
                </b>
                <span>{pct}% complete</span>
              </div>
              <div className="ap-bar">
                <i style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="panel">
              {A.step === 1 && (
                <>
                  <h2>Choose your course</h2>
                  <p className="muted">
                    Tell us how you’d like to apply, then pick your programme.
                  </p>
                  <div className="opts g2">
                    {(
                      [
                        [
                          'paid',
                          'Enrol and pay',
                          'Choose a programme and pay the standard course fee to secure your seat.',
                        ],
                        [
                          'scholarship',
                          'Apply for a scholarship',
                          'Apply for a scholarship or grant that covers part or all of the fee.',
                        ],
                      ] as const
                    ).map(([k, h, s]) => (
                      <button
                        key={k}
                        type="button"
                        className={`opt ${A.type === k ? 'on' : ''}`.trim()}
                        onClick={() => {
                          setA((prev) => ({
                            ...prev,
                            type: k,
                            schol: k === 'paid' ? '' : prev.schol,
                          }));
                          setErr({});
                        }}
                      >
                        <span>
                          <b>{h}</b>
                          <span>{s}</span>
                        </span>
                        <span className="rad">{A.type === k ? <Icon name="check" /> : null}</span>
                      </button>
                    ))}
                  </div>

                  {A.type === 'scholarship' ? (
                    <>
                      <div style={{ marginTop: 24 }}>
                        <div className={`fld ${err.schol ? 'err' : ''}`.trim()}>
                          <label htmlFor="dd-apply.schol">Scholarship</label>
                          <CustomDropdown
                            id="apply.schol"
                            value={A.schol}
                            onChange={(v) => updateField('schol', v)}
                            options={SCHOLS.map((x) => ({
                              v: x.id,
                              l: x.n,
                              ic: x.ic,
                              r: covShort(x),
                            }))}
                            placeholder="Choose a scholarship"
                          />
                          {err.schol ? (
                            <span className="emsg">
                              <Icon name="circle-alert" />
                              {err.schol}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      {sc ? (
                        <div className="callout" style={{ marginTop: 14 }}>
                          <Icon name="award" />
                          <span>
                            <b>
                              {sc.n}: {covLong(sc)}.
                            </b>{' '}
                            {sc.req.join(', ')}.
                          </span>
                        </div>
                      ) : null}
                    </>
                  ) : null}

                  <div style={{ marginTop: 24 }}>
                    <div className={`fld ${err.t ? 'err' : ''}`.trim()}>
                      <label htmlFor="dd-apply.t">Programme</label>
                      <CustomDropdown
                        id="apply.t"
                        value={A.t}
                        onChange={(v) => {
                          const chosen = findTrack(v);
                          setA((prev) => ({
                            ...prev,
                            t: v,
                            start: chosen && chosen.levels.length === 1 ? 'Beginner' : '',
                            prev: true,
                          }));
                          setErr((prev) => {
                            const next = { ...prev };
                            delete next.t;
                            delete next.start;
                            return next;
                          });
                        }}
                        options={progOptsSeats}
                        placeholder="Select a programme"
                      />
                      {err.t ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.t}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {t ? (
                    <div className={`prev ${A.prev ? 'open' : ''}`.trim()}>
                      <button
                        type="button"
                        aria-expanded={A.prev}
                        onClick={() => updateField('prev', !A.prev)}
                      >
                        <span className="ti">
                          <Icon name={t.ic} />
                        </span>
                        <span>
                          <b>{t.short}</b>
                          <span className="s">{t.line}</span>
                        </span>
                        <Icon name="chevron-down" className="cv" />
                      </button>
                      <div className="bw">
                        <div className="bi">
                          <div className="pv">
                            <div className="chips">
                              <span
                                className={`pill ${seatsOf(t.slug) < 8 ? 'ac' : ''}`.trim()}
                              >
                                <Icon name="users" />
                                {seatsOf(t.slug)} seats available
                                {seatsOf(t.slug) < 8 ? ', filling fast' : ''}
                              </span>
                              <span className="pill">
                                {t.levels.length === 2
                                  ? 'Beginner and Advanced stages'
                                  : 'One complete course'}
                              </span>
                              <span className="pill ac">{t.certs.length} certifications</span>
                              <span className="pill">In-person</span>
                            </div>
                            <div>
                              <h5>What you’ll cover</h5>
                              <ol>
                                {t.levels[0].mods
                                  .filter(
                                    (m) =>
                                      !/^capstone/i.test(m.n) && !/^certification/i.test(m.n),
                                  )
                                  .slice(0, 5)
                                  .map((m) => (
                                    <li key={m.n}>{m.n}</li>
                                  ))}
                              </ol>
                            </div>
                            <div>
                              <h5>Certifications</h5>
                              <div className="chips">
                                {t.certs.slice(0, 3).map((c) => (
                                  <span key={c} className="tag">
                                    {c}
                                  </span>
                                ))}
                                {t.certs.length > 3 ? (
                                  <span className="tag">+{t.certs.length - 3} more</span>
                                ) : null}
                              </div>
                            </div>
                            <div>
                              <Link className="tlink" to={`/programmes/${t.slug}`}>
                                Read the full programme <Icon name="arrow-right" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {t && t.levels.length === 2 ? (
                    <>
                      <div className="sub">Where are you starting from?</div>
                      {err.start ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.start}
                        </span>
                      ) : null}
                      <div className="opts g3">
                        {(
                          [
                            ['Beginner', 'I’m new to this', 'I’m starting from the basics.'],
                            [
                              'Advanced',
                              'I already have experience',
                              'I know the basics and want to go further.',
                            ],
                            ['Unsure', 'I’m not sure yet', 'Admissions will help me decide.'],
                          ] as const
                        ).map(([k, h, s]) => (
                          <button
                            key={k}
                            type="button"
                            className={`opt ${A.start === k ? 'on' : ''}`.trim()}
                            onClick={() => updateField('start', k)}
                          >
                            <span>
                              <b>{h}</b>
                              <span>{s}</span>
                            </span>
                            <span className="rad">
                              {A.start === k ? <Icon name="check" /> : null}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : null}

                  <div className="callout" style={{ marginTop: 24 }}>
                    <Icon name="info" />
                    <span>
                      <b>Standard course fee: {ngn(COURSE_FEE)}</b> for every programme.{' '}
                      {A.type === 'paid'
                        ? 'You will pay after reviewing your application.'
                        : 'Scholarships cover part or all of this fee.'}{' '}
                      <span className="review-only">
                        <OdTag id="OD-04" />
                      </span>
                    </span>
                  </div>
                </>
              )}

              {A.step === 2 && (
                <>
                  <h2>Your details</h2>
                  <p className="muted">
                    We use these to review your application and keep in touch.
                  </p>
                  <div className="form">
                    <div className="sub" style={{ margin: 0 }}>
                      Personal information
                    </div>

                    <div className={`fld ${err.name ? 'err' : ''}`.trim()}>
                      <label htmlFor="apply-name">Full name</label>
                      <input
                        className="inp"
                        id="apply-name"
                        type="text"
                        value={A.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="First and last name"
                        autoComplete="name"
                      />
                      {err.name ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.name}
                        </span>
                      ) : null}
                    </div>

                    <div className="f2">
                      <div className={`fld ${err.gender ? 'err' : ''}`.trim()}>
                        <label htmlFor="dd-apply.gender">Gender</label>
                        <CustomDropdown
                          id="apply.gender"
                          value={A.gender}
                          onChange={(v) => updateField('gender', v)}
                          options={['Female', 'Male', 'Prefer not to say'].map((v) => ({
                            v,
                            l: v,
                          }))}
                          placeholder="Choose one"
                        />
                        {err.gender ? (
                          <span className="emsg">
                            <Icon name="circle-alert" />
                            {err.gender}
                          </span>
                        ) : null}
                      </div>

                      <div className={`fld ${err.dob ? 'err' : ''}`.trim()}>
                        <label htmlFor="apply-dob">Date of birth</label>
                        <input
                          className="inp"
                          id="apply-dob"
                          type="date"
                          max={ymd(new Date())}
                          value={A.dob}
                          onChange={(e) => updateField('dob', e.target.value)}
                        />
                        {err.dob ? (
                          <span className="emsg">
                            <Icon name="circle-alert" />
                            {err.dob}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div id="gblock" className="form" hidden={!minor}>
                      <div className="callout">
                        <Icon name="info" />
                        <span>
                          Because the applicant is under 18, please add a parent or guardian’s
                          details.
                        </span>
                      </div>
                      <div className="f2">
                        <div className={`fld ${err.guardian ? 'err' : ''}`.trim()}>
                          <label htmlFor="apply-guardian">Parent or guardian’s name</label>
                          <input
                            className="inp"
                            id="apply-guardian"
                            type="text"
                            value={A.guardian}
                            onChange={(e) => updateField('guardian', e.target.value)}
                          />
                          {err.guardian ? (
                            <span className="emsg">
                              <Icon name="circle-alert" />
                              {err.guardian}
                            </span>
                          ) : null}
                        </div>

                        <div className={`fld ${err.gphone ? 'err' : ''}`.trim()}>
                          <label htmlFor="apply-gphone">Parent or guardian’s phone</label>
                          <input
                            className="inp"
                            id="apply-gphone"
                            type="tel"
                            placeholder="0803 123 4567"
                            value={A.gphone}
                            onChange={(e) => updateField('gphone', e.target.value)}
                          />
                          {err.gphone ? (
                            <span className="emsg">
                              <Icon name="circle-alert" />
                              {err.gphone}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="f2">
                      <div className={`fld ${err.email ? 'err' : ''}`.trim()}>
                        <label htmlFor="apply-email">Email address</label>
                        <input
                          className="inp"
                          id="apply-email"
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          value={A.email}
                          onChange={(e) => updateField('email', e.target.value)}
                        />
                        {err.email ? (
                          <span className="emsg">
                            <Icon name="circle-alert" />
                            {err.email}
                          </span>
                        ) : null}
                      </div>

                      <div className={`fld ${err.phone ? 'err' : ''}`.trim()}>
                        <label htmlFor="apply-phone">Phone number</label>
                        <input
                          className="inp"
                          id="apply-phone"
                          type="tel"
                          placeholder="0803 123 4567"
                          autoComplete="tel"
                          value={A.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                        />
                        {err.phone ? (
                          <span className="emsg">
                            <Icon name="circle-alert" />
                            {err.phone}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="f2">
                      <div className={`fld ${err.wa ? 'err' : ''}`.trim()}>
                        <label htmlFor="apply-wa">WhatsApp number</label>
                        <input
                          className="inp"
                          id="apply-wa"
                          type="tel"
                          placeholder="Same as phone if left blank"
                          value={A.wa}
                          onChange={(e) => updateField('wa', e.target.value)}
                        />
                        <span className="hint">Used to add you to your cohort community.</span>
                        {err.wa ? (
                          <span className="emsg">
                            <Icon name="circle-alert" />
                            {err.wa}
                          </span>
                        ) : null}
                      </div>

                      <div className={`fld ${err.state ? 'err' : ''}`.trim()}>
                        <label htmlFor="dd-apply.state">State of residence</label>
                        <CustomDropdown
                          id="apply.state"
                          value={A.state}
                          onChange={(v) => updateField('state', v)}
                          options={STATES.map((v) => ({ v, l: v }))}
                          placeholder="Choose a location"
                        />
                        {err.state ? (
                          <span className="emsg">
                            <Icon name="circle-alert" />
                            {err.state}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className={`fld ${err.address ? 'err' : ''}`.trim()}>
                      <label htmlFor="apply-address">Home address or city</label>
                      <input
                        className="inp"
                        id="apply-address"
                        type="text"
                        placeholder="Street, town or city"
                        autoComplete="street-address"
                        value={A.address}
                        onChange={(e) => updateField('address', e.target.value)}
                      />
                      {err.address ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.address}
                        </span>
                      ) : null}
                    </div>

                    <div className="sub" style={{ margin: '6px 0 0' }}>
                      Background
                    </div>

                    <div className="f2">
                      <div className={`fld ${err.edu ? 'err' : ''}`.trim()}>
                        <label htmlFor="dd-apply.edu">Education level</label>
                        <CustomDropdown
                          id="apply.edu"
                          value={A.edu}
                          onChange={(v) => updateField('edu', v)}
                          options={[
                            'Primary or secondary school student',
                            'SSCE holder',
                            'ND or HND',
                            'University student',
                            'University graduate',
                            'Postgraduate',
                            'Other',
                          ].map((v) => ({ v, l: v }))}
                          placeholder="Choose one"
                        />
                        {err.edu ? (
                          <span className="emsg">
                            <Icon name="circle-alert" />
                            {err.edu}
                          </span>
                        ) : null}
                      </div>

                      <div className={`fld ${err.status ? 'err' : ''}`.trim()}>
                        <label htmlFor="dd-apply.status">What are you doing now?</label>
                        <CustomDropdown
                          id="apply.status"
                          value={A.status}
                          onChange={(v) => updateField('status', v)}
                          options={[
                            'In school or university',
                            'Graduate, looking for work',
                            'Working full-time',
                            'Self-employed or running a business',
                            'Something else',
                          ].map((v) => ({ v, l: v }))}
                          placeholder="Choose one"
                        />
                        {err.status ? (
                          <span className="emsg">
                            <Icon name="circle-alert" />
                            {err.status}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="fld">
                      <label htmlFor="dd-apply.heard">How did you hear about us?</label>
                      <CustomDropdown
                        id="apply.heard"
                        value={A.heard}
                        onChange={(v) => updateField('heard', v)}
                        options={[
                          'Instagram',
                          'TikTok',
                          'X (Twitter)',
                          'LinkedIn',
                          'WhatsApp',
                          'Friend or family',
                          'Event or school visit',
                          'Search engine',
                          'Other',
                        ].map((v) => ({ v, l: v }))}
                        placeholder="Choose one"
                      />
                    </div>

                    {sc ? (
                      <>
                        <div className="sub" style={{ margin: '10px 0 0' }}>
                          Scholarship application: {sc.n}
                        </div>
                        <div className="callout">
                          <Icon name="award" />
                          <span>
                            <b>Requirements:</b> {sc.req.join(', ')}.
                          </span>
                        </div>

                        <div className={`fld ${err.motive ? 'err' : ''}`.trim()}>
                          <label htmlFor="apply-motive">Letter of motivation</label>
                          <textarea
                            className="inp"
                            id="apply-motive"
                            placeholder="Tell us about your goals and why you should receive this scholarship."
                            value={A.motive}
                            onChange={(e) => updateField('motive', e.target.value)}
                          />
                          {err.motive ? (
                            <span className="emsg">
                              <Icon name="circle-alert" />
                              {err.motive}
                            </span>
                          ) : null}
                        </div>

                        <div className={`fld ${err.support ? 'err' : ''}`.trim()}>
                          <label htmlFor="apply-support">Supporting information</label>
                          <textarea
                            className="inp"
                            id="apply-support"
                            placeholder={sc.ask}
                            value={A.support}
                            onChange={(e) => updateField('support', e.target.value)}
                          />
                          {err.support ? (
                            <span className="emsg">
                              <Icon name="circle-alert" />
                              {err.support}
                            </span>
                          ) : null}
                        </div>

                        {sc.fin ? (
                          <div className={`fld ${err.fin ? 'err' : ''}`.trim()}>
                            <label htmlFor="apply-fin">Financial circumstances</label>
                            <textarea
                              className="inp"
                              id="apply-fin"
                              placeholder="Briefly explain your situation. You may be asked for evidence later."
                              value={A.fin}
                              onChange={(e) => updateField('fin', e.target.value)}
                            />
                            {err.fin ? (
                              <span className="emsg">
                                <Icon name="circle-alert" />
                                {err.fin}
                              </span>
                            ) : null}
                          </div>
                        ) : null}

                        <div className="fld">
                          <label>
                            Supporting documents <span className="muted">(optional)</span>
                          </label>
                          <label className="upload">
                            <Icon name="file-up" />
                            <span id="cvname-apply">
                              {A.cv || 'Choose a file (PDF, Word or image)'}
                            </span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,image/*"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                updateField('cv', f ? f.name : '');
                              }}
                            />
                          </label>
                        </div>
                      </>
                    ) : null}

                    <label
                      className={`check ${A.consent ? 'on' : ''} ${err.consent ? 'err' : ''}`.trim()}
                    >
                      <input
                        type="checkbox"
                        id="apply-consent"
                        checked={A.consent}
                        onChange={(e) => updateField('consent', e.target.checked)}
                      />
                      <span>
                        <b>
                          I confirm the information I have given is accurate and agree that TFN
                          Academy can store and use it to manage my application.
                        </b>
                        <span>We only use it to contact you about your application.</span>
                      </span>
                    </label>
                    {err.consent ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.consent}
                      </span>
                    ) : null}
                  </div>
                </>
              )}

              {A.step === 3 && (
                <>
                  <h2>Training environment</h2>
                  <p className="muted">Choose how you will learn.</p>
                  <div className="opts g2">
                    <button
                      type="button"
                      className={`opt ${A.env === 'inperson' ? 'on' : ''}`.trim()}
                      onClick={() => updateField('env', 'inperson')}
                    >
                      <span>
                        <b>In-person</b>
                        <span>Learn on site with classmates and hands-on support</span>
                      </span>
                      <span className="rad">
                        {A.env === 'inperson' ? <Icon name="check" /> : null}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="opt disabled"
                      aria-disabled="true"
                      onClick={() =>
                        showToast('Remote learning is coming soon. Please choose in-person.')
                      }
                    >
                      <span>
                        <b>Remote learning</b>
                        <span>Online and virtual classes</span>
                      </span>
                      <span className="pill ac">Coming soon</span>
                    </button>
                  </div>
                  <div className="sub">Training location</div>
                  <div className="loc">
                    <Icon name="map-pin" />
                    <div>
                      <b>TFN Hub, Awka</b>
                      <span className="small muted">{HUB_ADDRESS}</span>
                    </div>
                  </div>
                  <p className="small muted" style={{ marginTop: 14 }}>
                    Remote learning is not yet open for applications. Your place will be in-person
                    at our Awka location.
                  </p>
                </>
              )}

              {A.step === 4 && t && (
                <>
                  <h2>Review your application</h2>
                  <p className="muted">
                    Check everything before you{' '}
                    {A.type === 'scholarship' ? 'submit' : 'continue to payment'}.
                  </p>
                  <dl className="summary">
                    {(
                      [
                        [
                          'Application',
                          A.type === 'scholarship' && sc
                            ? 'Scholarship: ' + sc.n
                            : 'Enrol and pay',
                          1,
                        ],
                        ['Programme', t.short, 1],
                        ...(A.start
                          ? ([
                              [
                                'Starting point',
                                {
                                  Beginner: 'New to this',
                                  Advanced: 'Already experienced',
                                  Unsure: 'Not sure yet',
                                }[A.start] || A.start,
                                1,
                              ],
                            ] as Array<[string, string, number]>)
                          : []),
                        ['Name', A.name, 2],
                        ['Gender', A.gender, 2],
                        ['Date of birth', fdate(A.dob), 2],
                        ['Email', A.email, 2],
                        ['Phone', A.phone, 2],
                        ['WhatsApp', A.wa || A.phone, 2],
                        ['Location', `${A.state}, ${A.address}`, 2],
                        ['Education', A.edu, 2],
                        ['Training environment', 'In-person, TFN Hub, Awka', 3],
                      ] as Array<[string, string, number]>
                    ).map(([k, v, s]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                        <button
                          type="button"
                          className="linkbtn small"
                          onClick={() => {
                            setErr({});
                            setA((prev) => ({ ...prev, step: s }));
                            window.scrollTo(0, 0);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </dl>

                  {A.type === 'scholarship' && sc ? (
                    <div className="costbox">
                      <div>
                        <span className="muted">Standard course fee</span>
                        <b>{ngn(COURSE_FEE)}</b>
                      </div>
                      <div>
                        <span className="muted">If awarded ({covShort(sc)})</span>
                        <b>{ngn(Math.round((COURSE_FEE * sc.pct) / 100))} covered</b>
                      </div>
                      <div>
                        <span className="muted">Balance payable</span>
                        <b>{ngn(COURSE_FEE - Math.round((COURSE_FEE * sc.pct) / 100))}</b>
                      </div>
                    </div>
                  ) : (
                    <div className="costbox">
                      <div>
                        <span className="muted">Course fee</span>
                        <b>{ngn(COURSE_FEE)}</b>
                      </div>
                      <div>
                        <span className="muted">Total due next</span>
                        <b>{ngn(COURSE_FEE)}</b>
                      </div>
                    </div>
                  )}

                  {A.type === 'scholarship' ? (
                    <div className="callout" style={{ marginTop: 16 }}>
                      <Icon name="info" />
                      <span>
                        After you submit, we will contact you about the online aptitude test (about
                        45 minutes). You will receive a decision within 5 working days.
                      </span>
                    </div>
                  ) : null}
                </>
              )}

              {A.step === 5 && t && (
                <>
                  <h2>Pay for your course</h2>
                  <p className="muted">One standard course fee for every programme.</p>

                  <div className="costbox">
                    <div>
                      <span className="muted">Programme</span>
                      <b>{t.short}</b>
                    </div>
                    <div>
                      <span className="muted">Course fee</span>
                      <b>{ngn(COURSE_FEE)}</b>
                    </div>
                    {discountOf(A) > 0 && A.disc ? (
                      <div className="disc">
                        <span>Discount ({A.disc.code})</span>
                        <b>−{ngn(discountOf(A))}</b>
                      </div>
                    ) : null}
                    <div>
                      <span className="muted">Total due</span>
                      <b>{ngn(payDue(A))}</b>
                    </div>
                  </div>

                  <div className="promo">
                    <div className="sub" style={{ margin: '0 0 10px' }}>
                      Have a discount code?
                    </div>
                    {A.disc ? (
                      <div className="promo-ok">
                        <span>
                          <Icon name="badge-check" />
                          <b>{A.disc.code}</b> applied: {A.disc.label}
                        </span>
                        <button
                          type="button"
                          className="linkbtn small"
                          onClick={() => updateField('disc', null)}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="vbox">
                          <input
                            className="inp"
                            id="promo-in"
                            value={promoText}
                            onChange={(e) => setPromoText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleApplyPromo();
                              }
                            }}
                            placeholder="Enter code"
                            autoComplete="off"
                            aria-label="Discount code"
                          />
                          <button type="button" className="btn btn-line" onClick={handleApplyPromo}>
                            Apply
                          </button>
                        </div>
                        {promoErr ? (
                          <span className="emsg" style={{ marginTop: 10 }}>
                            <Icon name="circle-alert" />
                            {promoErr}
                          </span>
                        ) : null}
                      </>
                    )}
                    <div className="review-only small muted" style={{ marginTop: 8 }}>
                      Demo codes: TFN10, EARLYBIRD, WELCOME5000
                    </div>
                  </div>

                  <div className="sub">Choose how to pay</div>
                  <div className="opts g2">
                    {(
                      [
                        [
                          'online',
                          'Pay online',
                          'Card, bank transfer or USSD through our secure payment gateway.',
                        ],
                        [
                          'transfer',
                          'Bank transfer',
                          'Pay into our account and confirm your payment within the time window.',
                        ],
                      ] as const
                    ).map(([k, h, s]) => (
                      <button
                        key={k}
                        type="button"
                        className={`opt ${A.pay.method === k ? 'on' : ''}`.trim()}
                        onClick={() => {
                          if (k === 'transfer') {
                            setNowMs(Date.now());
                            setA((prev) => ({
                              ...prev,
                              pay: {
                                method: 'transfer',
                                state: 'waiting',
                                deadline: Date.now() + PAY_WINDOW_MIN * 60000,
                                ref: 'TFN-' + String(Math.floor(10000 + Math.random() * 90000)),
                              },
                            }));
                          } else {
                            setA((prev) => ({
                              ...prev,
                              pay: { ...prev.pay, method: 'online', state: 'idle' },
                            }));
                          }
                        }}
                      >
                        <span>
                          <b>{h}</b>
                          <span>{s}</span>
                        </span>
                        <span className="rad">
                          {A.pay.method === k ? <Icon name="check" /> : null}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div style={{ marginTop: 20 }}>
                    {A.pay.method === 'online' &&
                      (A.pay.state === 'processing' ? (
                        <div className="paybox center">
                          <span className="spin" />
                          <b>Processing your payment…</b>
                          <span className="muted small">Please don’t close this page.</span>
                        </div>
                      ) : (
                        <div className="paybox">
                          <div>
                            <b>Secure online payment</b>
                            <p className="muted small">
                              You will complete your payment with our payment partner. Your seat is
                              confirmed as soon as it succeeds.
                            </p>
                          </div>
                          <button
                            type="button"
                            className="btn btn-brand"
                            onClick={() => {
                              setA((prev) => ({
                                ...prev,
                                pay: { ...prev.pay, state: 'processing' },
                              }));
                              setTimeout(() => {
                                finishPayment('Online payment');
                              }, 1600);
                            }}
                          >
                            <Icon name="lock" />
                            Pay {ngn(payDue(A))} securely
                          </button>
                          <p className="small muted">
                            Prototype: the payment gateway is simulated.
                          </p>
                        </div>
                      ))}

                    {A.pay.method === 'transfer' &&
                      (A.pay.state === 'expired' ? (
                        <div className="vres bad" style={{ marginTop: 0 }}>
                          <div className="vh">
                            <Icon name="timer" />
                            Your payment window has expired
                          </div>
                          <p>
                            For security, we hold your seat for {PAY_WINDOW_MIN} minutes at a time.
                            Start a new window to get fresh payment details.
                          </p>
                          <div style={{ marginTop: 14 }}>
                            <button
                              type="button"
                              className="btn btn-brand btn-sm"
                              onClick={() => {
                                setNowMs(Date.now());
                                setA((prev) => ({
                                  ...prev,
                                  pay: {
                                    method: 'transfer',
                                    state: 'waiting',
                                    deadline: Date.now() + PAY_WINDOW_MIN * 60000,
                                    ref:
                                      'TFN-' + String(Math.floor(10000 + Math.random() * 90000)),
                                  },
                                }));
                              }}
                            >
                              Start a new payment window
                            </button>
                          </div>
                        </div>
                      ) : A.pay.state === 'verifying' ? (
                        <div className="paybox center">
                          <span className="spin" />
                          <b>Confirming your payment…</b>
                          <span className="muted small">This usually takes a moment.</span>
                        </div>
                      ) : (
                        (() => {
                          const left = Math.max(0, A.pay.deadline - nowMs);
                          const m = Math.floor(left / 60000);
                          const s = Math.floor((left % 60000) / 1000);
                          const renderRow = (k: string, v: string, copyVal?: string) => (
                            <div key={k} className="acct-row">
                              <span className="muted">{k}</span>
                              <b>{v}</b>
                              {copyVal ? (
                                <button
                                  type="button"
                                  className="iconbtn sm"
                                  aria-label={`Copy ${k}`}
                                  onClick={() => {
                                    (navigator.clipboard
                                      ? navigator.clipboard.writeText(copyVal)
                                      : Promise.reject()
                                    ).then(
                                      () => showToast('Copied'),
                                      () => showToast('Copy not available. Please type it in.'),
                                    );
                                  }}
                                >
                                  <Icon name="copy" />
                                </button>
                              ) : (
                                <span />
                              )}
                            </div>
                          );

                          return (
                            <div className="paybox">
                              <div className="timer">
                                <span>
                                  <Icon name="timer" />
                                  Complete your transfer within
                                </span>
                                <b
                                  id="ptimer"
                                  className={left < 120000 ? 'low' : ''}
                                >
                                  {pad2(m)}:{pad2(s)}
                                </b>
                              </div>
                              <div className="ap-bar">
                                <i
                                  id="pbar"
                                  style={{
                                    width: `${(left / (PAY_WINDOW_MIN * 60000)) * 100}%`,
                                  }}
                                />
                              </div>
                              <div className="acct">
                                {renderRow('Bank', BANK.bank)}
                                {renderRow('Account name', BANK.name)}
                                {renderRow('Account number', BANK.no, BANK.no)}
                                {renderRow('Amount', ngn(payDue(A)), String(payDue(A)))}
                                {renderRow('Narration', A.pay.ref, A.pay.ref)}
                              </div>
                              <p className="small muted">
                                Use the narration above so we can match your payment quickly. Your
                                seat is held while the timer runs.
                              </p>
                              <button
                                type="button"
                                className="btn btn-brand"
                                onClick={() => {
                                  setA((prev) => ({
                                    ...prev,
                                    pay: { ...prev.pay, state: 'verifying' },
                                  }));
                                  setTimeout(() => {
                                    finishPayment('Bank transfer');
                                  }, 2000);
                                }}
                              >
                                I’ve made the transfer <Icon name="arrow-right" className="arr" />
                              </button>
                            </div>
                          );
                        })()
                      ))}
                  </div>
                  <div className="review-only">
                    <OdTag id="OD-04" />
                  </div>
                </>
              )}

              <div className="wnav">
                {A.step > 1 ? (
                  <button type="button" className="btn btn-line" onClick={handleBack}>
                    <Icon name="arrow-left" />
                    Back
                  </button>
                ) : (
                  <span />
                )}
                {A.step < 5 ? (
                  <button type="button" className="btn btn-brand" onClick={handleNext}>
                    {nextLabel} <Icon name="arrow-right" className="arr" />
                  </button>
                ) : (
                  <span />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
