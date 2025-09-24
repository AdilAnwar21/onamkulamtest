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
  const totalSections = 6; // Increased to give more space
  
  // Calculate start positions for each section
  const heroStart = 0;
  const heroEnd = sectionHeight * 1.5; // Hero stays visible longer
  const achievementsStart = sectionHeight * 1.5;
  const achievementsEnd = sectionHeight * 2.5;
  const brandsStart = sectionHeight * 2.5;
  const brandsEnd = sectionHeight * 3.5;
  const testimonialsStart = sectionHeight * 3.5;
  const testimonialsEnd = sectionHeight * 4.5;
  const servicesStart = sectionHeight * 4.5;

  // Helper function to calculate when a section should start moving up
  const getExitProgress = (sectionEnd: number, currentScroll: number) => {
    if (currentScroll < sectionEnd) return 0;
    const progress = Math.max(0, Math.min(1, (currentScroll - sectionEnd) / (sectionHeight * 0.5)));
    return progress;
  };

  // Helper function to calculate when a section should enter from bottom
  const getEnterProgress = (sectionStart: number, currentScroll: number) => {
    if (currentScroll < sectionStart) return 0;
    const progress = Math.max(0, Math.min(1, (currentScroll - sectionStart) / (sectionHeight * 0.5)));
    return progress;
  };

  // Calculate progress for each section
  const heroExitProgress = getExitProgress(heroEnd, scrollY);
  const achievementsEnterProgress = getEnterProgress(achievementsStart, scrollY);
  const achievementsExitProgress = getExitProgress(achievementsEnd, scrollY);
  const brandsEnterProgress = getEnterProgress(brandsStart, scrollY);
  const brandsExitProgress = getExitProgress(brandsEnd, scrollY);
  const testimonialsEnterProgress = getEnterProgress(testimonialsStart, scrollY);
  const testimonialsExitProgress = getExitProgress(testimonialsEnd, scrollY);
  const servicesEnterProgress = getEnterProgress(servicesStart, scrollY);

  // Calculate progress values for components that need them
  const brandsProgress = brandsEnterProgress;
  const testimonialsProgress = testimonialsEnterProgress;

  // Calculate transforms for each section
  const getEnterTransform = (enterProgress: number) => {
    return `translateY(${(1 - enterProgress) * 100}vh)`;
  };

  const getExitTransform = (exitProgress: number) => {
    return `translateY(${-exitProgress * 100}vh)`;
  };

  // Calculate visibility and z-index
  const getVisibility = (sectionStart: number, currentScroll: number) => {
    return currentScroll >= sectionStart - (sectionHeight * 0.5);
  };

  return (
    <div className="relative">
      {/* Floating Navigation - Always visible with highest z-index */}
      <div className="fixed inset-x-0 top-0 z-[100]">
        <FloatingNavbar />
      </div>

      {/* Scrollable container */}
      <main style={{ height: `${sectionHeight * 5.5}px` }}>
        
        {/* Hero Section */}
        <div
          className="fixed inset-0 w-full h-screen"
          style={{
            zIndex: 10,
            transform: getExitTransform(heroExitProgress),
            transition: 'transform 0.1s ease-out',
          }}
        >
          <Hero />
        </div>

        {/* Achievements Section */}
        {scrollY >= achievementsStart - sectionHeight && (
          <div
            className="fixed inset-0 w-full h-screen"
            style={{
              zIndex: 20,
              transform: achievementsExitProgress > 0 ? getExitTransform(achievementsExitProgress) : getEnterTransform(achievementsEnterProgress),
              transition: 'transform 0.1s ease-out',
            }}
          >
            <Achievements />
          </div>
        )}

        {/* Exclusive Brands Section */}
        {scrollY >= brandsStart - sectionHeight && (
          <div
            className="fixed inset-0 w-full h-screen"
            style={{
              zIndex: 30,
              transform: brandsExitProgress > 0 ? getExitTransform(brandsExitProgress) : getEnterTransform(brandsEnterProgress),
              transition: 'transform 0.1s ease-out',
            }}
          >
            <ExclusiveBrands scrollProgress={brandsProgress} />
          </div>
        )}

        {/* Testimonials Section */}
        {scrollY >= testimonialsStart - sectionHeight && (
          <div
            className="fixed inset-0 w-full h-screen"
            style={{
              zIndex: 40,
              transform: testimonialsExitProgress > 0 ? getExitTransform(testimonialsExitProgress) : getEnterTransform(testimonialsEnterProgress),
              transition: 'transform 0.1s ease-out',
            }}
          >
            <TestimonialScroll scrollProgress={testimonialsProgress} />
          </div>
        )}

        {/* Services Section */}
        {scrollY >= servicesStart - sectionHeight && (
          <div
            className="fixed inset-0 w-full h-screen"
            style={{
              zIndex: 50,
              transform: getEnterTransform(servicesEnterProgress),
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