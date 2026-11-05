import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FAQS, TRACKS, findCategory, findTrack } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import {
  CtaBand,
  CustomDropdown,
  FaqList,
  OdTag,
  Photo,
} from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';

const ADM_CHIPS: Array<[id: string, label: string]> = [
  ['adm-who', 'Who can apply'],
  ['adm-learn', 'How you’ll learn'],
  ['needs', 'What you need'],
  ['adm-tools', 'Tools by programme'],
  ['adm-how', 'How admission works'],
  ['adm-faq', 'Questions'],
];

const ADM_STEPS: Array<[title: string, desc: string]> = [
  ['Apply online', 'Choose your programme and complete your details, or apply for a scholarship.'],
  [
    'Application review',
    'Review your application, then pay the standard course fee online or by bank transfer.',
  ],
  [
    'Join your cohort',
    'Receive your link to the cohort WhatsApp community and your onboarding details.',
  ],
  ['Get set up and start', 'Install your tools and begin training.'],
];

export default function AdmissionsPage() {
  const { startApplyNew } = useSite();
  const [toolSlug, setToolSlug] = useState('frontend');

  const tool = findTrack(toolSlug) || TRACKS[0];
  const progOpts = TRACKS.map((t) => ({
    v: t.slug,
    l: t.short,
    ic: t.ic,
    g: findCategory(t.cat)?.name,
  }));

  return (
    <>
      <section className="phead">
        <div className="wrap about-split short">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <Icon name="chevron-down" />
              <Link to="/about">Academy</Link>
              <Icon name="chevron-down" />
              <span>Admission</span>
            </div>
            <h1 style={{ maxWidth: '15ch' }}>Everything you need before you apply.</h1>
            <p className="lede">
              Who can join, how you will learn, what to have ready and what happens after you
              apply.
            </p>
            <div className="hero-cta" style={{ marginTop: 28 }}>
              <Link className="btn btn-brand" to="/apply" onClick={startApplyNew}>
                Apply now <Icon name="arrow-right" className="arr" />
              </Link>
              <Link className="btn btn-line" to="/scholarship">
                View scholarships
              </Link>
            </div>
          </div>
          <Photo slot="adm" idx={9} className="arch" />
        </div>
      </section>

      <section className="strip">
        <div className="wrap">
          <div className="s">
            <Icon name="sparkles" />
            <div>
              <b>No experience needed</b>
              <span>Beginner stages start from scratch</span>
            </div>
          </div>
          <div className="s">
            <Icon name="smile" />
            <div>
              <b>No minimum age</b>
              <span>Plus Kids & Teens programmes</span>
            </div>
          </div>
          <div className="s">
            <Icon name="map-pin" />
            <div>
              <b>In-person and hybrid</b>
              <span>Virtual learning coming soon</span>
            </div>
          </div>
          <div className="s">
            <Icon name="award" />
            <div>
              <b>Scholarships available</b>
              <span>Up to 100% of tuition</span>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="tabs-scroll adm-nav">
          {ADM_CHIPS.map(([id, n]) => (
            <button
              key={id}
              type="button"
              className="chip"
              onClick={() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <section className="sec" id="adm-who">
        <div className="wrap">
          <div className="head">
            <h2>Who can apply</h2>
            <p>If you are curious and ready to put in the effort, there is a place for you.</p>
          </div>
          <div className="reqs">
            <div className="req">
              <Icon name="sparkles" />
              <div>
                <b>Beginners</b>
                <p>No experience needed. Basic computer skills are enough to start.</p>
              </div>
            </div>
            <div className="req">
              <Icon name="zap" />
              <div>
                <b>Learners with experience</b>
                <p>
                  Already have the basics, a related certification or hands-on experience? You can
                  begin at an advanced stage.
                </p>
              </div>
            </div>
            <div className="req">
              <Icon name="smile" />
              <div>
                <b>Children and teenagers</b>
                <p>
                  There is no minimum age. Younger learners join our holiday programmes.{' '}
                  <Link to="/kids">See Kids & Teens</Link>.
                </p>
              </div>
            </div>
            <div className="req">
              <Icon name="briefcase" />
              <div>
                <b>Professionals and business owners</b>
                <p>
                  Upgrade your skills or learn to run parts of your business yourself.
                  Organisations can also book{' '}
                  <Link to="/corporate-training">corporate training</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec on-mist" id="adm-learn">
        <div className="wrap">
          <div className="head">
            <h2>How you’ll learn</h2>
            <p>Classes are in person and hybrid. Online and virtual learning is coming soon.</p>
          </div>
          <div className="fmt">
            <div className="fmtc">
              <Icon name="users" />
              <h3>In person</h3>
              <p>Learn alongside classmates at TFN Hub in Awka, with hands-on support.</p>
            </div>
            <div className="fmtc">
              <Icon name="laptop" />
              <h3>Hybrid</h3>
              <p>Combine in-person sessions with online learning and project work at home.</p>
            </div>
            <div className="fmtc soon">
              <Icon name="globe" />
              <h3>Online and virtual</h3>
              <p>Coming soon. We will announce when virtual classes open.</p>
              <span className="pill ac" style={{ marginTop: 12 }}>
                Coming soon
              </span>
            </div>
          </div>
          <div className="review-only">
            <OdTag id="OD-09" />
          </div>
        </div>
      </section>

      <section className="sec" id="needs">
        <div className="wrap">
          <div className="head">
            <h2>What you need</h2>
            <p>
              The academy provides lab computers for in-class work, while your own projects are
              completed on your personal setup.
            </p>
          </div>
          <div className="reqs">
            <div className="req">
              <Icon name="laptop" />
              <div>
                <b>Laptop</b>
                <p>
                  Core i5 or Ryzen 5 (8th gen or newer), 8GB RAM (16GB recommended), 256GB SSD,
                  webcam and microphone.
                </p>
              </div>
            </div>
            <div className="req">
              <Icon name="wifi" />
              <div>
                <b>Internet</b>
                <p>
                  A stable connection of 10 Mbps or more, with enough monthly data for online
                  learning.
                </p>
              </div>
            </div>
            <div className="req">
              <Icon name="battery-charging" />
              <div>
                <b>Power backup</b>
                <p>A UPS, inverter or power bank, so outages never cost you a deadline.</p>
              </div>
            </div>
            <div className="req">
              <Icon name="wrench" />
              <div>
                <b>Software and accounts</b>
                <p>
                  Google Chrome, VS Code, Git, Zoom or Google Meet, plus Google and GitHub
                  accounts. Creative and business programmes use their own free tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec on-mist" id="adm-tools">
        <div className="wrap">
          <div className="head">
            <h2>Tools by programme</h2>
            <p>
              Choose a programme to see the tools you will use and what to have ready. Nearly all
              are free.
            </p>
          </div>
          <div className="toolsel">
            <div className="panel" style={{ padding: 28 }}>
              <div className="fld">
                <label htmlFor="dd-adm.tool">Programme</label>
                <CustomDropdown
                  id="adm.tool"
                  value={toolSlug}
                  onChange={setToolSlug}
                  options={progOpts}
                  placeholder="Select a programme"
                />
              </div>
              <p className="muted small" style={{ marginTop: 14 }}>
                {tool.line}
              </p>
              <p style={{ marginTop: 18 }}>
                <Link className="tlink" to={`/programmes/${tool.slug}`}>
                  View full programme <Icon name="arrow-right" />
                </Link>
              </p>
            </div>

            <div className="panel" style={{ padding: 28, display: 'grid', gap: 18 }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Tools and accounts</h3>
                <p className="muted">{tool.tools}</p>
              </div>
              {tool.levels.map((l) => (
                <div key={l.kind} className="callout">
                  <Icon name={l.kind === 'Advanced' ? 'zap' : 'check'} />
                  <span>
                    <b>{l.kind === 'Single course' ? 'Who it’s for' : l.kind}:</b> {l.pre}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec on-night" id="adm-how">
        <div className="wrap">
          <div className="head">
            <h2>How admission works</h2>
            <p>From your application to your first day, in four clear steps.</p>
          </div>
          <div className="steps">
            {ADM_STEPS.map(([h, p], i) => (
              <div key={h} className="step">
                <div className="n">{i + 1}</div>
                <div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="review-only">
            <OdTag id="OD-04" />
          </div>
        </div>
      </section>

      <section className="sec" id="adm-faq">
        <div className="wrap faqwrap">
          <div>
            <h2>Frequently asked questions</h2>
          </div>
          <FaqList items={FAQS} />
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
