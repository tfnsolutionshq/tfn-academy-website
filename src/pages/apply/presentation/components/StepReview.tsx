import { Icon } from '@/shared/components/ui/Icon';
import { PROGRAMMES, SCHOLARSHIPS, COURSE_FEE } from '@/shared/constants/academyData';
import { formatNaira } from '@/shared/utils/format';
import type { ApplyFormState } from '../ApplyForm.types';

export function StepReview({ form }: { form: ApplyFormState }) {
  const programme = PROGRAMMES.find((p) => p.slug === form.programmeSlug);
  const scholarship = SCHOLARSHIPS.find((s) => s.id === form.scholarshipId);

  const rows: [string, string][] = [
    ['Path', form.path === 'paid' ? 'Enrol and pay' : 'Scholarship application'],
    ['Programme', programme?.name ?? '-'],
    ...(scholarship ? ([['Scholarship', `${scholarship.n} (${scholarship.pct}%)`]] as [string, string][]) : []),
    ['Name', form.fullName],
    ['Email', form.email],
    ['Phone', form.phone],
    ['State', form.state],
    ['Learning mode', form.mode === 'in-person' ? 'In person' : 'Remote'],
  ];

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-line dark:border-white/10">
        {rows.map(([k, v], i) => (
          <div key={k} className={`flex justify-between gap-4 px-5 py-3.5 text-sm ${i !== rows.length - 1 ? 'border-b border-line dark:border-white/10' : ''}`}>
            <span className="text-muted">{k}</span>
            <span className="text-right font-semibold">{v}</span>
          </div>
        ))}
      </div>
      {form.path === 'paid' ? (
        <div className="flex items-start gap-3 rounded-2xl bg-brand/5 p-4">
          <Icon name="info" className="mt-0.5 shrink-0 text-brand" size={18} />
          <p className="text-sm text-ink-2 dark:text-white/75">
            The standard course fee is <b>{formatNaira(COURSE_FEE)}</b>. You'll pay on the next step.
          </p>
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-2xl bg-ok-soft p-4">
          <Icon name="info" className="mt-0.5 shrink-0 text-ok" size={18} />
          <p className="text-sm text-ink-2 dark:text-ink">
            No payment is needed before a decision. We'll review your application and contact you about next steps, including any assessment.
          </p>
        </div>
      )}
    </div>
  );
}
