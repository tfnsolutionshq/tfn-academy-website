import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { VERIFY, findTrack } from '@/shared/constants/academyData';
import type { VerifyRecord } from '@/shared/types/academy';
import { Icon } from '@/shared/components/ui/Icon';
import { OdTag } from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';

interface VerifyState {
  ok: boolean;
  num: string;
  rec?: VerifyRecord;
}

export default function VerifyPage() {
  const { verifyAutoNum, setVerifyAutoNum } = useSite();
  const [num, setNum] = useState('');
  const [res, setRes] = useState<VerifyState | null>(null);

  const runVerify = (input: string) => {
    const clean = (input || '').trim().toUpperCase();
    const rec = VERIFY[clean];
    setRes(rec ? { ok: true, num: clean, rec } : { ok: false, num: clean });
  };

  useEffect(() => {
    if (verifyAutoNum) {
      setNum(verifyAutoNum);
      runVerify(verifyAutoNum);
      setVerifyAutoNum('');
    }
  }, [verifyAutoNum, setVerifyAutoNum]);

  const prog = res?.ok && res.rec ? findTrack(res.rec.s) : null;

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
              />
              <button type="button" className="btn btn-brand" onClick={() => runVerify(num)}>
                Verify certificate
              </button>
            </div>

            <div className="samples review-only">
              <span className="small muted">Demo numbers:</span>
              {Object.keys(VERIFY).map((n) => (
                <button
                  key={n}
                  type="button"
                  className="chip"
                  onClick={() => {
                    setNum(n);
                    runVerify(n);
                  }}
                >
                  {n}
                </button>
              ))}
              <OdTag id="OD-05" />
            </div>

            <div id="vres" aria-live="polite">
              {res ? (
                res.ok && res.rec ? (
                  <div className="vres ok">
                    <div className="vh">
                      <Icon name="circle-check" />
                      Certificate verified
                    </div>
                    <dl>
                      <dt>Certificate number</dt>
                      <dd>{res.num}</dd>
                      <dt>Awarded to</dt>
                      <dd>{res.rec.n}</dd>
                      <dt>Programme</dt>
                      <dd>{prog?.short}</dd>
                      <dt>Level completed</dt>
                      <dd>{res.rec.l}</dd>
                      <dt>Issued by</dt>
                      <dd>TFN Academy, a subsidiary of TFN Solutions</dd>
                      <dt>Status</dt>
                      <dd>Valid</dd>
                    </dl>
                  </div>
                ) : (
                  <div className="vres bad">
                    <div className="vh">
                      <Icon name="circle-alert" />
                      We couldn’t verify that number
                    </div>
                    <p>
                      {res.num
                        ? `No certificate matches “${res.num}”.`
                        : 'Enter a certificate number to continue.'}{' '}
                      Check the number on the certificate and try again, or{' '}
                      <Link to="/contact">contact admissions</Link>.
                    </p>
                  </div>
                )
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
