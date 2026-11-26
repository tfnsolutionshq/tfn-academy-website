import { useEffect, useMemo, useState } from 'react';
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
import { CtaBand, CustomDropdown, Scene } from '@/shared/components/ui/Illustrations';
import { Skeleton, Spinner } from '@/shared/components/ui/Loading';
import { useToast } from '@/shared/context/ToastContext';
import {
  useHubBookingMutation,
  useHubOverviewQuery,
  useHubQuoteMutation,
  useHubSpaceDetailQuery,
} from '@/hooks/queries';
import type { ApiHubQuoteResponse, HubPlanCode } from '@/core/api';

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

const SHORT_TO_PLAN: Record<'h' | 'd' | 'm' | 'y', HubPlanCode> = {
  h: 'hourly',
  d: 'daily',
  m: 'monthly',
  y: 'annual',
};
const PLAN_TO_SHORT: Record<HubPlanCode, 'h' | 'd' | 'm' | 'y'> = {
  hourly: 'h',
  daily: 'd',
  monthly: 'm',
  annual: 'y',
};

const DEFAULT_MAX: Record<HubPlanCode, number> = {
  hourly: 10,
  daily: 30,
  monthly: 12,
  annual: 5,
};

interface DisplayHubSpace {
  slug: string;
  name: string;
  capacity: number;
  badge: string | null;
  description: string;
  features: string[];
  icon: string;
  pricePerSeat: boolean;
  sceneVariant: number;
  prices: Partial<Record<HubPlanCode, { naira: number; label: string; unit: string; formatted: string }>>;
}

interface DisplayHubPlan {
  code: HubPlanCode;
  label: string;
  unit: string;
  description: string;
  maxUnits: number;
}

const INITIAL_HUB = {
  space: '',
  plan: 'daily' as HubPlanCode,
  count: 1,
  startDate: '',
  startTime: '',
  guests: 1,
  name: '',
  email: '',
  phone: '',
  notes: '',
  consent: false,
};

