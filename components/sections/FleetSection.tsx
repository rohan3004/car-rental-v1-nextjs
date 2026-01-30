"use client";

import { useState } from "react";
import Image from "next/image";
import { useFleetConfig, Car } from "@/lib/useFleetConfig";
import { Loader2, ArrowRight, User, Briefcase } from "lucide-react";
import FleetBookingModal from "@/components/FleetBookingModal"; // <--- Import Modal

export default function FleetSection() {
  const { config, allCars, loading } = useFleetConfig();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null); // <--- Modal State

  if (loading) return (
    <div className="py-32 text-center flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-amber-400" size={32} /> 
        <span className="text-zinc-500 font-serif tracking-widest uppercase text-sm">Retrieving Fleet...</span>
    </div>
  );
  
  if (!config) return null;

  return (
    <section className="py-24 px-6 bg-[#050505]" id="fleet-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.25em]">The Collection</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Choose Your Class.</h2>
          <div className="h-px w-20 bg-zinc-800 mx-auto mt-6"></div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCars.map((car) => (
            <div 
              key={car.id} 
              className="group relative bg-[#0a0a0a] border border-white/5 hover:border-amber-400/30 transition-all duration-500 flex flex-col"
            >
              
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-[#080808]">
                <Image 
                  src={car.image} 
                  alt={car.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white">
                   {car.category_id}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-1">
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">{car.brand}</p>
                    <h3 className="font-serif text-2xl text-white group-hover:text-amber-100 transition-colors">{car.name}</h3>
                  </div>
                </div>

                <div className="flex gap-4 mb-8 border-t border-white/5 pt-4">
                   <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
                      <User size={14} className="text-amber-400/70" /> Chauffeur
                   </div>
                   <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
                      <Briefcase size={14} className="text-amber-400/70" /> A/C
                   </div>
                </div>

                {/* Price & Action */}
                <div className="mt-auto flex items-end justify-between">
                   <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Hourly Rate</p>
                      <div className="font-serif text-2xl text-amber-400">
                         ₹{car.price_per_hr}
                         <span className="text-sm text-zinc-600 font-sans ml-1">/hr</span>
                      </div>
                   </div>

                   {/* CHANGE: Button instead of Link */}
                   <button 
                     onClick={() => setSelectedCar(car)}
                     className="w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-amber-400 transition-colors duration-300 cursor-pointer"
                   >
                      <ArrowRight size={20} strokeWidth={1.5} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* RENDER THE POPUP */}
      <FleetBookingModal 
        car={selectedCar} 
        onClose={() => setSelectedCar(null)} 
      />
    </section>
  );
}