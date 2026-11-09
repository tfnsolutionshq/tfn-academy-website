import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '@/shared/components/layout/Header';
import { Footer } from '@/shared/components/layout/Footer';
import { Icon } from '@/shared/components/ui/Icon';
import { Photo } from '@/shared/components/ui/Illustrations';
import { BLOG, ODS, TALENT, WA_NUMBER, findTrack } from '@/shared/constants/academyData';
import { useSite } from '@/shared/context/SiteContext';

const TITLES: Record<string, string> = {
  '/': 'Learn the skills the world is hiring for',
  '/programmes': 'Programmes',
  '/about': 'About',
  '/admissions': 'Admissions',
  '/apply': 'Apply',
  '/contact': 'Contact',
  '/kids': 'Kids & Teens',
  '/hire-talents': 'Hire talent',
  '/verify': 'Verify certificate',
  '/blog': 'Blog',
  '/careers': 'Careers',
  '/hub': 'TFN Hub',
  '/corporate-training': 'Corporate Training',
  '/scholarship': 'Scholarship',
};

function Overlay() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    review,
    toggleReview,
    panel,
    setPanel,
    profId,
    highlightOdId,
    brand,
    accent,
    applyColor,
    resetColors,
    resetPhotos,
    triggerConsult,
  } = useSite();

  const [brandHexInput, setBrandHexInput] = useState(brand.toUpperCase());
  const [accentHexInput, setAccentHexInput] = useState(accent.toUpperCase());

  useEffect(() => {
    setBrandHexInput(brand.toUpperCase());
  }, [brand]);

  useEffect(() => {
    setAccentHexInput(accent.toUpperCase());
  }, [accent]);

  useEffect(() => {
    if (panel === 'review' && highlightOdId) {
      const el = document.getElementById('od-' + highlightOdId);
      if (el) {
        el.scrollIntoView({ block: 'center' });
        el.style.outline = '3px solid #C99A2E';
      }
    }
  }, [panel, highlightOdId]);

  const talent = profId ? TALENT.find((x) => x.id === profId) : null;
  const talentProg = talent ? findTrack(talent.s) : null;

  return (
    <>
      <button
        type="button"
        className="rv-btn"
        aria-label="Review notes"
        onClick={() => setPanel('review')}
      >
        <Icon name="flag" />
        <span className="rvl">Review notes</span> <span className="cnt">{ODS.length}</span>
      </button>

      {panel === 'review' && (
        <>
          <div className="scrim" onClick={() => setPanel(null)} />
          <aside className="sheet" role="dialog" aria-modal="true" aria-label="Review notes">
            <div className="sheet-h">
              <h3>Review notes</h3>
              <button
                type="button"
                className="iconbtn"
                onClick={() => setPanel(null)}
                aria-label="Close"
              >
                <Icon name="x" />
              </button>
            </div>

            <div className="box">
              <h4>Brand colours</h4>
              <div className="colrow">
                <label htmlFor="pc-brand">Primary</label>
                <input
                  type="color"
                  id="pc-brand"
                  value={brand}
                  aria-label="Primary colour"
                  onChange={(e) => {
                    const v = e.target.value;
                    applyColor('brand', v, true);
                    setBrandHexInput(v.toUpperCase());
                  }}
                />
                <input
                  className="inp"
                  id="hx-brand"
                  value={brandHexInput}
                  maxLength={7}
                  aria-label="Primary hex"
                  onChange={(e) => {
                    const raw = e.target.value;
                    setBrandHexInput(raw);
                    let x = raw.trim();
                    if (x && x[0] !== '#') x = '#' + x;
                    applyColor('brand', x, true);
                  }}
                />
              </div>
              <div className="colrow">
                <label htmlFor="pc-accent">Secondary</label>
                <input
                  type="color"
                  id="pc-accent"
                  value={accent}
                  aria-label="Secondary colour"
                  onChange={(e) => {
                    const v = e.target.value;
                    applyColor('accent', v, true);
                    setAccentHexInput(v.toUpperCase());
                  }}
                />
                <input
                  className="inp"
                  id="hx-accent"
                  value={accentHexInput}
                  maxLength={7}
                  aria-label="Secondary hex"
                  onChange={(e) => {
                    const raw = e.target.value;
                    setAccentHexInput(raw);
                    let x = raw.trim();
                    if (x && x[0] !== '#') x = '#' + x;
                    applyColor('accent', x, true);
                  }}
                />
              </div>
              <div>
                <button type="button" className="btn btn-line btn-sm" onClick={resetColors}>
                  Reset to TFN colours
                </button>
              </div>
              <p className="small muted">
                Gradients and the dark navy are derived from these two colours. To make a change
                permanent, send the hex codes or edit <code>--brand</code> and <code>--accent</code>{' '}
                at the top of the file.
              </p>
            </div>

            <div className="box">
              <h4>Student photos</h4>
              <p className="small muted">
                Illustrated stand-ins are shown until real photos are supplied. Hover any picture
                and choose “Replace photo” to preview your own. Photos stay in this browser only.
              </p>
              <div>
                <button type="button" className="btn btn-line btn-sm" onClick={resetPhotos}>
                  Reset all photos
                </button>
              </div>
            </div>

            <div className="toggle">
              <span>Show review tags on pages</span>
              <button
                type="button"
                className={`swt ${review ? 'on' : ''}`.trim()}
                onClick={toggleReview}
                aria-pressed={review}
                aria-label="Show review tags"
              />
            </div>

            <p className="small muted">Open decisions for stakeholders:</p>
            <div className="odlist">
              {ODS.map((o) => (
                <div key={o.id} className="oditem" id={`od-${o.id}`}>
                  <b>{o.id}</b>
                  <h4>{o.t}</h4>
                  <p>{o.d}</p>
                </div>
              ))}
            </div>
          </aside>
        </>
      )}

      {panel === 'profile' && talent && talentProg && (
        <>
          <div className="scrim" onClick={() => setPanel(null)} />
          <aside className="sheet prof" role="dialog" aria-modal="true" aria-label={talent.n}>
            <div className="sheet-h">
              <h3>{talent.n}</h3>
              <button
                type="button"
                className="iconbtn"
                onClick={() => setPanel(null)}
                aria-label="Close"
              >
                <Icon name="x" />
              </button>
            </div>
            <Photo slot={`talent-${talent.id}`} idx={talent.p} />
            <div>
              <span className="av">
                <i />
                {talent.av}
              </span>
              <p style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: 4 }}>{talent.role}</p>
            </div>
            <p>{talent.bio}</p>
            <div>
              <h4 style={{ fontFamily: 'var(--body)', fontSize: '.95rem', marginBottom: 8 }}>
                Skills
              </h4>
              <div className="chips">
                {talent.skills.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--body)', fontSize: '.95rem', marginBottom: 8 }}>
                Signature project
              </h4>
              <p className="muted">{talent.proj}</p>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--body)', fontSize: '.95rem', marginBottom: 8 }}>
                Certifications in training
              </h4>
              <div className="chips">
                {talentProg.certs.slice(0, 3).map((c) => (
                  <span key={c} className="tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-brand"
                onClick={() => {
                  triggerConsult(talent.id);
                  if (pathname !== '/hire-talents') {
                    navigate('/hire-talents');
                  } else {
                    setTimeout(() => {
                      const c = document.getElementById('consult');
                      if (c) c.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }
                }}
              >
                Request consultation
              </button>
              <Link
                className="btn btn-line"
                to={`/programmes/${talent.s}`}
                onClick={() => setPanel(null)}
              >
                View programme
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

export function MainLayout() {
  const { pathname } = useLocation();
  const progRef = useRef<HTMLDivElement>(null);
  const [showToTop, setShowToTop] = useState(false);

  const mcta = !['/apply', '/contact', '/verify'].includes(pathname);

  useEffect(() => {
    document.body.classList.toggle('has-mcta', mcta);
  }, [mcta]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.remove('nav-hidden');

    let pageTitle = TITLES[pathname] || 'Learn the skills the world is hiring for';
    if (pathname.startsWith('/programmes/')) {
      const slug = pathname.slice('/programmes/'.length);
      const t = findTrack(slug);
      if (t) pageTitle = t.short;
    } else if (pathname.startsWith('/blog/')) {
      const slug = pathname.slice('/blog/'.length);
      const b = BLOG.find((x) => x.slug === slug);
      if (b) pageTitle = b.t;
    }
    document.title = `${pageTitle} | TFN Academy`;

    const timer = setTimeout(() => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>(
          '#main .head, #main .pcard, #main .step, #main .pt, #main .req, #main .fmtc, #main .kcard, #main .tcardx, #main .bcard, #main .pillar, #main .route, #main .ovc, #main .tcard, #main .band, #main .kidsband, #main .qa',
        ),
      );
      if (
        !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
      );
      els.forEach((el, i) => {
        el.classList.add('rv');
        el.style.setProperty('--d', ((i % 4) * 0.07).toFixed(2) + 's');
        io.observe(el);
      });
    }, 30);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const onProg = pathname.startsWith('/programmes/') && pathname.length > '/programmes/'.length;
      if (!onProg || y <= 120) {
        document.body.classList.remove('nav-hidden');
      } else if (y > lastY + 6 && y > 220) {
        document.body.classList.add('nav-hidden');
      } else if (y < lastY - 6) {
        document.body.classList.remove('nav-hidden');
      }
      lastY = y;

      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (progRef.current) {
        progRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
      setShowToTop(y > 700);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    'Hello TFN Academy, I would like to know more about your programmes.',
  )}`;

  return (
    <>
      <div className="progress" id="prog" ref={progRef} aria-hidden="true" />
      <div id="nav">
        <Header />
      </div>
      <main id="main">
        <Outlet />
      </main>
      <div id="footer">
        <Footer mcta={mcta} />
      </div>
      <div id="overlay">
        <Overlay />
      </div>
      <a
        className="wa-fab"
        id="wafab"
        href={waHref}
        target="_blank"
        rel="noopener"
        aria-label="Chat with TFN Academy on WhatsApp"
      >
        <span className="ic" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
          </svg>
        </span>
        <span className="t">Chat on WhatsApp</span>
      </a>
      <button
        type="button"
        className={`totop ${showToTop ? 'show' : ''}`.trim()}
        id="totop"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
      </button>
    </>
  );
}
