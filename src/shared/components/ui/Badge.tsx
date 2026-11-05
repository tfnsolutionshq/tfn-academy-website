import type { ReactNode } from 'react';

type Tone = 'ok' | 'warn' | 'bad' | 'info' | 'mute' | 'light';

const toneClasses: Record<Tone, string> = {
  ok: 'bg-ok-soft text-ok',
  warn: 'bg-warn-soft text-warn',
  bad: 'bg-bad-soft text-bad',
  info: 'bg-brand/10 text-brand',
  mute: 'bg-mist text-ink-2 dark:bg-white/10 dark:text-white/80',
  light: 'bg-white/15 text-white',
};

export function Badge({ tone = 'mute', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
