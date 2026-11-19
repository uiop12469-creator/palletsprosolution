import { ExternalLink, MapPin } from 'lucide-react';
import { WHY_CHOOSE_US_PILLARS } from '../data/packagingData';
import type { VerifiedBusinessProfile } from '../types/packaging';

interface AboutAndWhyUsSectionProps {
  profile: VerifiedBusinessProfile;
  onGetQuote: () => void;
}

export function AboutAndWhyUsSection({
  profile,
  onGetQuote,
}: AboutAndWhyUsSectionProps) {
  return (
    <section id="about" className="border-b border-white/8 bg-[#071526] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* About Our Company */}
        <div className="gsap-reveal grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-semibold tracking-wider text-[#A5F044]">
              About Our Company
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Pallets Pro Solutions — Industrial Packaging Supply in Greater Noida
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#AEB8C5]">
              Pallets Pro Solutions supplies industrial wooden pallets, molded plastic pallets, wooden packing boxes, and wooden cable handling packaging from Greater Noida, Uttar Pradesh. We work directly with procurement teams, warehouse managers, and plant engineers to match pallet and crate configurations to real cargo footprints.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#AEB8C5]">
              Every specification—dimensions, board spacing, entry configuration, and batch quantity—is confirmed directly with your team prior to production or dispatch.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 text-xs text-[#AEB8C5]">
                <MapPin className="h-4 w-4 text-[#A5F044]" />
                <span>{profile.formattedAddress || profile.regionLabel}</span>
              </div>
              <a
                href={profile.shareProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A5F044] hover:underline"
              >
                <span>Verified Google Business Profile</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-7">
              <button
                type="button"
                onClick={onGetQuote}
                className="inline-flex items-center rounded-lg bg-[#A5F044] px-5 py-2.5 text-sm font-bold text-[#071526] transition-colors hover:bg-[#b5f562]"
              >
                Discuss Custom Packaging Requirements
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#101B2A]">
              <img
                src="/assets/products/hero-lineup.png"
                alt="Pallets Pro Solutions wooden pallets, plastic pallets, and wooden packing crates"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(7,21,38,0.88) 0%, rgba(7,21,38,0.18) 55%, transparent 100%)',
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">
                  Wooden Pallets · Plastic Pallets · Wooden Packing Boxes
                </p>
                <span className="font-mono-tabular text-xs text-[#A5F044]">
                  {profile.coordinates.lat.toFixed(4)}° N, {profile.coordinates.lng.toFixed(4)}° E
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 border-t border-white/10 pt-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#A5F044]">
              Why Choose Us
            </p>
            <h3
              className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              Practical B2B Execution Without Guesswork
            </h3>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="gsap-reveal rounded-xl border border-white/10 bg-[#101B2A]/75 p-5"
              >
                <span className="font-mono-tabular text-xs font-semibold text-[#A5F044]">
                  {pillar.index}
                </span>
                <h4 className="mt-2 font-display text-lg font-bold text-white">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#AEB8C5]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
