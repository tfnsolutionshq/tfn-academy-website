import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAREERS, EMAIL_REGEX } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { CustomDropdown, OdTag, Photo } from '@/shared/components/ui/Illustrations';
import { useToast } from '@/shared/context/ToastContext';

const HIRE_STEPS: Array<[title: string, desc: string]> = [
  ['Apply', 'Send your details and tell us about yourself.'],
  ['Screening', 'We review your experience and have a short conversation.'],
  ['Interview', 'Meet the team and, for teaching roles, run a short demo session.'],
  ['Offer', 'Receive an offer and join our onboarding.'],
];

const INITIAL_CAREER = {
  name: '',
  email: '',
  phone: '',
  role: '',
  link: '',
  cv: '',
  msg: '',
};

export default function CareersPage() {
  const { showToast } = useToast();
  const [careerDept, setCareerDept] = useState('all');
  const [openRoles, setOpenRoles] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState(INITIAL_CAREER);
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const depts = ['all', ...Array.from(new Set(CAREERS.map((r) => r.dept)))];
  const filteredRoles = CAREERS.filter((r) => careerDept === 'all' || r.dept === careerDept);

  const roleOpts = [
    ...CAREERS.map((r) => ({ v: r.id, l: r.t, g: 'Open roles' })),
    { v: 'general', l: 'General application', g: 'Other' },
  ];

  const selectedRole = CAREERS.find((r) => r.id === form.role);

  const updateField = (key: keyof typeof INITIAL_CAREER, val: string) => {
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
    if (form.name.trim().split(/\s+/).length < 2) {
      e.name = 'Enter your first and last name.';
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = 'Enter an email address like name@example.com.';
    }
    if (!/^\+?\d[\d\s-]{7,16}$/.test(form.phone.trim())) {
      e.phone = 'Enter a phone number with at least 8 digits.';
    }
    if (!form.role) {
      e.role = 'Choose a role or send a general application.';
    }
    if (form.msg.trim().length < 10) {
      e.msg = 'Tell us a little about yourself.';
    }

    setErr(e);
    if (!Object.keys(e).length) {
      setSent(true);
      showToast('Application sent');
      setTimeout(() => {
        const f = document.getElementById('cform');
        if (f) f.scrollIntoView({ block: 'center' });
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
              <Link to="/about">Academy</Link>
              <Icon name="chevron-down" />
              <span>Careers</span>
            </div>
            <h1 style={{ maxWidth: '14ch' }}>Build your career with TFN.</h1>
            <p className="lede">
              Help us train the next generation of Nigerian talent. Join a growing team that
              teaches, builds and supports learners every day.
            </p>
            <div className="hero-cta" style={{ marginTop: 28 }}>
              <a
                className="btn btn-brand"
                href="#open-roles"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('open-roles');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See open roles <Icon name="arrow-right" className="arr" />
              </a>
              <a
                className="btn btn-line"
                href="#cform"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('cform');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Send an application
              </a>
            </div>
            <div className="review-only">
              <OdTag id="OD-11" />
            </div>
          </div>
          <Photo slot="careers" idx={6} className="arch" />
        </div>
      </section>

      <section className="sec on-mist">
        <div className="wrap">
          <div className="head">
            <h2>Why work with TFN Academy</h2>
            <p>A purposeful place to grow your own career while shaping others.</p>
          </div>
          <div className="reqs">
            <div className="req">
              <Icon name="graduation-cap" />
              <div>
                <b>Shape young talent</b>
                <p>See learners go from first lesson to real projects, certifications and jobs.</p>
              </div>
            </div>
            <div className="req">
              <Icon name="rocket" />
              <div>
                <b>Grow with us</b>
                <p>We are building something new, with room to learn, lead and take on more.</p>
              </div>
            </div>
            <div className="req">
              <Icon name="users" />
              <div>
                <b>A collaborative team</b>
                <p>Work with instructors, mentors and the wider TFN Solutions family.</p>
              </div>
            </div>
            <div className="req">
              <Icon name="laptop" />
              <div>
                <b>Modern, hybrid environment</b>
                <p>
                  Teach and work in person and online, with reliable power and internet at our hub.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="open-roles">
        <div className="wrap">
          <div className="head">
            <h2>Open roles</h2>
            <p>Choose a role to read the details and apply.</p>
            <div className="review-only">
              <OdTag id="OD-11" />
            </div>
          </div>

          <div className="tabs-scroll" id="cdepts">
            {depts.map((d) => (
              <button
                key={d}
                type="button"
                className={`chip ${careerDept === d ? 'on' : ''}`.trim()}
                onClick={() => setCareerDept(d)}
              >
                {d === 'all' ? 'All roles' : d}
              </button>
            ))}
          </div>

          <div id="roles">
            <div className="roles">
              {filteredRoles.map((r) => {
                const isOpen = !!openRoles[r.id];
                return (
                  <div key={r.id} className={`role ${isOpen ? 'open' : ''}`.trim()}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenRoles((prev) => ({ ...prev, [r.id]: !prev[r.id] }))}
                    >
                      <span>
                        <b>{r.t}</b>
                        <span className="rm">
                          <span className="pill">{r.dept}</span>
                          <span className="tag">{r.type}</span>
                          <span className="tag">{r.loc}</span>
                        </span>
                      </span>
                      <Icon name="chevron-down" />
                    </button>
                    <div className="bw">
                      <div className="bi">
                        <div className="rb">
                          <p className="muted">{r.sum}</p>
                          <div className="rcols">
                            <div>
                              <h5>What you’ll do</h5>
                              <ul>
                                {r.resp.map((x) => (
                                  <li key={x}>{x}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5>What we’re looking for</h5>
                              <ul>
                                {r.req.map((x) => (
                                  <li key={x}>{x}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-brand btn-sm"
                              onClick={() => {
                                updateField('role', r.id);
                                setSent(false);
                                const f = document.getElementById('cform');
                                if (f) f.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              Apply for this role <Icon name="arrow-right" className="arr" />
                            </button>
                          </div>
                        </div>
                      </div>
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
            <h2>How we hire</h2>
          </div>
          <div className="steps">
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

      <section className="sec" id="cform">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="panel">
            {sent ? (
              <>
                <div className="okmark">
                  <Icon name="check" />
                </div>
                <h2>Application received</h2>
                <p className="muted">
                  Thank you, {form.name.split(' ')[0]}. Our team will review your details and get in
                  touch at {form.email}.
                </p>
                <div className="wnav">
                  <Link className="btn btn-line" to="/about">
                    Back to the academy
                  </Link>
                  <button
                    type="button"
                    className="btn btn-brand"
                    onClick={() => {
                      setForm(INITIAL_CAREER);
                      setErr({});
                      setSent(false);
                    }}
                  >
                    Send another application
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Apply to join the team</h2>
                <p className="muted">
                  {selectedRole ? (
                    <>
                      You are applying for <b>{selectedRole.t}</b>.{' '}
                    </>
                  ) : null}
                  Don’t see a fit? Choose “General application”.
                </p>
                <div className="form">
                  <div className={`fld ${err.role ? 'err' : ''}`.trim()}>
                    <label htmlFor="dd-career.role">Role</label>
                    <CustomDropdown
                      id="career.role"
                      value={form.role}
                      onChange={(v) => updateField('role', v)}
                      options={roleOpts}
                      placeholder="Choose a role"
                    />
                    {err.role ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.role}
                      </span>
                    ) : null}
                  </div>

                  <div className="f2">
                    <div className={`fld ${err.name ? 'err' : ''}`.trim()}>
                      <label htmlFor="career-name">Full name</label>
                      <input
                        className="inp"
                        id="career-name"
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

                    <div className={`fld ${err.email ? 'err' : ''}`.trim()}>
                      <label htmlFor="career-email">Email address</label>
                      <input
                        className="inp"
                        id="career-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                      {err.email ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.email}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="f2">
                    <div className={`fld ${err.phone ? 'err' : ''}`.trim()}>
                      <label htmlFor="career-phone">Phone or WhatsApp number</label>
                      <input
                        className="inp"
                        id="career-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        autoComplete="tel"
                      />
                      {err.phone ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.phone}
                        </span>
                      ) : null}
                    </div>

                    <div className="fld">
                      <label htmlFor="career-link">LinkedIn or portfolio link</label>
                      <input
                        className="inp"
                        id="career-link"
                        type="text"
                        value={form.link}
                        onChange={(e) => updateField('link', e.target.value)}
                        placeholder="https://"
                      />
                      <span className="hint">Optional</span>
                    </div>
                  </div>

                  <div className="fld">
                    <label>
                      CV or resume <span className="muted">(optional)</span>
                    </label>
                    <label className="upload">
                      <Icon name="file-up" />
                      <span id="cvname">{form.cv || 'Choose a file (PDF or Word)'}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          updateField('cv', f ? f.name : '');
                        }}
                      />
                    </label>
                  </div>

                  <div className={`fld ${err.msg ? 'err' : ''}`.trim()}>
                    <label htmlFor="career-msg">Tell us about yourself</label>
                    <textarea
                      className="inp"
                      id="career-msg"
                      value={form.msg}
                      onChange={(e) => updateField('msg', e.target.value)}
                      placeholder="Your experience and why you’d like to join TFN Academy"
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
                      Submit application <Icon name="arrow-right" className="arr" />
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
