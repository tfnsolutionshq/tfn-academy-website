import type { ReactNode } from 'react';

export function Section({ className = '', children, id }: { className?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  description,
  center,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <span className="mb-3 inline-block font-bold uppercase tracking-wide text-brand">{eyebrow}</span>}
      <h2 className="text-balance text-3xl md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-ink-2 dark:text-white/75">{description}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="gradient-navy text-white">
      <div className="mx-auto max-w-5xl px-5 py-16 text-center md:px-8 md:py-24">
        {eyebrow && (
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white/85">{eyebrow}</span>
        )}
        <h1 className="text-balance text-4xl md:text-5xl">{title}</h1>
        {description && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">{description}</p>}
        {children}
      </div>
    </div>
  );
}
