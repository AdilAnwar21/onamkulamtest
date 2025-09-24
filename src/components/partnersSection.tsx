import React, { useEffect, useRef, useState } from 'react';

type Brand = {
  name: string;
  position?: string;
  description?: string;
  founded?: string;
  specialty?: string;
};

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

const ExclusiveBrandsComplete: React.FC<{ scrollProgress?: number }> = () => {
  const [mounted, setMounted] = useState(false);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const partnersRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);

  // per-section progress (0..1)
  const [titleP, setTitleP] = useState(0);
  const [gridP, setGridP] = useState(0);
  const [partnersP, setPartnersP] = useState(0);
  const [quoteP, setQuoteP] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const exclusiveBrands: Brand[] = [
    {
      name: 'MERIDIANI',
      position: 'top-left',
      description:
        'Italian luxury furniture brand known for sophisticated contemporary design and exceptional craftsmanship.',
      founded: '1996',
      specialty: 'Contemporary Furniture',
    },
    {
      name: 'Frigerio',
      position: 'top-right',
      description:
        'Premium Italian furniture manufacturer specializing in upholstered seating and elegant living solutions.',
      founded: '1941',
      specialty: 'Upholstered Furniture',
    },
    {
      name: 'FIAM',
      position: 'bottom-left',
      description:
        'Innovative glass furniture design company creating stunning curved and artistic glass pieces.',
      founded: '1973',
      specialty: 'Glass Furniture',
    },
    {
      name: 'SANGIACOMO',
      position: 'bottom-right',
      description:
        'Modern Italian furniture brand offering contemporary storage solutions and bedroom furniture.',
      founded: '1968',
      specialty: 'Storage Solutions',
    },
  ];

  const partners = [
    { name: 'hansgrohe', logo: 'hansgrohe' },
    { name: 'WOLF', logo: 'WOLF' },
    { name: 'SIEMENS', logo: 'SIEMENS' },
    { name: 'BANG & OLUFSEN', logo: 'B&O', subtitle: 'BANG & OLUFSEN' },
    { name: 'davide groppi', logo: 'davide groppi' },
    { name: 'GAGGENAU', logo: 'GAGGENAU' },
    { name: 'SUB-ZERO', logo: 'SUB•ZERO' },
    { name: 'smeg', logo: '•••smeg' },
  ];

  // compute progress for an element: 0 when below viewport, 1 when at or above top
  const computeProgressFor = (el: HTMLDivElement | null) => {
    if (!el || typeof window === 'undefined') return 0;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const p = (vh - rect.top) / vh;
    return clamp(p, 0, 1);
  };

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!mounted) return;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setTitleP(() => computeProgressFor(titleRef.current));
          setGridP(() => computeProgressFor(gridRef.current));
          setPartnersP(() => computeProgressFor(partnersRef.current));
          setQuoteP(() => computeProgressFor(quoteRef.current));
          ticking = false;
        });
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [mounted]);

  // brand stagger
  const brandProgressForIndex = (index: number) => {
    const stagger = 0.14;
    const start = index * stagger;
    const p = (gridP - start) / (1 - start);
    return clamp(p, 0, 1);
  };

  // Get transform origin for each brand based on connection pattern
  const getBrandTransform = (index: number, progress: number) => {
    if (progress <= 0.1) {
      // Define where each card should animate from
      const transforms = [
        'scale(0.3)', // Card 1: Pop up from center
        'translateX(-200px) scale(0.8)', // Card 2: From card 1's position
        'translateY(-200px) scale(0.8)', // Card 3: From card 1 down to position
        'scale(0.3)', // Card 4: Pop up from center
      ];
      return transforms[index] || 'scale(0.3)';
    }
    return 'scale(1)';
  };

  const marqueeDuration = Math.max(20, 30 - partnersP * 10);

  if (!mounted) return null;

  return (
    <div className="bg-black text-white relative overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee { overflow: hidden; width: 100%; }
        .marquee-inner {
          display: flex;
          gap: 2rem;
          width: calc(200%);
          animation: marquee ${marqueeDuration}s linear infinite;
        }
        @keyframes fadeIn { from {opacity: 0;} to {opacity: 1;} }
        
        @keyframes brandPopUp {
          0% { 
            opacity: 0; 
            transform: scale(0.3); 
          }
          60% { 
            transform: scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes brandSlideFromLeft {
          0% { 
            opacity: 0; 
            transform: translateX(-200px) scale(0.8); 
          }
          60% { 
            transform: translateX(10px) scale(1.02); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        @keyframes brandSlideFromTop {
          0% { 
            opacity: 0; 
            transform: translateY(-200px) scale(0.8); 
          }
          60% { 
            transform: translateY(10px) scale(1.02); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes continuousLeftMove {
          0%, 100% { 
            transform: translateX(0); 
          }
          50% { 
            transform: translateX(-10px); 
          }
        }
        .quote-animate { animation: fadeIn 1.2s ease-out forwards; }
        
        .brand-pop-up { 
          animation: brandPopUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .brand-slide-left { 
          animation: brandSlideFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .brand-slide-top { 
          animation: brandSlideFromTop 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .brand-card:hover {
          animation: continuousLeftMove 2s ease-in-out infinite;
        }
      `}</style>

      {/* EXCLUSIVE BRANDS SECTION */}
      <section
        ref={titleRef}
        className="min-h-screen flex flex-col justify-center items-center px-6 md:px-10 py-16 mt-20 mb-40"
      >
        <div
          className="mb-16 text-left"
          style={{
            transform: `translateY(${(1 - titleP) * 40}px)`,
            opacity: titleP,
            transition: 'transform 450ms cubic-bezier(.2,.9,.2,1), opacity 450ms',
          }}
        >
          <h2 className="section-title text-4xl md:text-6xl lg:text-7xl font-light tracking-wider leading-tight">
            <span
              className={`block transition-all duration-700 ${titleP > 0.2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '150ms' }}
            >
              OUR
            </span>
            <span
              className={`block transition-all duration-700 ${titleP > 0.4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '300ms' }}
            >
              EXCLUSIVE
            </span>
            <span
              className={`block transition-all duration-700 ${titleP > 0.6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '450ms' }}
            >
              BRANDS
            </span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12"
          aria-hidden={gridP === 0}
        >
          {exclusiveBrands.map((brand, i) => {
            const p = brandProgressForIndex(i);
            
            // Define animation classes for each position
            const getAnimationClass = (index: number) => {
              switch(index) {
                case 0: return 'brand-pop-up'; // First card: pop up
                case 1: return 'brand-slide-left'; // Second card: slide from first card's position
                case 2: return 'brand-slide-top'; // Third card: slide down from first card
                case 3: return 'brand-pop-up'; // Fourth card: pop up
                default: return 'brand-pop-up';
              }
            };
            
            return (
              <button
                key={brand.name}
                className={`bg-gray-900/50 border border-gray-800/50 rounded-lg p-8 md:p-12 text-center cursor-pointer transform transition hover:bg-gray-800/60 hover:border-gray-700/60 min-h-[200px] md:min-h-[240px] flex flex-col justify-center brand-card ${p > 0.1 ? getAnimationClass(i) : ''}`}
                style={{
                  opacity: p > 0.1 ? 1 : 0,
                  transform: p > 0.1 ? 'none' : getBrandTransform(i, p),
                  transition: p > 0.1 ? 'none' : 'opacity 0.3s ease, transform 0.3s ease',
                  animationDelay: `${i * 200}ms`,
                }}
                aria-label={`View ${brand.name}`}
              >
                <h3 className="brand-title text-2xl md:text-3xl font-light tracking-wide">{brand.name}</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6 opacity-60" />
              </button>
            );
          })}
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section
        ref={partnersRef}
        className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-16"
      >
        <div
          className="mb-16 text-center"
          style={{
            transform: `translateY(${(1 - partnersP) * 30}px)`,
            opacity: partnersP,
            transition: 'transform 450ms cubic-bezier(.2,.9,.2,1), opacity 450ms',
          }}
        >
          <h2 className="section-title text-4xl md:text-6xl lg:text-7xl font-light tracking-wider">OUR PARTNERS</h2>
        </div>

        <div
          className="w-full max-w-full marquee"
          style={{ opacity: partnersP, transition: 'opacity 350ms' }}
        >
          <div className="marquee-inner">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="min-w-[280px] md:min-w-[320px] h-40 md:h-48 bg-transparent border border-white/60 rounded-lg flex flex-col items-center justify-center flex-shrink-0"
              >
                {p.name === 'BANG & OLUFSEN' ? (
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-light tracking-wide">B&O</h3>
                    <p className="text-xs md:text-sm text-gray-400 mt-1 tracking-wider">BANG & OLUFSEN</p>
                  </div>
                ) : p.name === 'WOLF' ? (
                  <div className="border border-white px-4 py-2">
                    <h3 className="text-lg md:text-xl font-light tracking-wider">{p.logo}</h3>
                  </div>
                ) : (
                  <h3 className="text-lg md:text-xl font-light tracking-wide">{p.logo}</h3>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section
        ref={quoteRef}
        className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-16 text-center"
      >
        <div
          className={quoteP > 0.5 ? 'quote-animate' : ''}
          style={{
            transform: `translateY(${(1 - quoteP) * 30}px)`,
            opacity: quoteP,
            transition: 'transform 450ms cubic-bezier(.2,.9,.2,1), opacity 450ms',
            maxWidth: '80ch',
          }}
        >
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed">
            With unlimited creativity, <span className="italic">we transform your vision</span>
          </h3>
        </div>
      </section>
    </div>
  );
};

export default ExclusiveBrandsComplete;