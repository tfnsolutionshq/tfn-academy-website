import { Icon } from '@/shared/components/ui/Icon';
import { LinkButton } from '@/shared/components/ui/LinkButton';

export function CtaBand() {
  return (
    <div className="gradient-brand">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 py-14 text-center text-white md:px-8">
        <h2 className="text-balance text-3xl text-white md:text-4xl">Ready to start building the skills you need?</h2>
        <p className="max-w-xl text-white/85">
          Applications are open for every programme. Scholarships are available if cost is a barrier.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <LinkButton to="/apply" variant="accent" iconRight={<Icon name="arrow-right" size={18} />}>
            Apply now
          </LinkButton>
          <LinkButton to="/scholarship" variant="line" className="border-white/40 text-white hover:border-white">
            Explore scholarships
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
