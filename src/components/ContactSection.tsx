import { Clock, ExternalLink, Mail, MapPin, MessageSquare, Navigation, Phone, Star } from 'lucide-react';
import type { VerifiedBusinessProfile } from '../types/packaging';
import { BusinessLocationMap } from './BusinessLocationMap';

interface ContactSectionProps {
  profile: VerifiedBusinessProfile;
  onProfileResolved: (resolved: VerifiedBusinessProfile) => void;
}

export function ContactSection({
  profile,
  onProfileResolved,
}: ContactSectionProps) {
  const verifiedPhone =
    profile.internationalPhoneNumber || profile.nationalPhoneNumber;

  const phoneNumbers = Array.from(
    new Set([
      ...(profile.contactNumbers || []),
      ...(verifiedPhone ? [verifiedPhone] : []),
    ])
  );

  const primaryWhatsappDigits = phoneNumbers[0]
    ? phoneNumbers[0].replace(/\D/g, '')
    : null;

  return (
    <section id="contact" className="border-b border-white/8 bg-[#071526] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#A5F044]">
            Contact &amp; Verified Location
          </p>
          <h2
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Connect with Pallets Pro Solutions
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#AEB8C5]">
            Reach our team directly by phone, email, or WhatsApp, or verify our location on Google Maps.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Verified Business Info Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#101B2A] p-6 sm:p-8 lg:col-span-5">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {profile.name}
                </h3>
                <p className="mt-1 font-mono-tabular text-xs text-[#A5F044]">
                  {profile.coordinates.lat.toFixed(7)}, {profile.coordinates.lng.toFixed(7)}
                </p>

                {typeof profile.rating === 'number' && (
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-white">
                    <Star className="h-4 w-4 fill-[#A5F044] text-[#A5F044]" />
                    <span className="font-mono-tabular font-semibold">
                      {profile.rating.toFixed(1)}
                    </span>
                    {typeof profile.userRatingCount === 'number' && (
                      <span className="text-[#AEB8C5]">
                        ({profile.userRatingCount} Google reviews)
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4 border-t border-white/10 pt-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A5F044]" />
                  <div>
                    <p className="text-xs font-semibold text-white">Verified Location</p>
                    <p className="mt-0.5 text-sm text-[#AEB8C5]">
                      {profile.formattedAddress || profile.regionLabel}
                    </p>
                  </div>
                </div>

                {phoneNumbers.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#A5F044]" />
                    <div>
                      <p className="text-xs font-semibold text-white">Contact Numbers</p>
                      <div className="mt-1 flex flex-col gap-1">
                        {phoneNumbers.map((num) => (
                          <a
                            key={num}
                            href={`tel:${num.replace(/\s+/g, '')}`}
                            className="font-mono-tabular inline-block text-sm text-[#AEB8C5] transition-colors hover:text-[#A5F044]"
                          >
                            {num}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {profile.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#A5F044]" />
                    <div>
                      <p className="text-xs font-semibold text-white">Email</p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="mt-0.5 inline-block break-all text-sm text-[#AEB8C5] transition-colors hover:text-[#A5F044]"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}

                {profile.openingHours && profile.openingHours.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#A5F044]" />
                    <div>
                      <p className="text-xs font-semibold text-white">Business Hours</p>
                      <ul className="mt-1 space-y-0.5 text-xs text-[#AEB8C5]">
                        {profile.openingHours.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Verified Direct Action Links */}
            <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-5">
              <a
                href={profile.googleMapsPlaceUri || profile.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#A5F044] px-4 py-2.5 text-xs font-bold text-[#071526] transition-colors hover:bg-[#b5f562]"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Directions on Google Maps</span>
              </a>

              <a
                href={profile.shareProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#071526] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-[#A5F044] hover:text-[#A5F044]"
              >
                <span>Google Business Profile</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {primaryWhatsappDigits && (
                <a
                  href={`https://wa.me/${primaryWhatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#071526] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-[#A5F044] hover:text-[#A5F044]"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#A5F044]" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          {/* Embedded Interactive Google Map */}
          <div className="lg:col-span-7">
            <BusinessLocationMap
              profile={profile}
              onProfileResolved={onProfileResolved}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