export default function HubPage() {
  const { showToast } = useToast();
  const [hubPrice, setHubPrice] = useState('flexi');
  const [form, setForm] = useState(INITIAL_HUB);
  const [err, setErr] = useState<Record<string, string>>({});
  const [submitErr, setSubmitErr] = useState('');
  const [sent, setSent] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [liveQuote, setLiveQuote] = useState<ApiHubQuoteResponse | null>(null);

  const { data: apiHub, isLoading: isHubLoading } = useHubOverviewQuery();
  const { data: selectedSpaceDetail } = useHubSpaceDetailQuery(form.space || undefined);
  const { mutate: fetchQuote, isPending: isQuoting } = useHubQuoteMutation();
  const { mutateAsync: submitHubBooking, isPending: isSubmitting } = useHubBookingMutation();

  const hubAddress = apiHub?.address || HUB_ADDRESS;
  const closingTime = apiHub?.closing_time || '18:00';

  const plans = useMemo<DisplayHubPlan[]>(() => {
    if (apiHub?.plans && apiHub.plans.length > 0) {
      return apiHub.plans.map((p) => ({
        code: p.code,
        label: p.label,
        unit: p.unit,
        description: p.description,
        maxUnits: p.max_units || DEFAULT_MAX[p.code] || 10,
      }));
    }
    return HUB_PLANS.map(([shortKey, label, unit, description]) => {
      const code = SHORT_TO_PLAN[shortKey];
      return {
        code,
        label,
        unit,
        description,
        maxUnits: DEFAULT_MAX[code],
      };
    });
  }, [apiHub?.plans]);

  const maxUnitsMap = useMemo<Record<HubPlanCode, number>>(() => {
    const map = { ...DEFAULT_MAX };
    for (const p of plans) {
      map[p.code] = p.maxUnits;
    }
    return map;
  }, [plans]);

  const spaces = useMemo<DisplayHubSpace[]>(() => {
    const mapApiSpace = (s: NonNullable<typeof apiHub>['spaces'][number], idx: number): DisplayHubSpace => {
      const local = HUB_SPACES.find((x) => x.id === s.slug);
      const priceMap: DisplayHubSpace['prices'] = {};
      for (const pr of s.prices || []) {
        const planCode = pr.plan as HubPlanCode;
        priceMap[planCode] = {
          naira: Math.round(pr.price_kobo / 100),
          label: pr.label,
          unit: pr.unit,
          formatted: pr.price,
        };
      }
      return {
        slug: s.slug,
        name: s.name,
        capacity: s.capacity,
        badge: s.badge,
        description: s.description,
        features: s.features || [],
        icon: s.icon || local?.ic || 'laptop',
        pricePerSeat: s.price_per_seat,
        sceneVariant: local?.v ?? idx % 3,
        prices: priceMap,
      };
    };

    if (apiHub?.spaces && apiHub.spaces.length > 0) {
      const sorted = [...apiHub.spaces]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(mapApiSpace);
      if (selectedSpaceDetail) {
        return sorted.map((item, idx) =>
          item.slug === selectedSpaceDetail.slug ? mapApiSpace(selectedSpaceDetail, idx) : item,
        );
      }
      return sorted;
    }

    return HUB_SPACES.map((x) => {
      const priceMap: DisplayHubSpace['prices'] = {};
      const staticPrices = HUB_PRICES[x.id] || {};
      for (const [shortKey, val] of Object.entries(staticPrices)) {
        const code = SHORT_TO_PLAN[shortKey as 'h' | 'd' | 'm' | 'y'];
        if (code && typeof val === 'number') {
          const pInfo = plans.find((p) => p.code === code);
          priceMap[code] = {
            naira: val,
            label: pInfo?.label || code,
            unit: pInfo?.unit || 'day',
            formatted: ngn(val),
          };
        }
      }
      return {
        slug: x.id,
        name: x.n,
        capacity: x.cap,
        badge: x.tag || null,
        description: x.d,
        features: x.feat,
        icon: x.ic,
        pricePerSeat: x.id === 'flexi',
        sceneVariant: x.v,
        prices: priceMap,
      };
    });
  }, [apiHub?.spaces, plans, selectedSpaceDetail]);

  const amenities = useMemo(() => {
    if (apiHub?.amenities && apiHub.amenities.length > 0) {
      return [...apiHub.amenities]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((a) => [a.icon || 'check', a.title, a.description] as const);
    }
    return HUB_AMENITIES;
  }, [apiHub?.amenities]);

  const plansForSpace = (slug: string) => {
    const target = spaces.find((s) => s.slug === slug);
    if (!target) return plans;
    const available = plans.filter((p) => Boolean(target.prices[p.code]));
    return available.length > 0
      ? available
      : plans.filter((p) => p.code !== 'hourly' || slug !== 'flexi');
  };

  const today = ymd(new Date());
  const sp = spaces.find((x) => x.slug === form.space);
  const planObj = plans.find((p) => p.code === form.plan) || plans[1] || plans[0];

  // Live debounced quote call (`POST /hub/quote`) when booking parameters are filled
  useEffect(() => {
    if (
      !form.space ||
      !form.startDate ||
      form.startDate < today ||
      !form.startTime ||
      form.startTime >= closingTime
    ) {
      setLiveQuote(null);
      return;
    }
    if (form.plan === 'hourly') {
      const [hh, mm] = form.startTime.split(':').map(Number);
      const [ch, cm] = closingTime.split(':').map(Number);
      if (hh * 60 + mm + form.count * 60 > ch * 60 + cm) {
        setLiveQuote(null);
        return;
      }
    }

    const timer = setTimeout(() => {
      fetchQuote(
        {
          space: form.space,
          plan: form.plan,
          units: form.count,
          guests: form.guests,
          start_date: form.startDate,
          start_time: form.startTime,
        },
        {
          onSuccess: (res) => setLiveQuote(res),
          onError: () => setLiveQuote(null),
        },
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [
    closingTime,
    fetchQuote,
    form.count,
    form.guests,
    form.plan,
    form.space,
    form.startDate,
    form.startTime,
    today,
  ]);

  const getEndDate = () => {
    if (liveQuote?.end_date) return liveQuote.end_date;
    if (!form.startDate) return '';
    const d = new Date(form.startDate + 'T00:00');
    if (isNaN(d.getTime())) return '';
    if (form.plan === 'hourly') return form.startDate;
    if (form.plan === 'daily') {
      d.setDate(d.getDate() + form.count - 1);
      return ymd(d);
    }
    const months = form.plan === 'monthly' ? form.count : form.count * 12;
    const day = d.getDate();
    const t = new Date(d.getFullYear(), d.getMonth() + months, 1);
    const last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
    t.setDate(Math.min(day, last));
    t.setDate(t.getDate() - 1);
    return ymd(t);
  };

  const getEndTime = () => {
    if (liveQuote?.end_time) return liveQuote.end_time;
    if (form.plan !== 'hourly') return '6:00 PM';
    if (!form.startTime) return 'Choose a start time';
    const [h, m] = form.startTime.split(':').map(Number);
    const e = h * 60 + m + form.count * 60;
    const eh = Math.floor(e / 60);
    const em = e % 60;
    return `${((eh + 11) % 12) + 1}:${pad2(em)} ${eh >= 12 && eh < 24 ? 'PM' : 'AM'}`;
  };

  const getEst = () => {
    if (!sp) return null;
    const pr =
      sp.prices[form.plan]?.naira ??
      HUB_PRICES[sp.slug]?.[PLAN_TO_SHORT[form.plan]] ??
      0;
    const seat = sp.pricePerSeat ? form.guests : 1;
    const localTotal = pr * form.count * seat;
    const quoteTotalLabel =
      liveQuote?.total ||
      liveQuote?.estimated_total ||
      (typeof liveQuote?.total_kobo === 'number'
        ? ngn(Math.round(liveQuote.total_kobo / 100))
        : typeof liveQuote?.estimated_total_kobo === 'number'
          ? ngn(Math.round(liveQuote.estimated_total_kobo / 100))
          : null);
    return {
      sp,
      pr,
      units: form.count,
      seat,
      totalLabel: quoteTotalLabel || ngn(localTotal),
    };
  };

  const endDate = getEndDate();
  const endTime = getEndTime();
  const est = getEst();

  const renderSummary = () => {
    const rows: Array<[string, string]> = [
      ['Location', 'TFN Hub, Awka'],
      ['Space', est ? est.sp.name : 'Not selected'],
      ['Plan', `${planObj.label}, ${form.count} ${planObj.unit}${form.count > 1 ? 's' : ''}`],
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
          <span
            className="muted small"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            Estimated total
            {isQuoting ? <Spinner size="xs" variant="muted" label="Calculating..." /> : null}
          </span>
          <b>{est ? est.totalLabel : 'Choose a space'}</b>
          {est ? (
            <span className="small muted">
              {ngn(est.pr)} x {form.count} {planObj.unit}
              {form.count > 1 ? 's' : ''}
              {est.seat > 1 ? ` x ${est.seat} seats` : ''}
              {est.sp.pricePerSeat && est.seat === 1 ? ' x 1 seat' : ''}. The hub team confirms
              the final amount.
            </span>
          ) : null}
        </div>
      </>
    );
  };

  const hubBook = (spaceSlug: string, planKey?: HubPlanCode) => {
    const targetSp = spaces.find((x) => x.slug === spaceSlug);
    setForm((prev) => {
      let nextPlan = planKey || prev.plan;
      const allowed = plansForSpace(spaceSlug);
      if (!allowed.some((p) => p.code === nextPlan)) {
        nextPlan = allowed[0]?.code || 'daily';
      }
      const nextCount = Math.min(prev.count, maxUnitsMap[nextPlan]);
      const nextGuests = targetSp ? Math.min(prev.guests, targetSp.capacity) : prev.guests;
      return {
        ...prev,
        space: spaceSlug,
        plan: nextPlan,
        count: nextCount,
        guests: nextGuests,
      };
    });
    setSent(false);
    setSubmitErr('');
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

  const updateField = <K extends keyof typeof INITIAL_HUB>(
    key: K,
    val: (typeof INITIAL_HUB)[K],
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

  const focusFirstError = () => {
    setTimeout(() => {
      const firstErr = document.querySelector<HTMLElement>(
        '.fld.err .inp, .fld.err .dd-btn, .check.err input',
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
    if (!sp) e.space = 'Choose a space.';
    if (!form.startDate) e.startDate = 'Choose a start date.';
    else if (form.startDate < today) e.startDate = 'The start date can’t be in the past.';

    const [ch, cm] = closingTime.split(':').map(Number);
    if (!form.startTime) e.startTime = 'Choose a start time.';
    else if (form.plan === 'hourly') {
      const [hh, mm] = form.startTime.split(':').map(Number);
      if (hh * 60 + mm + form.count * 60 > ch * 60 + cm) {
        e.startTime =
          'Hourly bookings must finish by 6:00 PM. Choose an earlier start or fewer hours.';
      }
    } else if (form.startTime >= closingTime) {
      e.startTime = 'The hub closes at 6:00 PM. Choose an earlier start time.';
    }

    if (sp && (form.guests < 1 || form.guests > sp.capacity)) {
      e.guests = `Guests must be between 1 and ${sp.capacity}.`;
    }
    if (!form.name.trim()) e.name = 'Enter your name.';
    if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = 'Enter an email address like name@example.com.';
    }
    if (!/^\+?\d[\d\s-]{7,16}$/.test(form.phone.trim())) {
      e.phone = 'Enter a phone number with at least 8 digits.';
    }
    if (!form.consent) {
      e.consent = 'Tick the box so the hub team can contact you about this reservation.';
    }

    setErr(e);
    if (Object.keys(e).length > 0) {
      focusFirstError();
      return;
    }

    try {
      const res = await submitHubBooking({
        space: form.space,
        plan: form.plan,
        units: form.count,
        guests: form.guests,
        start_date: form.startDate,
        start_time: form.startTime,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/[\s-]/g, ''),
        notes: form.notes.trim() || undefined,
        consent: form.consent,
      });
      setRefCode(
        res?.reference ||
          res?.id ||
          'HUB-' + String(Math.floor(10000 + Math.random() * 90000)),
      );
      setSent(true);
      showToast('Reservation request sent');
      setTimeout(() => {
        const r = document.getElementById('reserve');
        if (r) r.scrollIntoView({ block: 'start' });
      }, 20);
    } catch (error: unknown) {
      const apiErr = error as { message?: string; errors?: Record<string, string[]> };
      if (apiErr?.errors && Object.keys(apiErr.errors).length > 0) {
        const fieldMap: Record<string, string> = {
          start_date: 'startDate',
          start_time: 'startTime',
          units: 'count',
        };
        const mapped: Record<string, string> = {};
        for (const [k, msgs] of Object.entries(apiErr.errors)) {
          if (msgs && msgs.length > 0) {
            mapped[fieldMap[k] || k] = msgs[0];
          }
        }
        setErr(mapped);
        focusFirstError();
      }
      const msg = apiErr?.message || 'Could not submit reservation request. Please try again.';
      setSubmitErr(msg);
      showToast(msg);
    }
  };

  const pricingSp = spaces.find((x) => x.slug === hubPrice) || spaces[0];
  const pricingSeatSuffix = pricingSp?.pricePerSeat ? ' per seat' : '';
  const spaceOpts = spaces.map((x) => ({ v: x.slug, l: x.name, ic: x.icon }));

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
            {isHubLoading && !apiHub
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="hspace" style={{ pointerEvents: 'none' }}>
                    <Skeleton height="220px" radius="16px" />
                    <div className="hb" style={{ display: 'grid', gap: 12 }}>
                      <Skeleton width="100px" height="22px" radius="999px" />
                      <Skeleton width="65%" height="24px" radius="6px" />
                      <Skeleton width="100%" height="14px" radius="4px" />
                      <Skeleton width="85%" height="14px" radius="4px" />
                    </div>
                  </div>
                ))
              : spaces.map((x) => (
                  <div key={x.slug} className="hspace">
                    <Scene slot={`space-${x.slug}`} v={x.sceneVariant} />
                    <div className="hb">
                      <div className="chips">
                        {x.badge ? (
                          <span className="pill ac">{x.badge}</span>
                        ) : (
                          <span className="pill ac">Up to {x.capacity} seats</span>
                        )}
                      </div>
                      <h3>{x.name}</h3>
                      <p className="muted">{x.description}</p>
                      <ul>
                        {x.features.map((f) => (
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
                          onClick={() => hubBook(x.slug)}
                        >
                          Book this space
                        </button>
                        <button
                          type="button"
                          className="btn btn-line btn-sm"
                          onClick={() => {
                            setHubPrice(x.slug);
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
            {amenities.map(([i, t, d]) => (
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
            <p>Pick a space, then choose hourly, daily, monthly or annual access.</p>
          </div>

          <div className="seg" id="hubseg" role="tablist" aria-label="Space">
            {spaces.map((x) => (
              <button
                key={x.slug}
                type="button"
                className={hubPrice === x.slug ? 'on' : ''}
                onClick={() => setHubPrice(x.slug)}
              >
                {x.name}
              </button>
            ))}
          </div>

          {pricingSp ? (
            <div className="plans" id="plans">
              {plansForSpace(pricingSp.slug).map((p) => {
                const priceInfo = pricingSp.prices[p.code];
                const formattedPrice = priceInfo?.formatted || ngn(0);
                return (
                  <div
                    key={p.code}
                    className={`plan ${p.code === 'monthly' ? 'pop' : ''}`.trim()}
                  >
                    {p.code === 'monthly' ? (
                      <span className="pill ac badge">Most popular</span>
                    ) : null}
                    <span className="pill" style={{ alignSelf: 'flex-start' }}>
                      {p.label}
                      {p.code === 'hourly' ? ' rate' : ''}
                    </span>
                    <div>
                      <span className="price">{formattedPrice}</span>{' '}
                      <span className="per">
                        / {p.unit}
                        {pricingSeatSuffix}
                      </span>
                    </div>
                    <p className="muted small">{p.description}</p>
                    <ul className="mini-list">
                      <li>
                        <Icon name="check" />
                        {pricingSp.name}
                        {pricingSp.slug === 'meeting'
                          ? ''
                          : ` (up to ${pricingSp.capacity} seats)`}
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
                      className={`btn ${p.code === 'monthly' ? 'btn-brand' : 'btn-line'} btn-sm`}
                      style={{ marginTop: 'auto' }}
                      onClick={() => hubBook(pricingSp.slug, p.code)}
                    >
                      Reserve {p.label.toLowerCase()} <Icon name="arrow-right" className="arr" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : null}
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
                <span>{refCode}</span>
                <button
                  type="button"
                  className="iconbtn sm"
                  aria-label="Copy reservation reference"
                  title="Copy reservation reference"
                  onClick={() => {
                    (navigator.clipboard
                      ? navigator.clipboard.writeText(refCode)
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
                    setSubmitErr('');
                    setLiveQuote(null);
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
                      <span className="small muted">{hubAddress}</span>
                    </div>
                  </div>

                  <div className={`fld ${err.space ? 'err' : ''}`.trim()}>
                    <label htmlFor="dd-hub.space">Space</label>
                    <CustomDropdown
                      id="hub.space"
                      value={form.space}
                      onChange={(v) => {
                        const chosen = spaces.find((x) => x.slug === v);
                        const allowed = plansForSpace(v);
                        setForm((prev) => ({
                          ...prev,
                          space: v,
                          plan: allowed.some((p) => p.code === prev.plan)
                            ? prev.plan
                            : allowed[0]?.code || 'daily',
                          guests: chosen ? Math.min(prev.guests, chosen.capacity) : prev.guests,
                        }));
                        setSubmitErr('');
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
                      {(form.space ? plansForSpace(form.space) : plans).map((p) => (
                        <button
                          key={p.code}
                          type="button"
                          className={`chip planchip ${form.plan === p.code ? 'on' : ''}`.trim()}
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              plan: p.code,
                              count: Math.min(prev.count, maxUnitsMap[p.code]),
                            }))
                          }
                        >
                          {p.label}
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
                            count: Math.min(maxUnitsMap[prev.plan], prev.count + 1),
                          }))
                        }
                      >
                        <Icon name="plus" />
                      </button>
                      <span className="muted small" id="durlabel">
                        {form.count} {planObj.unit}
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
                        {form.plan === 'hourly'
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
                            Math.min(sp ? sp.capacity : 28, form.guests + 1),
                          )
                        }
                      >
                        <Icon name="plus" />
                      </button>
                      <span className="muted small">
                        {sp
                          ? `Up to ${sp.capacity}${sp.pricePerSeat ? ', priced per seat' : ''}`
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

                  <div className="fld">
                    <label htmlFor="hub-notes">
                      Additional notes <span className="muted">(optional)</span>
                    </label>
                    <textarea
                      className="inp"
                      id="hub-notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      placeholder="e.g. Projector, HDMI cable, or seating arrangement"
                    />
                  </div>

                  <label
                    className={`check ${form.consent ? 'on' : ''} ${err.consent ? 'err' : ''}`.trim()}
                  >
                    <input
                      type="checkbox"
                      id="hub-consent"
                      checked={form.consent}
                      onChange={(e) => updateField('consent', e.target.checked)}
                    />
                    <span>
                      <b>
                        I agree that TFN Hub can use these details to confirm my space reservation.
                      </b>
                      <span>We only use them to coordinate your booking.</span>
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
                          <Spinner size="xs" variant="white" label="Submitting reservation..." />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Request reservation <Icon name="arrow-right" className="arr" />
                        </>
                      )}
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
                src={`https://maps.google.com/maps?q=${encodeURIComponent(hubAddress)}&output=embed`}
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
                  <span className="small muted">{hubAddress}</span>
                </div>
              </div>
              <p className="small muted">
                Phone and WhatsApp: <a href="tel:+2347120033922">+234 712 003 3922</a>
                <br />
                Email: <a href="mailto:info@tfnacademy.ng">info@tfnacademy.ng</a>
              </p>
              <a
                className="btn btn-line btn-sm"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hubAddress)}`}
                target="_blank"
                rel="noopener"
              >
                <Icon name="navigation" />
                Get directions
              </a>
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
