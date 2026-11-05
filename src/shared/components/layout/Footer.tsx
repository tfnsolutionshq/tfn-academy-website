import { Link, useLocation } from 'react-router-dom';
import { HUB_ADDRESS, TRACKS, findTrack } from '@/shared/constants/academyData';
import { useSite } from '@/shared/context/SiteContext';

const FOOTER_PROG_SLUGS = [
  'fullstack',
  'mobile',
  'cloud',
  'cyber',
  'data',
  'marketing',
  'graphics',
  'business',
];

export function Footer({ mcta }: { mcta: boolean }) {
  const { pathname } = useLocation();
  const { startApplyNew, startApplyProg } = useSite();
  const isProgDetail = pathname.startsWith('/programmes/') && pathname.length > '/programmes/'.length;
  const progSlug = isProgDetail ? pathname.slice('/programmes/'.length) : '';

  return (
    <>
      <footer>
        <div className="wrap">
          <div className="foot">
            <div>
              <Link className="brand" to="/">
                <span className="mark">TFN</span>TFN Academy
              </Link>
              <p className="small" style={{ marginTop: 18, maxWidth: '34ch' }}>
                Practical tech, creative and business training for young Nigerians. A subsidiary of
                TFN Solutions.
              </p>
              <p className="small" style={{ marginTop: 14 }}>
                In-person and hybrid. Virtual learning coming soon.
              </p>
            </div>

            <div>
              <h4>Programmes</h4>
              <ul>
                {FOOTER_PROG_SLUGS.map((s) => {
                  const t = findTrack(s);
                  if (!t) return null;
                  return (
                    <li key={s}>
                      <Link to={`/programmes/${s}`}>{t.short}</Link>
                    </li>
                  );
                })}
                <li>
                  <Link to="/programmes">
                    <b>All {TRACKS.length} programmes</b>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Academy</h4>
              <ul>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/admissions">Admission</Link>
                </li>
                <li>
                  <Link to="/kids">Kids & Teens</Link>
                </li>
                <li>
                  <Link to="/scholarship">Scholarship</Link>
                </li>
                <li>
                  <Link to="/corporate-training">Corporate Training</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/blog">Our Blog</Link>
                </li>
                <li>
                  <Link to="/verify">Verify certificate</Link>
                </li>
                <li>
                  <Link to="/hire-talents">Hire Talents</Link>
                </li>
                <li>
                  <Link to="/hub">TFN Hub</Link>
                </li>
                <li>
                  <Link to="/apply" onClick={startApplyNew}>
                    Apply now
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Get in touch</h4>
              <ul>
                <li>
                  <a href="mailto:info@tfnacademy.ng">info@tfnacademy.ng</a>
                </li>
                <li>
                  <a href="tel:+2347120033922">+234 712 003 3922</a>
                </li>
                <li>{HUB_ADDRESS}</li>
                <li className="small" style={{ color: '#A9B4D6' }}>
                  Virtual: coming soon
                </li>
                <li>
                  <Link to="/contact">Contact us</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="legal">
            <span>© TurboFlux Network Solutions Ltd. All rights reserved.</span>
            <span>Design prototype for stakeholder review. A subsidiary of TFN Solutions.</span>
          </div>
        </div>
      </footer>

      {mcta && (
        <div className="mcta">
          <Link
            className="btn btn-brand"
            to="/apply"
            onClick={() => {
              if (isProgDetail && progSlug) startApplyProg(progSlug);
              else startApplyNew();
            }}
          >
            Apply now
          </Link>
          <Link className="btn btn-line" to="/programmes">
            Programmes
          </Link>
        </div>
      )}
    </>
  );
}
