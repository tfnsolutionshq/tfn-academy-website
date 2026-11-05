import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon';

export interface DropdownOption {
  value: string;
  label: string;
  hint?: string;
}

interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  id?: string;
}

export function Dropdown({ value, options, onChange, placeholder = 'Choose one', label, error, id }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const btnId = id ?? autoId;
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="grid gap-1.5">
      {label && (
        <label htmlFor={btnId} className="text-[0.88rem] font-bold">
          {label}
        </label>
      )}
      <div ref={ref} className="relative">
        <button
          type="button"
          id={btnId}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`flex h-11 w-full items-center justify-between gap-2.5 rounded-xl border-[1.5px] bg-paper px-3.5 text-left text-[0.95rem] text-ink transition-colors dark:bg-navy dark:text-white ${
            open ? 'border-brand shadow-[0_0_0_4px_rgba(31,79,224,0.18)]' : 'border-line-2 hover:border-ink-2'
          }`}
        >
          <span className={`truncate ${selected ? '' : 'text-muted'}`}>{selected ? selected.label : placeholder}</span>
          <Icon name="chevron-down" size={18} className={`shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-70 overflow-y-auto rounded-2xl border-[1.5px] border-line-2 bg-paper p-1.5 shadow-xl dark:bg-navy-light"
          >
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2.5 rounded-lg px-3 py-2.5 text-left text-[0.92rem] hover:bg-brand/10 ${
                  o.value === value ? 'font-bold text-brand' : 'text-ink dark:text-white'
                }`}
              >
                <span>{o.label}</span>
                {o.hint && <span className="shrink-0 text-xs text-muted">{o.hint}</span>}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <span className="text-[0.82rem] font-semibold text-bad">{error}</span>}
    </div>
  );
}
