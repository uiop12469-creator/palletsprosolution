import { useState, type PointerEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Box, Layers, PackageCheck } from 'lucide-react';
import { HERO_CATEGORY_CARDS } from '../data/packagingData';
import type { ProductCategoryId } from '../types/packaging';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onGetQuote: () => void;
  onSelectCategory: (id: ProductCategoryId) => void;
}

export function HeroSection({
  onExploreProducts,
  onGetQuote,
  onSelectCategory,
}: HeroSectionProps) {
  const [parallax, setParallax] = useState({ rx: 0, ry: 0 });

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ rx: -ny * 5, ry: nx * 7 });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/8 bg-[#071526]"
    >
      {/* Subtle cinematic warehouse ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/assets/products/hero-lineup.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-15 blur-[2px]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(7,21,38,0.98) 0%, rgba(7,21,38,0.92) 48%, rgba(7,21,38,0.78) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
        {/* 2-Column Balanced Split */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Headline, Supporting Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-5"
          >
            <p className="text-xs font-medium tracking-wider text-[#A5F044]">
              Greater Noida, Uttar Pradesh · Industrial B2B Supply
            </p>

            <h1
              className="mt-4 font-display font-extrabold leading-[1.06] tracking-tight text-white"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                textWrap: 'balance',
              }}
            >
              STRONG FOUNDATIONS.{' '}
              <span className="text-[#A5F044]">SMARTER PACKAGING.</span>
            </h1>

            <div className="mt-4 h-1 w-24 rounded-full bg-[#A5F044]" />

            <p className="mt-5 text-base font-medium text-white/95 sm:text-lg">
              Wooden Pallets{' '}
              <span className="mx-1.5 text-[#A5F044]" aria-hidden="true">
                |
              </span>{' '}
              Plastic Pallets{' '}
              <span className="mx-1.5 text-[#A5F044]" aria-hidden="true">
                |
              </span>{' '}
              Wooden Packing Boxes
            </p>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#AEB8C5] sm:text-base">
              Industrial load-bearing pallets and custom timber packing boxes built for manufacturing plants, warehousing, and freight operations.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreProducts}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#A5F044] px-6 py-3 text-sm font-bold text-[#071526] transition-colors hover:bg-[#b5f562] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5F044]"
              >
                <span>Explore Products</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onGetQuote}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-white/20 bg-[#101B2A]/90 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#A5F044] hover:text-[#A5F044] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5F044]"
              >
                <span>Get a Quote</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Photorealistic Warehouse Product Lineup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setParallax({ rx: 0, ry: 0 })}
            style={{ perspective: '1200px' }}
            className="relative flex min-h-[300px] w-full items-center overflow-hidden rounded-2xl border border-white/8 bg-[#071526] shadow-2xl sm:min-h-[380px] lg:col-span-7 lg:min-h-[430px]"
          >
            <motion.div
              animate={{ rotateX: parallax.rx, rotateY: parallax.ry }}
              transition={{ type: 'spring', stiffness: 140, damping: 20 }}
              className="relative h-full w-full"
            >
              <img
                src="/assets/products/hero-lineup.png"
                alt="Wooden pallet, blue industrial plastic pallet, and wooden packing crate inside warehouse"
                className="h-full w-full object-cover object-right"
              />
              {/* Seamless website-color vignette blending all edges into #071526 */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, #071526 0%, rgba(7,21,38,0.85) 14%, rgba(7,21,38,0.25) 32%, transparent 50%), linear-gradient(0deg, #071526 0%, rgba(7,21,38,0.45) 14%, transparent 32%), linear-gradient(180deg, rgba(7,21,38,0.65) 0%, transparent 22%), linear-gradient(270deg, rgba(7,21,38,0.55) 0%, transparent 18%)',
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* 3 Product Category Jump Cards Row */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {HERO_CATEGORY_CARDS.map((card, idx) => {
            const thumbSrc =
              card.id === 'wooden-pallets'
                ? '/assets/products/wooden-pallet.png'
                : card.id === 'plastic-pallets'
                  ? '/assets/products/plastic-pallet.png'
                  : '/assets/products/wooden-packing-box.png';

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onSelectCategory(card.id)}
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#101B2A]/90 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A5F044]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5F044]"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#071526] p-1">
                    <img
                      src={thumbSrc}
                      alt={card.title}
                      className="h-full w-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono-tabular text-xs font-semibold text-[#A5F044]">
                      0{idx + 1}
                    </span>
                    <h2 className="mt-0.5 font-display text-base font-bold text-white sm:text-lg">
                      {card.title}
                    </h2>
                    <p className="mt-0.5 truncate text-xs text-[#AEB8C5]">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#071526] text-[#A5F044] transition-colors group-hover:bg-[#A5F044] group-hover:text-[#071526]">
                  {idx === 0 && <Layers className="h-4 w-4" />}
                  {idx === 1 && <Box className="h-4 w-4" />}
                  {idx === 2 && <PackageCheck className="h-4 w-4" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
