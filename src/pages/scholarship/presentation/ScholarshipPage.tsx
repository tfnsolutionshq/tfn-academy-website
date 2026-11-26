import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { COURSE_FEE, SCHOLS, SCHOL_PERKS, SCHOL_STEPS } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { OdTag, Photo } from '@/shared/components/ui/Illustrations';
import { Skeleton } from '@/shared/components/ui/Loading';
import { useSite } from '@/shared/context/SiteContext';
import { useScholarshipsQuery } from '@/hooks/queries';

const ngn = (n: number) => 'NGN ' + n.toLocaleString('en-NG');

interface DisplayScholarship {
  code: string;
  name: string;
  percent: number;
  badge?: string | null;
  description: string;
  requirements: string[];
  coverage: string;
  balance: string;
  courseFee: string;
}

export default function ScholarshipPage() {
  const { startApplySchol } = useSite();
  const { data: apiScholarships, isLoading: isScholLoading } = useScholarshipsQuery();

  const scholarships = useMemo<DisplayScholarship[]>(() => {
    if (apiScholarships && apiScholarships.length > 0) {
      return apiScholarships.map((s) => ({
        code: s.code,
        name: s.name,
        percent: s.percent,
        badge: s.badge,
        description: s.description,
        requirements: s.requirements || [],
        coverage: s.coverage || ngn(Math.round((COURSE_FEE * s.percent) / 100)),
        balance: s.balance || ngn(Math.max(0, COURSE_FEE - Math.round((COURSE_FEE * s.percent) / 100))),
        courseFee: s.course_fee || ngn(COURSE_FEE),
      }));
    }

    return SCHOLS.map((x) => {
      const covers = Math.round((COURSE_FEE * x.pct) / 100);
      return {
        code: x.id,
        name: x.n,
        percent: x.pct,
        badge: x.tag || null,
        description: x.d,
        requirements: x.req,
        coverage: ngn(covers),
        balance: ngn(Math.max(0, COURSE_FEE - covers)),
        courseFee: ngn(COURSE_FEE),
      };
    });
  }, [apiScholarships]);

  const standardCourseFee = scholarships[0]?.courseFee || ngn(COURSE_FEE);

  return (
    <>
      <section className="phead">
        <div className="wrap about-split">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <Icon name="chevron-down" />
              <Link to="/about">Academy</Link>
              <Icon name="chevron-down" />
              <span>Scholarship</span>
            </div>
            <h1 style={{ maxWidth: '16ch' }}>
              Talent is equally distributed. Opportunity is not.
            </h1>
            <p className="lede">
              Our scholarship programme exists to change that. Apply for a scholarship or grant and
              start building a career in tech, creative or business skills.
            </p>
            <div className="hero-cta" style={{ marginTop: 28 }}>
              <Link
                className="btn btn-brand"
                to="/apply"
                onClick={() => startApplySchol('')}
              >
                Apply for a scholarship <Icon name="arrow-right" className="arr" />
              </Link>
              <a
                className="btn btn-line"
                href="#available"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('available');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See scholarships
              </a>
            </div>
            <div className="review-only">
              <OdTag id="OD-14" />
            </div>
          </div>
          <div className="spics">
            <Photo slot="sch1" idx={4} className="a arch" />
            <Photo slot="sch2" idx={2} className="b rsq" />
          </div>
        </div>
      </section>

      <section className="sec-sm on-night">
        <div className="wrap">
          <div className="perks">
            {SCHOL_PERKS.map(([i, t]) => (
              <div key={t} className="perk">
                <Icon name={i} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="available">
        <div className="wrap">
          <div className="head">
            <h2>Available scholarships</h2>
            <p>
              {scholarships.length} programmes designed for different backgrounds and career stages.
              Every award is measured against the standard course fee of {standardCourseFee}.
            </p>
          </div>
          <div className="sgrid">
            {isScholLoading && !apiScholarships
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="scard" style={{ pointerEvents: 'none' }}>
                    <div className="sc-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Skeleton width="76px" height="36px" radius="8px" />
                      <Skeleton width="90px" height="20px" radius="999px" />
                    </div>
                    <div className="sc-body" style={{ display: 'grid', gap: 12 }}>
                      <Skeleton width="75%" height="24px" radius="6px" />
                      <Skeleton width="100%" height="14px" radius="4px" />
                      <Skeleton width="85%" height="14px" radius="4px" />
                      <Skeleton width="100%" height="44px" radius="10px" />
                    </div>
                  </div>
                ))
              : scholarships.map((x) => (
                  <div key={x.code} className="scard">
                    <div className="sc-top">
                      <span className="sc-pct">{x.percent}%</span>
                      <span className="sc-cov">
                        {x.percent === 100 ? 'Full tuition' : 'Partial coverage'}
                      </span>
                    </div>
                    <div className="sc-body">
                      {x.badge ? (
                        <span className="pill ac" style={{ alignSelf: 'flex-start' }}>
                          {x.badge}
                        </span>
                      ) : null}
                      <h3 className="sc-title">{x.name}</h3>
                      <p className="muted">{x.description}</p>
                      <div>
                        <h5>Requirements</h5>
                        <ul className="mini-list">
                          {x.requirements.map((r) => (
                            <li key={r}>
                              <Icon name="check" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="sc-cover">
                        Covers <b>{x.coverage}</b> of the standard course fee
                      </div>
                      <Link
                        className="btn btn-brand btn-sm"
                        to="/apply"
                        onClick={() => startApplySchol(x.code)}
                      >
                        Apply for this scholarship <Icon name="arrow-right" className="arr" />
                      </Link>
                    </div>
                  </div>
                ))}

            <div className="scard help">
              <div className="sc-body" style={{ justifyContent: 'center', height: '100%' }}>
                <h3>Not sure which one fits?</h3>
                <p>
                  Start your application and choose the closest match. Our team will guide you if
                  another award suits you better.
                </p>
                <Link
                  className="btn btn-accent btn-sm"
                  to="/apply"
                  onClick={() => startApplySchol('')}
                >
                  Start my application <Icon name="arrow-right" className="arr" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec on-mist">
        <div className="wrap">
          <div className="head">
            <h2>How to apply</h2>
            <p>A simple four-step process from application to decision.</p>
          </div>
          <div className="steps">
            {SCHOL_STEPS.map(([h, p], i) => (
              <div key={h} className="step">
                <div className="n">{i + 1}</div>
                <div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 36, maxWidth: 760 }}>
            <Icon name="info" />
            <span>
              Scholarships and grants cover part or all of the standard course fee. If your award
              is partial, you pay the balance online or by bank transfer after you are selected.
            </span>
          </div>
        </div>
      </section>

      <section className="sec-sm">
        <div className="wrap">
          <div className="band">
            <div className="t">
              <h2>Your talent deserves the opportunity.</h2>
              <p>Apply today and take the first step towards a career you can be proud of.</p>
              <div className="btns">
                <Link
                  className="btn btn-accent"
                  to="/apply"
                  onClick={() => startApplySchol('')}
                >
                  Apply for a scholarship <Icon name="arrow-right" className="arr" />
                </Link>
                <Link className="btn btn-line-w" to="/contact">
                  Ask a question
                </Link>
              </div>
            </div>
            <Photo slot="sch-band" idx={9} />
          </div>
        </div>
      </section>
    </>
  );
}
