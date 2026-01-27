"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { MOCK_CARS } from "@/lib/mockData";
import { SlidersHorizontal, ChevronDown, X, Fuel, Armchair } from "lucide-react";
import Image from "next/image";

export default function SearchPage() {
  // Mock Filters
  const [filters, setFilters] = useState({
    transmission: [] as string[],
    fuel: [] as string[],
    type: [] as string[],
  });

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-lime-400 selection:text-black">
      <Navbar />

      <div className="pt-32 pb-20 px-4 md:px-6 max-w-[1600px] mx-auto">
        
        {/* Header / Search Summary */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-8">
           <div>
              <p className="text-gray-400 text-sm mb-1">Results for</p>
              <h1 className="font-space text-3xl md:text-4xl font-bold">Bangalore, Indiranagar</h1>
              <p className="text-lime-400 text-sm font-bold mt-2">Oct 12, 10:00 AM <span className="text-gray-500 mx-2">•</span> Oct 13, 10:00 AM</p>
           </div>
           <button className="hidden md:flex items-center gap-2 bg-[#111] border border-white/10 px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">
              <SlidersHorizontal size={16} /> Filters
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* SIDEBAR FILTERS (Desktop) */}
           <div className="hidden lg:block lg:col-span-3 space-y-8 sticky top-32 h-fit">
              
              {/* Transmission */}
              <div>
                 <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Transmission</h3>
                 <div className="space-y-2">
                    {['Automatic', 'Manual'].map((type) => (
                       <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.transmission.includes(type) ? 'bg-lime-400 border-lime-400 text-black' : 'border-white/20 group-hover:border-white'}`}>
                             {filters.transmission.includes(type) && <X size={14} />}
                          </div>
                          <input type="checkbox" className="hidden" onChange={() => toggleFilter('transmission', type)} />
                          <span className="text-gray-400 group-hover:text-white text-sm">{type}</span>
                       </label>
                    ))}
                 </div>
              </div>

              {/* Fuel Type */}
              <div>
                 <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Fuel Type</h3>
                 <div className="space-y-2">
                    {['Petrol', 'Diesel', 'EV'].map((type) => (
                       <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.fuel.includes(type) ? 'bg-lime-400 border-lime-400 text-black' : 'border-white/20 group-hover:border-white'}`}>
                             {filters.fuel.includes(type) && <X size={14} />}
                          </div>
                          <input type="checkbox" className="hidden" onChange={() => toggleFilter('fuel', type)} />
                          <span className="text-gray-400 group-hover:text-white text-sm">{type}</span>
                       </label>
                    ))}
                 </div>
              </div>

               {/* Car Type */}
               <div>
                 <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Car Type</h3>
                 <div className="space-y-2">
                    {['Hatchback', 'Sedan', 'SUV'].map((type) => (
                       <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.type.includes(type) ? 'bg-lime-400 border-lime-400 text-black' : 'border-white/20 group-hover:border-white'}`}>
                             {filters.type.includes(type) && <X size={14} />}
                          </div>
                          <input type="checkbox" className="hidden" onChange={() => toggleFilter('type', type)} />
                          <span className="text-gray-400 group-hover:text-white text-sm">{type}</span>
                       </label>
                    ))}
                 </div>
              </div>

           </div>

           {/* CAR LIST */}
           <div className="lg:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {/* Reusing existing data, but in real app we filter based on state */}
                 {MOCK_CARS.map((car) => (
                    <SpotlightCard key={car.id} className="group border border-white/10 bg-[#0F0F11]">
                       <div className="p-5">
                          {/* Image */}
                          <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden border border-white/5">
                            <Image 
                              src={car.imageUrl} 
                              alt={car.modelName} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute bottom-2 left-2 flex gap-1">
                               <span className="bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold border border-white/10 text-white flex items-center gap-1">
                                  <Fuel size={10} className="text-lime-400" /> {car.fuelType}
                               </span>
                               <span className="bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold border border-white/10 text-white flex items-center gap-1">
                                  <Armchair size={10} className="text-lime-400" /> {car.seats} Seats
                               </span>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex justify-between items-start mb-4">
                             <div>
                                <h3 className="font-space text-lg font-bold text-white leading-tight">{car.modelName}</h3>
                                <p className="text-xs text-gray-500 mt-1">{car.transmission} • {car.type}</p>
                             </div>
                             <div className="text-right">
                                <p className="text-xl font-bold font-space text-lime-400">₹{car.basePricePerHour}</p>
                                <p className="text-[10px] text-gray-500 uppercase">Per Hour</p>
                             </div>
                          </div>

                          <a href={`/cars/${car.id}`} className="block w-full text-center bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm">
                             View Details
                          </a>
                       </div>
                    </SpotlightCard>
                 ))}
                 
                 {/* Duplicate Mock Data to fill the grid */}
                 {MOCK_CARS.map((car) => (
                    <SpotlightCard key={`${car.id}-dup`} className="group border border-white/10 bg-[#0F0F11]">
                       <div className="p-5">
                          <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden border border-white/5">
                            <Image src={car.imageUrl} alt={car.modelName} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="flex justify-between items-start mb-4">
                             <div>
                                <h3 className="font-space text-lg font-bold text-white leading-tight">{car.modelName}</h3>
                                <p className="text-xs text-gray-500 mt-1">{car.transmission} • {car.type}</p>
                             </div>
                             <div className="text-right">
                                <p className="text-xl font-bold font-space text-lime-400">₹{car.basePricePerHour}</p>
                                <p className="text-[10px] text-gray-500 uppercase">Per Hour</p>
                             </div>
                          </div>
                          <a href={`/cars/${car.id}`} className="block w-full text-center bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm">
                             View Details
                          </a>
                       </div>
                    </SpotlightCard>
                 ))}
              </div>
           </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}