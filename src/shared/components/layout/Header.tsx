import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATS, TRACKS } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { useTheme } from '@/shared/context/ThemeContext';
import { useSite } from '@/shared/context/SiteContext';

const ACAD_LINKS: Array<[path: string, icon: string, title: string, sub: string]> = [
  ['/about', 'info', 'About', 'Who we are'],
  ['/admissions', 'clipboard-check', 'Admission', 'How to join and what you need'],
  ['/kids', 'smile', 'Kids & Teens', 'Holiday programmes'],
  ['/scholarship', 'award', 'Scholarship', 'Scholarships and grants'],
  ['/careers', 'briefcase', 'Careers', 'Join the TFN team'],
  ['/blog', 'newspaper', 'Our Blog', 'Advice and insights'],
  ['/verify', 'badge-check', 'Verify certificate', 'Confirm a certificate number'],
];

export function Header() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { startApplyNew } = useSite();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerProg, setDrawerProg] = useState(false);
  const [drawerAcad, setDrawerAcad] = useState(false);
  const [menuClosed, setMenuClosed] = useState(false);

  const closeMenus = () => {
    setMenuClosed(true);
    setDrawerOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  useEffect(() => {
    setDrawerOpen(false);
    setMenuClosed(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [pathname]);

  const dark = theme === 'dark';
  const inAcad =
    ['/about', '/admissions', '/kids', '/scholarship', '/careers', '/blog', '/verify'].includes(
      pathname,
    ) || pathname.startsWith('/blog/');

  const isOn = (path: string) => {
    if (path === '/programmes') {
      return pathname === '/programmes' || pathname.startsWith('/programmes/') ? 'on' : '';
    }
    return pathname === path ? 'on' : '';
  };

  return (
    <header className="topbar">
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label="TFN Academy home">
          <span className="mark">TFN</span>TFN Academy
        </Link>

        <nav className="navlinks" aria-label="Main">
          <div
            className="has-mega"
            onMouseEnter={() => setMenuClosed(false)}
            onMouseLeave={() => setMenuClosed(false)}
          >
            <Link
              className={`nl ${isOn('/programmes')}`.trim()}
              to="/programmes"
              onClick={closeMenus}
            >
              Programmes <Icon name="chevron-down" />
            </Link>
            <div
              className="mega"
              style={
                menuClosed
                  ? { opacity: 0, visibility: 'hidden', pointerEvents: 'none' }
                  : undefined
              }
            >
              <div className="wrap">
                <div className="mega-grid">
                  {CATS.map((c) => (
                    <div key={c.id}>
                      <h4>{c.name}</h4>
                      <ul>
                        {TRACKS.filter((t) => t.cat === c.id).map((t) => (
                          <li key={t.slug}>
                            <Link to={`/programmes/${t.slug}`} onClick={closeMenus}>
                              <Icon name={t.ic} />
                              {t.short}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mega-foot">
                  <Link className="tlink" to="/programmes" onClick={closeMenus}>
                    Browse all {TRACKS.length} programmes <Icon name="arrow-right" />
                  </Link>
                  <Link className="tlink" to="/kids" onClick={closeMenus}>
                    Kids & Teens holiday programmes <Icon name="arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className="has-menu"
            onMouseEnter={() => setMenuClosed(false)}
            onMouseLeave={() => setMenuClosed(false)}
          >
            <Link
              className={`nl ${inAcad ? 'on' : ''}`.trim()}
              to="/about"
              onClick={closeMenus}
            >
              Academy <Icon name="chevron-down" />
            </Link>
            <div
              className="menu-pop"
              style={
                menuClosed
                  ? { opacity: 0, visibility: 'hidden', pointerEvents: 'none' }
                  : undefined
              }
            >
              {ACAD_LINKS.map(([path, icon, title, sub]) => (
                <Link key={path} to={path} onClick={closeMenus}>
                  <Icon name={icon} />
                  <span>
                    <b>{title}</b>
                    <span className="s">{sub}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/corporate-training" className={isOn('/corporate-training')}>
            Corporate Training
          </Link>
          <Link to="/hire-talents" className={isOn('/hire-talents')}>
            Hire Talents
          </Link>
          <Link to="/hub" className={isOn('/hub')}>
            Hub
          </Link>
          <Link to="/contact" className={isOn('/contact')}>
            Contact
          </Link>
        </nav>

        <div className="nav-right">
          <button
            type="button"
            className="iconbtn"
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <Icon name={dark ? 'sun' : 'moon'} />
          </button>
          <Link className="btn btn-brand btn-sm" to="/apply" onClick={startApplyNew}>
            Apply now
          </Link>
        </div>

        <button
          type="button"
          className="menu-btn"
          onClick={() => setDrawerOpen((prev) => !prev)}
          aria-label="Menu"
          aria-expanded={drawerOpen}
        >
          <Icon name={drawerOpen ? 'x' : 'menu'} />
        </button>
      </div>

      <div className={`drawer ${drawerOpen ? 'open' : ''}`.trim()}>
        <button
          type="button"
          className="dl"
          onClick={() => setDrawerProg((prev) => !prev)}
          aria-expanded={drawerProg}
        >
          Programmes <Icon name="chevron-down" />
        </button>
        {drawerProg && (
          <>
            {CATS.map((c) => (
              <div key={c.id} style={{ display: 'contents' }}>
                <div className="gh">{c.name}</div>
                {TRACKS.filter((t) => t.cat === c.id).map((t) => (
                  <Link
                    key={t.slug}
                    className="sub-l"
                    to={`/programmes/${t.slug}`}
                    onClick={closeMenus}
                  >
                    <Icon name={t.ic} />
                    {t.short}
                  </Link>
                ))}
              </div>
            ))}
            <Link className="sub-l" to="/programmes" onClick={closeMenus}>
              <b>Browse all {TRACKS.length} programmes</b>
            </Link>
          </>
        )}

        <button
          type="button"
          className="dl"
          onClick={() => setDrawerAcad((prev) => !prev)}
          aria-expanded={drawerAcad}
        >
          Academy <Icon name="chevron-down" />
        </button>
        {drawerAcad &&
          ACAD_LINKS.map(([path, icon, title]) => (
            <Link key={path} className="sub-l" to={path} onClick={closeMenus}>
              <Icon name={icon} />
              {title}
            </Link>
          ))}

        <Link to="/corporate-training" onClick={closeMenus}>
          Corporate Training
        </Link>
        <Link to="/hire-talents" onClick={closeMenus}>
          Hire Talents
        </Link>
        <Link to="/hub" onClick={closeMenus}>
          Hub
        </Link>
        <Link to="/contact" onClick={closeMenus}>
          Contact
        </Link>

        <button type="button" className="dl" onClick={toggleTheme}>
          {dark ? 'Light theme' : 'Dark theme'} <Icon name={dark ? 'sun' : 'moon'} />
        </button>

        <Link className="btn btn-brand" to="/apply" onClick={startApplyNew}>
          Apply now
        </Link>
      </div>
    </header>
  );
}
