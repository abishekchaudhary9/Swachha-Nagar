import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features \u2014 Swachchha Nagar" },
      { name: "description", content: "GPS reporting, live fleet tracking, hotspot maps and transparent resolution updates." },
      { property: "og:title", content: "Features \u2014 Swachchha Nagar" },
      { property: "og:description", content: "GPS reporting, live fleet tracking, hotspot maps and transparent resolution updates." },
    ],
  }),
  component: Features,
});

function Features() {
  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-container-max rounded-full border border-white/40 dark:border-white/10 backdrop-blur-xl bg-surface/70 dark:bg-surface-container/70 shadow-sm z-50 transition-all duration-200">
      <div className="flex justify-between items-center px-8 py-3 z-50">

      <Link to="/" className="font-display-lg text-headline-md tracking-tighter text-primary dark:text-primary-fixed">
                      Swachchha Nagar
                  </Link>

      <nav className="hidden md:flex items-center gap-gutter">
      <Link to="/" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps uppercase hover:scale-95 transition-transform duration-200">
                          Home
                      </Link>
      <Link to="/how-it-works" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps uppercase hover:scale-95 transition-transform duration-200">
                          How It Works
                      </Link>
      <Link to="/features" className="text-primary dark:text-tertiary-fixed-dim font-bold border-b-2 border-primary dark:border-tertiary-fixed-dim pb-1 font-label-caps text-label-caps uppercase scale-98 transition-all duration-200">
                          Features
                      </Link>
      <Link to="/for-municipalities" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps uppercase hover:scale-95 transition-transform duration-200">
                          For Municipalities
                      </Link>
      <Link to="/about" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-caps text-label-caps uppercase hover:scale-95 transition-transform duration-200">
                          About
                      </Link>
      </nav>

      <button className="hidden md:block bg-primary-container text-on-primary hover:scale-95 transition-transform duration-200 font-button text-button px-4 py-2 rounded-full shadow-sm">
                      Report an Issue
                  </button>

      <button className="md:hidden text-primary">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
      </button>
      </div>
      </header>
      <main className="flex-grow glass-nav-container">

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg md:py-24 text-center">
      <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-stack-md">
                      Technical Capabilities
                  </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                      Discover the advanced technological infrastructure powering Swachchha Nagar. Engineered for precision, efficiency, and radical transparency in urban waste management.
                  </p>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

      <div className="feature-card rounded-xl p-stack-lg md:col-span-2 relative overflow-hidden group">
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('placeholder')] bg-cover bg-center" data-alt="A highly detailed, technical interface showing a minimalist map with glowing green digital nodes and sweeping trajectory lines. The aesthetic is clean, light-mode, and professional, utilizing deep greens (#0B3D32) and bright teals (#65D6B0) on a white background. It suggests real-time satellite tracking and urban infrastructure monitoring without being overly complex." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIhLCW_uuocDaLDPXOrnUjnJbRRIVKDGr9wO_Poocbrf0WOxQjAn6WwmcFF3HCBjjuOyIwA_HDgJDVZYyyZS_WPWXxUIPTtCpAxksy9Er7P9XOFNSZHzTyJpcamyz7lYwxwKLLvcJ0zCHYir1c689nO5jcm9ddv16HVj4-TYOrltVvFgXso_qVslZD4Q-gTy8GRW6zWTGqF-ijO0i9JnqQ-cBF5p65EdB3GXMm5WG_BZkVWFJlf--w_g')" }}></div>
      <div className="relative z-10 flex flex-col h-full">
      <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-stack-md border border-outline-variant">
      <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-primary mb-base">Real-time GPS Reporting</h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md max-w-md">
                                  Pinpoint exact locations of waste accumulation with millimeter precision. Our geospatial engine aggregates citizen reports instantly, translating raw coordinates into actionable municipal intelligence.
                              </p>
      <div className="mt-auto flex items-center gap-2">
      <span className="font-label-caps text-label-caps px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded uppercase">Live Sync</span>
      <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-container text-on-surface rounded uppercase">Sub-meter Accuracy</span>
      </div>
      </div>
      </div>

      <div className="feature-card rounded-xl p-stack-lg flex flex-col">
      <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-stack-md border border-outline-variant">
      <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 0" }}>memory</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-primary mb-base">AI-Powered Categorization</h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
                              Automated image analysis identifies waste types (organic, recyclable, hazardous) from user-submitted photos, streamlining routing for specialized disposal units before they even dispatch.
                          </p>
      <div className="mt-auto">
      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-2">
      <div className="bg-primary-container h-full rounded-full w-[94%] relative">
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-tertiary-fixed animate-pulse"></div>
      </div>
      </div>
      <p className="font-label-caps text-label-caps text-on-surface-variant text-right uppercase">94% Classification Accuracy</p>
      </div>
      </div>

      <div className="feature-card rounded-xl p-stack-lg flex flex-col">
      <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-stack-md border border-outline-variant">
      <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 0" }}>radar</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-primary mb-base">Data-Driven Hotspots</h3>
      <p className="font-body-md text-body-md text-on-surface-variant">
                              Predictive algorithms analyze historical reporting frequency to identify chronic problem areas, enabling proactive resource allocation rather than reactive cleanups.
                          </p>
      </div>

      <div className="feature-card rounded-xl p-stack-lg md:col-span-2 flex flex-col md:flex-row gap-stack-lg items-center">
      <div className="flex-1">
      <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-stack-md border border-outline-variant">
      <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 0" }}>dashboard</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-primary mb-base">Municipal Operations Dashboard</h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
                                  A centralized command center for civic authorities. Monitor fleet locations, track resolution metrics, and generate compliance reports through a highly secure, intuitive interface designed for complex logistical operations.
                              </p>
      <a className="inline-flex items-center gap-2 font-button text-button text-primary-container hover:text-primary transition-colors" href="#">
                                  Explore Portal Features <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
      </a>
      </div>
      <div className="flex-1 w-full relative h-48 bg-surface-container-low rounded-lg border border-outline-variant overflow-hidden">
      <div className="absolute inset-0 bg-[url('placeholder')] bg-cover bg-center" data-alt="A clean, minimalist software dashboard interface shown in perspective. It features sleek charts, data tables, and status indicators using a sophisticated light-mode palette of white, pale gray (#F6F7F3), and deep green (#0B3D32). The design looks highly professional, like a premium civic-tech or enterprise SaaS tool." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByAHc279hCwsQQ0lM4Z3Txld5NiVomoosxXI2h59MsuW51bGPmkvKuUHb1fDvvddcvkEvE6HgijNkzuLuINstsjUlYBeoC-KAHK75tgXEejE-CjxyYmiQ6BfgwtD9kdSr1z3QJNNgTe6bhTo1aZx_1H2ilRnC0fO6xsDtWuQ6AuwSItxEm2lNev4EvFPOEf8BXd0DsIFjY5GMaviWWLMzaHDhmDq3XPvc0W37Py6hxSFEF35k9FeJmAQ')" }}></div>
      </div>
      </div>
      </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg md:py-24 border-t border-outline-variant">
      <div className="text-center mb-stack-lg">
      <h2 className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md text-primary mb-stack-sm">
                          Transparency &amp; Trust
                      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
                          We believe civic infrastructure should be open. Access real-time operational data and resolution metrics ensuring total accountability.
                      </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

      <div className="feature-card rounded-xl p-stack-md h-64 flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-surface-variant pb-2">
      <h4 className="font-button text-button text-primary">Resolution Time (Avg)</h4>
      <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-container-high rounded text-on-surface-variant uppercase">Last 30 Days</span>
      </div>
      <div className="flex-grow flex items-end gap-2 justify-between pt-4">

      <div className="w-1/6 bg-primary-container/20 hover:bg-primary-container/40 transition-colors h-[40%] rounded-t"></div>
      <div className="w-1/6 bg-primary-container/20 hover:bg-primary-container/40 transition-colors h-[50%] rounded-t"></div>
      <div className="w-1/6 bg-primary-container/20 hover:bg-primary-container/40 transition-colors h-[35%] rounded-t"></div>
      <div className="w-1/6 bg-primary-container/20 hover:bg-primary-container/40 transition-colors h-[60%] rounded-t"></div>
      <div className="w-1/6 bg-primary-container h-[20%] rounded-t relative group">
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-caps text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">12 hrs</div>
      </div>
      </div>
      </div>

      <div className="feature-card rounded-xl p-stack-md h-64 flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-surface-variant pb-2">
      <h4 className="font-button text-button text-primary">Report Volume vs Resolution</h4>
      <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-container-high rounded text-on-surface-variant uppercase">YTD</span>
      </div>
      <div className="flex-grow relative pt-4 overflow-hidden">

      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
      <path d="M0,40 Q20,35 40,45 T80,20 T100,10" fill="none" stroke="#0B3D32" strokeLinecap="round" strokeWidth="2" />
      <path d="M0,45 Q20,40 40,50 T80,25 T100,15" fill="none" stroke="#65D6B0" strokeDasharray="4" strokeLinecap="round" strokeWidth="2" />
      </svg>
      <div className="absolute bottom-2 right-2 flex gap-4 bg-white/80 backdrop-blur px-2 py-1 rounded border border-surface-variant">
      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary-container"></div><span className="font-label-caps text-[10px]">Reported</span></div>
      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></div><span className="font-label-caps text-[10px]">Resolved</span></div>
      </div>
      </div>
      </div>
      </div>
      </section>
      </main>

      <footer className="w-full rounded-t-xl border-t border-outline-variant dark:border-outline bg-surface-container-lowest dark:bg-inverse-surface grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-stack-lg max-w-container-max mx-auto">
      <div className="md:col-span-1">
      <span className="font-display-lg text-headline-md text-primary dark:text-primary-fixed block mb-base">Swachchha Nagar</span>
      <p className="font-body-md text-body-md text-on-secondary-fixed-variant dark:text-outline-variant text-sm mt-2">
                      © 2024 Swachchha Nagar. Engineering cleaner cities for Nepal.
                  </p>
      </div>
      <div className="md:col-span-3 flex flex-col md:flex-row md:justify-end gap-stack-md md:gap-gutter mt-stack-md md:mt-0">
      <a className="text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors font-body-md text-body-md opacity-80 hover:opacity-100 transition-opacity" href="#">
                      Privacy Policy
                  </a>
      <a className="text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors font-body-md text-body-md opacity-80 hover:opacity-100 transition-opacity" href="#">
                      Terms of Service
                  </a>
      <a className="text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors font-body-md text-body-md opacity-80 hover:opacity-100 transition-opacity" href="#">
                      Muni Portal
                  </a>
      <a className="text-on-secondary-fixed-variant dark:text-outline-variant hover:text-primary dark:hover:text-tertiary-fixed transition-colors font-body-md text-body-md opacity-80 hover:opacity-100 transition-opacity" href="#">
                      Contact Us
                  </a>
      </div>
      </footer>
    </>
  );
}
