import { Link } from 'react-router-dom';
import { COURSE_FEE, SCHOLS, SCHOL_PERKS, SCHOL_STEPS } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { OdTag, Photo } from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';

const ngn = (n: number) => 'NGN ' + n.toLocaleString('en-NG');

export default function ScholarshipPage() {
  const { startApplySchol } = useSite();

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
              {SCHOLS.length} programmes designed for different backgrounds and career stages.
              Every award is measured against the standard course fee of {ngn(COURSE_FEE)}.
            </p>
          </div>
          <div className="sgrid">
            {SCHOLS.map((x) => {
              const covers = Math.round((COURSE_FEE * x.pct) / 100);
              return (
                <div key={x.id} className="scard">
                  <div className="sc-top">
                    <span className="sc-pct">{x.pct}%</span>
                    <span className="sc-cov">
                      {x.pct === 100 ? 'Full tuition' : 'Partial coverage'}
                    </span>
                  </div>
                  <div className="sc-body">
                    {x.tag ? (
                      <span className="pill ac" style={{ alignSelf: 'flex-start' }}>
                        {x.tag}
                      </span>
                    ) : null}
                    <h3 className="sc-title">{x.n}</h3>
                    <p className="muted">{x.d}</p>
                    <div>
                      <h5>Requirements</h5>
                      <ul className="mini-list">
                        {x.req.map((r) => (
                          <li key={r}>
                            <Icon name="check" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="sc-cover">
                      Covers <b>{ngn(covers)}</b> of the standard course fee
                    </div>
                    <Link
                      className="btn btn-brand btn-sm"
                      to="/apply"
                      onClick={() => startApplySchol(x.id)}
                    >
                      Apply for this scholarship <Icon name="arrow-right" className="arr" />
                    </Link>
                  </div>
                </div>
              );
            })}

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
