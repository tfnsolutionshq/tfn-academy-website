import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ALL_CERTS,
  BLOG,
  CATS,
  FAQS,
  FEATURED,
  STORIES,
  TRACKS,
  VIDS,
  findTrack,
} from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import {
  BlogCard,
  CertChip,
  CtaBand,
  FaqList,
  Marquee,
  OdTag,
  Photo,
  ProgrammeCard,
  personSvg,
  spaceSvg,
} from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';

const AUDIENCE: Array<[title: string, desc: string, idx: number, slot: string]> = [
  [
    'Students and undergraduates',
    'Add a skill employers ask for before you graduate.',
    1,
    'who1',
  ],
  ['Graduates', 'Turn your degree into a portfolio and a clear next step.', 4, 'who2'],
  [
    'Working professionals',
    'Level up in your current role without starting from zero.',
    7,
    'who3',
  ],
  [
    'Career switchers',
    'Move into tech, creative or business work with a structured path.',
    2,
    'who4',
  ],
  ['Founders and business owners', 'Learn to build, market and run your digital business.', 9, 'who5'],
  ['Kids and teenagers', 'Holiday programmes that make digital skills fun and safe.', 10, 'who6'],
];

const START_STEPS: Array<[title: string, desc: string]> = [
  ['Choose a programme', 'Browse the programmes and find your fit.'],
  ['Apply online', 'Share a few details and your preferred programme.'],
  ['Hear from admissions', 'We contact you about upcoming cohorts, dates and next steps.'],
  ['Learn, build and certify', 'Train through hands-on projects and prepare for certification.'],
];

