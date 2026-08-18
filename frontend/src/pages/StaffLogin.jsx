import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../services/api';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AP1WRLvqEeSNx1XairIMzMTuD1Ix3vDKfZJs7-YfgEEPNl2vV2qBzNwK_90H6awnWo0iV_bzKZrzsBPq3Tv4gEr0rWvA3sIHns9dGPYnSzCpCQlzKmbZv0Fy8F9lkUnrfuvbR34Z-KzQBLco3clLLW46ds-c6I34B9njMqJQXNIcT7clHLgKM_5MjunTbA3Cq3_QwpVPnrq69gqyWpvx5LHurPYqkXSlCHozCGCkNqYfsUhZWFOY0h66yfgxdUg";

export default function StaffLogin() {
  const navigate = useNavigate();
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember,     setRemember]     = useState(false);
  const [error,        setError]        = useState('');
  const [loading,      setLoading]      = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(email, password);
      localStorage.setItem('sn_token', res.data.token);
      localStorage.setItem('sn_user',  JSON.stringify(res.data.user));
      navigate('/staff/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="min-h-screen w-screen overflow-y-auto flex items-center justify-center p-stack-sm text-on-surface bg-surface-container-low relative"
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden z-0">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"></path>
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%"></rect>
        </svg>
      </div>

      {/* Login Container */}
      <main className="relative z-10 w-full max-w-[400px] my-auto">
        {/* Top Branding / Logo */}
        <div className="flex flex-col items-center mb-stack-md">
          <div className="w-14 h-14 mb-stack-sm overflow-hidden rounded-xl bg-white shadow-sm flex items-center justify-center p-stack-sm border border-outline-variant/30">
            <img alt="Swachchha Nagar Logo" className="w-full h-full object-contain" src={LOGO_URL} />
          </div>
          <h1 className="font-headline-md text-xl text-primary tracking-tight font-bold">Swachchha Nagar</h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant">Municipal Management Portal</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-stack-lg shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mb-stack-md"
          >
            <h2 className="font-headline-md text-lg text-on-surface font-bold">Staff Log In</h2>
            <p className="font-body-md text-sm text-on-surface-variant">Enter your credentials to access the portal.</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-stack-sm p-stack-sm rounded-lg bg-error-container text-on-error-container text-xs font-semibold"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-stack-md">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-stack-sm"
            >
              <label className="font-label-caps text-label-caps text-on-surface-variant block font-semibold" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-stack-md top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-[42px] pl-[44px] pr-stack-md bg-white border border-outline-variant rounded-lg font-body-md text-sm transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="staff@nagar.gov.in"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="space-y-stack-sm"
            >
              <div className="flex justify-between items-center">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-semibold" htmlFor="password">Password</label>
                <a className="font-label-caps text-label-caps text-secondary hover:underline transition-all active:scale-95" href="#">Forgot?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-stack-md top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-[42px] pl-[44px] pr-[44px] bg-white border border-outline-variant rounded-lg font-body-md text-sm transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-stack-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant transition-colors active:scale-90"
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </motion.div>

            {/* Remember Me */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex items-center gap-stack-sm"
            >
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary-container"
              />
              <label className="font-body-md text-xs text-on-surface-variant cursor-pointer" htmlFor="remember">Remember this device</label>
            </motion.div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full h-[48px] bg-secondary hover:bg-secondary-container text-on-secondary font-button text-button rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-stack-sm font-bold disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Log In'}</span>
              <span className="material-symbols-outlined text-[20px]">login</span>
            </motion.button>
          </form>

          <div className="mt-stack-md pt-stack-md border-t border-outline-variant/30 text-center">
            <p className="font-body-md text-xs text-on-surface-variant">
              Citizen Portal?{' '}
              <Link to="/" className="text-primary font-semibold hover:underline">
                Go to Citizen Home
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Footer Info */}
        <footer className="mt-stack-md text-center space-y-stack-sm">
          <p className="font-label-caps text-[11px] text-outline-variant">© 2026 Swachchha Nagar Municipal Corporation</p>
        </footer>
      </main>
    </motion.div>
  );
}