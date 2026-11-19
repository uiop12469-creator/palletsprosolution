import { ExternalLink } from 'lucide-react';
import type { VerifiedBusinessProfile } from '../types/packaging';

interface FooterProps {
  profile: VerifiedBusinessProfile;
  onNavigate: (sectionId: string) => void;
}

export function Footer({ profile, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050F1C] py-12 text-sm text-[#AEB8C5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src="/assets/logo-pallets-pro.png"
              alt="Pallets Pro Solutions"
              className="h-11 w-auto object-contain"
            />
            <p className="mt-3 text-xs leading-relaxed text-[#AEB8C5]">
              Industrial wooden pallets, molded plastic pallets, and custom wooden packing boxes built for B2B manufacturing and freight logistics.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              {[
                { label: 'Home', target: 'home' },
                { label: 'Products', target: 'products' },
                { label: 'Industries', target: 'industries' },
                { label: 'About Us', target: 'about' },
                { label: 'Get a Quote', target: 'enquiry' },
              ].map((link) => (
                <li key={link.target}>
                  <a
                    href={`#${link.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.target);
                    }}
                    className="transition-colors hover:text-[#A5F044]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Products
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              {[
                { label: 'Wooden Pallets', target: 'wooden-pallets' },
                { label: 'Plastic Pallets', target: 'plastic-pallets' },
                { label: 'Wooden Packing Boxes', target: 'wooden-packing-boxes' },
                { label: 'Product Gallery', target: 'gallery' },
                { label: 'FAQ', target: 'faq' },
              ].map((link) => (
                <li key={link.target}>
                  <a
                    href={`#${link.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.target);
                    }}
                    className="transition-colors hover:text-[#A5F044]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Contact &amp; Location
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-[#AEB8C5]">
              {profile.formattedAddress || profile.regionLabel}
            </p>
            {profile.contactNumbers && profile.contactNumbers.length > 0 && (
              <div className="mt-2.5 flex flex-col gap-1 text-xs">
                {profile.contactNumbers.map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s+/g, '')}`}
                    className="font-mono-tabular text-[#AEB8C5] transition-colors hover:text-[#A5F044]"
                  >
                    {num}
                  </a>
                ))}
              </div>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="mt-1.5 inline-block break-all text-xs text-[#AEB8C5] transition-colors hover:text-[#A5F044]"
              >
                {profile.email}
              </a>
            )}
            <div className="mt-3 flex flex-col gap-2 text-xs">
              <a
                href={profile.googleMapsPlaceUri || profile.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#A5F044] hover:underline"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={profile.shareProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#AEB8C5] hover:text-white"
              >
                <span>Google Business Profile</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-[#AEB8C5]/80 sm:flex-row sm:items-center">
          <p>© {currentYear} {profile.name}. All rights reserved.</p>
          <p className="font-mono-tabular">
            {profile.coordinates.lat.toFixed(7)}, {profile.coordinates.lng.toFixed(7)}
          </p>
        </div>
      </div>
    </footer>
  );
}
