import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/features', label: 'Features' },
  { to: '/for-municipalities', label: 'For Municipalities' },
  { to: '/about', label: 'About' },
];

export default function PillNav() {
  const location = useLocation();
  const active = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      {/* Desktop floating pill nav */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-container-max rounded-full border border-white/40 dark:border-white/10 backdrop-blur-xl bg-surface/70 dark:bg-surface-container/70 shadow-sm flex justify-between items-center px-8 py-3 z-50 transition-all duration-200">
        <Link to="/" className="font-display-lg font-headline-md text-headline-md tracking-tighter text-primary dark:text-primary-fixed">
          Swachchha Nagar
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          {NAV_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-label-caps text-label-caps transition-all duration-200 hover:scale-95 ${
                active(l.to)
                  ? 'text-primary dark:text-tertiary-fixed-dim font-bold border-b-2 border-primary dark:border-tertiary-fixed-dim pb-1'
                  : 'text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/track"
            className="font-label-caps text-label-caps text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-all duration-200 hover:scale-95 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">history</span>
            Track Your Report
          </Link>
          <Link
            to="/staff/login"
            className="font-label-caps text-label-caps text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-all duration-200 hover:scale-95 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">person</span>
            Login
          </Link>
          <Link
            to="/submit"
            className="bg-primary-container text-on-primary rounded-full px-6 py-2 font-button text-button hover:scale-95 transition-transform duration-200 shadow-sm hidden md:block"
          >
            Report an Issue
          </Link>
          <Link to="/submit" className="md:hidden text-primary p-1" aria-label="Report an issue">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          </Link>
        </div>
      </nav>

      {/* Mobile sticky bar */}
      <nav className="md:hidden flex justify-between items-center px-4 py-3 bg-surface/90 dark:bg-surface/80 backdrop-blur-md sticky top-0 z-40 border-b border-surface-variant dark:border-outline-variant">
        <Link to="/" className="font-display-lg font-headline-md text-lg tracking-tighter text-primary dark:text-primary-fixed">
          Swachchha Nagar
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/staff/login"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors p-1"
            aria-label="Staff login"
          >
            <span className="material-symbols-outlined">person</span>
          </Link>
          <Link
            to="/track"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors p-1"
            aria-label="Track report"
          >
            <span className="material-symbols-outlined">history</span>
          </Link>
          <Link
            to="/submit"
            className="bg-primary-container text-on-primary rounded-full px-4 py-2 font-button text-button shadow-sm"
          >
            Report
          </Link>
        </div>
      </nav>
    </>
  );
}
