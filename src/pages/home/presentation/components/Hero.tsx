import { motion } from 'framer-motion';
import { Icon } from '@/shared/components/ui/Icon';
import { LinkButton } from '@/shared/components/ui/LinkButton';

export function Hero() {
  return (
    <div className="relative overflow-hidden gradient-navy text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full gradient-accent opacity-80 blur-sm" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:px-8 md:py-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white/85">
            <Icon name="map-pin" size={15} /> Awka, Anambra State
          </span>
          <h1 className="text-balance text-4xl leading-[1.1] md:text-5xl">
            Learn the skills employers and clients actually pay for.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/75">
            Project-based tech, creative and business programmes in Awka. Build real portfolio work, earn certifications and graduate ready to work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton to="/apply" variant="accent" size="md" iconRight={<Icon name="arrow-right" size={18} />}>
              Apply now
            </LinkButton>
            <LinkButton to="/programmes" variant="line" size="md" className="border-white/30 text-white hover:border-white">
              Explore programmes
            </LinkButton>
          </div>
          <div className="mt-9 flex flex-wrap gap-8">
            {[
              ['19', 'Programmes'],
              ['In-person & hybrid', 'Learning format'],
              ['TFN Hub', 'Co-working space'],
            ].map(([a, b]) => (
              <div key={b}>
                <div className="font-display text-2xl font-bold">{a}</div>
                <div className="text-sm text-white/60">{b}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative hidden md:block"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
              <Icon name="graduation-cap" size={28} className="mb-3 text-accent" />
              <div className="font-bold">Project-based learning</div>
              <p className="mt-1 text-sm text-white/70">Every module ends with something you can show.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
              <Icon name="badge-check" size={26} className="mb-3 text-accent" />
              <div className="font-bold">Verifiable certificates</div>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
              <Icon name="briefcase" size={26} className="mb-3 text-accent" />
              <div className="font-bold">Hire our talents</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
