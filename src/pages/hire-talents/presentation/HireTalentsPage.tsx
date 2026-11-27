import { useEffect, useMemo, useState } from 'react';
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
import { CustomDropdown, Photo } from '@/shared/components/ui/Illustrations';
import { Skeleton, Spinner } from '@/shared/components/ui/Loading';
import { useSite } from '@/shared/context/SiteContext';
import { useToast } from '@/shared/context/ToastContext';
import {
  useConsultationMutation,
  useProgrammesQuery,
  useTalentsQuery,
} from '@/hooks/queries';
import type { ApiConsultationResponse } from '@/core/api';

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
  consent: false,
};

interface DisplayTalent {
  code: string;
  name: string;
  progSlug: string;
  progShort: string;
  photoIdx: number;
  photoUrl: string | null;
  role: string;
  skills: string[];
  availability: string;
}

export default function HireTalentsPage() {
  const { showToast } = useToast();
  const { hireNiche, setHireNiche, openTalentProfile, consultPreset } = useSite();

  const [form, setForm] = useState(INITIAL_CONSULT);
  const [err, setErr] = useState<Record<string, string>>({});
  const [submitErr, setSubmitErr] = useState('');
  const [submitted, setSubmitted] = useState<ApiConsultationResponse | null>(null);

  const { data: allTalentsPage, isLoading: isAllLoading } = useTalentsQuery({ per_page: 50 });
  const { data: filteredTalentsPage, isFetching: isFilterFetching } = useTalentsQuery(
    hireNiche !== 'all' ? { programme: hireNiche, per_page: 50 } : { per_page: 50 },
  );
  const { data: apiProgrammesPage } = useProgrammesQuery({ per_page: 50 });
  const { mutateAsync: submitConsultation, isPending: isSubmitting } =
    useConsultationMutation();

  const allTalents = useMemo<DisplayTalent[]>(() => {
    if (allTalentsPage?.data && allTalentsPage.data.length > 0) {
      return allTalentsPage.data.map((t, idx) => {
        const local = TALENT.find((x) => x.id === t.code);
        return {
          code: t.code,
          name: t.name,
          progSlug: t.programme?.slug || local?.s || 'frontend',
          progShort: t.programme?.short_name || findTrack(t.programme?.slug || '')?.short || '',
          photoIdx: local?.p ?? idx % 13,
          photoUrl: t.photo_url,
          role: t.role_title,
          skills: t.skills || [],
          availability: t.availability,
        };
      });
    }
    return TALENT.map((t) => ({
      code: t.id,
      name: t.n,
      progSlug: t.s,
      progShort: findTrack(t.s)?.short || t.s,
      photoIdx: t.p,
      photoUrl: null,
      role: t.role,
      skills: t.skills,
      availability: t.av,
    }));
  }, [allTalentsPage?.data]);

  const filteredTalent = useMemo<DisplayTalent[]>(() => {
    if (filteredTalentsPage?.data) {
      return filteredTalentsPage.data.map((t, idx) => {
        const local = TALENT.find((x) => x.id === t.code);
        return {
          code: t.code,
          name: t.name,
          progSlug: t.programme?.slug || local?.s || 'frontend',
          progShort: t.programme?.short_name || findTrack(t.programme?.slug || '')?.short || '',
          photoIdx: local?.p ?? idx % 13,
          photoUrl: t.photo_url,
          role: t.role_title,
          skills: t.skills || [],
          availability: t.availability,
        };
      });
    }
    return allTalents.filter((t) => hireNiche === 'all' || t.progSlug === hireNiche);
  }, [allTalents, filteredTalentsPage?.data, hireNiche]);

  useEffect(() => {
    if (consultPreset.key > 0) {
      const tCode = consultPreset.talentId;
      const tRec = tCode ? allTalents.find((x) => x.code === tCode) : undefined;
      setForm((prev) => ({
        ...prev,
        talent: tCode,
        need: tRec ? tRec.progSlug : prev.need,
      }));
      if (tRec) {
        setErr((prev) => {
          const next = { ...prev };
          delete next.need;
          return next;
        });
      }
      setSubmitted(null);
      setTimeout(() => {
        const c = document.getElementById('consult');
        if (c) c.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [consultPreset, allTalents]);

  const chipOptions = useMemo<Array<[id: string, label: string]>>(() => {
    const seen = new Map<string, string>();
    for (const t of allTalents) {
      if (!seen.has(t.progSlug)) {
        seen.set(t.progSlug, t.progShort || findTrack(t.progSlug)?.short || t.progSlug);
      }
    }
    return [['all', 'All niches'], ...Array.from(seen.entries())];
  }, [allTalents]);

  const talentOpts = useMemo(
    () => [
      ...allTalents.map((t) => {
        const tr = findTrack(t.progSlug);
        return {
          v: t.code,
          l: t.name,
          r: t.role,
          ic: tr?.ic || 'user-check',
        };
      }),
      { v: 'any', l: 'No specific talent (match me)', ic: 'users' },
    ],
    [allTalents],
  );

  const needOpts = useMemo(() => {
    const progs =
      apiProgrammesPage?.data && apiProgrammesPage.data.length > 0
        ? apiProgrammesPage.data.map((p) => ({
            v: p.slug,
            l: p.short_name,
            ic: p.icon || 'blocks',
            g: findCategory(p.category)?.name || p.category,
          }))
        : TRACKS.map((t) => ({
            v: t.slug,
            l: t.short,
            ic: t.ic,
            g: findCategory(t.cat)?.name,
          }));
    return [
      ...progs,
      { v: 'Not sure yet', l: 'Not sure yet, advise me', ic: 'compass', g: 'Other' },
    ];
  }, [apiProgrammesPage?.data]);

  const selectedTalent = form.talent ? allTalents.find((t) => t.code === form.talent) : null;

  const handleTalentChange = (val: string) => {
    const talentCode = val === 'any' ? '' : val;
    const tRec = talentCode ? allTalents.find((x) => x.code === talentCode) : undefined;
    setForm((prev) => ({
      ...prev,
      talent: talentCode,
      need: tRec ? tRec.progSlug : prev.need,
    }));
    setSubmitErr('');
    if (tRec) {
      setErr((prev) => {
        if (!prev.need) return prev;
        const next = { ...prev };
        delete next.need;
        return next;
      });
    }
  };

  const updateField = <K extends keyof typeof INITIAL_CONSULT>(
    key: K,
    val: (typeof INITIAL_CONSULT)[K],
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
    if (!form.consent) {
      e.consent = 'Tick the box so our team can contact you about your consultation.';
    }

    setErr(e);
    if (Object.keys(e).length > 0) {
      focusFirstError();
      return;
    }

    try {
      const res = await submitConsultation({
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/[\s-]/g, ''),
        need: form.need,
        engagement_type: form.type,
        budget_range: form.budget,
        message: form.msg.trim(),
        ...(form.talent ? { talent_code: form.talent } : {}),
        consent: form.consent,
      });
      setSubmitted(res);
      showToast('Consultation requested');
      setTimeout(() => {
        const c = document.getElementById('consult');
        if (c) c.scrollIntoView({ block: 'center' });
      }, 20);
    } catch (error: unknown) {
      const apiErr = error as { message?: string; errors?: Record<string, string[]> };
      if (apiErr?.errors && Object.keys(apiErr.errors).length > 0) {
        const fieldMap: Record<string, string> = {
          engagement_type: 'type',
          budget_range: 'budget',
          message: 'msg',
          talent_code: 'talent',
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
      const msg = apiErr?.message || 'Could not submit consultation request. Please try again.';
      setSubmitErr(msg);
      showToast(msg);
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
                  setSubmitted(null);
                  const el = document.getElementById('consult');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request a consultation
              </a>
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
            </div>
            {isFilterFetching && !isAllLoading ? (
              <Spinner size="xs" variant="muted" label="Updating talent list..." />
            ) : null}
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
              {isAllLoading && !allTalentsPage
                ? Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="tcardx" style={{ pointerEvents: 'none' }}>
                      <Skeleton height="220px" radius="16px" />
                      <div className="tb" style={{ display: 'grid', gap: 10 }}>
                        <Skeleton width="65%" height="20px" radius="6px" />
                        <Skeleton width="50%" height="14px" radius="4px" />
                        <div style={{ display: 'flex', gap: 6 }}>
                          <Skeleton width="64px" height="22px" radius="999px" />
                          <Skeleton width="76px" height="22px" radius="999px" />
                        </div>
                      </div>
                    </div>
                  ))
                : filteredTalent.map((t) => {
                    const extra = t.skills.length - 2;
                    return (
                      <div
                        key={t.code}
                        className="tcardx"
                        tabIndex={0}
                        role="button"
                        aria-label={`View ${t.name}’s profile`}
                        onClick={() => openTalentProfile(t.code)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openTalentProfile(t.code);
                          }
                        }}
                      >
                        {t.photoUrl ? (
                          <div className="photo">
                            <img src={t.photoUrl} alt={t.name} loading="lazy" />
                          </div>
                        ) : (
                          <Photo slot={`talent-${t.code}`} idx={t.photoIdx} />
                        )}
                        <span className="av badge">
                          <i />
                          {t.availability}
                        </span>
                        <div className="tb">
                          <h3>{t.name}</h3>
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
            {submitted ? (
              <>
                <div className="okmark">
                  <Icon name="check" />
                </div>
                <h2>Consultation requested</h2>
                <p className="muted">
                  Thank you, {form.name.split(' ')[0]}. Our team will contact you at {form.email} to
                  discuss your needs.
                </p>
                {submitted.reference ? (
                  <div className="ref">
                    <Icon name="flag" />
                    <span>{submitted.reference}</span>
                    <button
                      type="button"
                      className="iconbtn sm"
                      aria-label="Copy consultation reference"
                      title="Copy consultation reference"
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
                ) : null}
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
                      setSubmitErr('');
                      setSubmitted(null);
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
                      You are asking about <b>{selectedTalent.name}</b>, {selectedTalent.role}.{' '}
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
                    <div className="fld">
                      <label htmlFor="dd-consult.talent">Talent</label>
                      <CustomDropdown
                        id="consult.talent"
                        value={form.talent}
                        onChange={handleTalentChange}
                        options={talentOpts}
                        placeholder="Choose a talent (optional)"
                      />
                    </div>

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
                  </div>

                  <div className="f2">
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

                  <label
                    className={`check ${form.consent ? 'on' : ''} ${err.consent ? 'err' : ''}`.trim()}
                  >
                    <input
                      type="checkbox"
                      id="consult-consent"
                      checked={form.consent}
                      onChange={(e) => updateField('consent', e.target.checked)}
                    />
                    <span>
                      <b>
                        I agree that TFN Academy can use these details to contact me regarding
                        hiring talent.
                      </b>
                      <span>We only use them to follow up on your consultation request.</span>
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
                          Request consultation <Icon name="arrow-right" className="arr" />
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
