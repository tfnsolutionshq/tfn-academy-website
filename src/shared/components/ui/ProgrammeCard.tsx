import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import type { Programme } from '@/shared/types/academy';

export function ProgrammeCard({ programme }: { programme: Programme }) {
  const stage = programme.levels.length > 1 ? 'Beginner to Advanced' : programme.levels[0]?.kind;
  return (
    <Link
      to={`/programmes/${programme.slug}`}
      className="group flex flex-col rounded-3xl border-[1.5px] border-line bg-paper p-1 transition-all hover:-translate-y-1 hover:border-brand hover:shadow-xl dark:border-white/10 dark:bg-navy-light/50"
    >
      <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-[20px] bg-brand/10 bg-[radial-gradient(circle,rgba(31,79,224,0.18)_1px,transparent_1px)] bg-[length:14px_14px] dark:bg-white/5">
        {stage && (
          <span className="absolute right-3 top-3 rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{stage}</span>
        )}
        <span className="grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-white shadow-lg">
          <Icon name={programme.ic} size={26} />
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg">{programme.short}</h3>
        <p className="mt-1.5 text-sm text-ink-2 dark:text-white/70">{programme.line}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {programme.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-ink-2 dark:bg-white/10 dark:text-white/75">
              {t}
            </span>
          ))}
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-brand">
          View programme
          <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
