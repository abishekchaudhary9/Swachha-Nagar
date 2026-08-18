import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AP1WRLvqEeSNx1XairIMzMTuD1Ix3vDKfZJs7-YfgEEPNl2vV2qBzNwK_90H6awnWo0iV_bzKZrzsBPq3Tv4gEr0rWvA3sIHns9dGPYnSzCpCQlzKmbZv0Fy8F9lkUnrfuvbR34Z-KzQBLco3clLLW46ds-c6I34B9njMqJQXNIcT7clHLgKM_5MjunTbA3Cq3_QwpVPnrq69gqyWpvx5LHurPYqkXSlCHozCGCkNqYfsUhZWFOY0h66yfgxdUg";

const ROLE_LABEL = {
  admin:             'System Lead',
  field_officer:     'Ward Officer',
  sanitation_worker: 'Field Staff',
};

function relativeTime(iso) {
  if (!iso) return '';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString();
}

export default function StaffHeader({ user }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState([]);
  const [lastReadId, setLastReadId] = useState(() =>
    parseInt(localStorage.getItem(`sn_notif_read_${user?.id}`) || '0', 10) || 0
  );
  const bellRef = useRef(null);
  const name = user?.name || 'Admin User';
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  const fetchPending = () => {
    api.get('/api/reports', { params: { status: 'submitted', limit: 8 } })
      .then(res => setPending(res.data.reports || []))
      .catch(() => {});
  };

  useEffect(() => { fetchPending(); }, []);

  useEffect(() => {
    const onClickOutside = e => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const unread = pending.filter(r => r.id > lastReadId).length;

  const markAllRead = () => {
    const maxId = pending.reduce((m, r) => Math.max(m, r.id), 0);
    setLastReadId(maxId);
    localStorage.setItem(`sn_notif_read_${user?.id}`, String(maxId));
  };

  const onSearch = e => {
    e.preventDefault();
    navigate(`/staff/reports${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/staff/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-margin-mobile md:px-margin-desktop bg-white/70 dark:bg-inverse-surface/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm overflow-visible">
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
        <form onSubmit={onSearch} className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-surface-container-low rounded-full border border-outline-variant/50 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary-fixed-dim focus:border-transparent w-56 transition-all font-body-md"
            placeholder="Search reports, wards..."
          />
        </form>
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => { if (!open) fetchPending(); setOpen(o => !o); }}
            className="p-2 text-on-surface-variant hover:bg-primary/5 rounded-full transition-colors active:scale-95 duration-200 relative"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: unread > 0 ? "'FILL' 1" : "'FILL' 0" }}>
              {unread > 0 ? 'notifications' : 'notifications_none'}
            </span>
            {unread > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-error text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-12 w-80 max-w-[85vw] bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/40 overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/30 bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
                  <h4 className="font-button text-button font-bold text-on-surface">Notifications</h4>
                  {unread > 0 && (
                    <span className="font-label-caps text-label-caps bg-error-container text-on-error-container px-2 py-0.5 rounded-full">{unread} new</span>
                  )}
                </div>
                <button
                  onClick={markAllRead}
                  disabled={unread === 0}
                  className="font-label-caps text-label-caps text-primary hover:underline disabled:opacity-40 disabled:no-underline disabled:cursor-default"
                >
                  Mark all as read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {pending.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <span className="material-symbols-outlined text-4xl text-outline mb-2">notifications_off</span>
                    <p className="font-button text-button text-on-surface-variant">No new reports</p>
                    <p className="font-body-md text-body-md text-outline text-sm mt-1">You're all caught up.</p>
                  </div>
                ) : (
                  pending.map(r => {
                    const isUnread = r.id > lastReadId;
                    return (
                      <button
                        key={r.id}
                        onClick={() => { setOpen(false); navigate(`/staff/reports/${r.id}`); }}
                        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-surface-container-low transition-colors border-b border-outline-variant/20 last:border-0"
                      >
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${isUnread ? 'bg-error' : 'bg-outline-variant'}`}></span>
                        <div className="min-w-0">
                          <p className="font-button text-button font-semibold text-on-surface truncate">
                            New report #{r.tracking_code}
                          </p>
                          <p className="font-body-md text-body-md text-on-surface-variant text-sm capitalize">
                            {r.category.replace('_', ' ')}{r.ward ? ` — Ward ${r.ward}` : ''}
                          </p>
                          <p className="font-label-caps text-label-caps text-outline text-[11px]">{relativeTime(r.created_at)}</p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              <div className="border-t border-outline-variant/30 p-2">
                <Link
                  to="/staff/reports"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-button text-button text-primary hover:bg-primary/5 transition-colors"
                >
                  View all reports <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}
        </div>
        {user?.role === 'admin' && (
          <Link to="/staff/users" className="p-2 text-on-surface-variant hover:bg-primary/5 rounded-full transition-colors active:scale-95 duration-200 hidden sm:block" aria-label="Settings">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        )}
        <div className="flex items-center gap-2 pl-3 border-l border-outline-variant/30">
          <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-caps text-label-caps font-bold border border-primary-fixed-dim">
            {initials}
          </div>
          <div className="hidden lg:block">
            <p className="font-button text-button text-on-surface leading-tight">{name}</p>
            <p className="text-label-caps text-label-caps text-on-surface-variant">{ROLE_LABEL[user?.role] || 'Field Staff'}</p>
          </div>
          <button onClick={logout} className="p-2 text-on-surface-variant hover:text-error rounded-full transition-colors" aria-label="Sign out">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}