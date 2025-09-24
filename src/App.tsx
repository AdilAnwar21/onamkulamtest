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
  
  // Calculate which section should be active based on scroll
  const currentSection = Math.floor(scrollY / sectionHeight);
  const sectionProgress = (scrollY % sectionHeight) / sectionHeight;
  
  // Calculate transforms for stacking effect
  const getTransform = (sectionIndex: number) => {
    if (currentSection < sectionIndex) {
      // Section hasn't appeared yet - keep it below
      return `translateY(100vh)`;
    } else if (currentSection === sectionIndex) {
      // Current section - animate it up
      return `translateY(${(1 - sectionProgress) * 100}vh)`;
    } else {
      // Section has passed - keep it above
      return `translateY(-100vh)`;
    }
  };
  
  // Calculate progress for components that need it
  const brandsProgress = currentSection >= 2 ? (currentSection === 2 ? sectionProgress : 1) : 0;
  const testimonialsProgress = currentSection >= 3 ? (currentSection === 3 ? sectionProgress : 1) : 0;

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
            transform: getTransform(0),
            transition: 'transform 0.3s ease-out',
          }}
        >
          <Hero />
        </div>

        {/* Achievements Section */}
        <div
          className="fixed inset-0 w-full h-screen"
          style={{
            zIndex: 20,
            transform: getTransform(1),
            transition: 'transform 0.3s ease-out',
          }}
        >
          <Achievements />
        </div>

        {/* Exclusive Brands Section */}
        <div
          className="fixed inset-0 w-full h-screen"
          style={{
            zIndex: 30,
            transform: getTransform(2),
            transition: 'transform 0.3s ease-out',
          }}
        >
          <ExclusiveBrands scrollProgress={brandsProgress} />
        </div>

        {/* Testimonials Section */}
        <div
          className="fixed inset-0 w-full h-screen"
          style={{
            zIndex: 40,
            transform: getTransform(3),
            transition: 'transform 0.3s ease-out',
          }}
        >
          <TestimonialScroll scrollProgress={testimonialsProgress} />
        </div>

        {/* Services Section */}
        <div
          className="fixed inset-0 w-full h-screen"
          style={{
            zIndex: 50,
            transform: getTransform(4),
            transition: 'transform 0.3s ease-out',
          }}
        >
          <ServicesShowcase />
        </div>

      </main>
    </div>
  );
}

export default App;