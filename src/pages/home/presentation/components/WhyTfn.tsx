import { Icon } from '@/shared/components/ui/Icon';
import { Section, SectionHead } from '@/shared/components/ui/Section';

const POINTS = [
  { ic: 'hammer', t: 'Project-based from day one', d: 'You build real, portfolio-ready work in every module, not just watch videos.' },
  { ic: 'badge-check', t: 'Certification-ready', d: 'Programmes map to recognised certifications so your skills are provable.' },
  { ic: 'users', t: 'Small, supported cohorts', d: 'Facilitators track your progress and step in before you fall behind.' },
  { ic: 'map-pin', t: 'In person and hybrid', d: 'Learn at TFN Hub in Awka, or mix in-person sessions with online work.' },
  { ic: 'briefcase', t: 'Built for hiring', d: 'Graduates join our talent directory, where employers come looking.' },
  { ic: 'handshake', t: 'Community that lasts', d: 'Your cohort, facilitators and alumni network stay with you after graduation.' },
];

export function WhyTfn() {
  return (
    <Section className="bg-mist dark:bg-navy-light/30">
      <SectionHead eyebrow="Why TFN" title="Training built to get you hired, not just taught" center />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {POINTS.map((p) => (
          <div key={p.t} className="rounded-2xl bg-paper p-6 dark:bg-navy-light/50">
            <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white">
              <Icon name={p.ic} size={21} />
            </span>
            <h3 className="text-lg">{p.t}</h3>
            <p className="mt-1.5 text-sm text-ink-2 dark:text-white/70">{p.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
