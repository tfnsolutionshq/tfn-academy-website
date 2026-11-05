import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from './Icon';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}

export function Modal({ open, onClose, title, children, wide }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-90 bg-[rgba(5,9,25,0.5)]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`fixed left-1/2 top-1/2 z-91 flex max-h-[calc(100vh-40px)] w-[calc(100%-28px)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-paper shadow-2xl dark:bg-navy-light ${
              wide ? 'max-w-3xl' : 'max-w-xl'
            }`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4.5 dark:border-white/10">
              <h2 className="text-[1.15rem]">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-line-2 hover:border-ink dark:border-white/20"
              >
                <Icon name="x" />
              </button>
            </div>
            <div className="overflow-y-auto p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
