import { Icon } from '@/shared/components/ui/Icon';
import { Section, SectionHead } from '@/shared/components/ui/Section';
import { LinkButton } from '@/shared/components/ui/LinkButton';

const STEPS = [
  { ic: 'graduation-cap', t: 'Choose a programme', d: 'Browse 19 programmes or use the finder to match your goals.' },
  { ic: 'clipboard-check', t: 'Apply and pay, or apply for a scholarship', d: 'Pay the standard course fee, or apply for one of seven scholarships.' },
  { ic: 'users', t: 'Join your cohort', d: 'Get matched to a cohort and meet your facilitator and classmates.' },
  { ic: 'rocket', t: 'Start building', d: 'Learn, build real projects, and graduate with a verifiable certificate.' },
];

export function HowToStart() {
  return (
    <Section className="bg-mist dark:bg-navy-light/30">
      <SectionHead eyebrow="Getting started" title="From application to your first class" center />
      <div className="grid gap-6 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <div key={s.t} className="relative rounded-2xl bg-paper p-6 dark:bg-navy-light/50">
            <span className="absolute -top-3 left-6 grid h-7 w-7 place-items-center rounded-full gradient-accent text-sm font-bold text-navy">
              {i + 1}
            </span>
            <Icon name={s.ic} size={24} className="mb-3 text-brand" />
            <h3 className="text-base">{s.t}</h3>
            <p className="mt-1.5 text-sm text-ink-2 dark:text-white/70">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <LinkButton to="/admissions" variant="line">
          How admission works
        </LinkButton>
      </div>
    </Section>
  );
}
