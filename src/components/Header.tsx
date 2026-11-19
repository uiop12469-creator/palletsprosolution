import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { label: 'Home', target: 'home' },
  { label: 'Products', target: 'products' },
  { label: 'Industries', target: 'industries' },
  { label: 'About Us', target: 'about' },
  { label: 'Contact', target: 'contact' },
];

export function Header({ onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (target: string) => {
    setMobileOpen(false);
    onNavigate(target);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'border-b border-white/10 bg-[#071526]/98 shadow-lg'
          : 'border-b border-white/5 bg-[#071526]/80'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="flex shrink-0 items-center whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A5F044]"
        >
          <img
            src="/assets/logo-pallets-pro.png"
            alt="Pallets Pro Solutions"
            className="h-11 w-auto object-contain sm:h-12"
          />
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.target);
              }}
              className="group relative shrink-0 whitespace-nowrap py-1 text-sm font-medium text-[#AEB8C5] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A5F044]"
            >
              <span>{link.label}</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#A5F044] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Mobile Trigger */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => handleLinkClick('enquiry')}
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#A5F044] px-4 py-2 text-xs font-bold text-[#071526] transition-colors hover:bg-[#b5f562] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5F044] sm:px-5 sm:text-sm"
          >
            <span>Get a Quote</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:border-[#A5F044]/60 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#071526] px-4 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.target);
                }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#AEB8C5] transition-colors hover:bg-[#101B2A] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
