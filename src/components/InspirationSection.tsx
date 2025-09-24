// components/InspirationSection.tsx
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

type InspirationItem = {
  id: number;
  title: string;
  image: string;
};

const InspirationSection: React.FC = () => {
  const [items, setItems] = useState<InspirationItem[]>([]);

  useEffect(() => {
    // Replace with API call later
    const dummyData: InspirationItem[] = [
      {
        id: 1,
        title: 'Renovation & Remodeling',
        image: '/images/renovation.jpg',
      },
      {
        id: 2,
        title: 'Modern Interior',
        image: '/images/interior.jpg',
      },
      {
        id: 3,
        title: 'Luxury Spaces',
        image: '/images/luxury.jpg',
      },
    ];
    setItems(dummyData);
  }, []);

  return (
    <div className="h-full w-full bg-black text-white flex items-center justify-center px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl w-full">
        {/* Left side text */}
        <div className="flex flex-col justify-between py-12">
          <div>
            <p className="text-sm uppercase tracking-widest mb-4">Services</p>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Renovation & <br /> Remodeling
            </h2>
          </div>
          <button className="mt-8 flex items-center gap-2 text-lg font-medium hover:opacity-80 transition">
            View All <ArrowRight size={20} />
          </button>
        </div>

        {/* Right side images */}
        <div className="flex flex-col gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[320px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspirationSection;
