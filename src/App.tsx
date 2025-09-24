import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FloatingNavbar from './components/FloatingNavbar';
import Achievements from './components/Achievements';
import ExclusiveBrands from './components/partnersSection';
import TestimonialScroll from './components/Testimonials';
import ServicesShowcase from './components/ServicesShowcase';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.title = 'HouseMood - Interior Design Studio';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const heroHeight = windowHeight;

  // Hero offset
  const heroOffset = Math.min(scrollY * 0.5, heroHeight * 0.5);

  // Achievements offset
  const achievementsStart = heroHeight;
  const achievementsOffset = Math.max(
    0,
    Math.min(heroHeight, scrollY - achievementsStart)
  );

  // Exclusive Brands offset - Extended duration
  const brandsStart = heroHeight * 2;
  const brandsScroll = Math.max(0, scrollY - brandsStart);
  const brandsProgress = brandsScroll / (heroHeight * 2); // Extended for more content

  // Testimonials calculation - stacks on top of brands
  const testimonialsStart = heroHeight * 3.5; // Start earlier for stacking
  const testimonialsScroll = Math.max(0, scrollY - testimonialsStart);
  const testimonialsOffset = Math.min(heroHeight, testimonialsScroll * 0.8); // Slide up effect
  const testimonialsProgress = Math.min(
    1,
    testimonialsScroll / (heroHeight * 2) // Duration for all slides
  );

  // Testimonials visibility - stacking scroll
  const testimonialsVisible = testimonialsScroll > 0;

  // Services calculation - stacks on top of testimonials
  const servicesStart = heroHeight * 6; // Start when testimonials are well established
  const servicesScroll = Math.max(0, scrollY - servicesStart);
  const servicesOffset = Math.min(heroHeight, servicesScroll * 0.8); // Slide up effect

  // Services visibility - stacking scroll
  const servicesVisible = servicesScroll > 0;

  return (
    <div className="relative overflow-hidden">
      {/* Floating Navigation - Always visible with highest z-index */}
      <div className="fixed inset-x-0 top-0 z-[100]">
        <FloatingNavbar />
      </div>

      {/* Scrollable container - Optimized height */}
      <main style={{ height: `${heroHeight * 8.5}px` }}>
        {/* Hero Layer */}
        {scrollY < achievementsStart + heroHeight && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 10,
              transform: `translateY(${-heroOffset}px)`,
            }}
          >
            <Hero />
          </div>
        )}

        {/* Achievements Layer */}
        {scrollY < brandsStart + heroHeight && (
          <div
            className="absolute inset-0 w-full"
            style={{
              top: `${heroHeight}px`,
              zIndex: 20,
              transform: `translateY(${-achievementsOffset}px)`,
            }}
          >
            <Achievements />
          </div>
        )}

        {/* Exclusive Brands Layer - Extended visibility */}
        {scrollY < testimonialsStart + heroHeight && (
          <div
            className="absolute inset-0 w-full"
            style={{
              top: `${heroHeight * 2}px`,
              zIndex: 30,
              transform: `translateY(${-brandsScroll}px)`,
            }}
          >
            <ExclusiveBrands scrollProgress={brandsProgress} />
          </div>
        )}

        {/* Testimonials Layer - Slides up from bottom over brands */}
        {testimonialsVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 40,
              transform: `translateY(${heroHeight - testimonialsOffset}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <TestimonialScroll scrollProgress={testimonialsProgress} />
          </div>
        )}

        {/* Services Layer - Slides up from bottom */}
        {servicesVisible && (
          <div
            className="fixed inset-0 w-full"
            style={{
              zIndex: 50,
              transform: `translateY(${heroHeight - servicesOffset}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <ServicesShowcase/>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;