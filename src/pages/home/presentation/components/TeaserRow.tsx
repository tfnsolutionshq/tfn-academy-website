import { Icon } from '@/shared/components/ui/Icon';
import { Link } from 'react-router-dom';
import { Section } from '@/shared/components/ui/Section';

const TEASERS = [
  { to: '/hire-talents', ic: 'briefcase', t: 'Hire our talents', d: 'Browse graduates ready for full-time, contract or project work.' },
  { to: '/verify', ic: 'badge-check', t: 'Verify a certificate', d: 'Confirm a TFN certificate number in seconds.' },
  { to: '/blog', ic: 'newspaper', t: 'Read our blog', d: 'Career guides, industry insights and study tips.' },
];

export function TeaserRow() {
  return (
    <Section className="grid gap-5 md:grid-cols-3 md:py-10">
      {TEASERS.map((t) => (
        <Link
          key={t.t}
          to={t.to}
          className="group flex flex-col justify-between rounded-2xl border border-line p-6 transition-colors hover:border-brand dark:border-white/10"
        >
          <div>
            <Icon name={t.ic} size={24} className="mb-3 text-brand" />
            <h3 className="text-lg">{t.t}</h3>
            <p className="mt-1.5 text-sm text-ink-2 dark:text-white/70">{t.d}</p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-brand">
            Learn more <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </Section>
  );
}
