import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiError } from '@/core/api';
import { useVerifyCertificateQuery } from '@/hooks/queries';
import { Icon } from '@/shared/components/ui/Icon';
import { Spinner } from '@/shared/components/ui/Loading';
import { useSite } from '@/shared/context/SiteContext';

function formatIssuedDate(iso?: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatStatus(status: string): string {
  const clean = (status || '').trim();
  if (!clean) return 'Valid';
  return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
}

export default function VerifyPage() {
  const { verifyAutoNum, setVerifyAutoNum } = useSite();
  const [num, setNum] = useState('');
  const [submittedNum, setSubmittedNum] = useState('');
  const [emptySubmitted, setEmptySubmitted] = useState(false);

  const {
    data: certificate,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useVerifyCertificateQuery(submittedNum);

  const runVerify = (input: string) => {
    const clean = (input || '').trim().toUpperCase();
    if (!clean) {
      setSubmittedNum('');
      setEmptySubmitted(true);
      return;
    }
    setEmptySubmitted(false);
    if (clean === submittedNum) {
      void refetch();
    } else {
      setSubmittedNum(clean);
    }
  };

  useEffect(() => {
    if (verifyAutoNum) {
      const clean = verifyAutoNum.trim().toUpperCase();
      setNum(clean);
      if (clean) {
        setEmptySubmitted(false);
        setSubmittedNum(clean);
      }
      setVerifyAutoNum('');
    }
  }, [verifyAutoNum, setVerifyAutoNum]);

  const isChecking = Boolean(submittedNum) && (isLoading || isFetching);
  const apiError = error instanceof ApiError ? error : null;
  const isNotFound = isError && (apiError?.status === 404 || apiError?.status === 422);
  const isServerOrNetworkError = isError && !isNotFound;
  const issuedDate = formatIssuedDate(certificate?.issued_at);
  const isValidStatus = (certificate?.status || 'valid').toLowerCase() === 'valid';

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <div className="crumbs">
            <Link to="/">Home</Link>
            <Icon name="chevron-down" />
            <span>Verify certificate</span>
          </div>
          <h1>Verify a TFN Academy certificate</h1>
          <p className="lede">
            Employers, partners and learners can confirm a certificate is genuine by entering its
            certificate number.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="panel">
            <h2>Enter the certificate number</h2>
            <p className="muted">You’ll find it printed on the learner’s certificate.</p>
            <div className="vbox">
              <input
                className="inp"
                id="vfy-in"
                value={num}
                onChange={(e) => setNum(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    runVerify(num);
                  }
                }}
                placeholder="e.g. TFN-CERT-0001"
                aria-label="Certificate number"
                autoComplete="off"
                disabled={isChecking}
              />
              <button
                type="button"
                className="btn btn-brand"
                onClick={() => runVerify(num)}
                disabled={isChecking}
              >
                {isChecking ? (
                  <>
                    <Spinner size="xs" variant="white" label="Verifying certificate" />
                    Verifying...
                  </>
                ) : (
                  'Verify certificate'
                )}
              </button>
            </div>

            <div id="vres" aria-live="polite">
              {isChecking ? (
                <div
                  className="vres"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '18px 20px',
                    marginTop: 18,
                    borderRadius: 14,
                    background: 'var(--mist)',
                  }}
                >
                  <Spinner size="sm" variant="brand" label="Checking certificate registry" />
                  <span className="muted">Checking certificate number “{submittedNum}”...</span>
                </div>
              ) : emptySubmitted ? (
                <div className="vres bad">
                  <div className="vh">
                    <Icon name="circle-alert" />
                    Enter a certificate number
                  </div>
                  <p>
                    Enter a certificate number to continue (for example, TFN-CERT-0001). Need help?{' '}
                    <Link to="/contact">Contact admissions</Link>.
                  </p>
                </div>
              ) : certificate ? (
                <div className={`vres ${isValidStatus ? 'ok' : 'bad'}`}>
                  <div className="vh">
                    <Icon name={isValidStatus ? 'circle-check' : 'circle-alert'} />
                    {isValidStatus ? 'Certificate verified' : `Certificate ${formatStatus(certificate.status).toLowerCase()}`}
                  </div>
                  <dl>
                    <dt>Certificate number</dt>
                    <dd>{certificate.number}</dd>
                    <dt>Awarded to</dt>
                    <dd>{certificate.holder_name}</dd>
                    <dt>Programme</dt>
                    <dd>{certificate.programme}</dd>
                    <dt>Level completed</dt>
                    <dd>{certificate.level}</dd>
                    {issuedDate ? (
                      <>
                        <dt>Issued on</dt>
                        <dd>{issuedDate}</dd>
                      </>
                    ) : null}
                    <dt>Issued by</dt>
                    <dd>TFN Academy, a subsidiary of TFN Solutions</dd>
                    <dt>Status</dt>
                    <dd>{formatStatus(certificate.status)}</dd>
                  </dl>
                </div>
              ) : isNotFound ? (
                <div className="vres bad">
                  <div className="vh">
                    <Icon name="circle-alert" />
                    We couldn’t verify that number
                  </div>
                  <p>
                    No certificate matches “{submittedNum}”. Check the number on the certificate and
                    try again, or <Link to="/contact">contact admissions</Link>.
                  </p>
                </div>
              ) : isServerOrNetworkError ? (
                <div className="vres bad">
                  <div className="vh">
                    <Icon name="circle-alert" />
                    Could not reach the verification service
                  </div>
                  <p>
                    {apiError?.message ||
                      'Something went wrong while checking this certificate. Please try again.'}
                  </p>
                  <p style={{ marginTop: 12 }}>
                    <button
                      type="button"
                      className="btn btn-line btn-sm"
                      onClick={() => void refetch()}
                    >
                      Try again
                    </button>
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="sec-sm">
        <div className="wrap">
          <div className="why3">
            <div className="req">
              <Icon name="badge-check" />
              <div>
                <b>Issued by TFN Academy</b>
                <p>Every certificate carries a unique number linked to the learner’s record.</p>
              </div>
            </div>
            <div className="req">
              <Icon name="shield-check" />
              <div>
                <b>Instant confirmation</b>
                <p>Enter the number to confirm the learner, programme and status.</p>
              </div>
            </div>
            <div className="req">
              <Icon name="mail" />
              <div>
                <b>Need more help?</b>
                <p>
                  Contact admissions at <a href="mailto:info@tfnacademy.ng">info@tfnacademy.ng</a>{' '}
                  for anything we cannot confirm online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
