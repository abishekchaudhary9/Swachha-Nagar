import { Link } from 'react-router-dom';

const FOOTER_COLS = [
  {
    title: 'Product',
    links: [
      { to: '/how-it-works', label: 'How It Works' },
      { to: '/features', label: 'Features' },
      { to: '/submit', label: 'Report an Issue' },
      { to: '/track', label: 'Track a Report' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/for-municipalities', label: 'For Municipalities' },
      { to: '/staff/login', label: 'Staff Portal' },
    ],
  },
];

export default function MarketingFooter({ variant = 'light' }) {
  if (variant === 'dark') {
    return (
      <footer className="bg-primary text-on-primary w-full rounded-t-xl mt-auto">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="md:col-span-1">
            <p className="font-headline-md text-headline-md font-bold mb-2">Swachchha Nagar</p>
            <p className="text-body-md text-on-primary/70">
              Cleaner Cities. Together.
            </p>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <p className="font-label-caps text-label-caps text-on-primary/60 mb-2">{col.title}</p>
              <div className="flex flex-col gap-2">
                {col.links.map(l => (
                  <Link key={l.label} to={l.to} className="text-body-md text-body-md text-on-primary/80 hover:text-tertiary-fixed transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <p className="font-label-caps text-label-caps text-on-primary/60 mb-2">Support</p>
            <div className="flex flex-col gap-2">
              <a href="mailto:support@swachhanagar.com" className="text-body-md text-body-md text-on-primary/80 hover:text-tertiary-fixed transition-colors">
                Contact Us
              </a>
              <a href="#" className="text-body-md text-body-md text-on-primary/80 hover:text-tertiary-fixed transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-label-caps text-label-caps text-on-primary/60">
              © {new Date().getFullYear()} Swachchha Nagar Municipal Corporation. All rights reserved.
            </p>
            <span className="material-symbols-outlined text-tertiary-fixed">public</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface-container-lowest dark:bg-inverse-surface w-full rounded-t-xl border-t border-outline-variant dark:border-outline">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto">
        <div>
          <Link to="/" className="font-display-lg font-headline-md text-headline-md tracking-tighter text-primary dark:text-primary-fixed">
            Swachchha Nagar
          </Link>
          <p className="text-body-md text-body-md text-on-surface-variant mt-1 opacity-80">
            Cleaner Cities. Together.
          </p>
        </div>
        {FOOTER_COLS.map(col => (
          <div key={col.title} className="md:text-right">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">{col.title}</p>
            <div className="flex flex-col gap-2">
              {col.links.map(l => (
                <Link key={l.label} to={l.to} className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary opacity-80 hover:opacity-100 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-outline-variant/30">
        <p className="text-center py-4 font-label-caps text-label-caps text-outline">
          © {new Date().getFullYear()} Swachchha Nagar Municipal Corporation. Privacy Protected.
        </p>
      </div>
    </footer>
  );
}
