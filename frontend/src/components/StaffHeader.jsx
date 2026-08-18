import { Link, useNavigate } from 'react-router-dom';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AP1WRLvqEeSNx1XairIMzMTuD1Ix3vDKfZJs7-YfgEEPNl2vV2qBzNwK_90H6awnWo0iV_bzKZrzsBPq3Tv4gEr0rWvA3sIHns9dGPYnSzCpCQlzKmbZv0Fy8F9lkUnrfuvbR34Z-KzQBLco3clLLW46ds-c6I34B9njMqJQXNIcT7clHLgKM_5MjunTbA3Cq3_QwpVPnrq69gqyWpvx5LHurPYqkXSlCHozCGCkNqYfsUhZWFOY0h66yfgxdUg";

const ROLE_LABEL = {
  admin:             'System Lead',
  field_officer:     'Ward Officer',
  sanitation_worker: 'Field Staff',
  staff:             'Staff',
};

export default function StaffHeader({ user }) {
  const navigate = useNavigate();
  const name = user?.name || 'Admin User';
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  const logout = () => {
    localStorage.clear();
    navigate('/staff/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-margin-mobile md:px-margin-desktop bg-white/70 dark:bg-inverse-surface/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 min-w-0">
        <Link to="/staff/dashboard" className="md:hidden shrink-0">
          <img src={LOGO_URL} alt="Swachchha Nagar" className="h-8 w-auto object-contain" />
        </Link>
        <span className="hidden md:flex items-center gap-2 bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full font-label-caps text-label-caps whitespace-nowrap">
          <span className="material-symbols-outlined text-[14px]">verified</span>
          MUNICIPAL OPERATIONS
        </span>
        <span className="md:hidden font-headline-md text-headline-md tracking-tighter text-primary truncate">
          KMC Operations
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
          <input
            className="pl-10 pr-4 py-2 bg-surface-container-low rounded-full border border-outline-variant/50 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary-fixed-dim focus:border-transparent w-56 transition-all font-body-md"
            placeholder="Search reports, wards..."
          />
        </div>
        <button className="p-2 text-on-surface-variant hover:bg-primary/5 rounded-full transition-colors active:scale-95 duration-200 relative" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-primary/5 rounded-full transition-colors active:scale-95 duration-200 hidden sm:block" aria-label="Settings">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-outline-variant/30">
          <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-caps text-label-caps font-bold border border-primary-fixed-dim">
            {initials}
          </div>
          <div className="hidden lg:block">
            <p className="font-button text-button text-on-surface leading-tight">{name}</p>
            <p className="text-label-caps text-label-caps text-on-surface-variant">{ROLE_LABEL[user?.role] || 'Staff'}</p>
          </div>
          <button onClick={logout} className="p-2 text-on-surface-variant hover:text-error rounded-full transition-colors" aria-label="Sign out">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}