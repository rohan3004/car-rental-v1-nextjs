"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useFleetConfig } from "@/lib/useFleetConfig";
import Image from "next/image";
import Link from "next/link";
import { Loader2, MapPin, Calendar, UserCheck } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { allCars, loading } = useFleetConfig();
  
  // 1. Get ALL details from URL
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";
  const city = searchParams.get("city") || "West Bengal";
  const district = searchParams.get("district") || "";

  // 2. Format for Display
  const locationLabel = district ? `${city}, ${district}` : city;
  
  // 3. Create Query String for Next Step (Booking)
  const queryParams = new URLSearchParams({
    start,
    end,
    city,
    district
  }).toString();

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-lime-400 selection:text-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* HEADER: Shows the user's selection */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-8">
           <div>
              <div className="flex items-center gap-2 text-lime-400 font-bold uppercase tracking-widest text-xs mb-2">
                 <UserCheck size={14} /> Chauffeur Driven Fleet
              </div>
              <h1 className="font-space text-3xl md:text-4xl font-bold capitalize">
                 {locationLabel}
              </h1>
              {start && end && (
                 <p className="text-gray-400 text-sm font-medium mt-2 flex items-center gap-2">
                    <Calendar size={14} /> 
                    {new Date(start).toLocaleDateString()} - {new Date(end).toLocaleDateString()}
                 </p>
              )}
           </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <Loader2 className="animate-spin text-lime-400 mb-4" size={32} />
             <p className="text-gray-500">Locating available cars...</p>
          </div>
        ) : (
          /* CAR GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCars.map((car) => (
              <SpotlightCard key={car.id} className="border border-white/10 bg-[#0F0F11] group">
                 <div className="p-6">
                    {/* Image */}
                    <div className="relative h-52 w-full mb-6 rounded-xl overflow-hidden border border-white/5 bg-gray-900">
                       <Image 
                         src={car.image} 
                         alt={car.name} 
                         fill 
                         className="object-cover group-hover:scale-105 transition-transform duration-500" 
                       />
                       <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold border border-white/20 text-white flex items-center gap-1">
                          <UserCheck size={12} className="text-lime-400" /> Driver Included
                       </div>
                    </div>

                    {/* Details */}
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <h3 className="font-bold text-xl font-space">{car.name}</h3>
                          <p className="text-sm text-gray-400">{car.brand}</p>
                       </div>
                       <div className="text-right">
                          <p className="font-bold text-lime-400 text-xl">₹{car.price_per_hr}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Per Hour</p>
                       </div>
                    </div>

                    {/* Policies Mini-View */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                       <div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
                          <div className="text-[10px] text-gray-500 uppercase font-bold">Extra KM</div>
                          <div className="text-sm font-bold text-white">₹{car.price_per_km}/km</div>
                       </div>
                       <div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
                          <div className="text-[10px] text-gray-500 uppercase font-bold">Min Bill</div>
                          <div className="text-sm font-bold text-white">10 Hrs</div>
                       </div>
                    </div>

                    {/* LINK: Passes ALL params to Booking Page */}
                    <Link 
                      href={`/book/${car.id}?${queryParams}`}
                      className="block w-full bg-white text-black font-bold text-center py-4 rounded-xl hover:bg-lime-400 transition-colors uppercase tracking-wide text-sm"
                    >
                       Select Car
                    </Link>
                 </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}