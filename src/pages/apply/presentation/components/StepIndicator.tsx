import { Icon } from '@/shared/components/ui/Icon';

interface StepIndicatorProps {
  steps: string[];
  current: number;
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {steps.map((label, i) => (
        <div
          key={label}
          className={`flex items-center gap-2.5 rounded-2xl border-[1.5px] px-3.5 py-3 text-sm ${
            i === current ? 'border-brand' : 'border-line dark:border-white/10'
          }`}
        >
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
              i < current ? 'bg-ok text-white' : i === current ? 'bg-brand text-white' : 'bg-mist text-ink-2 dark:bg-white/10 dark:text-white/70'
            }`}
          >
            {i < current ? <Icon name="check" size={14} /> : i + 1}
          </span>
          <span className="font-bold">{label}</span>
        </div>
      ))}
    </div>
  );
}
