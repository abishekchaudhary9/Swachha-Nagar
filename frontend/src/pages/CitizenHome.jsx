// Page: Citizen Home
// Mobile-first landing page for citizens
import { Link } from 'react-router-dom';

export default function CitizenHome() {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center px-container-margin py-xl">
      {/* Header */}
      <div className="text-center mb-xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-lg">
          <svg className="w-8 h-8 text-on-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h1 className="text-headline-lg-mobile font-semibold text-on-surface mb-sm">
          Swachha Nagar
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-xs mx-auto">
          Report garbage, track cleanup progress, and help keep our city clean.
        </p>
      </div>

      {/* Action cards */}
      <div className="w-full max-w-sm flex flex-col gap-md">
        <Link
          to="/submit"
          className="btn-citizen w-full text-body-md py-md rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Report Waste
        </Link>

        <Link
          to="/track"
          className="btn-ghost-citizen w-full text-body-md py-md rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          Track My Report
        </Link>
      </div>

      {/* Staff login link */}
      <p className="mt-xl text-label-md text-outline">
        Municipal staff?{' '}
        <Link to="/staff/login" className="text-secondary hover:underline">
          Staff Login →
        </Link>
      </p>
    </main>
  );
}
