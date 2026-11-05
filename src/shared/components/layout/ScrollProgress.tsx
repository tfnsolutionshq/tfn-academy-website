import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (scrolled / max) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent">
      <div className="h-full gradient-accent transition-[width]" style={{ width: `${pct}%` }} />
    </div>
  );
}
