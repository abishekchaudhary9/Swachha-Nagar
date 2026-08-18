import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';

// Citizen / marketing pages
import Landing from './pages/Landing';
const HowItWorks        = lazy(() => import('./pages/HowItWorks'));
const Features          = lazy(() => import('./pages/Features'));
const ForMunicipalities = lazy(() => import('./pages/ForMunicipalities'));
const About             = lazy(() => import('./pages/About'));
const SubmitReport      = lazy(() => import('./pages/SubmitReport'));
const ReportConfirmation = lazy(() => import('./pages/ReportConfirmation'));
const TrackReport       = lazy(() => import('./pages/TrackReport'));

// Staff pages (desktop-first)
const StaffLogin        = lazy(() => import('./pages/StaffLogin'));
const StaffDashboard    = lazy(() => import('./pages/StaffDashboard'));
const ReportDetailPanel = lazy(() => import('./pages/ReportDetailPanel'));
const ReportCenter      = lazy(() => import('./pages/ReportCenter'));
const StaffAnalytics    = lazy(() => import('./pages/StaffAnalytics'));
const UserManagement    = lazy(() => import('./pages/UserManagement'));
const Wards             = lazy(() => import('./pages/Wards'));
const Fleet             = lazy(() => import('./pages/Fleet'));
const Hotspots          = lazy(() => import('./pages/Hotspots'));

import { ThemeProvider } from './context/ThemeContext';

// ── Protected Route guard ──────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('sn_token');
  if (!token) return <Navigate to="/staff/login" replace />;
  return children;
}

// ── Animated Routes wrapper ────────────────────────────────────────────────
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
        {/* ── Citizen / marketing routes ─────────────────── */}
        <Route path="/"                  element={<Landing />} />
        <Route path="/how-it-works"      element={<HowItWorks />} />
        <Route path="/features"          element={<Features />} />
        <Route path="/for-municipalities" element={<ForMunicipalities />} />
        <Route path="/about"             element={<About />} />
        <Route path="/submit"            element={<SubmitReport />} />
        <Route path="/confirmation"      element={<ReportConfirmation />} />
        <Route path="/track"             element={<TrackReport />} />
        <Route path="/track/:code"       element={<TrackReport />} />

        {/* ── Staff routes (JWT protected) ─────────────── */}
        <Route path="/staff/login"       element={<StaffLogin />} />
        <Route
          path="/staff/dashboard"
          element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>}
        />
        <Route
          path="/staff/reports"
          element={<ProtectedRoute><ReportCenter /></ProtectedRoute>}
        />
        <Route
          path="/staff/reports/:id"
          element={<ProtectedRoute><ReportDetailPanel /></ProtectedRoute>}
        />
        <Route
          path="/staff/wards"
          element={<ProtectedRoute><Wards /></ProtectedRoute>}
        />
        <Route
          path="/staff/fleet"
          element={<ProtectedRoute><Fleet /></ProtectedRoute>}
        />
        <Route
          path="/staff/hotspots"
          element={<ProtectedRoute><Hotspots /></ProtectedRoute>}
        />
        <Route
          path="/staff/analytics"
          element={<ProtectedRoute><StaffAnalytics /></ProtectedRoute>}
        />
        <Route
          path="/staff/users"
          element={<ProtectedRoute><UserManagement /></ProtectedRoute>}
        />

        {/* ── Fallback ─────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

// ── Route-level loading fallback ─────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
