import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from './Icon';

interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line dark:border-white/10">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4.5 text-left font-bold"
      >
        <span>{title}</span>
        <Icon name="chevron-down" className={`shrink-0 transition-transform ${open ? 'rotate-180 text-brand' : 'text-muted'}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4.5 text-ink-2 dark:text-white/80">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-line bg-paper dark:border-white/10 dark:bg-navy-light/40 [&>*]:px-5">{children}</div>;
}
