"use client";

import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { MOCK_CARS } from "@/lib/mockData";

export default function FleetSection() {
  // Safety Check
  if (!MOCK_CARS || MOCK_CARS.length === 0) {
    return <div className="p-10 text-center text-white">Loading Fleet...</div>;
  }

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="font-space text-4xl font-bold text-white">The Garage</h2>
          <p className="text-lg text-gray-300 mt-2">Meticulously maintained machinery.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_CARS.map((car) => (
          <SpotlightCard key={car.id} className="group border border-white/15">
            <div className="p-6 h-full flex flex-col">
              
              {/* Car Image Linked */}
              <Link href={`/cars/${car.id}`} className="block relative h-56 w-full mb-6 rounded-xl overflow-hidden border border-white/5 cursor-pointer">
                <Image 
                  src={car.imageUrl} 
                  alt={car.modelName} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold border border-white/20 text-white">
                   {car.transmission}
                </div>
              </Link>

              {/* Title Linked */}
              <Link href={`/cars/${car.id}`} className="block group-hover:text-lime-400 transition-colors">
                 <h3 className="font-space text-2xl font-bold text-white mb-1">{car.modelName}</h3>
              </Link>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-6">
                {car.type} • {car.fuelType}
              </div>
              
              {/* Footer */}
              <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-6">
                <div>
                  <span className="block text-xs uppercase text-gray-500 font-bold tracking-wider">Hourly Rate</span>
                  <span className="text-2xl font-bold font-space text-lime-400">₹{car.basePricePerHour}</span>
                </div>
                <Link 
                  href={`/cars/${car.id}`}
                  className="px-6 py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}