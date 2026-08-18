import { Link, useLocation, useNavigate } from 'react-router-dom';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AP1WRLvqEeSNx1XairIMzMTuD1Ix3vDKfZJs7-YfgEEPNl2vV2qBzNwK_90H6awnWo0iV_bzKZrzsBPq3Tv4gEr0rWvA3sIHns9dGPYnSzCpCQlzKmbZv0Fy8F9lkUnrfuvbR34Z-KzQBLco3clLLW46ds-c6I34B9njMqJQXNIcT7clHLgKM_5MjunTbA3Cq3_QwpVPnrq69gqyWpvx5LHurPYqkXSlCHozCGCkNqYfsUhZWFOY0h66yfgxdUg";

export default function StaffSidebar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { to: '/staff/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { to: '/staff/wards',     icon: 'leaderboard', label: 'Ward Performance' },
    { to: '/staff/fleet',     icon: 'local_shipping', label: 'Fleet Monitor' },
    { to: '/staff/hotspots',  icon: 'radar', label: 'Hotspot Analysis' },
    { to: '/staff/reports',   icon: 'assessment', label: 'Report Center' },
    { to: '/staff/analytics', icon: 'analytics', label: 'Analytics' },
  ];

  if (user?.role === 'admin') {
    items.push({ to: '/staff/users', icon: 'groups', label: 'Staff Settings' });
  }

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/');

  const logout = () => {
    localStorage.clear();
    navigate('/staff/login');
  };

  return (
    <aside className="hidden md:flex flex-col h-screen py-stack-lg px-4 gap-stack-md bg-surface dark:bg-inverse-surface border-r border-outline-variant/20 fixed left-0 w-64 z-40">
      <div className="px-2 mb-4">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Swachchha Nagar Logo" className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <h1 className="font-display-lg text-lg font-extrabold tracking-tight text-primary dark:text-primary-fixed leading-tight">KMC Operations</h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-1 opacity-70">Municipal Hub</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {items.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all active:translate-x-1 duration-150 font-label-caps text-label-caps ${
              isActive(item.to)
                ? 'text-on-tertiary-container bg-tertiary-fixed-dim/20 font-bold'
                : 'text-on-secondary-fixed-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive(item.to) ? "'FILL' 1" : "'FILL' 0" }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <Link
          to="/staff/reports"
          className="w-full bg-primary-container text-on-primary py-2 px-4 rounded-lg font-button text-button hover:bg-[#093027] transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
          Dispatch Crew
        </Link>
        <div className="space-y-1 pt-4 border-t border-outline-variant/20">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-on-secondary-fixed-variant hover:bg-surface-container-high transition-all active:translate-x-1 duration-150 rounded-lg">
            <span className="material-symbols-outlined">public</span>
            <span className="font-label-caps text-label-caps">Citizen View</span>
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 text-on-secondary-fixed-variant hover:bg-error-container/30 hover:text-error transition-all active:translate-x-1 duration-150 rounded-lg">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-caps text-label-caps">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
