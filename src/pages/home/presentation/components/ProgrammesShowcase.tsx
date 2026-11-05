import { useState } from 'react';
import { Section, SectionHead } from '@/shared/components/ui/Section';
import { Chips } from '@/shared/components/ui/Tabs';
import { ProgrammeCard } from '@/shared/components/ui/ProgrammeCard';
import { PROGRAMMES, PROGRAMME_CATEGORIES } from '@/shared/constants/academyData';

export function ProgrammesShowcase() {
  const categories = PROGRAMME_CATEGORIES.filter((c) => c.id !== 'kids');
  const [active, setActive] = useState(categories[0].id);
  const programmes = PROGRAMMES.filter((p) => p.cat === active).slice(0, 6);

  return (
    <Section>
      <SectionHead
        eyebrow="Programmes"
        title="Every path into a tech, creative or business career"
        description="19 programmes across five categories. Pick where you want to end up, not just what sounds interesting."
      />
      <Chips
        items={categories.map((c) => ({ key: c.id, label: c.name }))}
        active={active}
        onChange={(key) => setActive(key as typeof active)}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((p) => (
          <ProgrammeCard key={p.slug} programme={p} />
        ))}
      </div>
    </Section>
  );
}
