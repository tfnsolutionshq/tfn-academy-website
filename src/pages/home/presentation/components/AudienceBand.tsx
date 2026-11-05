import { Icon } from '@/shared/components/ui/Icon';
import { Link } from 'react-router-dom';
import { Section } from '@/shared/components/ui/Section';

const AUDIENCES = [
  { to: '/programmes', ic: 'graduation-cap', t: 'Career starters', d: 'New to tech and ready to learn from the ground up.' },
  { to: '/programmes', ic: 'trending-up', t: 'Career switchers', d: 'Bringing experience, now adding in-demand skills.' },
  { to: '/kids', ic: 'smile', t: 'Kids & teens', d: 'Holiday programmes that make technology fun.' },
  { to: '/corporate-training', ic: 'building-2', t: 'Organisations', d: 'Upskilling teams with custom corporate training.' },
  { to: '/hire-talents', ic: 'briefcase', t: 'Employers', d: 'Hiring from our directory of trained graduates.' },
];

export function AudienceBand() {
  return (
    <Section className="py-10 md:py-12">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {AUDIENCES.map((a) => (
          <Link
            key={a.t}
            to={a.to}
            className="flex items-center gap-3 rounded-2xl border border-line px-5 py-4 transition-colors hover:border-brand dark:border-white/10"
          >
            <Icon name={a.ic} className="text-brand" />
            <div>
              <div className="font-bold">{a.t}</div>
              <div className="text-xs text-muted">{a.d}</div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
