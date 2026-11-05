import { Icon } from '@/shared/components/ui/Icon';
import { appConfig } from '@/app/config/appConfig';
import type { ApplyFormState } from '../ApplyForm.types';

interface Props {
  form: ApplyFormState;
  update: (patch: Partial<ApplyFormState>) => void;
}

export function StepEnvironment({ form, update }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => update({ mode: 'in-person' })}
        className={`rounded-2xl border-[1.5px] p-5 text-left transition-colors ${
          form.mode === 'in-person' ? 'border-brand bg-brand/5' : 'border-line dark:border-white/10'
        }`}
      >
        <Icon name="map-pin" size={22} className="mb-2 text-brand" />
        <div className="font-bold">In person</div>
        <p className="mt-1 text-sm text-muted">{appConfig.location} &middot; TFN Hub</p>
      </button>
      <button type="button" disabled className="cursor-not-allowed rounded-2xl border-[1.5px] border-line p-5 text-left opacity-50 dark:border-white/10">
        <Icon name="video" size={22} className="mb-2 text-muted" />
        <div className="font-bold">Remote</div>
        <p className="mt-1 text-sm text-muted">Coming soon</p>
      </button>
    </div>
  );
}
