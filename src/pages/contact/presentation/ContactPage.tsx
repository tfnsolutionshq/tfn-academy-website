import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiError } from '@/core/api';
import type { ApiContactResponse } from '@/core/api';
import { useSubmitContactMutation } from '@/hooks/queries';
import { EMAIL_REGEX, HUB_ADDRESS } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { CustomDropdown } from '@/shared/components/ui/Illustrations';
import { Spinner } from '@/shared/components/ui/Loading';
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

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  topic: string;
  msg: string;
  consent: boolean;
}

const INITIAL_CONTACT: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  topic: '',
  msg: '',
  consent: true,
};

function scrollToFirstError() {
  setTimeout(() => {
    const firstErr = document.querySelector<HTMLElement>(
      '.fld.err .inp, .fld.err .dd-btn, .check.err input',
    );
    if (firstErr) {
      firstErr.scrollIntoView({ block: 'center', behavior: 'smooth' });
      firstErr.focus({ preventScroll: true });
    }
  }, 20);
}

export default function ContactPage() {
  const { showToast } = useToast();
  const { contactPreset } = useSite();
  const submitMutation = useSubmitContactMutation();

  const [form, setForm] = useState<ContactFormState>(INITIAL_CONTACT);
  const [err, setErr] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<ApiContactResponse | null>(null);

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
      setSubmitError(null);
      setSubmitted(null);
    }
  }, [contactPreset]);

  const updateField = <K extends keyof ContactFormState>(key: K, val: ContactFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setSubmitError(null);
    setErr((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleCopyRef = async (ref: string) => {
    try {
      await navigator.clipboard.writeText(ref);
      showToast('Reference copied');
    } catch {
      showToast(ref);
    }
  };

  const handleSubmit = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Enter your name.';
    if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = 'Enter an email address like name@example.com.';
    }
    const cleanPhone = form.phone.trim();
    if (cleanPhone && cleanPhone.replace(/\D/g, '').length < 8) {
      e.phone = 'Enter a valid phone number (at least 8 digits).';
    }
    if (!form.topic) e.topic = 'Choose a topic.';
    if (form.msg.trim().length < 10) {
      e.msg = 'Write at least a short sentence so we can help.';
    }
    if (!form.consent) {
      e.consent = 'Please confirm you agree to be contacted regarding your message.';
    }

    setErr(e);
    setSubmitError(null);

    if (Object.keys(e).length > 0) {
      scrollToFirstError();
      return;
    }

    submitMutation.mutate(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        ...(cleanPhone ? { phone: cleanPhone } : {}),
        topic: form.topic,
        message: form.msg.trim(),
        consent: form.consent,
      },
      {
        onSuccess: (res) => {
          setSubmitted(res);
          setSubmitError(null);
          showToast('Message sent');
        },
        onError: (error) => {
          if (error instanceof ApiError) {
            if (error.errors) {
              const mapped: Record<string, string> = {};
              const fieldMap: Record<string, string> = {
                name: 'name',
                email: 'email',
                phone: 'phone',
                topic: 'topic',
                message: 'msg',
                consent: 'consent',
              };
              for (const [k, msgs] of Object.entries(error.errors)) {
                const uiKey = fieldMap[k] || k;
                if (Array.isArray(msgs) && msgs.length > 0) mapped[uiKey] = msgs[0];
              }
              if (Object.keys(mapped).length > 0) {
                setErr(mapped);
                scrollToFirstError();
              }
            }
            const msg = error.message || 'Could not send your message. Please check your details.';
            setSubmitError(msg);
            showToast(msg);
          } else {
            const msg = 'Could not send your message right now. Please try again.';
            setSubmitError(msg);
            showToast(msg);
          }
        },
      },
    );
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
            {submitted ? (
              <>
                <div className="okmark">
                  <Icon name="check" />
                </div>
                <h2>Message sent</h2>
                <p className="muted" style={{ marginTop: 8 }}>
                  Thanks, {form.name.trim().split(' ')[0]}. We’ve received your enquiry about{' '}
                  <b>{submitted.topic || form.topic}</b> and will reply to <b>{form.email}</b>.
                </p>

                {submitted.reference ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      flexWrap: 'wrap',
                      marginTop: 18,
                      padding: '12px 16px',
                      borderRadius: 12,
                      background: 'var(--mist)',
                    }}
                  >
                    <div>
                      <span className="small muted" style={{ display: 'block' }}>
                        Reference number
                      </span>
                      <b style={{ fontSize: '1.05rem', letterSpacing: '0.02em' }}>
                        {submitted.reference}
                      </b>
                    </div>
                    <button
                      type="button"
                      className="btn btn-line btn-sm"
                      onClick={() => void handleCopyRef(submitted.reference)}
                    >
                      <Icon name="copy" /> Copy reference
                    </button>
                  </div>
                ) : null}

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
                      setSubmitError(null);
                      setSubmitted(null);
                    }}
                  >
                    Send another message
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Send a message</h2>
                <p className="muted">Tell us how we can help and our team will reply promptly.</p>

                {submitError ? (
                  <div
                    role="alert"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      marginTop: 14,
                      padding: '12px 14px',
                      borderRadius: 12,
                      background: 'rgba(220, 38, 38, 0.08)',
                      border: '1px solid rgba(220, 38, 38, 0.25)',
                      color: '#b91c1c',
                      fontSize: '0.92rem',
                    }}
                  >
                    <Icon name="circle-alert" />
                    <span>{submitError}</span>
                  </div>
                ) : null}

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
                        disabled={submitMutation.isPending}
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
                        disabled={submitMutation.isPending}
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
                      <label htmlFor="contact-phone">
                        Phone / WhatsApp <span className="muted">(optional)</span>
                      </label>
                      <input
                        className="inp"
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+234 800 000 0000"
                        autoComplete="tel"
                        disabled={submitMutation.isPending}
                      />
                      {err.phone ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.phone}
                        </span>
                      ) : null}
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
                  </div>

                  <div className={`fld ${err.msg ? 'err' : ''}`.trim()}>
                    <label htmlFor="contact-msg">Message</label>
                    <textarea
                      className="inp"
                      id="contact-msg"
                      value={form.msg}
                      onChange={(e) => updateField('msg', e.target.value)}
                      placeholder="Tell us what you’d like to know"
                      disabled={submitMutation.isPending}
                    />
                    {err.msg ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.msg}
                      </span>
                    ) : null}
                  </div>

                  <label className={`check ${err.consent ? 'err' : ''}`.trim()}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => updateField('consent', e.target.checked)}
                      disabled={submitMutation.isPending}
                    />
                    <span>
                      I agree to TFN Academy contacting me by email or phone regarding this
                      enquiry.
                    </span>
                  </label>
                  {err.consent ? (
                    <span className="emsg">
                      <Icon name="circle-alert" />
                      {err.consent}
                    </span>
                  ) : null}

                  <div>
                    <button
                      type="button"
                      className="btn btn-brand"
                      onClick={handleSubmit}
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Spinner size="xs" variant="white" label="Sending message" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message <Icon name="arrow-right" className="arr" />
                        </>
                      )}
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
