import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EMAIL_REGEX, KIDS, KID_AGES, NG_PHONE_REGEX } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { CustomDropdown, OdTag, Photo } from '@/shared/components/ui/Illustrations';
import { useToast } from '@/shared/context/ToastContext';

const KIDS_STEPS: Array<[title: string, desc: string]> = [
  ['Register interest', 'Tell us about your child and the programme they like.'],
  ['Receive cohort details', 'We share dates, format and fees before each school holiday.'],
  ['Learn and create', 'Children learn by making projects they can proudly show at home.'],
];

const INITIAL_KIDS = {
  parent: '',
  email: '',
  phone: '',
  child: '',
  age: '',
  prog: '',
  consent: false,
};

export default function KidsPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState(INITIAL_KIDS);
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const updateField = (key: keyof typeof INITIAL_KIDS, val: string | boolean) => {
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
    if (form.parent.trim().split(/\s+/).length < 2) {
      e.parent = 'Enter the parent or guardian’s first and last name.';
    }
    if (!form.child.trim()) e.child = 'Enter your child’s first name.';
    if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = 'Enter an email address like name@example.com.';
    }
    if (!NG_PHONE_REGEX.test(form.phone.replace(/[\s-]/g, ''))) {
      e.phone = 'Enter a Nigerian number starting with 07, 08 or 09, or +234.';
    }
    if (!form.age) e.age = 'Choose an age group.';
    if (!form.prog) e.prog = 'Choose a programme.';
    if (!form.consent) e.consent = 'Tick the box so we can contact you.';

    setErr(e);
    if (!Object.keys(e).length) {
      setSent(true);
      showToast('Interest registered');
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
              <span>Kids & Teens</span>
            </div>
            <h1 style={{ maxWidth: '14ch' }}>Holiday programmes for young learners.</h1>
            <p className="lede">
              Fun, hands-on programmes during school holidays that build digital skills, creativity
              and confidence. There is no minimum age.
            </p>
            <div className="hero-cta" style={{ marginTop: 28 }}>
              <a
                className="btn btn-accent"
                href="#kids-form"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('kids-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Register interest <Icon name="arrow-right" className="arr" />
              </a>
            </div>
            <div className="review-only">
              <OdTag id="OD-06" />
            </div>
          </div>
          <div className="kidspics">
            <Photo slot="kids1" idx={10} className="arch" />
            <Photo slot="kids2" idx={12} className="arch" />
          </div>
        </div>
      </section>

      <section className="sec on-mist">
        <div className="wrap">
          <div className="head">
            <h2>What young learners can explore</h2>
            <p>Programmes are designed for two age bands: Kids (7 to 12) and Teens (13 to 17).</p>
          </div>
          <div className="kgrid">
            {KIDS.map((k) => (
              <div key={k.t} className="kcard">
                <Icon name={k.ic} />
                <h3>{k.t}</h3>
                <p>{k.d}</p>
                <div className="tags" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {k.tags.map((x) => (
                    <span key={x} className="tag">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <h2>How holiday cohorts work</h2>
          </div>
          <div className="steps s3">
            {KIDS_STEPS.map(([h, p], i) => (
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

      <section className="sec on-mist" id="kids-form">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="panel">
            {sent ? (
              <>
                <div className="okmark">
                  <Icon name="check" />
                </div>
                <h2>Thank you, {form.parent.split(' ')[0]}</h2>
                <p className="muted">
                  We’ve noted {form.child}’s interest. Admissions will share holiday cohort details
                  with you soon.
                </p>
                <div className="wnav">
                  <Link className="btn btn-line" to="/programmes">
                    Explore programmes
                  </Link>
                  <button
                    type="button"
                    className="btn btn-brand"
                    onClick={() => {
                      setForm(INITIAL_KIDS);
                      setErr({});
                      setSent(false);
                    }}
                  >
                    Register another child
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Register interest</h2>
                <p className="muted">
                  A parent or guardian should complete this form. We’ll contact you with holiday
                  cohort details.
                </p>
                <div className="form">
                  <div className="f2">
                    <div className={`fld ${err.parent ? 'err' : ''}`.trim()}>
                      <label htmlFor="kids-parent">Parent or guardian’s name</label>
                      <input
                        className="inp"
                        id="kids-parent"
                        type="text"
                        value={form.parent}
                        onChange={(e) => updateField('parent', e.target.value)}
                        autoComplete="name"
                      />
                      {err.parent ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.parent}
                        </span>
                      ) : null}
                    </div>

                    <div className={`fld ${err.child ? 'err' : ''}`.trim()}>
                      <label htmlFor="kids-child">Child’s first name</label>
                      <input
                        className="inp"
                        id="kids-child"
                        type="text"
                        value={form.child}
                        onChange={(e) => updateField('child', e.target.value)}
                        autoComplete="off"
                      />
                      {err.child ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.child}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="f2">
                    <div className={`fld ${err.email ? 'err' : ''}`.trim()}>
                      <label htmlFor="kids-email">Email address</label>
                      <input
                        className="inp"
                        id="kids-email"
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

                    <div className={`fld ${err.phone ? 'err' : ''}`.trim()}>
                      <label htmlFor="kids-phone">Phone or WhatsApp number</label>
                      <input
                        className="inp"
                        id="kids-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="0803 123 4567"
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
                    <div className={`fld ${err.age ? 'err' : ''}`.trim()}>
                      <label htmlFor="dd-kids.age">Age group</label>
                      <CustomDropdown
                        id="kids.age"
                        value={form.age}
                        onChange={(v) => updateField('age', v)}
                        options={KID_AGES.map((a) => ({ v: a, l: a }))}
                        placeholder="Choose an age group"
                      />
                      {err.age ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.age}
                        </span>
                      ) : null}
                    </div>

                    <div className={`fld ${err.prog ? 'err' : ''}`.trim()}>
                      <label htmlFor="dd-kids.prog">Programme of interest</label>
                      <CustomDropdown
                        id="kids.prog"
                        value={form.prog}
                        onChange={(v) => updateField('prog', v)}
                        options={KIDS.map((k) => ({ v: k.t, l: k.t, ic: k.ic }))}
                        placeholder="Choose a programme"
                      />
                      {err.prog ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.prog}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <label
                    className={`check ${form.consent ? 'on' : ''} ${err.consent ? 'err' : ''}`.trim()}
                  >
                    <input
                      type="checkbox"
                      id="kids-consent"
                      checked={form.consent}
                      onChange={(e) => updateField('consent', e.target.checked)}
                    />
                    <span>
                      <b>
                        I agree that TFN Academy can store and use these details to contact me
                        about holiday programmes.
                      </b>
                      <span>We only use them for this purpose.</span>
                    </span>
                  </label>
                  {err.consent ? (
                    <span className="emsg">
                      <Icon name="circle-alert" />
                      {err.consent}
                    </span>
                  ) : null}

                  <div>
                    <button type="button" className="btn btn-brand" onClick={handleSubmit}>
                      Register interest <Icon name="arrow-right" className="arr" />
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
