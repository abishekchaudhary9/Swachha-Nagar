import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us \u2014 Swachchha Nagar" },
      { name: "description", content: "Why we built a civic platform for cleaner, more accountable cities in Nepal." },
      { property: "og:title", content: "About Us \u2014 Swachchha Nagar" },
      { property: "og:description", content: "Why we built a civic platform for cleaner, more accountable cities in Nepal." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/40 dark:border-primary-container/40 bg-white/70 dark:bg-primary/70 shadow-sm transition-all duration-300 hidden md:block" id="top-nav">
      <div className="flex justify-between items-center h-16 px-margin-desktop max-w-container-max mx-auto">
      <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
                      Swachchha Nagar
                  </div>
      <div className="flex gap-8 items-center">
      <a className="font-label-caps text-label-caps text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-all duration-200 hover:opacity-80 active:scale-95 transition-transform" href="#">Waste Schedule</a>
      <a className="font-label-caps text-label-caps text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-all duration-200 hover:opacity-80 active:scale-95 transition-transform" href="#">Collection Points</a>
      <a className="font-label-caps text-label-caps text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 transition-all duration-200 hover:opacity-80 active:scale-95 transition-transform" href="#">Community</a>
      <a className="font-label-caps text-label-caps text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-all duration-200 hover:opacity-80 active:scale-95 transition-transform" href="#">Statistics</a>
      </div>
      <div className="flex gap-4 items-center">
      <button className="font-button text-button text-secondary hover:text-primary transition-colors">Login</button>
      <button className="bg-primary-container text-on-primary font-button text-button px-4 py-2 rounded-lg hover:bg-primary transition-colors active:scale-95">Report an Issue</button>
      </div>
      </div>
      </nav>

      <nav className="fixed bottom-0 w-full z-50 bg-white/90 backdrop-blur-md border-t border-surface-variant md:hidden pb-safe">
      <div className="flex justify-around items-center h-16">
      <a className="flex flex-col items-center justify-center w-full h-full text-secondary hover:text-primary" href="#">
      <span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-secondary hover:text-primary" href="#">
      <span className="material-symbols-outlined" data-icon="location_on">location_on</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-primary border-t-2 border-primary" href="#">
      <span className="material-symbols-outlined" data-icon="groups">groups</span>
      </a>
      <a className="flex flex-col items-center justify-center w-full h-full text-secondary hover:text-primary" href="#">
      <span className="material-symbols-outlined" data-icon="bar_chart">bar_chart</span>
      </a>
      </div>
      </nav>
      <main className="pt-24 md:pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-32">

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center min-h-[614px]">
      <div className="space-y-stack-lg z-10">
      <div className="inline-flex items-center gap-2 bg-surface-container-low border border-surface-variant rounded-full px-3 py-1">
      <span className="material-symbols-outlined text-[16px] text-tertiary-container" data-icon="public">public</span>
      <span className="font-label-caps text-label-caps text-on-surface-variant">Civic-Tech Initiative</span>
      </div>
      <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">
                          Our Mission: <br />
      <span className="text-gradient">Cleaner Cities. Together.</span>
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                          Swachchha Nagar is engineering the future of urban sanitation in Nepal. We combine high-fidelity civic data with citizen empowerment to transform how waste is managed, tracked, and reduced.
                      </p>
      <div className="pt-stack-md flex gap-4">
      <button className="bg-primary-container text-on-primary font-button text-button px-6 py-3 rounded-lg hover:bg-primary transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center gap-2">
                              Get Involved
                              <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
      </button>
      <button className="bg-white text-primary border border-surface-variant font-button text-button px-6 py-3 rounded-lg hover:bg-surface-container-low transition-all duration-300 active:scale-95">
                              Read the Report
                          </button>
      </div>
      </div>
      <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20">
      <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10"></div>
      <img className="object-cover w-full h-full z-0 transform transition-transform duration-1000 hover:scale-105" data-alt="A high-quality, professional photograph of a modern, clean street in Kathmandu, Nepal during golden hour. The lighting is warm and clear, highlighting a well-maintained urban environment. A subtle digital UI overlay with environmental metrics floats in the composition, suggesting smart city technology. The aesthetic is premium, optimistic, and highly detailed." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKBU69j1Lb5O3XqXf5txRlaSK0z5-U5EEf7Vn3CyESM_OR3eYmRruAJUynsXJEW-4RsObg2FrjqEg8URcvanzpW7jPJ3WZFzm28dW9jVijzcy0aR8_EXByobmNoOR4OEM2suQkQ0fk8jT-EH9OZQ3lzLf6JrZ6GytkeiJAfbOj-x5d9tO1XhFONA2-hEcA0yX1GnjZ953Hb8YpX6_g7lTLF_f59necpJV3_9i9NlBkyQvBsViW9FQP7A" />

      <div className="absolute bottom-8 left-8 right-8 glass-card rounded-xl p-stack-md z-20 flex items-center justify-between">
      <div>
      <p className="font-label-caps text-label-caps text-primary-container mb-1">Active Citizens</p>
      <p className="font-headline-md text-headline-md text-primary">24,590+</p>
      </div>
      <div className="h-12 w-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
      <span className="material-symbols-outlined text-on-tertiary-fixed" data-icon="trending_up">trending_up</span>
      </div>
      </div>
      </div>
      </section>

      <section className="relative py-16">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
      <h2 className="font-headline-md text-headline-md text-primary">The Scale of the Challenge</h2>
      <p className="font-body-md text-body-md text-on-surface-variant">Rapid urbanization demands sophisticated solutions. The sheer volume of waste generated requires a shift from manual oversight to data-driven orchestration.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

      <div className="bg-white border border-surface-variant rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-error-container rounded-bl-full -mr-16 -mt-16 opacity-50 transition-transform group-hover:scale-110"></div>
      <span className="material-symbols-outlined text-error text-[32px] mb-4" data-icon="warning">warning</span>
      <h3 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-2">1,200</h3>
      <p className="font-label-caps text-label-caps text-secondary mb-2">Tons Generated Daily</p>
      <p className="font-body-md text-body-md text-on-surface-variant mt-4">The daily output across major metropolitan areas strains existing infrastructure beyond capacity.</p>
      </div>

      <div className="bg-white border border-surface-variant rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed-dim rounded-bl-full -mr-16 -mt-16 opacity-30 transition-transform group-hover:scale-110"></div>
      <span className="material-symbols-outlined text-primary-container text-[32px] mb-4" data-icon="sync_problem">sync_problem</span>
      <h3 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-2">45%</h3>
      <p className="font-label-caps text-label-caps text-secondary mb-2">Collection Inefficiency</p>
      <p className="font-body-md text-body-md text-on-surface-variant mt-4">Without real-time data routing, collection vehicles operate on static, inefficient schedules.</p>
      </div>

      <div className="bg-white border border-surface-variant rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container rounded-bl-full -mr-16 -mt-16 opacity-50 transition-transform group-hover:scale-110"></div>
      <span className="material-symbols-outlined text-secondary text-[32px] mb-4" data-icon="visibility_off">visibility_off</span>
      <h3 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-2">Low</h3>
      <p className="font-label-caps text-label-caps text-secondary mb-2">Civic Visibility</p>
      <p className="font-body-md text-body-md text-on-surface-variant mt-4">Citizens lack insight into schedules, resulting in missed collections and illegal dumping.</p>
      </div>
      </div>
      </section>

      <section>
      <div className="mb-12">
      <h2 className="font-headline-md text-headline-md text-primary mb-4">The Civic-Tech Approach</h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">We treat urban sanitation as a logistics and information problem. By deploying a robust digital infrastructure, we connect citizens directly with municipal services.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter auto-rows-[250px]">

      <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group border border-surface-variant">
      <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A close-up, high-end photograph of a person using a sleek mobile application on a smartphone. The screen displays a minimalist map interface with routing paths in emerald green. The background is slightly blurred, showing a modern urban street. Lighting is crisp and bright, conveying a premium software experience." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXO_0uhi8Jf2FpTNsHRm2Mb5jXduYN1stdlsMOGwtgfRiHiG_J7Dm0FMXrte5KLvCb9jqUke7-I-sRxF1ut2DZ8uEExS2QKPYIl05iVuHXWzGuaYBECeGFbPUpfT3X_1eMJ18YDZDC5HJjHH1F4U7HmA-vUFaAakSh49m0bsk1dOv7_GokGDTm1uUO-eYlioYz49Zrk-NAzZKSHQq9Gi-BsQIRHIsAVEeDunNBjVX_Rbrr-4W-BmYwYw" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-stack-lg w-full">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-stack-md inline-block mb-4">
      <span className="material-symbols-outlined text-white" data-icon="route">route</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-white mb-2">Dynamic Routing Algorithm</h3>
      <p className="font-body-md text-body-md text-white/80 max-w-md">Optimizing collection paths in real-time based on citizen reports and sensor data, reducing fuel consumption and emissions.</p>
      </div>
      </div>

      <div className="md:col-span-2 bg-surface-container-low rounded-2xl p-stack-lg border border-surface-variant flex flex-col justify-center relative overflow-hidden group">
      <div className="absolute right-0 bottom-0 opacity-5 transition-transform group-hover:translate-x-4 group-hover:-translate-y-4">
      <span className="material-symbols-outlined text-[120px]" data-icon="notifications_active">notifications_active</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-primary mb-2">Real-Time Alerts</h3>
      <p className="font-body-md text-body-md text-on-surface-variant z-10 max-w-sm">Citizens receive precise arrival windows for collection vehicles, eliminating guesswork and premature waste placement.</p>
      </div>

      <div className="bg-primary text-on-primary rounded-2xl p-stack-md border border-primary-container flex flex-col justify-between">
      <span className="material-symbols-outlined text-tertiary-fixed text-[28px]" data-icon="map">map</span>
      <div>
      <h4 className="font-button text-button mb-1">Geospatial Mapping</h4>
      <p className="text-sm opacity-80">Pinpoint accuracy for issue reporting.</p>
      </div>
      </div>

      <div className="bg-tertiary-fixed text-on-tertiary-fixed rounded-2xl p-stack-md border border-tertiary-fixed-dim flex flex-col justify-between">
      <span className="material-symbols-outlined text-primary text-[28px]" data-icon="insights">insights</span>
      <div>
      <h4 className="font-button text-button mb-1">Municipal Dashboard</h4>
      <p className="text-sm opacity-80">High-level analytics for city planners.</p>
      </div>
      </div>
      </div>
      </section>

      <section className="py-16 border-t border-surface-variant">
      <h2 className="font-headline-md text-headline-md text-primary text-center mb-16">Core Principles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">

      <div className="flex flex-col items-center text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-surface-container border border-surface-variant flex items-center justify-center relative group">
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-tertiary-fixed transition-colors duration-300"></div>
      <span className="material-symbols-outlined text-primary-container text-[32px]" data-icon="analytics">analytics</span>
      </div>
      <div>
      <h3 className="font-button text-button text-primary mb-3 text-lg uppercase tracking-wider">Data-Driven Precision</h3>
      <p className="font-body-md text-body-md text-on-surface-variant">Every decision, from route planning to infrastructure investment, is backed by high-fidelity telemetry and reporting data.</p>
      </div>
      </div>

      <div className="flex flex-col items-center text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-surface-container border border-surface-variant flex items-center justify-center relative group">
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-tertiary-fixed transition-colors duration-300"></div>
      <span className="material-symbols-outlined text-primary-container text-[32px]" data-icon="handshake">handshake</span>
      </div>
      <div>
      <h3 className="font-button text-button text-primary mb-3 text-lg uppercase tracking-wider">Civic Synergy</h3>
      <p className="font-body-md text-body-md text-on-surface-variant">Technology alone is insufficient. We build tools that foster collaboration between municipalities and the citizens they serve.</p>
      </div>
      </div>

      <div className="flex flex-col items-center text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-surface-container border border-surface-variant flex items-center justify-center relative group">
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-tertiary-fixed transition-colors duration-300"></div>
      <span className="material-symbols-outlined text-primary-container text-[32px]" data-icon="policy">policy</span>
      </div>
      <div>
      <h3 className="font-button text-button text-primary mb-3 text-lg uppercase tracking-wider">Absolute Transparency</h3>
      <p className="font-body-md text-body-md text-on-surface-variant">Clear visibility into system performance, response times, and environmental impact metrics available to all stakeholders.</p>
      </div>
      </div>
      </div>
      </section>
      </main>

      <footer className="w-full pt-stack-lg pb-stack-md bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter px-margin-desktop max-w-container-max mx-auto mb-12">
      <div className="space-y-4 lg:col-span-1">
      <h4 className="font-headline-md text-headline-md text-on-primary">Swachchha Nagar</h4>
      <p className="font-body-md text-body-md text-on-primary/70 max-w-xs">Engineering cleaner cities through data, transparency, and civic engagement.</p>
      </div>
      <div className="space-y-4">
      <h5 className="font-label-caps text-label-caps text-on-primary/60">Platform</h5>
      <ul className="space-y-2">
      <li><a className="font-body-md text-body-md text-on-primary/80 dark:text-on-primary-container/80 hover:text-tertiary-fixed transition-colors cursor-pointer" href="#">Municipal Portal</a></li>
      <li><a className="font-body-md text-body-md text-on-primary/80 dark:text-on-primary-container/80 hover:text-tertiary-fixed transition-colors cursor-pointer" href="#">Environmental Impact</a></li>
      </ul>
      </div>
      <div className="space-y-4">
      <h5 className="font-label-caps text-label-caps text-on-primary/60">Legal</h5>
      <ul className="space-y-2">
      <li><a className="font-body-md text-body-md text-on-primary/80 dark:text-on-primary-container/80 hover:text-tertiary-fixed transition-colors cursor-pointer" href="#">Waste Bylaws</a></li>
      <li><a className="font-body-md text-body-md text-on-primary/80 dark:text-on-primary-container/80 hover:text-tertiary-fixed transition-colors cursor-pointer" href="#">Data Privacy</a></li>
      <li><a className="font-body-md text-body-md text-on-primary/80 dark:text-on-primary-container/80 hover:text-tertiary-fixed transition-colors cursor-pointer" href="#">Terms of Service</a></li>
      </ul>
      </div>
      <div className="space-y-4">
      <h5 className="font-label-caps text-label-caps text-on-primary/60">Support</h5>
      <ul className="space-y-2">
      <li><a className="font-body-md text-body-md text-on-primary/80 dark:text-on-primary-container/80 hover:text-tertiary-fixed transition-colors cursor-pointer" href="#">Contact Support</a></li>
      </ul>
      </div>
      </div>
      <div className="px-margin-desktop max-w-container-max mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="font-body-md text-body-md text-on-primary/60 text-sm">© 2024 Swachchha Nagar Civic-Tech. All rights reserved.</p>
      <div className="flex gap-4">

      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-tertiary-fixed hover:text-primary cursor-pointer transition-colors">
      <span className="material-symbols-outlined text-[18px]" data-icon="language">language</span>
      </div>
      </div>
      </div>
      </footer>
    </>
  );
}
