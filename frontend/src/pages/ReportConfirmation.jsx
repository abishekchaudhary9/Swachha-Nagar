import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AP1WRLvqEeSNx1XairIMzMTuD1Ix3vDKfZJs7-YfgEEPNl2vV2qBzNwK_90H6awnWo0iV_bzKZrzsBPq3Tv4gEr0rWvA3sIHns9dGPYnSzCpCQlzKmbZv0Fy8F9lkUnrfuvbR34Z-KzQBLco3clLLW46ds-c6I34B9njMqJQXNIcT7clHLgKM_5MjunTbA3Cq3_QwpVPnrq69gqyWpvx5LHurPYqkXSlCHozCGCkNqYfsUhZWFOY0h66yfgxdUg";

export default function ReportConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.tracking_code) navigate('/', { replace: true });
  }, [state, navigate]);

  const trackingCode = state?.tracking_code || '';
  const [copied, setCopied] = useState(false);

  if (!trackingCode) return null;

  const copyTrackingCode = () => {
    navigator.clipboard.writeText(trackingCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="bg-background text-on-surface min-h-screen flex flex-col font-body-md overflow-x-hidden"
    >
      {/* Top App Bar */}
      <header className="bg-surface-container-low flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-stack-sm fixed top-0 left-0 z-50 border-b border-outline-variant/20">
        <div className="h-10 w-auto flex items-center">
          <Link to="/">
            <img src={LOGO_URL} alt="Swachchha Nagar Logo" className="h-8 object-contain" />
          </Link>
        </div>
        <div className="flex gap-stack-md items-center">
          <Link to="/submit" className="hidden sm:inline-flex items-center gap-stack-sm bg-primary text-on-primary px-stack-md py-stack-sm rounded-xl font-button text-button font-semibold hover:opacity-90 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Report Another
          </Link>
          <span className="material-symbols-outlined text-primary">notifications</span>
          <Link to="/staff/login" className="material-symbols-outlined text-primary">account_circle</Link>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop pt-24 pb-12 relative">
        <div className="w-full max-w-5xl md:flex md:gap-stack-lg md:items-start">
          {/* Left Column - Success Content */}
          <div className="md:flex-1 md:flex md:flex-col md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
              className="z-10 flex flex-col items-center text-center space-y-stack-lg w-full max-w-md md:max-w-lg"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 200 }}
                className="bg-primary-fixed rounded-full p-8 flex items-center justify-center shadow-lg shadow-primary/10"
              >
                <span className="material-symbols-outlined text-primary text-[80px]" style={{ fontVariationSettings: "'wght' 600" }}>
                  check_circle
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="space-y-stack-sm"
              >
                <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary font-bold">
                  Report Submitted
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] md:max-w-sm mx-auto">
                  Thank you for contributing to a cleaner city. Our team has received your report.
                </p>
              </motion.div>

              {/* Tracking Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                className="w-full bg-surface shadow-sm rounded-xl border border-outline-variant p-stack-lg space-y-stack-md text-left mt-stack-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase font-semibold">Tracking Code</span>
                  <span className="bg-primary/10 text-primary px-stack-sm py-stack-sm rounded-full font-label-caps text-label-caps font-semibold">Active</span>
                </div>

                <div
                  onClick={copyTrackingCode}
                  className="bg-surface-container-low rounded-lg p-stack-md border-dashed border-2 border-outline flex items-center justify-between group active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="font-mono text-headline-md md:text-display-lg text-primary tracking-[0.2em] font-bold">
                    {trackingCode}
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </div>

                <div className="flex items-start gap-stack-sm">
                  <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">info</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Save this code to track your report status in the 'Track' tab.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Visual Context & Actions (Desktop) */}
          <aside className="hidden md:block md:w-80 lg:w-96 shrink-0 mt-stack-lg md:mt-0">
            <div className="sticky top-24 space-y-stack-md">
              {/* Visual Context Image */}
              <div className="w-full rounded-xl overflow-hidden h-48 relative group">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Clean urban park"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd05-WC8ei6Brfm-7L3khUsWZC5yQyrUNpGZiRf14nI-FmtLdlFU2A7PZ2im8OZkQv2CQ2FWBw5mgd7z566rnEEMdGik1EXgjBr0UpAJAuFgW4SB8ussO_ZgObxfW3n6TCrpNZXOoRXZlMgbP4ul6q-EDleN_01K-cBlI8-zrEnZ0kj7K2Sg3l7Fgu6XPn72pEN_-cp70T_B8fJHtBZB16t5ut4oIdxLC67SPFvsy9gX6afPkZ42tiWtqtnLxwx4ROfo6ADbg0EmA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-stack-md">
                <Link
                  to="/"
                  className="w-full bg-primary text-on-primary font-button text-button py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-stack-sm font-semibold"
                >
                  <span className="material-symbols-outlined">home</span>
                  Return Home
                </Link>
                <Link
                  to={`/track?code=${trackingCode}`}
                  className="w-full bg-transparent border border-primary text-primary font-button text-button py-4 rounded-xl hover:bg-primary/5 active:scale-95 transition-all flex items-center justify-center font-semibold"
                >
                  View Report Details
                </Link>
              </div>

              {/* Tip Card */}
              <div className="bg-primary-container/10 p-stack-md rounded-xl border border-primary/20">
                <div className="flex gap-stack-sm">
                  <span className="material-symbols-outlined text-primary shrink-0">quickreply</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    You'll receive email updates when your report status changes.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Action Buttons (below content) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
            className="w-full max-w-md mt-stack-lg space-y-stack-md md:hidden"
          >
            <Link
              to="/"
              className="w-full bg-primary text-on-primary font-button text-button py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-stack-sm font-semibold"
            >
              <span className="material-symbols-outlined">home</span>
              Return Home
            </Link>
            <Link
              to={`/track?code=${trackingCode}`}
              className="w-full bg-transparent border border-primary text-primary font-button text-button py-4 rounded-xl hover:bg-primary/5 active:scale-95 transition-all flex items-center justify-center font-semibold"
            >
              View Report Details
            </Link>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}