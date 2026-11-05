import { Input, Textarea } from '@/shared/components/ui/Input';
import { Dropdown } from '@/shared/components/ui/Dropdown';
import type { ApplyFormState } from '../ApplyForm.types';

const GENDERS = ['Female', 'Male', 'Prefer not to say'];
const EDUCATION = ['Secondary school', 'Some university', 'University graduate', 'Postgraduate'];
const STATUSES = ['In school or university', 'Employed', 'Graduate, looking for work', 'Running a business'];
const STATES = ['Anambra', 'Lagos', 'Enugu', 'Imo', 'Abuja (FCT)', 'Rivers', 'Oyo', 'Other'];

interface Props {
  form: ApplyFormState;
  update: (patch: Partial<ApplyFormState>) => void;
  errors: Record<string, string>;
}

export function StepDetails({ form, update, errors }: Props) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name" value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} error={errors.fullName} />
        <Dropdown label="Gender" value={form.gender} onChange={(v) => update({ gender: v })} options={GENDERS.map((g) => ({ value: g, label: g }))} error={errors.gender} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Email address" type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} error={errors.email} />
        <Input label="Phone number" value={form.phone} onChange={(e) => update({ phone: e.target.value })} error={errors.phone} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Dropdown label="State of residence" value={form.state} onChange={(v) => update({ state: v })} options={STATES.map((s) => ({ value: s, label: s }))} error={errors.state} />
        <Dropdown label="Education level" value={form.education} onChange={(v) => update({ education: v })} options={EDUCATION.map((s) => ({ value: s, label: s }))} error={errors.education} />
      </div>
      <Dropdown label="Current status" value={form.status} onChange={(v) => update({ status: v })} options={STATUSES.map((s) => ({ value: s, label: s }))} error={errors.status} />
      {form.path === 'scholarship' && (
        <Textarea
          label="Why should we award you this scholarship?"
          value={form.motivation}
          onChange={(e) => update({ motivation: e.target.value })}
          error={errors.motivation}
          rows={5}
          placeholder="Tell us about your goals, your circumstances and why this matters to you."
        />
      )}
    </div>
  );
}
