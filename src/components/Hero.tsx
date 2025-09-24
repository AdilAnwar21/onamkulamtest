const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-neutral-200">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-16 pt-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider">
              ONAMKULAM
            </h1>
          </div>
        </div>
      </div>

      {/* Left Side Content */}
      <div className="absolute left-4 sm:left-6 lg:left-16 top-1/3 -translate-y-1/2 max-w-[70%] sm:max-w-none">
        {/* Award Badge */}
        <div className="flex items-center space-x-3 text-white mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded flex items-center justify-center">
            <span className="text-[10px] sm:text-xs font-bold">✦</span>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium">Interior</p>
            <p className="text-xs sm:text-sm opacity-90">Design Awards</p>
          </div>
          <span className="text-lg sm:text-2xl font-light opacity-90">2021</span>
        </div>

        {/* Main Content Block */}
        <div className="text-white mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed mb-1 sm:mb-2">
            We Craft Interiors
          </h2>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed">
            Since 2014
          </h2>
        </div>
      </div>

      {/* Right Side Content */}
      <div className="absolute right-4 sm:right-6 lg:right-16 top-1/3 -translate-y-1/2 text-right hidden sm:block">
        <div className="text-white space-y-0.5 sm:space-y-1">
          <p className="text-sm sm:text-base font-medium">Tech Specifications</p>
          <p className="text-xs sm:text-sm opacity-90">Design Project</p>
          <p className="text-xs sm:text-sm opacity-90">3D visualisation</p>
        </div>
      </div>

      {/* Main Heading - Bottom */}
      <div className="absolute bottom-10 sm:bottom-14 left-4 sm:left-6 lg:left-16 right-4 sm:right-6 lg:right-16">
        <h1 className="text-white font-light leading-tight sm:leading-none">
          <span className="block text-4xl sm:text-6xl lg:text-8xl xl:text-9xl">
            Your House is
          </span>
          <span className="block text-4xl sm:text-6xl lg:text-8xl xl:text-9xl mt-2">
            the Place <span className="italic font-serif">of Mod</span>
          </span>
        </h1>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="absolute top-6 right-4 sm:right-6 lg:hidden">
        <button className="text-white p-2">
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
