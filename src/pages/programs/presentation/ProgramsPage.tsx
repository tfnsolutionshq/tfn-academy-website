import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATS, INTERESTS, INT_MAP, TECH, TECHQ, TRACKS } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { CtaBand, ProgrammeCard } from '@/shared/components/ui/Illustrations';
import { ProgrammeCardSkeleton, Spinner } from '@/shared/components/ui/Loading';
import { useSite } from '@/shared/context/SiteContext';
import {
  mapApiSummaryToTrack,
  useProgrammeCategoriesQuery,
  useProgrammesQuery,
  useRecommendProgrammesMutation,
} from '@/hooks/queries';
import type { Track } from '@/shared/types/academy';

/** Map UI finder interest keys to backend recommendation interest slugs */
const INTEREST_TO_API_SLUG: Record<string, string> = {
  build: 'software',
  systems: 'infra',
  data: 'data',
  create: 'creative',
  grow: 'creative',
  lead: 'business',
  sell: 'business',
  support: 'business',
};

export default function ProgramsPage() {
  const { finderScrollKey } = useSite();
  const [a1, setA1] = useState<string | null>(null);
  const [a2, setA2] = useState<string | null>(null);
  const [pcat, setPcat] = useState('all');
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');

  // Debounce search input to avoid firing an API call on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(q.trim()), 250);
    return () => clearTimeout(timer);
  }, [q]);

  const { data: apiCategories } = useProgrammeCategoriesQuery();
  const {
    data: apiProgrammesPage,
    isLoading: isProgrammesLoading,
    isFetching: isProgrammesFetching,
    isError: isProgrammesError,
  } = useProgrammesQuery({
    category: pcat !== 'all' ? pcat : undefined,
    q: debouncedQ || undefined,
    per_page: 50,
  });

  const {
    mutate: fetchRecommendations,
    reset: resetRecommendations,
    data: apiRecommendations,
    isPending: isRecommending,
    isError: isRecommendError,
  } = useRecommendProgrammesMutation();

  useEffect(() => {
    if (finderScrollKey > 0) {
      const timer = setTimeout(() => {
        const f = document.getElementById('finder');
        if (f) f.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [finderScrollKey]);

  const triggerRecommend = (nextA1: string | null, nextA2: string | null) => {
    if (nextA1 && nextA2) {
      const interestSlug = INTEREST_TO_API_SLUG[nextA1] || nextA1;
      fetchRecommendations({
        interest: interestSlug,
        technical_level: Number(nextA2),
      });
    } else {
      resetRecommendations();
    }
  };

  const handleSelectInterest = (v: string) => {
    setA1(v);
    triggerRecommend(v, a2);
  };

  const handleSelectTech = (v: string) => {
    setA2(v);
    triggerRecommend(a1, v);
  };

  const handleResetFinder = () => {
    setA1(null);
    setA2(null);
    resetRecommendations();
  };

  const categories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return [...apiCategories]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((c) => [c.slug, c.name] as const);
    }
    return CATS.map((c) => [c.id, c.name] as const);
  }, [apiCategories]);

  const localRecommend = useMemo<Track[]>(() => {
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
  }, [a1, a2]);

  const recommendedTracks = useMemo<Track[]>(() => {
    if (apiRecommendations && apiRecommendations.length > 0) {
      return [...apiRecommendations]
        .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
        .slice(0, 3)
        .map(mapApiSummaryToTrack);
    }
    return localRecommend;
  }, [apiRecommendations, localRecommend]);

  const trimmedQ = q.trim().toLowerCase();
  const localFiltered = useMemo(
    () =>
      TRACKS.filter(
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
      ),
    [pcat, trimmedQ],
  );

  const displayedProgrammes = useMemo<Track[]>(() => {
    if (!isProgrammesError && apiProgrammesPage?.data) {
      return apiProgrammesPage.data.map(mapApiSummaryToTrack);
    }
    return localFiltered;
  }, [apiProgrammesPage, isProgrammesError, localFiltered]);

  const totalCount = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return apiCategories.reduce((sum, c) => sum + (c.programmes_count || 0), 0) || TRACKS.length;
    }
    if (pcat === 'all' && !debouncedQ && apiProgrammesPage?.meta?.total) {
      return apiProgrammesPage.meta.total;
    }
    return TRACKS.length;
  }, [apiCategories, apiProgrammesPage?.meta?.total, debouncedQ, pcat]);

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <div className="crumbs">
            <Link to="/">Home</Link>
            <Icon name="chevron-down" />
            <span>Programmes</span>
          </div>
          <h1>{totalCount} programmes. Pick your path.</h1>
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
                    onClick={() => handleSelectInterest(v)}
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
                    onClick={() => handleSelectTech(v)}
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
            ) : isRecommending || (!apiRecommendations && !isRecommendError) ? (
              <div className="match" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Spinner size="sm" variant="brand" label="Finding best matches..." />
                <span className="muted">Finding your best matches...</span>
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
                    onClick={handleResetFinder}
                  >
                    Start over
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="toolbar">
            <div className="tabs-scroll" id="pcats" style={{ margin: 0, paddingBottom: 2 }}>
              {([['all', 'All'], ...categories] as const).map(([id, n]) => (
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
            {isProgrammesLoading && !apiProgrammesPage ? (
              <div className="pgrid">
                <ProgrammeCardSkeleton />
                <ProgrammeCardSkeleton />
                <ProgrammeCardSkeleton />
                <ProgrammeCardSkeleton />
                <ProgrammeCardSkeleton />
                <ProgrammeCardSkeleton />
              </div>
            ) : !displayedProgrammes.length ? (
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
                <p
                  className="muted small"
                  style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <span>
                    Showing {displayedProgrammes.length} of {totalCount} programmes
                  </span>
                  {isProgrammesFetching && <Spinner size="xs" variant="muted" label="Updating..." />}
                </p>
                <div className="pgrid">
                  {displayedProgrammes.map((t) => (
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
