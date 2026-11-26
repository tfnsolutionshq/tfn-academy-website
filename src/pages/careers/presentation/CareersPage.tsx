import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CAREERS, EMAIL_REGEX } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { CustomDropdown, Photo } from '@/shared/components/ui/Illustrations';
import { Skeleton, Spinner } from '@/shared/components/ui/Loading';
import { useToast } from '@/shared/context/ToastContext';
import {
  useCareerApplicationMutation,
  useCareerRoleDetailQuery,
  useCareerRolesQuery,
} from '@/hooks/queries';
import type { ApiCareerApplicationResponse } from '@/core/api';

const HIRE_STEPS: Array<[title: string, desc: string]> = [
  ['Apply', 'Send your details and tell us about yourself.'],
  ['Screening', 'We review your experience and have a short conversation.'],
  ['Interview', 'Meet the team and, for teaching roles, run a short demo session.'],
  ['Offer', 'Receive an offer and join our onboarding.'],
];

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB

const INITIAL_CAREER = {
  name: '',
  email: '',
  phone: '',
  role: '',
  link: '',
  cv: '',
  msg: '',
};

interface DisplayRole {
  code: string;
  title: string;
  department: string;
  employmentType: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export default function CareersPage() {
  const { showToast } = useToast();
  const [careerDept, setCareerDept] = useState('all');
  const [openRoles, setOpenRoles] = useState<Record<string, boolean>>({});
  const [lastExpandedCode, setLastExpandedCode] = useState<string>('');
  const [form, setForm] = useState(INITIAL_CAREER);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [err, setErr] = useState<Record<string, string>>({});
  const [submitErr, setSubmitErr] = useState('');
  const [submitted, setSubmitted] = useState<ApiCareerApplicationResponse | null>(null);

  const { data: allApiRoles, isLoading: isRolesLoading } = useCareerRolesQuery('all');
  const { data: filteredApiRoles, isFetching: isDeptFetching } = useCareerRolesQuery(careerDept);
  const { data: expandedRoleDetail } = useCareerRoleDetailQuery(lastExpandedCode || undefined);
  const { mutateAsync: submitCareerApp, isPending: isSubmitting } =
    useCareerApplicationMutation();

  const allRoles = useMemo<DisplayRole[]>(() => {
    if (allApiRoles && allApiRoles.length > 0) {
      return [...allApiRoles]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((r) => ({
          code: r.code,
          title: r.title,
          department: r.department,
          employmentType: r.employment_type,
          location: r.location,
          summary: r.summary,
          responsibilities: r.responsibilities || [],
          requirements: r.requirements || [],
        }));
    }
    return CAREERS.map((r) => ({
      code: r.id,
      title: r.t,
      department: r.dept,
      employmentType: r.type,
      location: r.loc,
      summary: r.sum,
      responsibilities: r.resp,
      requirements: r.req,
    }));
  }, [allApiRoles]);

  const depts = useMemo(
    () => ['all', ...Array.from(new Set(allRoles.map((r) => r.department)))],
    [allRoles],
  );

  const filteredRoles = useMemo<DisplayRole[]>(() => {
    const source =
      filteredApiRoles && filteredApiRoles.length > 0
        ? [...filteredApiRoles]
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((r) => ({
              code: r.code,
              title: r.title,
              department: r.department,
              employmentType: r.employment_type,
              location: r.location,
              summary: r.summary,
              responsibilities: r.responsibilities || [],
              requirements: r.requirements || [],
            }))
        : allRoles.filter((r) => careerDept === 'all' || r.department === careerDept);

    if (!expandedRoleDetail) return source;
    return source.map((r) =>
      r.code === expandedRoleDetail.code
        ? {
            code: expandedRoleDetail.code,
            title: expandedRoleDetail.title,
            department: expandedRoleDetail.department,
            employmentType: expandedRoleDetail.employment_type,
            location: expandedRoleDetail.location,
            summary: expandedRoleDetail.summary,
            responsibilities: expandedRoleDetail.responsibilities || [],
            requirements: expandedRoleDetail.requirements || [],
          }
        : r,
    );
  }, [allRoles, careerDept, expandedRoleDetail, filteredApiRoles]);

  const roleOpts = useMemo(
    () => [
      ...allRoles.map((r) => ({ v: r.code, l: r.title, g: 'Open roles' })),
      { v: 'general', l: 'General application', g: 'Other' },
    ],
    [allRoles],
  );

  const selectedRole = allRoles.find((r) => r.code === form.role);

  const updateField = (key: keyof typeof INITIAL_CAREER, val: string) => {
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
    if (form.link.trim() && !/^https?:\/\//i.test(form.link.trim())) {
      e.link = 'Enter a valid URL starting with https:// or http://.';
    }
    if (cvFile && cvFile.size > MAX_CV_BYTES) {
      e.cv = 'CV file must be 5 MB or smaller.';
    }
    if (form.msg.trim().length < 10) {
      e.msg = 'Tell us a little about yourself (at least 10 characters).';
    }

    setErr(e);
    if (Object.keys(e).length > 0) {
      focusFirstError();
      return;
    }

    try {
      const res = await submitCareerApp({
        role_code: form.role,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/[\s-]/g, ''),
        link: form.link.trim() || undefined,
        cv: cvFile,
        message: form.msg.trim(),
        consent: true,
      });
      setSubmitted(res || {});
      showToast('Application sent');
      setTimeout(() => {
        const f = document.getElementById('cform');
        if (f) f.scrollIntoView({ block: 'center' });
      }, 20);
    } catch (error: unknown) {
      const apiErr = error as { message?: string; errors?: Record<string, string[]> };
      if (apiErr?.errors && Object.keys(apiErr.errors).length > 0) {
        const fieldMap: Record<string, string> = {
          role_code: 'role',
          message: 'msg',
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
      const msg = apiErr?.message || 'Could not submit application. Please try again.';
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
          <div className="head row">
            <div>
              <h2>Open roles</h2>
              <p>Choose a role to read the details and apply.</p>
            </div>
            {isDeptFetching && !isRolesLoading ? (
              <Spinner size="xs" variant="muted" label="Updating roles..." />
            ) : null}
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
              {isRolesLoading && !allApiRoles
                ? Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="role" style={{ padding: 20, display: 'grid', gap: 10 }}>
                      <Skeleton width="55%" height="22px" radius="6px" />
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Skeleton width="76px" height="22px" radius="999px" />
                        <Skeleton width="76px" height="22px" radius="999px" />
                        <Skeleton width="120px" height="22px" radius="999px" />
                      </div>
                    </div>
                  ))
                : filteredRoles.map((r) => {
                    const isOpen = !!openRoles[r.code];
                    return (
                      <div key={r.code} className={`role ${isOpen ? 'open' : ''}`.trim()}>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => {
                            const nextOpen = !openRoles[r.code];
                            setOpenRoles((prev) => ({ ...prev, [r.code]: nextOpen }));
                            if (nextOpen) setLastExpandedCode(r.code);
                          }}
                        >
                          <span>
                            <b>{r.title}</b>
                            <span className="rm">
                              <span className="pill">{r.department}</span>
                              <span className="tag">{r.employmentType}</span>
                              <span className="tag">{r.location}</span>
                            </span>
                          </span>
                          <Icon name="chevron-down" />
                        </button>
                        <div className="bw">
                          <div className="bi">
                            <div className="rb">
                              <p className="muted">{r.summary}</p>
                              <div className="rcols">
                                <div>
                                  <h5>What you’ll do</h5>
                                  <ul>
                                    {r.responsibilities.map((x) => (
                                      <li key={x}>{x}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5>What we’re looking for</h5>
                                  <ul>
                                    {r.requirements.map((x) => (
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
                                    updateField('role', r.code);
                                    setSubmitted(null);
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
            {submitted ? (
              <>
                <div className="okmark">
                  <Icon name="check" />
                </div>
                <h2>Application received</h2>
                <p className="muted">
                  Thank you, {form.name.split(' ')[0]}. Our team will review your details and get in
                  touch at {form.email}.
                </p>
                {submitted.reference ? (
                  <div className="ref">
                    <Icon name="flag" />
                    <span>{submitted.reference}</span>
                    <button
                      type="button"
                      className="iconbtn sm"
                      aria-label="Copy application reference"
                      title="Copy application reference"
                      onClick={() => {
                        (navigator.clipboard
                          ? navigator.clipboard.writeText(submitted.reference!)
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
                  <Link className="btn btn-line" to="/about">
                    Back to the academy
                  </Link>
                  <button
                    type="button"
                    className="btn btn-brand"
                    onClick={() => {
                      setForm(INITIAL_CAREER);
                      setCvFile(null);
                      setErr({});
                      setSubmitErr('');
                      setSubmitted(null);
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
                      You are applying for <b>{selectedRole.title}</b>.{' '}
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

                    <div className={`fld ${err.link ? 'err' : ''}`.trim()}>
                      <label htmlFor="career-link">LinkedIn or portfolio link</label>
                      <input
                        className="inp"
                        id="career-link"
                        type="text"
                        value={form.link}
                        onChange={(e) => updateField('link', e.target.value)}
                        placeholder="https://"
                      />
                      {err.link ? (
                        <span className="emsg">
                          <Icon name="circle-alert" />
                          {err.link}
                        </span>
                      ) : (
                        <span className="hint">Optional</span>
                      )}
                    </div>
                  </div>

                  <div className={`fld ${err.cv ? 'err' : ''}`.trim()}>
                    <label>
                      CV or resume <span className="muted">(optional, PDF or Word, max 5 MB)</span>
                    </label>
                    <label className="upload">
                      <Icon name="file-up" />
                      <span id="cvname">{form.cv || 'Choose a file (PDF or Word)'}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          setCvFile(f);
                          updateField('cv', f ? f.name : '');
                        }}
                      />
                    </label>
                    {err.cv ? (
                      <span className="emsg">
                        <Icon name="circle-alert" />
                        {err.cv}
                      </span>
                    ) : null}
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
                          <Spinner size="xs" variant="white" label="Submitting application..." />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit application <Icon name="arrow-right" className="arr" />
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
