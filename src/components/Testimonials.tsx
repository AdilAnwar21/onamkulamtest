import { useRef } from "react";

interface TestimonialScrollProps {
  scrollProgress: number;
}

const TestimonialScroll = ({ scrollProgress }: TestimonialScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      quote: "This interior design studio transformed our home into a masterpiece. The attention to detail and creativity exceeded all expectations.",
      author: "Sarah Johnson",
      role: "Homeowner",
      project: "Sanur House",
      location: "San Francisco, CA",
      projectImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop",
      number: "01",
    },
    {
      id: 2,
      quote: "Working with HouseMood was an incredible experience. They understood our vision perfectly and brought it to life beautifully.",
      author: "Michael Chen",
      role: "Business Owner",
      project: "Modern Loft",
      location: "New York, NY",
      projectImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop",
      number: "02",
    },
    {
      id: 3,
      quote: "The team's professionalism and innovative approach to design made our renovation process smooth and enjoyable.",
      author: "Emily Rodriguez",
      role: "Architect",
      project: "Urban Retreat",
      location: "Los Angeles, CA",
      projectImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop",
      number: "03",
    },
  ];

  const totalCards = testimonials.length;
  const progress = Math.max(0, Math.min(1, scrollProgress));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen overflow-hidden"
      style={{ zIndex: 40 }}
    >
      {testimonials.map((testimonial, index) => {
        const sectionStart = index / totalCards;
        const sectionEnd = (index + 1) / totalCards;
        const sectionProgress = Math.max(
          0,
          Math.min(1, (progress - sectionStart) / (sectionEnd - sectionStart))
        );

        // Each card scrolls up over the previous
        const translateY = (1 - sectionProgress) * 100;

        return (
          <div
            key={testimonial.id}
            className="absolute inset-0 w-full h-full flex"
            style={{
              transform: `translateY(${translateY}%)`,
              zIndex: index + 1,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Left Image */}
            <div
              className="w-full md:w-2/3 h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${testimonial.projectImage})`,
              }}
            ></div>

            {/* Right Content */}
            <div className="hidden md:flex flex-col justify-center w-1/3 bg-black/70 text-white p-12">
              <h1 className="text-7xl font-bold mb-6">{testimonial.number}</h1>
              <h2 className="text-4xl font-semibold mb-4">
                {testimonial.project}
              </h2>
              <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm opacity-70">{testimonial.role}</p>
                <p className="text-sm opacity-50">{testimonial.location}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestimonialScroll;
