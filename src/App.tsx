import { useCallback, useEffect, useRef, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionConfig } from 'motion/react';
import { BUSINESS_BASE_PROFILE } from './data/packagingData';
import type { ProductCategoryId, VerifiedBusinessProfile } from './types/packaging';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductShowcases } from './components/ProductShowcases';
import { IndustriesSection } from './components/IndustriesSection';
import { AboutAndWhyUsSection } from './components/AboutAndWhyUsSection';
import { GallerySection } from './components/GallerySection';
import { EnquirySection } from './components/EnquirySection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const PRODUCT_ID_TO_LABEL: Record<ProductCategoryId, string> = {
  'wooden-pallets': 'Wooden Pallets',
  'plastic-pallets': 'Plastic Pallets',
  'wooden-packing-boxes': 'Wooden Packing Boxes',
};

export default function App() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [profile, setProfile] = useState<VerifiedBusinessProfile>(BUSINESS_BASE_PROFILE);
  const [selectedProductCategory, setSelectedProductCategory] =
    useState<string>('Wooden Pallets');
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  useEffect(() => {
    const onQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  // GSAP ScrollTrigger subtle reveal animations respecting reduced-motion
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !mainRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.gsap-reveal');
      elements.forEach((el) => {
        gsap.from(el, {
          y: 22,
          opacity: 0,
          duration: 0.65,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleRequestQuote = useCallback(
    (productId: ProductCategoryId) => {
      setSelectedProductCategory(PRODUCT_ID_TO_LABEL[productId]);
      handleNavigate('enquiry');
    },
    [handleNavigate]
  );

  const handleProfileResolved = useCallback((resolved: VerifiedBusinessProfile) => {
    setProfile(resolved);
  }, []);

  const content = (
    <MotionConfig reducedMotion="user">
      <div ref={mainRef} className="min-h-screen bg-[#071526] text-white">
        {quotaExceeded && (
          <div className="sticky top-0 z-50 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-xs text-amber-900 shadow-sm md:text-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-950 underline hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        <Header onNavigate={handleNavigate} />

        <main>
          <HeroSection
            onExploreProducts={() => handleNavigate('products')}
            onGetQuote={() => handleNavigate('enquiry')}
            onSelectCategory={(id) => handleNavigate(id)}
          />

          <ProductShowcases onRequestQuote={handleRequestQuote} />

          <IndustriesSection />

          <AboutAndWhyUsSection
            profile={profile}
            onGetQuote={() => handleNavigate('enquiry')}
          />

          <GallerySection profile={profile} />

          <EnquirySection
            selectedProductCategory={selectedProductCategory}
            profile={profile}
          />

          <FaqSection />

          <ContactSection
            profile={profile}
            onProfileResolved={handleProfileResolved}
          />
        </main>

        <Footer profile={profile} onNavigate={handleNavigate} />
      </div>
    </MotionConfig>
  );

  if (mapsApiKey) {
    return (
      <APIProvider
        apiKey={mapsApiKey}
        libraries={['marker', 'places']}
        language="en"
        region="IN"
      >
        {content}
      </APIProvider>
    );
  }

  return content;
}
