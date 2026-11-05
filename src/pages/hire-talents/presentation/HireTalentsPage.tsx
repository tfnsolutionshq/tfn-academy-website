import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BUDGETS,
  EMAIL_REGEX,
  TALENT,
  TRACKS,
  findCategory,
  findTrack,
} from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { CustomDropdown, OdTag, Photo } from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';
import { useToast } from '@/shared/context/ToastContext';

const HIRE_STEPS: Array<[title: string, desc: string]> = [
  ['Tell us what you need', 'Share the role, project or skills you are looking for.'],
  ['We shortlist talent', 'Admissions and our team match you with suitable graduates.'],
  ['Meet and hire', 'Speak with candidates and agree an engagement that suits you.'],
];

const INITIAL_CONSULT = {
  name: '',
  company: '',
  email: '',
  phone: '',
  need: '',
  type: '',
  budget: '',
  msg: '',
  talent: '',
};

export default function HireTalentsPage() {
  const { showToast } = useToast();
  const { hireNiche, setHireNiche, openTalentProfile, consultPreset } = useSite();

  const [form, setForm] = useState(INITIAL_CONSULT);
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (consultPreset.key > 0) {
      const tId = consultPreset.talentId;
      const tRec = tId ? TALENT.find((x) => x.id === tId) : undefined;
      const tProg = tRec ? findTrack(tRec.s) : undefined;
      setForm((prev) => ({
        ...prev,
        talent: tId,
        need: tProg ? tProg.short : prev.need,
      }));
      if (tProg) {
        setErr((prev) => {
          const next = { ...prev };
          delete next.need;
          return next;
        });
      }
      setSent(false);
      setTimeout(() => {
        const c = document.getElementById('consult');
        if (c) c.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [consultPreset]);

  const slugs = Array.from(new Set(TALENT.map((t) => t.s)));
  const chipOptions: Array<[id: string, label: string]> = [
    ['all', 'All niches'],
    ...slugs.map((s): [string, string] => [s, findTrack(s)?.short || s]),
  ];

  const filteredTalent = TALENT.filter((t) => hireNiche === 'all' || t.s === hireNiche);

  const needOpts = [
    ...TRACKS.map((t) => ({
      v: t.short,
      l: t.short,
      ic: t.ic,
      g: findCategory(t.cat)?.name,
    })),
    { v: 'Not sure yet', l: 'Not sure yet, advise me', ic: 'compass', g: 'Other' },
  ];

  const selectedTalent = form.talent ? TALENT.find((t) => t.id === form.talent) : null;

  const updateField = (key: keyof typeof INITIAL_CONSULT, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErr((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Enter your name.';
    if (!form.company.trim()) e.company = 'Enter your company or organisation.';
    if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = 'Enter an email address like name@company.com.';
    }
    if (!/^\+?\d[\d\s-]{7,16}$/.test(form.phone.trim())) {
      e.phone = 'Enter a phone number with at least 8 digits.';
    }
    if (!form.need) e.need = 'Choose a niche.';
    if (!form.type) e.type = 'Choose an engagement type.';
    if (!form.budget) e.budget = 'Choose a budget range.';
    if (form.msg.trim().length < 10) {
      e.msg = 'Write at least a short sentence so we can help.';
    }

    setErr(e);
    if (!Object.keys(e).length) {
      setSent(true);
      showToast('Consultation requested');
      setTimeout(() => {
        const c = document.getElementById('consult');
        if (c) c.scrollIntoView({ block: 'center' });
      }, 20);
    } else {
      setTimeout(() => {
        const firstErr = document.querySelector<HTMLElement>(
          '.fld.err .inp, .fld.err .dd-btn, .check.err input',
        );
        if (firstErr) {
          firstErr.scrollIntoView({ block: 'center' });
          firstErr.focus({ preventScroll: true });
        }
      }, 20);
    }
  };

  return (
    <>
      <section className="phead">
        <div className="wrap about-split">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <Icon name="chevron-down" />
              <span>Hire talent</span>
            </div>
            <h1 style={{ maxWidth: '15ch' }}>Hire trained talent for your business.</h1>
            <p className="lede">
              Meet graduates who have proven their skills through real projects, across tech,
              creative and business. Tell us what you need and we will help you find the right fit.
            </p>
            <div className="hero-cta" style={{ marginTop: 28 }}>
              <a
                className="btn btn-brand"
                href="#talent-list"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('talent-list');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse talent <Icon name="arrow-right" className="arr" />
              </a>
              <a
                className="btn btn-line"
                href="#consult"
                onClick={(e) => {
                  e.preventDefault();
                  setForm((prev) => ({ ...prev, talent: '' }));
                  setSent(false);
                  const el = document.getElementById('consult');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request a consultation
              </a>
            </div>
            <div className="review-only">
              <OdTag id="OD-07" />
            </div>
          </div>
          <Photo slot="hire" idx={5} className="arch" />
        </div>
      </section>

      <section className="sec-sm on-mist">
        <div className="wrap">
          <div className="why3">
            <div className="req">
              <Icon name="hammer" />
              <div>
                <b>Proven through projects</b>
                <p>
                  Every graduate has built and presented real work, so you see what they can do
                  before you hire.
                </p>
              </div>
            </div>
            <div className="req">
              <Icon name="user-check" />
              <div>
                <b>Matched to your need</b>
                <p>
                  Tell us the role or project and we shortlist talent that fits your skills, budget
                  and timeline.
                </p>
              </div>
            </div>
            <div className="req">
              <Icon name="handshake" />
              <div>
                <b>Flexible engagement</b>
                <p>
                  Hire for a full-time role, a contract, or a single project. Choose what works for
                  your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="talent-list">
        <div className="wrap">
          <div className="head row">
            <div style={{ maxWidth: 640 }}>
              <h2>Meet our talent</h2>
              <p>
                Browse graduate profiles by niche. Request a consultation when you find someone who
                fits.
              </p>
              <div className="review-only">
                <OdTag id="OD-05" />
              </div>
            </div>
          </div>

          <div className="tabs-scroll" id="hirechips">
            {chipOptions.map(([id, n]) => (
              <button
                key={id}
                type="button"
                className={`chip ${hireNiche === id ? 'on' : ''}`.trim()}
                onClick={() => setHireNiche(id)}
              >
                {n}
              </button>
            ))}
          </div>

          <div id="tgrid">
            <div className="talent">
              {filteredTalent.map((t) => {
                const extra = t.skills.length - 2;
                return (
                  <div
                    key={t.id}
                    className="tcardx"
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${t.n}’s profile`}
                    onClick={() => openTalentProfile(t.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openTalentProfile(t.id);
                      }
                    }}
                  >
                    <Photo slot={`talent-${t.id}`} idx={t.p} />
                    <span className="av badge">
                      <i />
                      {t.av}
                    </span>
                    <div className="tb">
                      <h3>{t.n}</h3>
                      <span className="trole">{t.role}</span>
                      <div className="tags">
                        {t.skills.slice(0, 2).map((s) => (
                          <span key={s} className="tag">
                            {s}
                          </span>
                        ))}
                        {extra > 0 ? (
                          <span className="tag more" title="See all skills in the profile">
                            +{extra} more
                          </span>
                        ) : null}
                      </div>
                      <span className="go">
                        View profile <Icon name="arrow-right" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sec on-night">
        <div className="wrap">
          <div className="head">
            <h2>How hiring works</h2>
          </div>
          <div className="steps s3">
            {HIRE_STEPS.map(([h, p], i) => (
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

      <section className="sec" id="consult">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="panel">
            {sent ? (
              <>
                <div className="okmark">
                  <Icon name="check" />
                </div>
                <h2>Consultation requested</h2>
                <p className="muted">
                  Thank you, {form.name.split(' ')[0]}. Our team will contact you at {form.email} to
                  discuss your needs.
                </p>
                <div className="wnav">
                  <a
                    className="btn btn-line"
                    href="#talent-list"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('talent-list');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Back to talent
                  </a>
                  <button
                    type="button"
                    className="btn btn-brand"
                    onClick={() => {
                      setForm(INITIAL_CONSULT);
                      setErr({});
                      setSent(false);
                    }}
                  >
                    Send another request
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Request a consultation</h2>
                <p className="muted">
                  {selectedTalent ? (
                    <>
                      You are asking about <b>{selectedTalent.n}</b>, {selectedTalent.role}.{' '}
                    </>
                  ) : null}
                  Tell us about your business and what you need.
                </p>
                <div className="form">
                  <div className="f2">
                    <div className={`fld ${err.name ? 'err' : ''}`.trim()}>
                      <label htmlFor="consult-name">Your name</label>
                      <input
                        className="inp"
                        id="consult-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        autoComplete="name"
                      />
                      {err.name ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.name}
                        </span>
                      ) : null}
                    </div>

                    <div className={`fld ${err.company ? 'err' : ''}`.trim()}>
                      <label htmlFor="consult-company">Company or organisation</label>
                      <input
                        className="inp"
                        id="consult-company"
                        type="text"
                        value={form.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        autoComplete="organization"
                      />
                      {err.company ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.company}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="f2">
                    <div className={`fld ${err.email ? 'err' : ''}`.trim()}>
                      <label htmlFor="consult-email">Work email</label>
                      <input
                        className="inp"
                        id="consult-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                      {err.email ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.email}
                        </span>
                      ) : null}
                    </div>

                    <div className={`fld ${err.phone ? 'err' : ''}`.trim()}>
                      <label htmlFor="consult-phone">Phone or WhatsApp number</label>
                      <input
                        className="inp"
                        id="consult-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+234 …"
                        autoComplete="tel"
                      />
                      {err.phone ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.phone}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="f2">
                    <div className={`fld ${err.need ? 'err' : ''}`.trim()}>
                      <label htmlFor="dd-consult.need">Skill or niche needed</label>
                      <CustomDropdown
                        id="consult.need"
                        value={form.need}
                        onChange={(v) => updateField('need', v)}
                        options={needOpts}
                        placeholder="Choose a niche"
                      />
                      {err.need ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.need}
                        </span>
                      ) : null}
                    </div>

                    <div className={`fld ${err.type ? 'err' : ''}`.trim()}>
                      <label htmlFor="dd-consult.type">Type of engagement</label>
                      <CustomDropdown
                        id="consult.type"
                        value={form.type}
                        onChange={(v) => updateField('type', v)}
                        options={[
                          'Full-time hire',
                          'Contract or freelance',
                          'Project-based work',
                          'Not sure yet',
                        ].map((v) => ({ v, l: v }))}
                        placeholder="Choose an engagement type"
                      />
                      {err.type ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.type}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className={`fld ${err.budget ? 'err' : ''}`.trim()}>
                    <label htmlFor="dd-consult.budget">Budget range</label>
                    <CustomDropdown
                      id="consult.budget"
                      value={form.budget}
                      onChange={(v) => updateField('budget', v)}
                      options={BUDGETS.map((b) => ({ v: b, l: b }))}
                      placeholder="Choose a budget range"
                    />
                    {err.budget ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.budget}
                      </span>
                    ) : null}
                  </div>

                  <div className={`fld ${err.msg ? 'err' : ''}`.trim()}>
                    <label htmlFor="consult-msg">Tell us about the role or project</label>
                    <textarea
                      className="inp"
                      id="consult-msg"
                      value={form.msg}
                      onChange={(e) => updateField('msg', e.target.value)}
                      placeholder="What do you need done, and when?"
                    />
                    {err.msg ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.msg}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <button type="button" className="btn btn-brand" onClick={handleSubmit}>
                      Request consultation <Icon name="arrow-right" className="arr" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
