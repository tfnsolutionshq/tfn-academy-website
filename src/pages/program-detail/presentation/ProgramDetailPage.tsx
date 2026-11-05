import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { TRACKS, findCategory, findTrack } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import {
  CertChip,
  OdTag,
  Photo,
  ProgrammeCard,
  downloadSyllabus,
} from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';
import { useToast } from '@/shared/context/ToastContext';

const SECS: Array<[key: string, label: string]> = [
  ['ov', 'Overview'],
  ['cur', 'Curriculum'],
  ['proj', 'Projects'],
  ['car', 'Careers'],
  ['req', 'Requirements'],
];

const cap1 = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export default function ProgramDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { startApplyProg, setHireNiche } = useSite();

  const [levelIdx, setLevelIdx] = useState(0);
  const [activeSec, setActiveSec] = useState('ov');
  const [openMods, setOpenMods] = useState<Record<number, boolean>>({});

  const t = slug ? findTrack(slug) : undefined;

  useEffect(() => {
    setLevelIdx(0);
    setActiveSec('ov');
    setOpenMods({});
  }, [slug]);

  useEffect(() => {
    setOpenMods({});
  }, [levelIdx]);

  useEffect(() => {
    const onScroll = () => {
      let cur = 'ov';
      ['ov', 'cur', 'proj', 'car', 'req'].forEach((k) => {
        const el = document.getElementById('pd-' + k);
        if (el && el.getBoundingClientRect().top < 220) cur = k;
      });
      setActiveSec(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!t) {
    return <Navigate to="/programmes" replace />;
  }

  const L = t.levels[levelIdx] || t.levels[0];
  const idx = TRACKS.indexOf(t);
  const f = t.fq;
  const cat = findCategory(t.cat);
  const stages =
    t.levels.length === 2 ? 'Beginner and Advanced stages' : 'One complete course';

  const bits = (f['Career translation'] || '').split(
    /(Employment|Entrepreneurship|Further learning):/,
  );
  const part = (k: string) => {
    const i = bits.indexOf(k);
    return i > -1 ? cap1(bits[i + 1].trim().replace(/\.$/, '')) + '.' : '';
  };

  const related = TRACKS.filter((x) => x.cat === t.cat && x.slug !== t.slug).slice(0, 3);

  const renderSeg = () =>
    t.levels.length > 1 ? (
      <div className="seg" role="tablist">
        {t.levels.map((l, i) => (
          <button
            key={l.kind}
            type="button"
            className={levelIdx === i ? 'on' : ''}
            onClick={() => setLevelIdx(i)}
          >
            {l.kind}
          </button>
        ))}
      </div>
    ) : null;

  return (
    <>
      <section className="pd-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link to="/">Home</Link>
            <Icon name="chevron-down" />
            <Link to="/programmes">Programmes</Link>
            <Icon name="chevron-down" />
            <span>{t.short}</span>
          </div>
          <div className="pd-grid">
            <div className="t">
              <div className="pd-meta">
                <span className="pill lt">{cat?.name}</span>
                <span className="pill lt">{stages}</span>
                <span className="pill lt">{t.certs.length} certifications</span>
                <span className="pill lt">In-person and hybrid</span>
              </div>
              <h1>{t.short}</h1>
              <p className="lede">{t.line}</p>
              <div className="pd-cta">
                <Link
                  className="btn btn-accent"
                  to="/apply"
                  onClick={() => startApplyProg(t.slug)}
                >
                  Apply for this programme <Icon name="arrow-right" className="arr" />
                </Link>
                <button
                  type="button"
                  className="btn btn-line-w"
                  onClick={() => downloadSyllabus(t.slug, showToast)}
                >
                  <Icon name="download" />
                  Download syllabus
                </button>
              </div>
            </div>
            <Photo slot={`prog-${t.slug}`} idx={idx} className="arch" />
          </div>
        </div>
      </section>

      <div className="subnav">
        <div className="wrap">
          {SECS.map(([k, n]) => (
            <button
              key={k}
              type="button"
              className={activeSec === k ? 'on' : ''}
              onClick={() => {
                const target = document.getElementById('pd-' + k);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <section>
        <div className="wrap pd-body">
          <div>
            <div className="pd-sec" id="pd-ov">
              <h2>What you’ll gain</h2>
              <p className="lede">{L.expect}</p>
              <div className="ov">
                <div className="ovc">
                  <Icon name="book-open" />
                  <h3>What you’ll learn</h3>
                  <p>{f['Need to know']}</p>
                </div>
                <div className="ovc">
                  <Icon name="wrench" />
                  <h3>What you’ll be able to do</h3>
                  <p>{f['Able to do']}</p>
                </div>
                <div className="ovc">
                  <Icon name="target" />
                  <h3>The problem you’ll solve</h3>
                  <p>{f['Real-world problem']}</p>
                </div>
                <div className="ovc">
                  <Icon name="hammer" />
                  <h3>Your proof project</h3>
                  <p>{f['Proof project']}</p>
                </div>
              </div>
            </div>

            <div className="pd-sec" id="pd-cur">
              <h2>Curriculum</h2>
              <p className="lede" style={{ marginBottom: 20 }}>
                A clear path of modules, each building on the last and ending in a capstone.
              </p>
              {renderSeg()}
              {t.levels.length === 1 ? <span className="pill">One complete course</span> : null}
              <div className="mods">
                {L.mods.map((m, i) => {
                  const isCap = /^capstone/i.test(m.n);
                  const isOpen = !!openMods[i];
                  return (
                    <div
                      key={m.n}
                      className={`mod ${isCap ? 'cap' : ''} ${isOpen ? 'open' : ''}`.trim()}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenMods((prev) => ({ ...prev, [i]: !prev[i] }))}
                      >
                        <span className="mi">{isCap ? <Icon name="award" /> : i + 1}</span>
                        <span className="mn">{m.n}</span>
                        <Icon name="chevron-down" />
                      </button>
                      <div className="bw">
                        <div className="bi">
                          <div className="tx">{m.t}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="callout" style={{ marginTop: 22 }}>
                <Icon name="message-circle" />
                <span>
                  <b>Soft skills throughout.</b> Communication, teamwork, feedback, client
                  handling, presenting and interview readiness are practised alongside the
                  technical content.
                </span>
              </div>
              <div className="review-only">
                <OdTag id="OD-03" />
              </div>
            </div>

            <div className="pd-sec" id="pd-proj">
              <h2>Projects you’ll build</h2>
              <p className="lede">
                These are the signature builds. You’ll complete further hands-on work along the
                way.
              </p>
              {renderSeg()}
              <div className="projs">
                {L.projs.map((p) => (
                  <div
                    key={p.k + p.t}
                    className={`proj ${p.k === 'Capstone' ? 'cap' : ''}`.trim()}
                  >
                    <span className="k">{p.k}</span>
                    <span>{p.t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pd-sec">
              <h2>Certifications you’ll prepare for</h2>
              <p className="lede">Recognised by employers worldwide.</p>
              <div className="certs">
                {t.certs.map((c) => (
                  <CertChip key={c} cert={c} />
                ))}
              </div>
            </div>

            <div className="pd-sec" id="pd-car">
              <h2>Where it can take you</h2>
              <p className="lede">Three routes, depending on what you want.</p>
              <div className="routes">
                <div className="route">
                  <Icon name="briefcase" />
                  <h3>Get hired</h3>
                  <p>{part('Employment')}</p>
                </div>
                <div className="route">
                  <Icon name="rocket" />
                  <h3>Start your own</h3>
                  <p>{part('Entrepreneurship')}</p>
                </div>
                <div className="route">
                  <Icon name="compass" />
                  <h3>Keep learning</h3>
                  <p>{part('Further learning')}</p>
                </div>
              </div>
              <p style={{ marginTop: 22 }}>
                <Link
                  className="tlink"
                  to="/hire-talents"
                  onClick={() => setHireNiche(t.slug)}
                >
                  See graduates in this field <Icon name="arrow-right" />
                </Link>
              </p>
            </div>

            <div className="pd-sec" id="pd-req">
              <h2>Requirements</h2>
              <p className="lede">What to have ready before you start.</p>
              {t.levels.map((l) => (
                <div key={l.kind} className="callout" style={{ marginBottom: 12 }}>
                  <Icon name={l.kind === 'Advanced' ? 'zap' : 'check'} />
                  <span>
                    <b>{l.kind === 'Single course' ? 'Who it’s for' : l.kind}:</b> {l.pre}
                  </span>
                </div>
              ))}
              <h3 style={{ margin: '28px 0 8px', fontSize: '1.15rem' }}>Tools and accounts</h3>
              <p className="muted">
                {t.tools} All software is free or free-tier unless a cost is shown.
              </p>
              <p style={{ marginTop: 16 }}>
                <a
                  className="tlink"
                  href="#needs"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/admissions');
                    setTimeout(() => {
                      const el = document.getElementById('needs');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }}
                >
                  See the laptop and internet requirements <Icon name="arrow-right" />
                </a>
              </p>
            </div>
          </div>

          <aside className="side">
            <h3>Interested in {t.short}?</h3>
            <ul>
              <li>
                <Icon name="check" />
                <span>
                  {t.levels.length === 2
                    ? 'Start at Beginner or Advanced'
                    : 'One complete, job-ready course'}
                </span>
              </li>
              <li>
                <Icon name="check" />
                <span>Hands-on projects and a capstone</span>
              </li>
              <li>
                <Icon name="check" />
                <span>Certification prep included</span>
              </li>
              <li>
                <Icon name="check" />
                <span>In-person and hybrid learning</span>
              </li>
              <li>
                <Icon name="check" />
                <span>Scholarships available</span>
              </li>
              <li>
                <Icon name="check" />
                <span>Cohort dates shared when you apply</span>
              </li>
            </ul>
            <div className="review-only">
              <OdTag id="OD-04" />
            </div>
            <Link
              className="btn btn-brand"
              to="/apply"
              onClick={() => startApplyProg(t.slug)}
            >
              Apply for this programme
            </Link>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => downloadSyllabus(t.slug, showToast)}
            >
              <Icon name="download" />
              Download syllabus
            </button>
          </aside>
        </div>
      </section>

      <section className="sec-sm on-mist" style={{ marginTop: 32 }}>
        <div className="wrap">
          <h2 style={{ fontSize: '1.9rem', marginBottom: 28 }}>More in {cat?.name}</h2>
          <div className="pgrid">
            {related.map((r) => (
              <ProgrammeCard key={r.slug} track={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
