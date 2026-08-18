import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works \u2014 Swachchha Nagar" },
      { name: "description", content: "From a photo to a resolved report: see how citizen reports flow to municipal crews." },
      { property: "og:title", content: "How It Works \u2014 Swachchha Nagar" },
      { property: "og:description", content: "From a photo to a resolved report: see how citizen reports flow to municipal crews." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-container-max rounded-full border border-white/40 dark:border-white/10 backdrop-blur-xl bg-surface/70 z-50 shadow-sm flex justify-between items-center px-8 py-3 hidden md:flex">
      <div className="font-display-lg text-headline-md tracking-tighter text-primary dark:text-primary-fixed">Swachchha Nagar</div>
      <div className="flex gap-gutter items-center">
      <Link to="/" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps hover:scale-95 transition-transform duration-200">Home</Link>
      <Link to="/how-it-works" className="text-primary dark:text-tertiary-fixed-dim font-bold border-b-2 border-primary dark:border-tertiary-fixed-dim pb-1 font-label-caps text-label-caps scale-98 transition-all duration-200">How It Works</Link>
      <Link to="/features" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps hover:scale-95 transition-transform duration-200">Features</Link>
      <Link to="/for-municipalities" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps hover:scale-95 transition-transform duration-200">For Municipalities</Link>
      <Link to="/about" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps hover:scale-95 transition-transform duration-200">About</Link>
      </div>
      <button className="bg-primary-container text-on-primary hover:bg-primary-container/90 px-4 py-2 rounded-full font-button text-button transition-transform duration-200 hover:scale-95">Report an Issue</button>
      </nav>

      <nav className="md:hidden flex justify-between items-center p-4 bg-surface/90 backdrop-blur-md sticky top-0 z-40 border-b border-surface-variant">
      <div className="font-display-lg-mobile text-headline-md tracking-tighter text-primary">Swachchha Nagar</div>
      <button className="text-on-surface"><span className="material-symbols-outlined">menu</span></button>
      </nav>
      <main className="flex-grow pt-24 md:pt-32 pb-margin-desktop px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">

      <header className="text-center mb-16 md:mb-24">
      <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-stack-md">From Issue to Resolution.</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">A transparent, step-by-step process designed to connect citizens with municipal action efficiently.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-24">

      <section className="md:col-span-7 bg-surface-container-lowest rounded-xl border border-surface-variant card-shadow p-8 relative overflow-hidden flex flex-col justify-center">
      <div className="absolute top-0 right-0 p-4 opacity-10">
      <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span>
      </div>
      <div className="mb-4">
      <span className="inline-block bg-tertiary-fixed-dim/20 text-primary-container font-label-caps text-label-caps px-2 py-1 rounded">01 / Report</span>
      </div>
      <h2 className="font-headline-md text-headline-md text-primary mb-2">Capture &amp; Geo-tag</h2>
      <p className="text-on-surface-variant mb-6 max-w-md">Citizens capture environmental issues using our mobile app. The system automatically appends precise GPS coordinates and timestamps to ensure accurate reporting.</p>
      <div className="flex gap-4">
      <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-lg border border-surface-variant">
      <span className="material-symbols-outlined text-primary-container">photo_camera</span>
      <span className="font-label-caps text-label-caps text-on-surface">Photo Evidence</span>
      </div>
      <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-lg border border-surface-variant">
      <span className="material-symbols-outlined text-primary-container">location_on</span>
      <span className="font-label-caps text-label-caps text-on-surface">GPS Location</span>
      </div>
      </div>
      </section>

      <div className="md:col-span-5 rounded-xl overflow-hidden border border-surface-variant h-64 md:h-auto">
      <div className="bg-cover bg-center w-full h-full min-h-[250px]" data-alt="A high-fidelity mockup of a sleek mobile app interface showing a user taking a photo of a street pothole. The UI has a minimalist green and white theme, with a prominent 'Submit Issue' button. The lighting is bright and modern, suggesting daytime civic engagement in a clean urban environment." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlLHUilvrIwgI_AUJwxOs26vhIkX7gKAb45fIZPe_1h2R4UJR7aVlduy_zw-JcpMRNdpy7CnPWUnfJtNi3qgM4RQFpNYSTR3GvpBtEndruwS-rMnwo4eMuSvh23lcMMySgibDdv03heH022s4tTBxlzwbV1VonXM8ZmGtXGhnDjNhVW_GLvQbr5-uGSFqGjPPzRq21DUGpRIDfEBWHa2LnCidE847zyAzuZkJvltrTqQJuCR_sVVHJZA')" }}></div>
      </div>

      <div className="md:col-span-5 rounded-xl overflow-hidden border border-surface-variant h-64 md:h-auto md:order-3">
      <div className="bg-cover bg-center w-full h-full min-h-[250px]" data-alt="A sophisticated dashboard interface displayed on a tablet screen, showing a map of a city with various pins indicating reported civic issues. The dashboard has a light mode aesthetic with deep green accents and elegant data visualizations. The setting implies a modern, efficient municipal command center." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC16wCuhcGVnSxUvlg1p3RFLsu83beduFKQJIfR1fpriEiOGIy2f0F9uG8nUQ5nZnLqT78A3zNmESb3p87PCXBIWNFhX95weOo2xE_ge8QUkd5-gsA5vfAxJmbwzbC0UHmykeYcDOo_aN_yWME7yNgJ6kigCQluGoCm7IfcNEf1q_8kB8Wg2uq2-vjM8XOICbyHfVX4Y0fP6vZkVaXYPDWg-rmY_X6wBPiKeg-zARirlPnRpOTURhYGyg')" }}></div>
      </div>

      <section className="md:col-span-7 bg-surface-container-lowest rounded-xl border border-surface-variant card-shadow p-8 md:order-4">
      <div className="mb-4">
      <span className="inline-block bg-tertiary-fixed-dim/20 text-primary-container font-label-caps text-label-caps px-2 py-1 rounded">02 / Dispatch</span>
      </div>
      <h2 className="font-headline-md text-headline-md text-primary mb-2">Intelligent Routing</h2>
      <p className="text-on-surface-variant mb-6">Reports are instantly routed to the appropriate municipal department based on category and location. Our dashboard provides city officials with a prioritized triage view.</p>
      <div className="grid grid-cols-2 gap-4">
      <div className="p-4 border border-surface-variant rounded-lg bg-surface flex flex-col gap-2">
      <span className="material-symbols-outlined text-outline">category</span>
      <span className="font-body-md text-body-md text-on-surface">Auto-Categorization</span>
      </div>
      <div className="p-4 border border-surface-variant rounded-lg bg-surface flex flex-col gap-2">
      <span className="material-symbols-outlined text-outline">group</span>
      <span className="font-body-md text-body-md text-on-surface">Team Assignment</span>
      </div>
      </div>
      </section>

      <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-gutter md:order-5">

      <section className="bg-surface-container-lowest rounded-xl border border-surface-variant card-shadow p-8">
      <div className="mb-4">
      <span className="inline-block bg-tertiary-fixed-dim/20 text-primary-container font-label-caps text-label-caps px-2 py-1 rounded">03 / Track</span>
      </div>
      <h2 className="font-headline-md text-headline-md text-primary mb-2">Real-Time Updates</h2>
      <p className="text-on-surface-variant mb-6">Citizens receive push notifications as their report moves through the resolution pipeline—from 'Received' to 'In Progress' to 'Resolved'.</p>

      <div className="mt-8 relative">
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-surface-variant z-0"></div>
      <ul className="flex flex-col gap-4 relative z-10">
      <li className="flex gap-4 items-center">
      <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-[14px]">check</span>
      </div>
      <span className="font-button text-button text-on-surface">Report Submitted</span>
      </li>
      <li className="flex gap-4 items-center">
      <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-[14px]">check</span>
      </div>
      <span className="font-button text-button text-on-surface">Assigned to Team</span>
      </li>
      <li className="flex gap-4 items-center">
      <div className="w-6 h-6 rounded-full border-2 border-tertiary-fixed-dim bg-surface flex items-center justify-center shrink-0">
      <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></div>
      </div>
      <span className="font-button text-button text-primary font-bold">In Progress</span>
      </li>
      </ul>
      </div>
      </section>

      <section className="bg-primary text-on-primary rounded-xl p-8 relative overflow-hidden">

      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
      <div className="relative z-10">
      <div className="mb-4">
      <span className="inline-block bg-white/20 text-white font-label-caps text-label-caps px-2 py-1 rounded">04 / Verify</span>
      </div>
      <h2 className="font-headline-md text-headline-md mb-2">Resolution Verification</h2>
      <p className="text-primary-fixed-dim mb-6">Once resolved, municipal workers upload photographic proof. The original reporter is notified and can confirm the resolution, closing the loop.</p>
      <div className="bg-surface-tint/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 flex items-start gap-4">
      <span className="material-symbols-outlined text-tertiary-fixed-dim text-3xl">verified</span>
      <div>
      <h4 className="font-button text-button text-white mb-1">Issue Closed</h4>
      <p className="text-sm text-primary-fixed-dim">Verified by Department of Public Works</p>
      </div>
      </div>
      </div>
      </section>
      </div>
      </div>
      </main>

      <footer className="bg-surface-container-lowest dark:bg-inverse-surface w-full rounded-t-xl border-t border-outline-variant dark:border-outline grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-stack-lg max-w-container-max mx-auto">
      <div className="md:col-span-1">
      <div className="font-display-lg text-headline-md text-primary dark:text-primary-fixed mb-2">Swachchha Nagar</div>
      <p className="font-body-md text-body-md text-primary dark:text-primary-fixed-dim opacity-80 hover:opacity-100 transition-opacity">© 2024 Swachchha Nagar. Engineering cleaner cities for Nepal.</p>
      </div>
      <div className="md:col-span-3 flex flex-wrap gap-4 md:justify-end items-center">
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Muni Portal</a>
      <a className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Contact Us</a>
      </div>
      </footer>
    </>
  );
}
