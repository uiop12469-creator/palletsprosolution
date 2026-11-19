import { useMemo, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/packagingData';
import type { GalleryItem, ProductCategoryId, VerifiedBusinessProfile } from '../types/packaging';
import { PhotorealisticProductStage } from './PhotorealisticProductStage';

interface GallerySectionProps {
  profile: VerifiedBusinessProfile;
}

type GalleryFilter = 'all' | ProductCategoryId;

export function GallerySection({ profile }: GallerySectionProps) {
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const items = useMemo(() => {
    const base: GalleryItem[] = [
      ...GALLERY_ITEMS,
      {
        id: 'facility-photo-1',
        category: 'facility',
        categoryLabel: 'Verified Business Profile',
        title: `${profile.name} — Facility Photo 1`,
        caption: 'Stacked 4-way wooden block pallets from our manufacturing facility.',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-10-08_at_9.41.21_AM_3faa402d.jpeg',
      },
      {
        id: 'facility-photo-2',
        category: 'facility',
        categoryLabel: 'Verified Business Profile',
        title: `${profile.name} — Facility Photo 2`,
        caption: 'Heavy-duty timber pallet deck construction at our facility.',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-10-08_at_9.41.22_AM_c25f36db.jpeg',
      },
    ];
    if (profile.photos && profile.photos.length > 2) {
      profile.photos.slice(2).forEach((photoUrl, idx) => {
        base.push({
          id: `gbp-photo-${idx + 2}`,
          category: 'facility',
          categoryLabel: 'Verified Business Profile',
          title: `${profile.name} — Facility Photo ${idx + 3}`,
          caption: 'Retrieved directly from verified Google Business Profile listing.',
          imageUrl: photoUrl,
        });
      });
    }
    if (filter === 'all') return base;
    return base.filter((item) => item.category === filter);
  }, [filter, profile.name, profile.photos]);

  const filterButtons: { key: GalleryFilter; label: string }[] = [
    { key: 'all', label: 'All Angles' },
    { key: 'wooden-pallets', label: 'Wooden Pallets' },
    { key: 'plastic-pallets', label: 'Plastic Pallets' },
    { key: 'wooden-packing-boxes', label: 'Wooden Packing Boxes' },
  ];

  return (
    <section
      id="gallery"
      className="border-b border-white/8 bg-[#101B2A]/45 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#A5F044]">
              Product Gallery
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Multi-Angle Inspection &amp; Packaging Showcase
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter product gallery"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-[#071526] p-1"
          >
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                type="button"
                role="tab"
                aria-selected={filter === btn.key}
                onClick={() => setFilter(btn.key)}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === btn.key
                    ? 'bg-[#A5F044] text-[#071526]'
                    : 'text-[#AEB8C5] hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#071526] transition-colors hover:border-[#A5F044]/50"
            >
              <div className="relative h-56 w-full overflow-hidden bg-[#071526]">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <PhotorealisticProductStage
                    productId={item.category as ProductCategoryId}
                    initialAngle={item.presetAngle || 'isometric'}
                    compact
                  />
                )}
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  aria-label={`Inspect ${item.title}`}
                  className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-[#071526]/90 text-white transition-colors hover:border-[#A5F044] hover:text-[#A5F044]"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <p className="text-xs font-medium text-[#A5F044]">
                    {item.categoryLabel}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#AEB8C5]">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspection Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#071526] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-[#A5F044]">
                  {selectedItem.categoryLabel}
                </p>
                <h3 className="font-display text-lg font-bold text-white">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close inspection dialog"
                onClick={() => setSelectedItem(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-[#AEB8C5] transition-colors hover:border-[#A5F044] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-[380px] w-full sm:h-[460px]">
              {selectedItem.imageUrl ? (
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain bg-[#071526]"
                />
              ) : (
                <PhotorealisticProductStage
                  productId={selectedItem.category as ProductCategoryId}
                  initialAngle={selectedItem.presetAngle || 'isometric'}
                  showAssemblyControls={selectedItem.category === 'wooden-packing-boxes'}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
