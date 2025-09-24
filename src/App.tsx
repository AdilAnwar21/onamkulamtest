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

  // Define section heights and start positions
  const sectionHeight = windowHeight;
  const totalSections = 5;
  
  // Calculate start positions for each section
  const heroStart = 0;
  const achievementsStart = sectionHeight;
  const brandsStart = sectionHeight * 2;
  const testimonialsStart = sectionHeight * 3;
  const servicesStart = sectionHeight * 4;

  // Helper function to calculate stacking progress for each section
  const getStackingProgress = (sectionStart: number, currentScroll: number) => {
    const progress = Math.max(0, Math.min(1, (currentScroll - sectionStart) / sectionHeight));
    return progress;
  };

  // Calculate progress for each section
  const heroProgress = getStackingProgress(heroStart, scrollY);
  const achievementsProgress = getStackingProgress(achievementsStart, scrollY);
  const brandsProgress = getStackingProgress(brandsStart, scrollY);
  const testimonialsProgress = getStackingProgress(testimonialsStart, scrollY);
  const servicesProgress = getStackingProgress(servicesStart, scrollY);

  // Calculate transforms for stacking effect
  const getTransform = (progress: number, isActive: boolean) => {
    if (!isActive) return 'translateY(100vh)';
    return `translateY(${(1 - progress) * 100}vh)`;
  };

  // Calculate visibility and z-index
  const getVisibility = (sectionStart: number, currentScroll: number) => {
    return currentScroll >= sectionStart - sectionHeight;
  };

  return (
    <div className="relative">
      {/* Floating Navigation - Always visible with highest z-index */}
      <div className="fixed inset-x-0 top-0 z-[100]">
        <FloatingNavbar />
      </div>

      {/* Scrollable container */}
      <main style={{ height: `${sectionHeight * totalSections}px` }}>
        
        {/* Hero Section */}
        <div
          className="fixed inset-0 w-full h-screen"
          style={{
            zIndex: 10,
            transform: scrollY >= achievementsStart ? `translateY(-${Math.min(100, (scrollY - achievementsStart) / sectionHeight * 100)}vh)` : 'translateY(0)',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <Hero />
        </div>

        {/* Achievements Section */}
        {getVisibility(achievementsStart, scrollY) && (
          <div
            className="fixed inset-0 w-full h-screen"
            style={{
              zIndex: 20,
              transform: getTransform(achievementsProgress, scrollY >= achievementsStart),
              transition: 'transform 0.1s ease-out',
            }}
          >
            <Achievements />
          </div>
        )}

        {/* Exclusive Brands Section */}
        {getVisibility(brandsStart, scrollY) && (
          <div
            className="fixed inset-0 w-full h-screen"
            style={{
              zIndex: 30,
              transform: getTransform(brandsProgress, scrollY >= brandsStart),
              transition: 'transform 0.1s ease-out',
            }}
          >
            <ExclusiveBrands scrollProgress={brandsProgress} />
          </div>
        )}

        {/* Testimonials Section */}
        {getVisibility(testimonialsStart, scrollY) && (
          <div
            className="fixed inset-0 w-full h-screen"
            style={{
              zIndex: 40,
              transform: getTransform(testimonialsProgress, scrollY >= testimonialsStart),
              transition: 'transform 0.1s ease-out',
            }}
          >
            <TestimonialScroll scrollProgress={testimonialsProgress} />
          </div>
        )}

        {/* Services Section */}
        {getVisibility(servicesStart, scrollY) && (
          <div
            className="fixed inset-0 w-full h-screen"
            style={{
              zIndex: 50,
              transform: getTransform(servicesProgress, scrollY >= servicesStart),
              transition: 'transform 0.1s ease-out',
            }}
          >
            <ServicesShowcase />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;