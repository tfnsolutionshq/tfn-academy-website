import { Accordion, AccordionItem } from '@/shared/components/ui/Accordion';
import { Section, SectionHead } from '@/shared/components/ui/Section';

const FAQS: [string, string][] = [
  ['Do I need any tech experience?', 'No. Beginner stages start from basic computer skills.'],
  ['How do I apply, and what happens next?', 'Complete your details, pay the standard course fee or apply for a scholarship, then join your cohort community.'],
  ['Are classes in person or online?', 'In person and hybrid. Online and virtual learning is coming soon.'],
  ['What do I need to take part?', 'A laptop that meets the minimum specification, stable internet and a power backup.'],
  ['Will I get a certification?', 'Programmes prepare you for recognised certifications. TFN certificates can be verified online.'],
  ['Is there a minimum age?', 'No. Children and teenagers can join holiday programmes.'],
];

export function FaqTeaser() {
  return (
    <Section>
      <SectionHead eyebrow="FAQ" title="Questions people ask before applying" />
      <Accordion>
        {FAQS.map(([q, a]) => (
          <AccordionItem key={q} title={q}>
            {a}
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
