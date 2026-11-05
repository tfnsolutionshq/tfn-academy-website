import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EMAIL_REGEX, HUB_ADDRESS } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { CustomDropdown } from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';
import { useToast } from '@/shared/context/ToastContext';

const TOPICS = [
  'Choosing a programme',
  'Corporate training',
  'Scholarships',
  'Requirements and setup',
  'Fees and payment',
  'Kids & Teens programmes',
  'Hiring talent',
  'Partnerships',
  'Something else',
];

const INITIAL_CONTACT = {
  name: '',
  email: '',
  topic: '',
  msg: '',
};

export default function ContactPage() {
  const { showToast } = useToast();
  const { contactPreset } = useSite();

  const [form, setForm] = useState(INITIAL_CONTACT);
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (contactPreset.key > 0) {
      setForm((prev) => ({
        ...prev,
        topic: contactPreset.topic || prev.topic,
        msg: prev.msg.trim() ? prev.msg : contactPreset.msg || '',
      }));
      setErr((prev) => {
        const next = { ...prev };
        delete next.topic;
        return next;
      });
      setSent(false);
    }
  }, [contactPreset]);

  const updateField = (key: keyof typeof INITIAL_CONTACT, val: string) => {
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
    if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = 'Enter an email address like name@example.com.';
    }
    if (!form.topic) e.topic = 'Choose a topic.';
    if (form.msg.trim().length < 10) {
      e.msg = 'Write at least a short sentence so we can help.';
    }

    setErr(e);
    if (!Object.keys(e).length) {
      setSent(true);
      showToast('Message sent');
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
        <div className="wrap">
          <div className="crumbs">
            <Link to="/">Home</Link>
            <Icon name="chevron-down" />
            <span>Contact</span>
          </div>
          <h1>Ask us anything</h1>
          <p className="lede">
            Questions about programmes, requirements or applying? Send a message and admissions
            will get back to you.
          </p>
        </div>
      </section>

      <section className="sec-end">
        <div className="wrap apply contact-grid">
          <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
            <div className="req">
              <Icon name="mail" />
              <div>
                <b>Email</b>
                <p>
                  <a href="mailto:info@tfnacademy.ng">info@tfnacademy.ng</a>
                </p>
              </div>
            </div>
            <div className="req">
              <Icon name="phone" />
              <div>
                <b>Phone and WhatsApp</b>
                <p>
                  <a href="tel:+2347120033922">+234 712 003 3922</a>
                </p>
              </div>
            </div>
            <div className="req">
              <Icon name="map-pin" />
              <div>
                <b>Location</b>
                <p>
                  {HUB_ADDRESS}
                  <br />
                  <span className="muted">Virtual: coming soon</span>
                </p>
              </div>
            </div>
          </div>

          <div className="panel">
            {sent ? (
              <>
                <div className="okmark">
                  <Icon name="check" />
                </div>
                <h2>Message sent</h2>
                <p className="muted" style={{ marginTop: 8 }}>
                  Thanks, {form.name.split(' ')[0]}. We’ll reply to {form.email}.
                </p>
                <div className="wnav">
                  <Link className="btn btn-line" to="/programmes">
                    Browse programmes
                  </Link>
                  <button
                    type="button"
                    className="btn btn-brand"
                    onClick={() => {
                      setForm(INITIAL_CONTACT);
                      setErr({});
                      setSent(false);
                    }}
                  >
                    Send another message
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Send a message</h2>
                <p className="muted">All fields are required.</p>
                <div className="form">
                  <div className="f2">
                    <div className={`fld ${err.name ? 'err' : ''}`.trim()}>
                      <label htmlFor="contact-name">Your name</label>
                      <input
                        className="inp"
                        id="contact-name"
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
                      <label htmlFor="contact-email">Email address</label>
                      <input
                        className="inp"
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
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

                  <div className={`fld ${err.topic ? 'err' : ''}`.trim()}>
                    <label htmlFor="dd-contact.topic">What’s it about?</label>
                    <CustomDropdown
                      id="contact.topic"
                      value={form.topic}
                      onChange={(v) => updateField('topic', v)}
                      options={TOPICS.map((t) => ({ v: t, l: t }))}
                      placeholder="Choose a topic"
                    />
                    {err.topic ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.topic}
                      </span>
                    ) : null}
                  </div>

                  <div className={`fld ${err.msg ? 'err' : ''}`.trim()}>
                    <label htmlFor="contact-msg">Message</label>
                    <textarea
                      className="inp"
                      id="contact-msg"
                      value={form.msg}
                      onChange={(e) => updateField('msg', e.target.value)}
                      placeholder="Tell us what you’d like to know"
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
                      Send message <Icon name="arrow-right" className="arr" />
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
