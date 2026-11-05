import { Link } from 'react-router-dom';
import {
  CORP_AREAS,
  CORP_FIT,
  CORP_FORMATS,
  CORP_STEPS,
  CORP_WHO,
} from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { OdTag, Photo, Scene } from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';

export default function CorporatePage() {
  const { startCorpProposal } = useSite();

  const renderCorpCta = (label = 'Request a proposal', cls = 'btn-accent') => (
    <Link className={`btn ${cls}`} to="/contact" onClick={startCorpProposal}>
      {label} <Icon name="arrow-right" className="arr" />
    </Link>
  );

  return (
    <>
      <section className="chero">
        <div className="wrap chero-grid">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <Icon name="chevron-down" />
              <span>Corporate Training</span>
            </div>
            <span className="pill lt">Corporate Training</span>
            <h1>Equip your team with the digital skills they need today.</h1>
            <p className="lede">
              Structured workshops, bootcamps and ongoing upskilling programmes for institutions
              and organisations, delivered on-site or online.
            </p>
            <div className="hero-cta" style={{ marginTop: 30 }}>
              {renderCorpCta()}
              <a
                className="btn btn-line-w"
                href="#corp-areas"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('corp-areas');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore training areas
              </a>
            </div>
            <div className="review-only">
              <OdTag id="OD-13" />
            </div>
          </div>
          <div className="cpics">
            <Scene slot="corp1" v={0} className="a" />
            <Photo slot="corp2" idx={7} className="b" />
            <Scene slot="corp3" v={2} className="c" />
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="wrap">
          <div className="s">
            <Icon name="presentation" />
            <div>
              <b>Workshops to bootcamps</b>
              <span>Choose the depth you need</span>
            </div>
          </div>
          <div className="s">
            <Icon name="map-pin" />
            <div>
              <b>On-site or online</b>
              <span>Where your team works best</span>
            </div>
          </div>
          <div className="s">
            <Icon name="wrench" />
            <div>
              <b>Customised for you</b>
              <span>Industry, tools and team size</span>
            </div>
          </div>
          <div className="s">
            <Icon name="hammer" />
            <div>
              <b>Hands-on learning</b>
              <span>Skills applied to real work</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="corp-areas">
        <div className="wrap">
          <div className="head">
            <h2>Training areas</h2>
            <p>
              Core professional training for modern organisations. Pick one or combine several into
              a single programme.
            </p>
          </div>
          <div className="ccards">
            {CORP_AREAS.map((a) => (
              <div key={a.t} className="ccard">
                <Icon name={a.ic} />
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 22 }}>
            Need something different? We build training around your needs.{' '}
            <Link to="/contact" onClick={startCorpProposal}>
              Tell us what you’re looking for
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="sec on-mist">
        <div className="wrap split">
          <Scene slot="corp-onsite" v={0} className="rsq" />
          <div>
            <div className="head" style={{ marginBottom: 28 }}>
              <h2>Customised around your institution</h2>
              <p>
                We customise every programme around your institution’s industry, tools and team
                size, so the training fits the way you work.
              </p>
            </div>
            <div className="pts light">
              {CORP_FIT.map((f) => (
                <div key={f.t} className="pt">
                  <Icon name={f.ic} />
                  <div>
                    <h3>{f.t}</h3>
                    <p>{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <h2>Choose how it is delivered</h2>
            <p>Every programme can take the shape that suits your people and your calendar.</p>
          </div>
          <div className="fmt">
            {CORP_FORMATS.map((f) => (
              <div key={f.t} className="fmtc">
                <Icon name={f.ic} />
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec on-night">
        <div
          className="wrap split"
          style={{ gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)' }}
        >
          <div>
            <div className="head" style={{ marginBottom: 26 }}>
              <h2>On-site or online, whichever suits your team</h2>
              <p>
                We can train at your premises, at the TFN Hub in Awka, or live online for teams
                spread across locations.
              </p>
            </div>
            <div className="pts">
              <div className="pt">
                <Icon name="building-2" />
                <div>
                  <h3>On-site training</h3>
                  <p>
                    Sessions at your premises or at our hub, with hands-on support in the room.
                  </p>
                </div>
              </div>
              <div className="pt">
                <Icon name="laptop" />
                <div>
                  <h3>Online training</h3>
                  <p>
                    Live virtual sessions for distributed teams, with the same practical focus.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 28 }}>{renderCorpCta()}</div>
          </div>
          <div className="duo-pics">
            <Photo slot="corp-onsite2" idx={1} className="rsq" />
            <Photo slot="corp-online" idx={3} className="rsq" />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <h2>Who we train</h2>
            <p>We work with institutions and organisations of every size.</p>
          </div>
          <div className="chips" style={{ gap: 12 }}>
            {CORP_WHO.map((w) => (
              <span
                key={w}
                className="chip"
                style={{ height: 48, padding: '0 22px', fontSize: '1rem' }}
              >
                <Icon name="check" />
                {w}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="sec on-mist">
        <div className="wrap">
          <div className="head">
            <h2>How it works</h2>
            <p>From the first conversation to a measurable result.</p>
          </div>
          <div className="steps">
            {CORP_STEPS.map(([h, p], i) => (
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

      <section className="sec-sm">
        <div className="wrap">
          <div className="band">
            <div className="t">
              <h2>Let’s design a programme for your team.</h2>
              <p>
                Tell us about your organisation and goals, and we will send a tailored proposal.
              </p>
              <div className="btns">
                {renderCorpCta('Request a proposal', 'btn-accent')}
                <a className="btn btn-line-w" href="tel:+2347120033922">
                  Call +234 712 003 3922
                </a>
              </div>
            </div>
            <Scene slot="corp-band" v={1} />
          </div>
        </div>
      </section>
    </>
  );
}
