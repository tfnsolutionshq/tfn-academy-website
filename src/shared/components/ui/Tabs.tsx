interface TabItem {
  key: string;
  label: string;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  active: string;
  onChange: (key: string) => void;
}

export function Tabs({ items, active, onChange }: TabsProps) {
  return (
    <div role="tablist" className="mb-6 flex gap-1 overflow-x-auto border-b border-line-2 dark:border-white/15">
      {items.map((item) => (
        <button
          key={item.key}
          role="tab"
          aria-selected={active === item.key}
          onClick={() => onChange(item.key)}
          className={`-mb-px flex shrink-0 items-center gap-2 border-b-[3px] px-3.5 py-3 font-bold text-muted transition-colors ${
            active === item.key ? 'border-accent text-ink dark:text-white' : 'border-transparent hover:text-ink dark:hover:text-white'
          }`}
        >
          {item.label}
          {item.count !== undefined && <span className="rounded-full bg-mist px-2 py-0.5 text-xs text-ink-2 dark:bg-white/10 dark:text-white/80">{item.count}</span>}
        </button>
      ))}
    </div>
  );
}

interface ChipsProps {
  items: { key: string; label: string; count?: number }[];
  active: string;
  onChange: (key: string) => void;
}

export function Chips({ items, active, onChange }: ChipsProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={`inline-flex h-8.5 items-center gap-1.5 rounded-full border-[1.5px] px-3.5 text-[0.88rem] font-semibold transition-colors ${
            active === item.key
              ? 'border-ink bg-ink text-paper dark:border-white dark:bg-white dark:text-ink'
              : 'border-line-2 text-ink-2 hover:border-ink dark:border-white/20 dark:text-white/80'
          }`}
        >
          {item.label}
          {item.count !== undefined && <span className="opacity-70">{item.count}</span>}
        </button>
      ))}
    </div>
  );
}
