import { useEffect, useState } from 'react';
import {
  AdvancedMarker,
  APILoadingStatus,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import type { VerifiedBusinessProfile } from '../types/packaging';

interface BusinessLocationMapProps {
  profile: VerifiedBusinessProfile;
  onProfileResolved: (resolved: VerifiedBusinessProfile) => void;
}

function PlacesProfileFetcher({
  baseProfile,
  onProfileResolved,
}: {
  baseProfile: VerifiedBusinessProfile;
  onProfileResolved: (resolved: VerifiedBusinessProfile) => void;
}) {
  const placesLib = useMapsLibrary('places');

  useEffect(() => {
    if (!placesLib || !placesLib.Place) return;
    let cancelled = false;

    async function fetchVerifiedBusiness() {
      try {
        const { places } = await placesLib!.Place.searchByText({
          textQuery: 'Pallets Pro Solutions',
          locationBias: {
            center: baseProfile.coordinates,
            radius: 1500,
          },
          fields: [
            'id',
            'displayName',
            'formattedAddress',
            'nationalPhoneNumber',
            'internationalPhoneNumber',
            'regularOpeningHours',
            'rating',
            'userRatingCount',
            'googleMapsURI',
            'location',
            'photos',
          ],
          maxResultCount: 3,
        });

        if (cancelled || !places || places.length === 0) return;

        // Match closest or exact business name
        const matched =
          places.find((p: { displayName?: string | null }) =>
            (p.displayName || '').toLowerCase().includes('pallets pro')
          ) || places[0];

        const photoUrls: string[] = [];
        if (matched.photos && matched.photos.length > 0) {
          for (const photo of matched.photos.slice(0, 3)) {
            try {
              const uri = photo.getURI({ maxWidth: 900 });
              if (uri) photoUrls.push(uri);
            } catch {
              // Ignore individual photo URI failure
            }
          }
        }

        const loc = matched.location;
        onProfileResolved({
          ...baseProfile,
          name: matched.displayName || baseProfile.name,
          coordinates: loc
            ? { lat: loc.lat(), lng: loc.lng() }
            : baseProfile.coordinates,
          formattedAddress: matched.formattedAddress || undefined,
          nationalPhoneNumber: matched.nationalPhoneNumber || undefined,
          internationalPhoneNumber: matched.internationalPhoneNumber || undefined,
          openingHours: matched.regularOpeningHours?.weekdayDescriptions || undefined,
          rating: typeof matched.rating === 'number' ? matched.rating : undefined,
          userRatingCount:
            typeof matched.userRatingCount === 'number'
              ? matched.userRatingCount
              : undefined,
          googleMapsPlaceUri: matched.googleMapsURI || baseProfile.mapsUrl,
          photos: photoUrls.length > 0 ? photoUrls : undefined,
          loadedFromPlacesApi: true,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      }
    }

    fetchVerifiedBusiness();

    return () => {
      cancelled = true;
    };
  }, [placesLib, baseProfile, onProfileResolved]);

  return null;
}

export function BusinessLocationMap({
  profile,
  onProfileResolved,
}: BusinessLocationMapProps) {
  const apiStatus = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  const hasMapsKey = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  const mapFailed =
    !hasMapsKey ||
    apiStatus === APILoadingStatus.FAILED ||
    apiStatus === APILoadingStatus.AUTH_FAILURE;

  if (mapFailed) {
    return (
      <div className="flex h-[400px] w-full flex-col justify-between rounded-xl border border-white/10 bg-[#0A1728] p-6 lg:h-[460px]">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-[#A5F044]">
            <MapPin className="h-4 w-4" />
            <span>Verified Coordinates · {profile.coordinates.lat.toFixed(7)}, {profile.coordinates.lng.toFixed(7)}</span>
          </div>
          <h3 className="text-xl font-bold text-white">{profile.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#AEB8C5]">
            {profile.formattedAddress || profile.regionLabel}
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#101B2A] p-4">
          <p className="text-xs text-[#AEB8C5]">
            Open the verified Google Business Profile directly to view satellite imagery, turn-by-turn directions, and live business updates.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={profile.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#A5F044] px-4 py-2 text-xs font-semibold text-[#071526] transition-colors hover:bg-[#b5f562]"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>Open in Google Maps</span>
            </a>
            <a
              href={profile.shareProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[#A5F044]/60"
            >
              <span>Business Profile</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0A1728] lg:h-[460px]">
      <PlacesProfileFetcher
        baseProfile={profile}
        onProfileResolved={onProfileResolved}
      />

      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={profile.coordinates}
        defaultZoom={15}
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={profile.coordinates}
          title={profile.name}
          onClick={() => setInfoOpen((prev) => !prev)}
        >
          <Pin
            background="#A5F044"
            borderColor="#071526"
            glyphColor="#071526"
            scale={1.2}
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={270}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="p-1 text-[#071526]">
              <p className="text-sm font-bold">{profile.name}</p>
              <p className="mt-1 text-xs text-slate-600">
                {profile.formattedAddress || profile.regionLabel}
              </p>
              <a
                href={profile.googleMapsPlaceUri || profile.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
              >
                <span>Open Directions</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
