import { ArrowRight, Check } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/packagingData';
import type { ProductCategoryId } from '../types/packaging';
import { PhotorealisticProductStage } from './PhotorealisticProductStage';

interface ProductShowcasesProps {
  onRequestQuote: (productId: ProductCategoryId) => void;
}

export function ProductShowcases({ onRequestQuote }: ProductShowcasesProps) {
  return (
    <section
      id="products"
      className="border-b border-white/8 bg-[#071526] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#A5F044]">
            Industrial Packaging Showcase
          </p>
          <h2
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Engineered Pallets &amp; Structural Timber Crating
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#AEB8C5]">
            Inspect each industrial packaging product in interactive 3D tilt and detail zoom. Switch viewing angles or toggle the structural breakdown on our wooden packing boxes.
          </p>
        </div>

        {/* Three Separate Product Showcases */}
        <div className="mt-12 space-y-12 lg:space-y-16">
          {PRODUCTS_DATA.map((product, idx) => {
            const isReversed = idx % 2 === 1;
            const isPlastic = product.id === 'plastic-pallets';
            const isCrate = product.id === 'wooden-packing-boxes';

            return (
              <article
                key={product.id}
                id={product.id}
                className="gsap-reveal grid grid-cols-1 items-stretch gap-8 rounded-2xl border border-white/10 bg-[#101B2A]/85 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10"
              >
                {/* Photorealistic Interactive Stage Column */}
                <div
                  className={`flex flex-col ${
                    isReversed ? 'lg:order-2 lg:col-span-7' : 'lg:order-1 lg:col-span-7'
                  }`}
                >
                  <div className="h-[340px] w-full sm:h-[400px] lg:h-[450px]">
                    <PhotorealisticProductStage
                      productId={product.id}
                      rotateOnHoverOnly={isPlastic}
                      showAssemblyControls={isCrate}
                    />
                  </div>
                  <p className="mt-2.5 text-xs text-[#AEB8C5]">
                    {product.interactionHint}
                  </p>
                </div>

                {/* Product Details & Verified Specifications Column */}
                <div
                  className={`flex flex-col justify-between ${
                    isReversed ? 'lg:order-1 lg:col-span-5' : 'lg:order-2 lg:col-span-5'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#A5F044]">
                      <span className="font-mono-tabular">{product.indexLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>Industrial B2B Specification</span>
                    </div>

                    <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-white/90">
                      {product.tagline}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-[#AEB8C5]">
                      {product.description}
                    </p>

                    {/* Structural Highlights */}
                    <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                      {product.structuralHighlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2.5 text-sm text-[#AEB8C5]"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A5F044]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Verified Specification Matrix */}
                    <dl className="mt-6 divide-y divide-white/8 rounded-xl border border-white/10 bg-[#071526]/70 px-4">
                      {product.verifiedSpecs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-center justify-between gap-4 py-2.5 text-xs"
                        >
                          <dt className="text-[#AEB8C5]">{spec.label}</dt>
                          <dd className="text-right font-medium text-white">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="mt-6 pt-2">
                    <button
                      type="button"
                      onClick={() => onRequestQuote(product.id)}
                      className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#A5F044] px-5 py-3 text-sm font-bold text-[#071526] transition-colors hover:bg-[#b5f562] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5F044] sm:w-auto"
                    >
                      <span>Request a Quote for {product.shortTitle}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
