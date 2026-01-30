"use client";

import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useFleetConfig } from "@/lib/useFleetConfig";
import { Loader2 } from "lucide-react";

export default function FleetSection() {
  const { config, allCars, loading } = useFleetConfig();

  if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin inline text-lime-400" /> Loading Fleet...</div>;
  if (!config) return null;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="fleet-section">
      <div className="mb-12">
        <h2 className="font-space text-4xl font-bold text-white">Our Fleet</h2>
        <p className="text-gray-400 mt-2">Choose from our wide range of Hatchbacks, Sedans, and SUVs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allCars.map((car) => (
          <SpotlightCard key={car.id} className="group border border-white/10 bg-[#0F0F11]">
            <div className="p-6">
              {/* Image */}
              <div className="relative h-56 w-full mb-6 rounded-xl overflow-hidden border border-white/5 bg-gray-900">
                <Image 
                  src={car.image} 
                  alt={car.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="font-space text-2xl font-bold text-white">{car.name}</h3>
                   <p className="text-sm text-gray-500">{car.brand}</p>
                </div>
                <div className="text-right">
                   <div className="text-xl font-bold font-space text-lime-400">₹{car.price_per_hr}</div>
                   <div className="text-[10px] text-gray-500 uppercase">Per Hour</div>
                </div>
              </div>

              {/* Action */}
              <Link 
                href={`/book/${car.id}`} 
                className="block w-full text-center bg-white text-black font-bold py-3 rounded-xl hover:bg-lime-400 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}