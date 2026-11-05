import { Icon } from '@/shared/components/ui/Icon';
import { Dropdown } from '@/shared/components/ui/Dropdown';
import { PROGRAMMES, SAMPLE_SEATS_LEFT, SCHOLARSHIPS } from '@/shared/constants/academyData';
import type { ApplyFormState } from '../ApplyForm.types';

interface Props {
  form: ApplyFormState;
  update: (patch: Partial<ApplyFormState>) => void;
  errors: Record<string, string>;
}

export function StepCourse({ form, update, errors }: Props) {
  const programme = PROGRAMMES.find((p) => p.slug === form.programmeSlug);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => update({ path: 'paid' })}
          className={`rounded-2xl border-[1.5px] p-5 text-left transition-colors ${
            form.path === 'paid' ? 'border-brand bg-brand/5' : 'border-line dark:border-white/10'
          }`}
        >
          <Icon name="credit-card" size={22} className="mb-2 text-brand" />
          <div className="font-bold">Enrol and pay</div>
          <p className="mt-1 text-sm text-muted">Pay the standard course fee and get matched to a cohort right away.</p>
        </button>
        <button
          type="button"
          onClick={() => update({ path: 'scholarship' })}
          className={`rounded-2xl border-[1.5px] p-5 text-left transition-colors ${
            form.path === 'scholarship' ? 'border-brand bg-brand/5' : 'border-line dark:border-white/10'
          }`}
        >
          <Icon name="award" size={22} className="mb-2 text-brand" />
          <div className="font-bold">Apply for a scholarship</div>
          <p className="mt-1 text-sm text-muted">Tell us your story. Decisions are made within 5 working days.</p>
        </button>
      </div>

      <Dropdown
        label="Programme"
        value={form.programmeSlug}
        onChange={(v) => update({ programmeSlug: v })}
        options={PROGRAMMES.map((p) => ({
          value: p.slug,
          label: p.short,
          hint: SAMPLE_SEATS_LEFT[p.slug] !== undefined ? `${SAMPLE_SEATS_LEFT[p.slug]} seats left` : undefined,
        }))}
        placeholder="Choose a programme"
        error={errors.programmeSlug}
      />

      {form.path === 'scholarship' && (
        <Dropdown
          label="Scholarship"
          value={form.scholarshipId}
          onChange={(v) => update({ scholarshipId: v })}
          options={SCHOLARSHIPS.map((s) => ({ value: s.id, label: `${s.n} (${s.pct}%)` }))}
          placeholder="Choose a scholarship"
          error={errors.scholarshipId}
        />
      )}

      {programme && (
        <div className="rounded-2xl bg-mist p-5 dark:bg-white/5">
          <div className="font-bold">{programme.name}</div>
          <p className="mt-1 text-sm text-ink-2 dark:text-white/70">{programme.line}</p>
        </div>
      )}
    </div>
  );
}
