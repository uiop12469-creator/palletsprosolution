import { INDUSTRIES_DATA } from '../data/packagingData';

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="border-b border-white/8 bg-[#101B2A]/45 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#A5F044]">
              Industries We Serve
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Built for Supply Chains Across Manufacturing &amp; Freight
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#AEB8C5]">
            Supporting B2B unit-load handling, plant staging, and enclosed equipment transport across industrial sectors.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES_DATA.map((industry) => (
            <div
              key={industry.id}
              className="gsap-reveal flex flex-col justify-between rounded-xl border border-white/10 bg-[#071526]/90 p-6 transition-colors hover:border-[#A5F044]/45"
            >
              <div>
                <span className="font-mono-tabular text-xs font-semibold text-[#A5F044]">
                  {industry.index}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-white">
                  {industry.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#AEB8C5]">
                  {industry.summary}
                </p>
              </div>
              <p className="mt-5 border-t border-white/8 pt-3.5 text-xs font-medium text-white/80">
                {industry.recommendedSolutions}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
