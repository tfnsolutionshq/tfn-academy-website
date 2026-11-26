import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CORP_AREAS,
  CORP_FIT,
  CORP_FORMATS,
  CORP_STEPS,
  CORP_WHO,
  EMAIL_REGEX,
  NG_PHONE_REGEX,
} from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { Photo, Scene } from '@/shared/components/ui/Illustrations';
import { Skeleton, Spinner } from '@/shared/components/ui/Loading';
import { useToast } from '@/shared/context/ToastContext';
import { useCorporateOverviewQuery, useCorporateRequestMutation } from '@/hooks/queries';
import type {
  ApiCorporateRequestResponse,
  CorporateDeliveryPreference,
} from '@/core/api';

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const DELIVERY_LABELS: Record<CorporateDeliveryPreference, string> = {
  on_site: 'On-site',
  online: 'Online',
  either: 'Either (On-site or Online)',
};

const INITIAL_FORM = {
  organisation: '',
  industry: '',
  team_size: '',
  training_areas: [] as string[],
  delivery_preference: 'on_site' as CorporateDeliveryPreference,
  contact_name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
};

export default function CorporatePage() {
  const { showToast } = useToast();
  const { data: apiCorp, isLoading: isCorpLoading } = useCorporateOverviewQuery();
  const { mutateAsync: submitCorpRequest, isPending: isSubmitting } =
    useCorporateRequestMutation();

  const [form, setForm] = useState(INITIAL_FORM);
  const [err, setErr] = useState<Record<string, string>>({});
  const [submitErr, setSubmitErr] = useState('');
  const [submitted, setSubmitted] = useState<ApiCorporateRequestResponse | null>(null);

  const trainingAreas = useMemo(() => {
    if (apiCorp?.training_areas && apiCorp.training_areas.length > 0) {
      return [...apiCorp.training_areas]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((a) => ({
          slug: a.slug,
          name: a.name,
          description: a.description,
          icon: a.icon || 'laptop',
        }));
    }
    return CORP_AREAS.map((a) => ({
      slug: toSlug(a.t),
      name: a.t,
      description: a.d,
      icon: a.ic,
    }));
  }, [apiCorp?.training_areas]);

  const customisationItems = useMemo(() => {
    if (apiCorp?.customisation && apiCorp.customisation.length > 0) {
      return apiCorp.customisation.map((c, idx) => ({
        name: c.name,
        description: c.description,
        icon: CORP_FIT[idx]?.ic || 'wrench',
      }));
    }
    return CORP_FIT.map((f) => ({ name: f.t, description: f.d, icon: f.ic }));
  }, [apiCorp?.customisation]);

  const formatItems = useMemo(() => {
    if (apiCorp?.formats && apiCorp.formats.length > 0) {
      return apiCorp.formats.map((f, idx) => ({
        name: f.name,
        description: f.description,
        icon: CORP_FORMATS[idx]?.ic || 'presentation',
      }));
    }
    return CORP_FORMATS.map((f) => ({ name: f.t, description: f.d, icon: f.ic }));
  }, [apiCorp?.formats]);

  const whoWeTrain = useMemo(() => {
    if (apiCorp?.who_we_train && apiCorp.who_we_train.length > 0) {
      return apiCorp.who_we_train;
    }
    return CORP_WHO;
  }, [apiCorp?.who_we_train]);

  const processSteps = useMemo(() => {
    if (apiCorp?.process_steps && apiCorp.process_steps.length > 0) {
      return [...apiCorp.process_steps]
        .sort((a, b) => a.step - b.step)
        .map((s) => [s.title, s.description] as const);
    }
    return CORP_STEPS;
  }, [apiCorp?.process_steps]);

  const deliveryOptions = useMemo<CorporateDeliveryPreference[]>(() => {
    if (apiCorp?.delivery_options && apiCorp.delivery_options.length > 0) {
      return apiCorp.delivery_options;
    }
    return ['on_site', 'online', 'either'];
  }, [apiCorp?.delivery_options]);

  const scrollToProposal = (preselectSlug?: string) => {
    if (preselectSlug) {
      setForm((prev) => ({
        ...prev,
        training_areas: prev.training_areas.includes(preselectSlug)
          ? prev.training_areas
          : [...prev.training_areas, preselectSlug],
      }));
    }
    const el = document.getElementById('corp-proposal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const renderCorpCta = (label = 'Request a proposal', cls = 'btn-accent') => (
    <a
      className={`btn ${cls}`}
      href="#corp-proposal"
      onClick={(e) => {
        e.preventDefault();
        scrollToProposal();
      }}
    >
      {label} <Icon name="arrow-right" className="arr" />
    </a>
  );

  const updateField = <K extends keyof typeof INITIAL_FORM>(
    key: K,
    val: (typeof INITIAL_FORM)[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setSubmitErr('');
    setErr((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleArea = (slug: string) => {
    setForm((prev) => {
      const exists = prev.training_areas.includes(slug);
      return {
        ...prev,
        training_areas: exists
          ? prev.training_areas.filter((s) => s !== slug)
          : [...prev.training_areas, slug],
      };
    });
    setSubmitErr('');
    setErr((prev) => {
      if (!prev.training_areas) return prev;
      const next = { ...prev };
      delete next.training_areas;
      return next;
    });
  };

  const focusFirstError = () => {
    setTimeout(() => {
      const firstErr = document.querySelector<HTMLElement>(
        '.fld.err .inp, .fld.err button, .check.err input',
      );
      if (firstErr) {
        firstErr.scrollIntoView({ block: 'center' });
        firstErr.focus({ preventScroll: true });
      }
    }, 20);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setSubmitErr('');

    const e: Record<string, string> = {};
    if (!form.organisation.trim()) e.organisation = 'Enter your organisation name.';
    if (!form.industry.trim()) e.industry = 'Enter your industry or sector.';
    if (!form.team_size.trim()) e.team_size = 'Enter your approximate team size.';
    if (form.training_areas.length === 0) {
      e.training_areas = 'Select at least one training area.';
    }
    if (form.contact_name.trim().split(/\s+/).length < 2) {
      e.contact_name = 'Enter the contact person’s first and last name.';
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = 'Enter a valid work email address.';
    }
    if (!NG_PHONE_REGEX.test(form.phone.replace(/[\s-]/g, ''))) {
      e.phone = 'Enter a Nigerian phone number starting with 07, 08, 09 or +234.';
    }
    if (form.message.trim().length < 15) {
      e.message = 'Tell us briefly about your goals and preferred schedule (at least 15 characters).';
    }
    if (!form.consent) {
      e.consent = 'Tick the box so we can contact you with a proposal.';
    }

    setErr(e);
    if (Object.keys(e).length > 0) {
      focusFirstError();
      return;
    }

    try {
      const res = await submitCorpRequest({
        organisation: form.organisation.trim(),
        industry: form.industry.trim(),
        team_size: form.team_size.trim(),
        training_areas: form.training_areas,
        delivery_preference: form.delivery_preference,
        contact_name: form.contact_name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/[\s-]/g, ''),
        message: form.message.trim(),
        consent: form.consent,
      });
      setSubmitted(res);
      showToast('Proposal request submitted');
    } catch (error: unknown) {
      const apiErr = error as { message?: string; errors?: Record<string, string[]> };
      if (apiErr?.errors && Object.keys(apiErr.errors).length > 0) {
        const mapped: Record<string, string> = {};
        for (const [k, msgs] of Object.entries(apiErr.errors)) {
          if (msgs && msgs.length > 0) {
            mapped[k] = msgs[0];
          }
        }
        setErr(mapped);
        focusFirstError();
      }
      const msg = apiErr?.message || 'Could not submit your request. Please try again.';
      setSubmitErr(msg);
      showToast(msg);
    }
  };

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
            {isCorpLoading && !apiCorp
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="ccard" style={{ display: 'grid', gap: 10 }}>
                    <Skeleton width="36px" height="36px" radius="10px" />
                    <Skeleton width="75%" height="20px" radius="6px" />
                    <Skeleton width="100%" height="14px" radius="4px" />
                    <Skeleton width="85%" height="14px" radius="4px" />
                  </div>
                ))
              : trainingAreas.map((a) => (
                  <div key={a.slug} className="ccard">
                    <Icon name={a.icon} />
                    <h3>{a.name}</h3>
                    <p>{a.description}</p>
                  </div>
                ))}
          </div>
          <p className="muted" style={{ marginTop: 22 }}>
            Need something different? We build training around your needs.{' '}
            <a
              href="#corp-proposal"
              onClick={(e) => {
                e.preventDefault();
                scrollToProposal();
              }}
            >
              Tell us what you’re looking for
            </a>
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
              {customisationItems.map((f) => (
                <div key={f.name} className="pt">
                  <Icon name={f.icon} />
                  <div>
                    <h3>{f.name}</h3>
                    <p>{f.description}</p>
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
            {formatItems.map((f) => (
              <div key={f.name} className="fmtc">
                <Icon name={f.icon} />
                <h3>{f.name}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec on-night">
        <div className="wrap split rev">
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
            {whoWeTrain.map((w) => (
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
            {processSteps.map(([h, p], i) => (
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

      <section className="sec" id="corp-proposal">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="panel">
            {submitted ? (
              <>
                <div className="okmark">
                  <Icon name="check" />
                </div>
                <h2>Proposal request received</h2>
                <p className="muted">
                  Thank you, {form.contact_name.split(' ')[0]}. Our corporate training team has
                  received the request for <b>{submitted.organisation}</b> and will follow up
                  shortly with a tailored proposal.
                </p>
                <div className="ref">
                  <Icon name="flag" />
                  <span>{submitted.reference}</span>
                  <button
                    type="button"
                    className="iconbtn sm"
                    aria-label="Copy request reference"
                    title="Copy request reference"
                    onClick={() => {
                      (navigator.clipboard
                        ? navigator.clipboard.writeText(submitted.reference)
                        : Promise.reject()
                      ).then(
                        () => showToast('Reference copied'),
                        () => showToast('Copy not available. Please copy it manually.'),
                      );
                    }}
                  >
                    <Icon name="copy" />
                  </button>
                </div>
                <dl className="summary" style={{ marginTop: 22 }}>
                  <div>
                    <dt>Organisation</dt>
                    <dd>{submitted.organisation}</dd>
                    <span />
                  </div>
                  <div>
                    <dt>Training areas</dt>
                    <dd>{submitted.training_areas.join(', ')}</dd>
                    <span />
                  </div>
                  <div>
                    <dt>Delivery preference</dt>
                    <dd>
                      {DELIVERY_LABELS[submitted.delivery_preference] ||
                        submitted.delivery_preference}
                    </dd>
                    <span />
                  </div>
                </dl>
                <div className="wnav">
                  <Link className="btn btn-line" to="/programmes">
                    Explore programmes
                  </Link>
                  <button
                    type="button"
                    className="btn btn-brand"
                    onClick={() => {
                      setSubmitted(null);
                      setForm(INITIAL_FORM);
                      setErr({});
                      setSubmitErr('');
                    }}
                  >
                    Submit another request
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Request a corporate training proposal</h2>
                <p className="muted">
                  Tell us about your organisation, team size and training goals. We’ll prepare a
                  tailored programme and proposal.
                </p>

                <div className="form">
                  <div className="f2">
                    <div className={`fld ${err.organisation ? 'err' : ''}`.trim()}>
                      <label htmlFor="corp-org">Organisation name</label>
                      <input
                        className="inp"
                        id="corp-org"
                        type="text"
                        value={form.organisation}
                        onChange={(e) => updateField('organisation', e.target.value)}
                        placeholder="e.g. Anambra FinTech Partners Ltd"
                      />
                      {err.organisation ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.organisation}
                        </span>
                      ) : null}
                    </div>

                    <div className={`fld ${err.industry ? 'err' : ''}`.trim()}>
                      <label htmlFor="corp-industry">Industry / Sector</label>
                      <input
                        className="inp"
                        id="corp-industry"
                        type="text"
                        value={form.industry}
                        onChange={(e) => updateField('industry', e.target.value)}
                        placeholder="e.g. Financial Services, Education"
                      />
                      {err.industry ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.industry}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="f2">
                    <div className={`fld ${err.team_size ? 'err' : ''}`.trim()}>
                      <label htmlFor="corp-size">Approximate team size</label>
                      <input
                        className="inp"
                        id="corp-size"
                        type="text"
                        value={form.team_size}
                        onChange={(e) => updateField('team_size', e.target.value)}
                        placeholder="e.g. 25"
                      />
                      {err.team_size ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.team_size}
                        </span>
                      ) : null}
                    </div>

                    <div className={`fld ${err.delivery_preference ? 'err' : ''}`.trim()}>
                      <label>Delivery preference</label>
                      <div className="chips" style={{ marginTop: 4 }}>
                        {deliveryOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`chip ${form.delivery_preference === opt ? 'on' : ''}`.trim()}
                            onClick={() => updateField('delivery_preference', opt)}
                          >
                            {DELIVERY_LABELS[opt] || opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`fld ${err.training_areas ? 'err' : ''}`.trim()}>
                    <label>Training areas (select one or more)</label>
                    <div className="chips" style={{ marginTop: 4 }}>
                      {trainingAreas.map((area) => {
                        const selected = form.training_areas.includes(area.slug);
                        return (
                          <button
                            key={area.slug}
                            type="button"
                            className={`chip ${selected ? 'on' : ''}`.trim()}
                            onClick={() => toggleArea(area.slug)}
                          >
                            <Icon name={area.icon} />
                            {area.name}
                          </button>
                        );
                      })}
                    </div>
                    {err.training_areas ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.training_areas}
                      </span>
                    ) : null}
                  </div>

                  <div className="f2">
                    <div className={`fld ${err.contact_name ? 'err' : ''}`.trim()}>
                      <label htmlFor="corp-contact">Contact person’s name</label>
                      <input
                        className="inp"
                        id="corp-contact"
                        type="text"
                        value={form.contact_name}
                        onChange={(e) => updateField('contact_name', e.target.value)}
                        placeholder="First and last name"
                        autoComplete="name"
                      />
                      {err.contact_name ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.contact_name}
                        </span>
                      ) : null}
                    </div>

                    <div className={`fld ${err.email ? 'err' : ''}`.trim()}>
                      <label htmlFor="corp-email">Work email</label>
                      <input
                        className="inp"
                        id="corp-email"
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
                  </div>

                  <div className={`fld ${err.phone ? 'err' : ''}`.trim()}>
                    <label htmlFor="corp-phone">Phone or WhatsApp number</label>
                    <input
                      className="inp"
                      id="corp-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+234 803 555 0199"
                      autoComplete="tel"
                    />
                    {err.phone ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.phone}
                      </span>
                    ) : null}
                  </div>

                  <div className={`fld ${err.message ? 'err' : ''}`.trim()}>
                    <label htmlFor="corp-msg">Training goals & preferred timeline</label>
                    <textarea
                      className="inp"
                      id="corp-msg"
                      rows={4}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Tell us about the skills your team needs, preferred dates, or any specific tools..."
                    />
                    {err.message ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.message}
                      </span>
                    ) : null}
                  </div>

                  <label
                    className={`check ${form.consent ? 'on' : ''} ${err.consent ? 'err' : ''}`.trim()}
                  >
                    <input
                      type="checkbox"
                      id="corp-consent"
                      checked={form.consent}
                      onChange={(e) => updateField('consent', e.target.checked)}
                    />
                    <span>
                      <b>
                        I agree that TFN Academy can use these details to prepare and send a
                        corporate training proposal.
                      </b>
                      <span>We only use your information to respond to this inquiry.</span>
                    </span>
                  </label>
                  {err.consent ? (
                    <span className="emsg">
                      <Icon name="circle-alert" />
                      {err.consent}
                    </span>
                  ) : null}

                  {submitErr ? (
                    <span className="emsg">
                      <Icon name="circle-alert" />
                      {submitErr}
                    </span>
                  ) : null}

                  <div>
                    <button
                      type="button"
                      className="btn btn-brand"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner size="xs" variant="white" label="Submitting request..." />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Request proposal <Icon name="arrow-right" className="arr" />
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
