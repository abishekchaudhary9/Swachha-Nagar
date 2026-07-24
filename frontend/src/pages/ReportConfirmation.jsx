// Page: Report Confirmation
// Shown after successful citizen submission — mobile-first
import { useLocation, Link } from 'react-router-dom';

export default function ReportConfirmation() {
  const { state } = useLocation();
  const trackingCode = state?.tracking_code;

  if (!trackingCode) {
    return (
      <main className="min-h-screen bg-surface flex flex-col items-center justify-center px-container-margin">
        <p className="text-on-surface-variant text-body-md mb-md">No confirmation data found.</p>
        <Link to="/" className="btn-citizen">Go Home</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center px-container-margin py-xl">
      {/* Success icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/15 mb-lg">
        <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-headline-lg-mobile text-on-surface text-center mb-sm">
        Report Submitted!
      </h1>
      <p className="text-body-md text-on-surface-variant text-center max-w-xs mb-lg">
        Your report has been received. Municipal staff will review it shortly.
      </p>

      {/* Tracking code card */}
      <div className="card-citizen w-full max-w-sm text-center mb-lg">
        <p className="text-label-sm text-outline uppercase tracking-widest mb-xs">Tracking Code</p>
        <p className="text-display-lg font-bold text-primary tracking-widest">{trackingCode}</p>
        <p className="text-label-md text-on-surface-variant mt-sm">
          Save this code to track your report status.
        </p>
      </div>

      <div className="flex flex-col gap-sm w-full max-w-sm">
        <Link to={`/track?code=${trackingCode}`} className="btn-citizen w-full">
          Track This Report
        </Link>
        <Link to="/" className="btn-ghost-citizen w-full">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
