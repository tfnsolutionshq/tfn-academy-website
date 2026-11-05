import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATS, INTERESTS, INT_MAP, TECH, TECHQ, TRACKS } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { CtaBand, ProgrammeCard } from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';

export default function ProgramsPage() {
  const { finderScrollKey } = useSite();
  const [a1, setA1] = useState<string | null>(null);
  const [a2, setA2] = useState<string | null>(null);
  const [pcat, setPcat] = useState('all');
  const [q, setQ] = useState('');

  useEffect(() => {
    if (finderScrollKey > 0) {
      const timer = setTimeout(() => {
        const f = document.getElementById('finder');
        if (f) f.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [finderScrollKey]);

  const recommend = () => {
    if (!a1 || !a2) return [];
    const pref = +a2;
    const map = INT_MAP[a1] || [];
    return TRACKS.map((t) => {
      const i = map.indexOf(t.slug);
      return {
        t,
        sc: (i > -1 ? 3 + (4 - i) * 0.1 : 0) + (2 - Math.abs((TECH[t.slug] ?? 0) - pref)),
      };
    })
      .sort((a, b) => b.sc - a.sc)
      .slice(0, 3)
      .map((x) => x.t);
  };

  const trimmedQ = q.trim().toLowerCase();
  const filtered = TRACKS.filter(
    (t) =>
      (pcat === 'all' || t.cat === pcat) &&
      (!trimmedQ ||
        JSON.stringify([
          t.name,
          t.line,
          t.tags,
          t.tools,
          t.certs,
          t.levels.map((l) => l.mods.map((m) => m.n + ' ' + m.t)),
        ])
          .toLowerCase()
          .includes(trimmedQ)),
  );

  const recommendedTracks = recommend();

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <div className="crumbs">
            <Link to="/">Home</Link>
            <Icon name="chevron-down" />
            <span>Programmes</span>
          </div>
          <h1>{TRACKS.length} programmes. Pick your path.</h1>
          <p className="lede">
            Every programme is a complete course on its own, with hands-on projects, soft skills
            and certification prep built in.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="finder" id="finder">
            <div className="fq">
              <h3>Not sure where to start?</h3>
              <span className="small muted">1. What interests you most?</span>
              <div className="chips">
                {INTERESTS.map(([v, l]) => (
                  <button
                    key={v}
                    type="button"
                    className={`chip ${a1 === v ? 'on' : ''}`.trim()}
                    onClick={() => setA1(v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <span className="small muted" style={{ marginTop: 6 }}>
                2. How technical do you want your work to be?
              </span>
              <div className="chips">
                {TECHQ.map(([v, l]) => (
                  <button
                    key={v}
                    type="button"
                    className={`chip ${a2 === v ? 'on' : ''}`.trim()}
                    onClick={() => setA2(v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {!a1 || !a2 ? (
              <div className="match">
                <p className="muted">
                  {!a1
                    ? 'Choose what interests you and how technical you want to be, and we’ll suggest where to start.'
                    : 'One more question to go.'}
                </p>
              </div>
            ) : (
              <div className="match">
                {recommendedTracks.map((t, i) => (
                  <Link key={t.slug} className="m" to={`/programmes/${t.slug}`}>
                    <Icon name={t.ic} className="t" />
                    <span>
                      {i === 0 ? <span className="top">Best match</span> : null}
                      <b>{t.short}</b>
                      <span className="s">{t.line}</span>
                    </span>
                  </Link>
                ))}
                <div>
                  <button
                    type="button"
                    className="btn btn-line btn-sm"
                    onClick={() => {
                      setA1(null);
                      setA2(null);
                    }}
                  >
                    Start over
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="toolbar">
            <div className="tabs-scroll" id="pcats" style={{ margin: 0, paddingBottom: 2 }}>
              {([['all', 'All'], ...CATS.map((c) => [c.id, c.name])] as const).map(([id, n]) => (
                <button
                  key={id}
                  type="button"
                  className={`chip ${pcat === id ? 'on' : ''}`.trim()}
                  onClick={() => setPcat(id)}
                >
                  {n}
                </button>
              ))}
            </div>
            <label className="search">
              <Icon name="search" />
              <input
                id="q"
                type="search"
                placeholder="Search by name or tool, e.g. Python"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search programmes"
              />
            </label>
          </div>

          <div id="plist">
            {!filtered.length ? (
              <div className="empty">
                <h3>No programme matches “{q}”</h3>
                <p>Try a tool name like React, AWS or Excel, or clear the search.</p>
                <p style={{ marginTop: 18 }}>
                  <button type="button" className="btn btn-line btn-sm" onClick={() => setQ('')}>
                    Clear search
                  </button>
                </p>
              </div>
            ) : (
              <>
                <p className="muted small" style={{ marginBottom: 16 }}>
                  Showing {filtered.length} of {TRACKS.length} programmes
                </p>
                <div className="pgrid">
                  {filtered.map((t) => (
                    <ProgrammeCard key={t.slug} track={t} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="sec-sm">
        <div className="wrap">
          <CtaBand />
        </div>
      </section>
    </>
  );
}
