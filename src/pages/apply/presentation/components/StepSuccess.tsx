import { Icon } from '@/shared/components/ui/Icon';
import { LinkButton } from '@/shared/components/ui/LinkButton';
import { PROGRAMMES, WHATSAPP_COHORT_LINK } from '@/shared/constants/academyData';
import type { ApplyFormState } from '../ApplyForm.types';

export function StepSuccess({ form }: { form: ApplyFormState }) {
  const programme = PROGRAMMES.find((p) => p.slug === form.programmeSlug);
  const paid = form.path === 'paid';

  return (
    <div className="mx-auto max-w-lg py-6 text-center">
      <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-ok-soft text-ok">
        <Icon name="circle-check" size={30} />
      </span>
      <h2 className="text-2xl">{paid ? 'Payment confirmed!' : 'Application received'}</h2>
      <p className="mt-2 text-ink-2 dark:text-white/75">
        {paid
          ? `You're enrolled in ${programme?.name}. Your cohort details will follow by email and WhatsApp.`
          : `We've received your scholarship application for ${programme?.name}. You'll hear from us within 5 working days.`}
      </p>
      {form.reference && <p className="mt-3 text-sm text-muted">Reference: {form.reference}</p>}
      {paid && (
        <a
          href={WHATSAPP_COHORT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 font-bold text-brand"
        >
          <Icon name="message-circle" size={18} /> Join your cohort WhatsApp community
        </a>
      )}
      <div className="mt-8 flex justify-center gap-3">
        <LinkButton to="/">Back to home</LinkButton>
        <LinkButton to="/programmes" variant="line">
          Explore more programmes
        </LinkButton>
      </div>
    </div>
  );
}
