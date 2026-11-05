import { Icon } from '@/shared/components/ui/Icon';
import { Section, SectionHead } from '@/shared/components/ui/Section';
import { STUDENT_STORIES } from '@/shared/constants/academyData';

export function StoriesMarquee() {
  return (
    <Section>
      <SectionHead eyebrow="Student stories" title="What graduates say after TFN Academy" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STUDENT_STORIES.slice(0, 6).map((s) => (
          <figure key={s.n} className="rounded-2xl border border-line p-6 dark:border-white/10">
            <Icon name="quote" className="mb-3 text-brand" size={22} />
            <blockquote className="text-ink-2 dark:text-white/80">&ldquo;{s.q}&rdquo;</blockquote>
            <figcaption className="mt-4 font-bold">
              {s.n}
              <span className="block text-sm font-normal text-muted">{s.r}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