export default function HomePage() {
  const navigate = useNavigate();
  const {
    startApplyNew,
    triggerFinderScroll,
    triggerConsult,
    setVerifyAutoNum,
    vid,
    setVid,
    videos,
    pickVideo,
  } = useSite();

  const [homeCat, setHomeCat] = useState('all');
  const [certTab, setCertTab] = useState('all');
  const [certInput, setCertInput] = useState('');
  const certTabsRef = useRef<HTMLDivElement>(null);

  const isAllCat = homeCat === 'all';
  const progList = isAllCat
    ? FEATURED.map((s) => findTrack(s)).filter((x): x is NonNullable<typeof x> => Boolean(x))
    : TRACKS.filter((t) => t.cat === homeCat);

  const selectedCertTrack = certTab === 'all' ? null : findTrack(certTab);
  const certList = certTab === 'all' ? ALL_CERTS : selectedCertTrack?.certs || [];

  const activeVid = VIDS.find((x) => x.id === vid) || VIDS[0];
  const activeVidSrc = videos[activeVid.id];

  const handleCertTabClick = (id: string, btn: HTMLButtonElement) => {
    setCertTab(id);
    btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  };

  const handleVerifyHome = () => {
    setVerifyAutoNum(certInput);
    navigate('/verify');
  };

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>Learn the skills the world is hiring for.</h1>
            <p className="lede">
              TFN Academy trains young Nigerians in in-demand tech, creative and business skills,
              through hands-on projects and globally recognised certifications.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-brand" to="/apply" onClick={startApplyNew}>
                Apply now <Icon name="arrow-right" className="arr" />
              </Link>
              <Link className="btn btn-line" to="/programmes">
                Explore programmes
              </Link>
            </div>
            <div className="checks">
              <span>
                <Icon name="check" />
                No experience needed to start
              </span>
              <span>
                <Icon name="check" />
                Project-based learning
              </span>
              <span>
                <Icon name="check" />
                In-person and hybrid
              </span>
            </div>
          </div>

          <div className="mosaic">
            <Photo slot="hero1" idx={0} className="a arch" />
            <Photo slot="hero2" idx={3} className="b round" />
            <div className="c">
              <Icon name="graduation-cap" />
              <div>
                <b>{TRACKS.length}</b>
                <br />
                <span>programmes across tech, creative and business</span>
              </div>
            </div>
            <div className="float">
              <Icon name="hammer" />
              <div>
                <b>Hands-on projects</b>
                <span>in every programme</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="wrap">
          <div className="s">
            <Icon name="layers" />
            <div>
              <b>{TRACKS.length} programmes</b>
              <span>Tech, creative and business</span>
            </div>
          </div>
          <div className="s">
            <Icon name="hammer" />
            <div>
              <b>Learn by building</b>
              <span>Real projects, not just theory</span>
            </div>
          </div>
          <div className="s">
            <Icon name="award" />
            <div>
              <b>Certification-ready</b>
              <span>Prepare for global exams</span>
            </div>
          </div>
          <div className="s">
            <Icon name="map-pin" />
            <div>
              <b>In-person and hybrid</b>
              <span>Virtual learning coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head row">
            <div style={{ maxWidth: 640 }}>
              <h2>Choose your programme</h2>
              <p>
                Each programme is a complete course on its own. Pick the one that matches where you
                want to go.
              </p>
            </div>
            <Link className="tlink" to="/programmes">
              See all {TRACKS.length} programmes <Icon name="arrow-right" />
            </Link>
          </div>

          <div className="tabs-scroll" id="hcats">
            {([['all', 'Featured'], ...CATS.map((c) => [c.id, c.name])] as const).map(([id, n]) => (
              <button
                key={id}
                type="button"
                className={`chip ${homeCat === id ? 'on' : ''}`.trim()}
                onClick={() => setHomeCat(id)}
              >
                {n}
              </button>
            ))}
          </div>

          <div id="hp">
            <div className="pgrid">
              {progList.map((t) => (
                <ProgrammeCard key={t.slug} track={t} />
              ))}
              {isAllCat ? (
                <>
                  <Link
                    className="pcard help"
                    to="/programmes"
                    onClick={() => triggerFinderScroll()}
                  >
                    <div className="pbody">
                      <h3>Not sure where to start?</h3>
                      <p>
                        Answer two quick questions and we’ll suggest programmes that suit you.
                      </p>
                      <span className="go">
                        Help me choose <Icon name="arrow-right" />
                      </span>
                    </div>
                  </Link>
                  <Link className="pcard alt" to="/contact">
                    <div className="pbody">
                      <h3>Have a question first?</h3>
                      <p>Talk to admissions about programmes, requirements and your goals.</p>
                      <span className="go">
                        Contact us <Icon name="arrow-right" />
                      </span>
                    </div>
                  </Link>
                </>
              ) : (
                <Link className="pcard more" to="/programmes">
                  <div className="pbody">
                    <h3>See every programme</h3>
                    <p>
                      Browse all {TRACKS.length} programmes across tech, creative and business.
                    </p>
                    <span className="go">
                      Browse all <Icon name="arrow-right" />
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sec on-night">
        <div className="wrap split">
          <Photo slot="why" idx={2} className="arch" />
          <div>
            <div className="head" style={{ marginBottom: 32 }}>
              <h2>Training built around what employers and clients need</h2>
            </div>
            <div className="pts">
              <div className="pt">
                <Icon name="hammer" />
                <div>
                  <h3>Build real projects</h3>
                  <p>
                    Every programme is practical. You finish with a portfolio of work and a
                    capstone you can show to employers or clients.
                  </p>
                </div>
              </div>
              <div className="pt">
                <Icon name="globe" />
                <div>
                  <h3>Globally relevant curriculum</h3>
                  <p>
                    Our content follows international job markets and certification standards, so
                    you can compete for remote roles and freelance work.
                  </p>
                </div>
              </div>
              <div className="pt">
                <Icon name="award" />
                <div>
                  <h3>Certification-ready</h3>
                  <p>
                    Each programme maps to recognised certifications and prepares you to sit them.
                  </p>
                </div>
              </div>
              <div className="pt">
                <Icon name="message-circle" />
                <div>
                  <h3>Work-ready soft skills</h3>
                  <p>
                    Communication, teamwork, client handling, presenting and interview readiness
                    are built into the training.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec on-mist">
        <div className="wrap">
          <div className="head">
            <h2>See life at TFN</h2>
            <p>Tour the hub, step inside a training session and hear from our students.</p>
            <div className="review-only">
              <OdTag id="OD-12" />
            </div>
          </div>
          <div className="vgrid" id="vwrap">
            <div className="vplayer">
              {activeVidSrc ? (
                <>
                  <video controls playsInline preload="metadata" src={activeVidSrc} />
                  <button
                    type="button"
                    className="btn btn-sm btn-dark vrep"
                    onClick={() => pickVideo(activeVid.id)}
                  >
                    <Icon name="upload" />
                    Replace video
                  </button>
                </>
              ) : (
                <>
                  {activeVid.scene !== undefined ? (
                    <div
                      style={{ width: '100%', height: '100%', display: 'contents' }}
                      dangerouslySetInnerHTML={{
                        __html: `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${spaceSvg(activeVid.scene)}</svg>`,
                      }}
                    />
                  ) : (
                    <div
                      style={{ width: '100%', height: '100%', display: 'contents' }}
                      dangerouslySetInnerHTML={{ __html: personSvg(activeVid.person || 0) }}
                    />
                  )}
                  <div className="vov">
                    <button
                      type="button"
                      className="play"
                      onClick={() => pickVideo(activeVid.id)}
                      aria-label={`Add a video for ${activeVid.t}`}
                    >
                      <Icon name="play" />
                    </button>
                    <div className="vt">
                      <b>{activeVid.t}</b>
                      <span>Video placeholder. Click play to add a video for this slot.</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="vlist">
              {VIDS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  className={`vitem ${x.id === vid ? 'on' : ''}`.trim()}
                  onClick={() => setVid(x.id)}
                >
                  <span className="vi">
                    <Icon name={x.ic} />
                  </span>
                  <span>
                    <b>{x.t}</b>
                    <span className="s">{x.d}</span>
                  </span>
                  <Icon name="chevron-right" />
                </button>
              ))}
              <Link className="tlink" to="/hub" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                Explore the TFN Hub <Icon name="arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ overflow: 'hidden' }}>
        <div className="wrap">
          <div className="head">
            <h2>Built for anyone ready to learn</h2>
            <p>
              Whether you are in school, between jobs, running a business or still in primary or
              secondary school, there is a place for you.
            </p>
          </div>
        </div>
        <Marquee
          durationSec={55}
          label="Who TFN Academy is for"
          items={AUDIENCE.map(([h, p, i, s]) => (
            <div key={s} className="wcard">
              <Photo slot={s} idx={i} className="rsq" />
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        />
      </section>

      <section className="sec-sm">
        <div className="wrap">
          <div className="kidsband">
            <div className="t">
              <span
                className="pill lt"
                style={{ background: 'rgba(11,18,48,.14)', color: 'inherit' }}
              >
                Kids & Teens
              </span>
              <h2>Holiday programmes for children and teenagers</h2>
              <p>
                Coding, creativity, AI and digital safety, taught in a friendly way during school
                holidays.
              </p>
              <Link className="btn btn-dark" to="/kids">
                Explore holiday programmes <Icon name="arrow-right" className="arr" />
              </Link>
            </div>
            <div className="kp">
              <Photo slot="kidsband1" idx={10} />
              <Photo slot="kidsband2" idx={11} />
            </div>
          </div>
        </div>
      </section>

      <section className="sec on-mist">
        <div className="wrap">
          <div className="head">
            <h2>How to get started</h2>
            <p>Four simple steps from choosing a programme to your first day of training.</p>
          </div>
          <div className="steps">
            {START_STEPS.map(([h, p], i) => (
              <div key={h} className="step">
                <div className="n">{i + 1}</div>
                <div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <h2>Prepare for globally recognised certifications</h2>
            <p>Choose a programme to see the certifications it prepares you for.</p>
          </div>
          <div className="tabs-scroll" id="certtabs" ref={certTabsRef}>
            {([['all', 'All'], ...TRACKS.map((t) => [t.slug, t.short])] as const).map(
              ([id, n]) => (
                <button
                  key={id}
                  type="button"
                  className={`chip ${certTab === id ? 'on' : ''}`.trim()}
                  onClick={(e) => handleCertTabClick(id, e.currentTarget)}
                >
                  {n}
                </button>
              ),
            )}
          </div>
          <div id="certbox">
            <div className="certs">
              {certList.map((c) => (
                <CertChip key={c} cert={c} />
              ))}
            </div>
            {certTab !== 'all' && selectedCertTrack ? (
              <div className="certnote">
                <span className="muted">
                  Certifications you can prepare for in {selectedCertTrack.short}.
                </span>
                <Link className="tlink" to={`/programmes/${certTab}`}>
                  View programme <Icon name="arrow-right" />
                </Link>
              </div>
            ) : (
              <div className="certnote">
                <span className="muted">
                  {ALL_CERTS.length} certifications across {TRACKS.length} programmes. Pick a
                  programme above to see its certifications.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="sec on-mist" style={{ overflow: 'hidden' }}>
        <div className="wrap">
          <div className="head">
            <h2>Hear from our students</h2>
            <p>Real projects, real progress. Here is what learners say about their experience.</p>
            <div className="review-only">
              <OdTag id="OD-05" />
            </div>
          </div>
        </div>
        <Marquee
          durationSec={75}
          label="Student stories"
          items={STORIES.map((s, i) => (
            <div key={s.n} className="story">
              <Icon name="quote" className="q" />
              <blockquote>“{s.q}”</blockquote>
              <div className="who">
                <Photo slot={`story-${i}`} idx={s.p} />
                <div>
                  <b>{s.n}</b>
                  <span className="s">{s.r}</span>
                </div>
              </div>
            </div>
          ))}
        />
      </section>

      <section className="sec">
        <div className="wrap duo">
          <div className="tcard navy">
            <h2>Hire trained talent for your next project</h2>
            <p>
              Meet graduates trained through real projects across tech, creative and business.
              Request a consultation and we will help you find the right fit.
            </p>
            <div className="minis">
              {[0, 1, 2, 3].map((i) => (
                <Photo key={i} slot={`mini${i}`} idx={[4, 1, 7, 6][i]} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
              <Link className="btn btn-accent" to="/hire-talents">
                Browse talent <Icon name="arrow-right" className="arr" />
              </Link>
              <Link
                className="btn btn-line-w"
                to="/hire-talents"
                onClick={() => triggerConsult('')}
              >
                Request a consultation
              </Link>
            </div>
          </div>

          <div className="tcard light">
            <Icon name="badge-check" className="tbadge" />
            <h2>Verify a certificate</h2>
            <p className="muted">
              Enter a certificate number to confirm it was issued by TFN Academy.
            </p>
            <div className="vbox">
              <input
                className="inp"
                id="vh-in"
                placeholder="e.g. TFN-CERT-0001"
                aria-label="Certificate number"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleVerifyHome();
                  }
                }}
              />
              <button type="button" className="btn btn-brand" onClick={handleVerifyHome}>
                Verify
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-sm on-mist">
        <div className="wrap">
          <div className="head row">
            <div style={{ maxWidth: 640 }}>
              <h2>From the TFN blog</h2>
              <p>Career advice, study tips and industry insights.</p>
              <div className="review-only">
                <OdTag id="OD-05" />
              </div>
            </div>
            <Link className="tlink" to="/blog">
              Read the blog <Icon name="arrow-right" />
            </Link>
          </div>
          <div className="blogs">
            {BLOG.slice(0, 3).map((b) => (
              <BlogCard key={b.slug} post={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap faqwrap">
          <div>
            <h2>Questions people ask first</h2>
            <p className="lede" style={{ marginTop: 14, fontSize: '1.05rem' }}>
              Can’t find your answer? <Link to="/contact">Ask admissions</Link>.
            </p>
          </div>
          <FaqList items={FAQS.slice(0, 6)} />
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
