import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EMAIL_REGEX,
  HUB_ADDRESS,
  HUB_AMENITIES,
  HUB_PLANS,
  HUB_PRICES,
  HUB_SPACES,
} from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { CtaBand, CustomDropdown, OdTag, Scene } from '@/shared/components/ui/Illustrations';
import { useToast } from '@/shared/context/ToastContext';

const ngn = (n: number) => 'NGN ' + n.toLocaleString('en-NG');
const fdate = (s: string) =>
  s
    ? new Date(s + 'T00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
const pad2 = (n: number) => String(n).padStart(2, '0');
const ymd = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const HUB_MAX: Record<'h' | 'd' | 'm' | 'y', number> = { h: 10, d: 30, m: 12, y: 5 };
const plansFor = (id: string) => HUB_PLANS.filter((p) => p[0] !== 'h' || id !== 'flexi');

const INITIAL_HUB = {
  space: '',
  plan: 'd' as 'h' | 'd' | 'm' | 'y',
  count: 1,
  startDate: '',
  startTime: '',
  guests: 1,
  name: '',
  email: '',
  phone: '',
};

export default function HubPage() {
  const { showToast } = useToast();
  const [hubPrice, setHubPrice] = useState('flexi');
  const [form, setForm] = useState(INITIAL_HUB);
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [refCode, setRefCode] = useState('');

  const today = ymd(new Date());
  const sp = HUB_SPACES.find((x) => x.id === form.space);
  const planObj = HUB_PLANS.find((p) => p[0] === form.plan) || HUB_PLANS[1];

  const getEndDate = () => {
    if (!form.startDate) return '';
    const d = new Date(form.startDate + 'T00:00');
    if (isNaN(d.getTime())) return '';
    if (form.plan === 'h') return form.startDate;
    if (form.plan === 'd') {
      d.setDate(d.getDate() + form.count - 1);
      return ymd(d);
    }
    const months = form.plan === 'm' ? form.count : form.count * 12;
    const day = d.getDate();
    const t = new Date(d.getFullYear(), d.getMonth() + months, 1);
    const last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
    t.setDate(Math.min(day, last));
    t.setDate(t.getDate() - 1);
    return ymd(t);
  };

  const getEndTime = () => {
    if (form.plan !== 'h') return '6:00 PM';
    if (!form.startTime) return 'Choose a start time';
    const [h, m] = form.startTime.split(':').map(Number);
    const e = h * 60 + m + form.count * 60;
    const eh = Math.floor(e / 60);
    const em = e % 60;
    return `${((eh + 11) % 12) + 1}:${pad2(em)} ${eh >= 12 && eh < 24 ? 'PM' : 'AM'}`;
  };

  const getEst = () => {
    if (!sp) return null;
    const pr = HUB_PRICES[sp.id]?.[form.plan] ?? 0;
    const seat = sp.id === 'flexi' ? form.guests : 1;
    return { sp, pr, units: form.count, seat, total: pr * form.count * seat };
  };

  const endDate = getEndDate();
  const endTime = getEndTime();
  const est = getEst();

  const renderSummary = () => {
    const rows: Array<[string, string]> = [
      ['Location', 'TFN Hub, Awka'],
      ['Space', est ? est.sp.n : 'Not selected'],
      ['Plan', `${planObj[1]}, ${form.count} ${planObj[2]}${form.count > 1 ? 's' : ''}`],
      [
        'Start',
        form.startDate
          ? fdate(form.startDate) + (form.startTime ? ', ' + form.startTime : '')
          : 'Set a start date',
      ],
      ['End', endDate ? fdate(endDate) + ', ' + endTime : 'Set a start date'],
      ['Guests', String(form.guests)],
    ];

    return (
      <>
        <h3>Your reservation</h3>
        <dl>
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="est">
          <span className="muted small">Estimated total</span>
          <b>{est ? ngn(est.total) : 'Choose a space'}</b>
          {est ? (
            <span className="small muted">
              {ngn(est.pr)} x {form.count} {planObj[2]}
              {form.count > 1 ? 's' : ''}
              {est.seat > 1 ? ` x ${est.seat} seats` : ''}
              {est.sp.id === 'flexi' && est.seat === 1 ? ' x 1 seat' : ''}. The hub team confirms
              the final amount.
            </span>
          ) : null}
        </div>
        <div className="review-only">
          <OdTag id="OD-10" />
        </div>
      </>
    );
  };

  const hubBook = (spaceId: string, planKey?: 'h' | 'd' | 'm' | 'y') => {
    const targetSp = HUB_SPACES.find((x) => x.id === spaceId);
    setForm((prev) => {
      let nextPlan = planKey || prev.plan;
      if (nextPlan === 'h' && spaceId === 'flexi') nextPlan = 'd';
      const nextCount = Math.min(prev.count, HUB_MAX[nextPlan]);
      const nextGuests = targetSp ? Math.min(prev.guests, targetSp.cap) : prev.guests;
      return {
        ...prev,
        space: spaceId,
        plan: nextPlan,
        count: nextCount,
        guests: nextGuests,
      };
    });
    setSent(false);
    setErr((prev) => {
      const next = { ...prev };
      delete next.space;
      return next;
    });
    setTimeout(() => {
      const r = document.getElementById('reserve');
      if (r) r.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const updateField = <K extends keyof typeof INITIAL_HUB>(key: K, val: (typeof INITIAL_HUB)[K]) => {
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
    if (!sp) e.space = 'Choose a space.';
    if (!form.startDate) e.startDate = 'Choose a start date.';
    else if (form.startDate < today) e.startDate = 'The start date can’t be in the past.';

    if (!form.startTime) e.startTime = 'Choose a start time.';
    else if (form.plan === 'h') {
      const [hh, mm] = form.startTime.split(':').map(Number);
      if (hh * 60 + mm + form.count * 60 > 18 * 60) {
        e.startTime =
          'Hourly bookings must finish by 6:00 PM. Choose an earlier start or fewer hours.';
      }
    } else if (form.startTime >= '18:00') {
      e.startTime = 'The hub closes at 6:00 PM. Choose an earlier start time.';
    }

    if (sp && (form.guests < 1 || form.guests > sp.cap)) {
      e.guests = `Guests must be between 1 and ${sp.cap}.`;
    }
    if (!form.name.trim()) e.name = 'Enter your name.';
    if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = 'Enter an email address like name@example.com.';
    }
    if (!/^\+?\d[\d\s-]{7,16}$/.test(form.phone.trim())) {
      e.phone = 'Enter a phone number with at least 8 digits.';
    }

    setErr(e);
    if (!Object.keys(e).length) {
      setSent(true);
      setRefCode('HUB-' + String(Math.floor(10000 + Math.random() * 90000)));
      showToast('Reservation request sent');
      setTimeout(() => {
        const r = document.getElementById('reserve');
        if (r) r.scrollIntoView({ block: 'start' });
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

  const pricingSp = HUB_SPACES.find((x) => x.id === hubPrice) || HUB_SPACES[0];
  const pricingSeatSuffix = pricingSp.id === 'flexi' ? ' per seat' : '';
  const spaceOpts = HUB_SPACES.map((x) => ({ v: x.id, l: x.n, ic: x.ic }));

  return (
    <>
      <section className="phead">
        <div className="wrap about-split">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <Icon name="chevron-down" />
              <span>Hub</span>
            </div>
            <h1 style={{ maxWidth: '14ch' }}>A workspace that never switches off.</h1>
            <p className="lede">
              TFN Hub is a co-working space in Awka for techies, freelancers, founders and teams
              who need a place to work without interruption from power or internet.
            </p>
            <div className="hero-cta" style={{ marginTop: 28 }}>
              <a
                className="btn btn-brand"
                href="#reserve"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('reserve');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book a space <Icon name="arrow-right" className="arr" />
              </a>
              <a
                className="btn btn-line"
                href="#hub-pricing"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('hub-pricing');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See pricing
              </a>
            </div>
            <div className="review-only">
              <OdTag id="OD-10" />
            </div>
          </div>
          <div className="hubpics">
            <Scene slot="hub1" v={1} className="a" />
            <Scene slot="hub2" v={0} className="b" />
            <Scene slot="hub3" v={2} className="c" />
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="wrap">
          <div className="s">
            <Icon name="zap" />
            <div>
              <b>Uninterrupted power</b>
              <span>Backup so you keep working</span>
            </div>
          </div>
          <div className="s">
            <Icon name="wifi" />
            <div>
              <b>Strong Wi-Fi</b>
              <span>Fast, reliable internet</span>
            </div>
          </div>
          <div className="s">
            <Icon name="shield-check" />
            <div>
              <b>Secure</b>
              <span>Safe for you and your gear</span>
            </div>
          </div>
          <div className="s">
            <Icon name="wind" />
            <div>
              <b>Air-conditioned</b>
              <span>Comfortable all day</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <h2>Choose your space</h2>
            <p>
              Three ways to use the hub, whether you are hosting a session, working solo or taking
              a private meeting.
            </p>
          </div>
          <div className="hspaces">
            {HUB_SPACES.map((x) => (
              <div key={x.id} className="hspace">
                <Scene slot={`space-${x.id}`} v={x.v} />
                <div className="hb">
                  <div className="chips">
                    {x.tag ? (
                      <span className="pill ac">{x.tag}</span>
                    ) : (
                      <span className="pill ac">Up to {x.cap} seats</span>
                    )}
                  </div>
                  <h3>{x.n}</h3>
                  <p className="muted">{x.d}</p>
                  <ul>
                    {x.feat.map((f) => (
                      <li key={f}>
                        <Icon name="check" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="acts">
                    <button
                      type="button"
                      className="btn btn-brand btn-sm"
                      onClick={() => hubBook(x.id)}
                    >
                      Book this space
                    </button>
                    <button
                      type="button"
                      className="btn btn-line btn-sm"
                      onClick={() => {
                        setHubPrice(x.id);
                        const el = document.getElementById('hub-pricing');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      See pricing
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec on-mist">
        <div className="wrap">
          <div className="head">
            <h2>Everything you need to focus</h2>
            <p>The basics are covered, so you can spend your day on the work that matters.</p>
          </div>
          <div className="amen">
            {HUB_AMENITIES.map(([i, t, d]) => (
              <div key={t} className="amc">
                <Icon name={i} />
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="hub-pricing">
        <div className="wrap">
          <div className="head">
            <h2>Simple, fair pricing</h2>
            <p>Pick a space, then choose daily, monthly or annual access.</p>
            <div className="review-only">
              <OdTag id="OD-10" />
            </div>
          </div>

          <div className="seg" id="hubseg" role="tablist" aria-label="Space">
            {HUB_SPACES.map((x) => (
              <button
                key={x.id}
                type="button"
                className={hubPrice === x.id ? 'on' : ''}
                onClick={() => setHubPrice(x.id)}
              >
                {x.n}
              </button>
            ))}
          </div>

          <div className="plans" id="plans">
            {plansFor(pricingSp.id).map(([k, l, u, d]) => (
              <div key={k} className={`plan ${k === 'm' ? 'pop' : ''}`.trim()}>
                {k === 'm' ? <span className="pill ac badge">Most popular</span> : null}
                <span className="pill" style={{ alignSelf: 'flex-start' }}>
                  {l}
                  {k === 'h' ? ' rate' : ''}
                </span>
                <div>
                  <span className="price">{ngn(HUB_PRICES[pricingSp.id]?.[k] ?? 0)}</span>{' '}
                  <span className="per">
                    / {u}
                    {pricingSeatSuffix}
                  </span>
                </div>
                <p className="muted small">{d}</p>
                <ul className="mini-list">
                  <li>
                    <Icon name="check" />
                    {pricingSp.n}
                    {pricingSp.id === 'meeting' ? '' : ` (up to ${pricingSp.cap} seats)`}
                  </li>
                  <li>
                    <Icon name="check" />
                    Stable power and fast Wi-Fi
                  </li>
                  <li>
                    <Icon name="check" />
                    Air-conditioned, secure space
                  </li>
                </ul>
                <button
                  type="button"
                  className={`btn ${k === 'm' ? 'btn-brand' : 'btn-line'} btn-sm`}
                  style={{ marginTop: 'auto' }}
                  onClick={() => hubBook(hubPrice, k)}
                >
                  Reserve {l.toLowerCase()} <Icon name="arrow-right" className="arr" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec on-mist" id="reserve">
        <div className="wrap">
          <div className="head">
            <h2>Reserve your space</h2>
            <p>Book in a few steps: location, plan, date and time, and number of guests.</p>
          </div>

          {sent ? (
            <div className="panel">
              <div className="okmark">
                <Icon name="check" />
              </div>
              <h2>Reservation request sent</h2>
              <p className="muted">
                Thanks, {form.name.split(' ')[0]}. The hub team will confirm availability and next
                steps with you by email or WhatsApp.
              </p>
              <div className="ref">
                <Icon name="flag" />
                {refCode}
              </div>
              <div className="hubsum" style={{ position: 'static', marginTop: 18 }} id="hubsum">
                {renderSummary()}
              </div>
              <div className="wnav">
                <Link className="btn btn-line" to="/">
                  Back to home
                </Link>
                <button
                  type="button"
                  className="btn btn-brand"
                  onClick={() => {
                    setForm(INITIAL_HUB);
                    setErr({});
                    setSent(false);
                    setRefCode('');
                  }}
                >
                  Make another reservation
                </button>
              </div>
            </div>
          ) : (
            <div className="hubwrap">
              <div className="panel">
                <h2>Book a reservation</h2>
                <p className="muted">
                  Tell us what you need. The hub team confirms availability and the final amount.
                </p>
                <div className="form">
                  <div className="loc">
                    <Icon name="map-pin" />
                    <div>
                      <b>TFN Hub</b>
                      <span className="small muted">{HUB_ADDRESS}</span>
                    </div>
                  </div>

                  <div className={`fld ${err.space ? 'err' : ''}`.trim()}>
                    <label htmlFor="dd-hub.space">Space</label>
                    <CustomDropdown
                      id="hub.space"
                      value={form.space}
                      onChange={(v) => {
                        const chosen = HUB_SPACES.find((x) => x.id === v);
                        setForm((prev) => ({
                          ...prev,
                          space: v,
                          plan: prev.plan === 'h' && v === 'flexi' ? 'd' : prev.plan,
                          guests: chosen ? Math.min(prev.guests, chosen.cap) : prev.guests,
                        }));
                        setErr((prev) => {
                          const next = { ...prev };
                          delete next.space;
                          return next;
                        });
                      }}
                      options={spaceOpts}
                      placeholder="Choose a space"
                    />
                    {err.space ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.space}
                      </span>
                    ) : null}
                  </div>

                  <div className="fld">
                    <label>Plan</label>
                    <div className="chips">
                      {(form.space ? plansFor(form.space) : HUB_PLANS).map(([k, l]) => (
                        <button
                          key={k}
                          type="button"
                          className={`chip planchip ${form.plan === k ? 'on' : ''}`.trim()}
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              plan: k,
                              count: Math.min(prev.count, HUB_MAX[k]),
                            }))
                          }
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="fld">
                    <label>Duration</label>
                    <div className="stepn">
                      <button
                        type="button"
                        className="iconbtn"
                        aria-label="Shorter duration"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, count: Math.max(1, prev.count - 1) }))
                        }
                      >
                        <Icon name="minus" />
                      </button>
                      <b id="durcount">{form.count}</b>
                      <button
                        type="button"
                        className="iconbtn"
                        aria-label="Longer duration"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            count: Math.min(HUB_MAX[prev.plan], prev.count + 1),
                          }))
                        }
                      >
                        <Icon name="plus" />
                      </button>
                      <span className="muted small" id="durlabel">
                        {form.count} {planObj[2]}
                        {form.count > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="f2">
                    <div className={`fld ${err.startDate ? 'err' : ''}`.trim()}>
                      <label htmlFor="hub-startDate">Start date</label>
                      <input
                        className="inp"
                        id="hub-startDate"
                        type="date"
                        min={today}
                        value={form.startDate}
                        onChange={(e) => updateField('startDate', e.target.value)}
                      />
                      {err.startDate ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.startDate}
                        </span>
                      ) : null}
                    </div>

                    <div className={`fld ${err.startTime ? 'err' : ''}`.trim()}>
                      <label htmlFor="hub-startTime">Start time</label>
                      <input
                        className="inp"
                        id="hub-startTime"
                        type="time"
                        value={form.startTime}
                        onChange={(e) => updateField('startTime', e.target.value)}
                      />
                      <span className="hint">The hub closes at 6:00 PM.</span>
                      {err.startTime ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.startTime}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="f2">
                    <div className="fld">
                      <label htmlFor="hub-endShow">End date</label>
                      <input
                        className="inp ro"
                        id="hub-endShow"
                        readOnly
                        tabIndex={-1}
                        value={endDate ? fdate(endDate) : 'Choose a start date'}
                      />
                      <span className="hint">Filled in from your plan and duration.</span>
                    </div>
                    <div className="fld">
                      <label htmlFor="hub-endTime">End time</label>
                      <input
                        className="inp ro"
                        id="hub-endTime"
                        readOnly
                        tabIndex={-1}
                        value={endTime}
                      />
                      <span className="hint">
                        {form.plan === 'h'
                          ? 'Start time plus your hours.'
                          : 'Closing time is 6:00 PM.'}
                      </span>
                    </div>
                  </div>

                  <div className={`fld ${err.guests ? 'err' : ''}`.trim()}>
                    <label>Number of guests</label>
                    <div className="stepn">
                      <button
                        type="button"
                        className="iconbtn"
                        aria-label="Fewer guests"
                        onClick={() =>
                          updateField('guests', Math.max(1, form.guests - 1))
                        }
                      >
                        <Icon name="minus" />
                      </button>
                      <b id="gcount">{form.guests}</b>
                      <button
                        type="button"
                        className="iconbtn"
                        aria-label="More guests"
                        onClick={() =>
                          updateField(
                            'guests',
                            Math.min(sp ? sp.cap : 28, form.guests + 1),
                          )
                        }
                      >
                        <Icon name="plus" />
                      </button>
                      <span className="muted small">
                        {sp
                          ? `Up to ${sp.cap}${sp.id === 'flexi' ? ', priced per seat' : ''}`
                          : 'Choose a space to see the limit'}
                      </span>
                    </div>
                    {err.guests ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.guests}
                      </span>
                    ) : null}
                  </div>

                  <div className="sub" style={{ margin: '6px 0 0' }}>
                    Your details
                  </div>

                  <div className={`fld ${err.name ? 'err' : ''}`.trim()}>
                    <label htmlFor="hub-name">Full name</label>
                    <input
                      className="inp"
                      id="hub-name"
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

                  <div className="f2">
                    <div className={`fld ${err.email ? 'err' : ''}`.trim()}>
                      <label htmlFor="hub-email">Email address</label>
                      <input
                        className="inp"
                        id="hub-email"
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
                      <label htmlFor="hub-phone">Phone or WhatsApp number</label>
                      <input
                        className="inp"
                        id="hub-phone"
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

                  <div>
                    <button type="button" className="btn btn-brand" onClick={handleSubmit}>
                      Request reservation <Icon name="arrow-right" className="arr" />
                    </button>
                  </div>
                </div>
              </div>

              <aside className="hubsum" id="hubsum">
                {renderSummary()}
              </aside>
            </div>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <h2>Find us</h2>
            <p>TFN Hub is in Awka, Anambra State, close to restaurants and cafes.</p>
          </div>
          <div className="mapgrid">
            <div className="map">
              <svg
                className="bg"
                viewBox="0 0 600 420"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <rect width="600" height="420" style={{ fill: 'var(--brand-soft)' }} />
                <path
                  d="M-20 300C120 250 260 350 620 230"
                  stroke="#fff"
                  strokeWidth="22"
                  fill="none"
                />
                <path
                  d="M200-10C240 130 170 270 270 430"
                  stroke="#fff"
                  strokeWidth="16"
                  fill="none"
                />
                <path
                  d="M380 0C360 120 450 220 420 430"
                  stroke="#fff"
                  strokeWidth="12"
                  fill="none"
                />
                <circle cx="300" cy="215" r="16" style={{ fill: 'var(--accent)' }} />
              </svg>
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(HUB_ADDRESS)}&output=embed`}
                title="Map of TFN Hub, Awka"
                loading="lazy"
              />
            </div>

            <div className="panel" style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
              <h3 style={{ fontSize: '1.4rem' }}>TFN Hub</h3>
              <div className="loc">
                <Icon name="map-pin" />
                <div>
                  <b>TFN Hub</b>
                  <span className="small muted">{HUB_ADDRESS}</span>
                </div>
              </div>
              <p className="small muted">
                Phone and WhatsApp: <a href="tel:+2347120033922">+234 712 003 3922</a>
                <br />
                Email: <a href="mailto:info@tfnacademy.ng">info@tfnacademy.ng</a>
              </p>
              <a
                className="btn btn-line btn-sm"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HUB_ADDRESS)}`}
                target="_blank"
                rel="noopener"
              >
                <Icon name="navigation" />
                Get directions
              </a>
              <div className="review-only">
                <OdTag id="OD-10" />
              </div>
            </div>
          </div>
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
