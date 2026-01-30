"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useFleetConfig } from "@/lib/useFleetConfig";
import Image from "next/image";
import Link from "next/link";
import { Loader2, CalendarDays, ArrowRight, User } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { allCars, loading } = useFleetConfig();
  
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";
  const city = searchParams.get("city") || "West Bengal";
  const district = searchParams.get("district") || "";

  const locationLabel = district ? `${city}, ${district}` : city;
  
  const queryParams = new URLSearchParams({
    start, end, city, district
  }).toString();

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/5 pb-10">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <span className="h-px w-8 bg-amber-400"></span>
                 <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em]">
                    Available Fleet
                 </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-2 capitalize">
                 {locationLabel}
              </h1>
              {start && end && (
                 <p className="text-zinc-500 text-sm font-sans flex items-center gap-2 mt-2">
                    <CalendarDays size={14} /> 
                    {new Date(start).toLocaleDateString()} — {new Date(end).toLocaleDateString()}
                 </p>
              )}
           </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
             <Loader2 className="animate-spin text-amber-400" size={32} />
             <p className="text-zinc-500 font-serif text-xs uppercase tracking-widest">Consulting Garage...</p>
          </div>
        ) : (
          /* FLEET GRID - Minimalist Card Style */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {allCars.map((car) => (
              <div key={car.id} className="group flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-amber-400/30 transition-all duration-500">
                 
                 {/* Image Area */}
                 <div className="relative h-64 w-full overflow-hidden bg-[#080808]">
                    <Image 
                      src={car.image} 
                      alt={car.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 flex items-center gap-1">
                       <User size={10} className="text-amber-400" /> With Chauffeur
                    </div>
                 </div>

                 {/* Content Area */}
                 <div className="p-8 flex flex-col flex-1">
                    
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1 block">{car.brand}</span>
                          <h3 className="font-serif text-2xl text-white group-hover:text-amber-50 transition-colors">{car.name}</h3>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 py-6 mb-6">
                       <div>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Rate / Hour</span>
                          <span className="font-serif text-xl text-amber-400">₹{car.price_per_hr}</span>
                       </div>
                       <div>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Extra KM</span>
                          <span className="font-serif text-xl text-zinc-400">₹{car.price_per_km}</span>
                       </div>
                    </div>

                    <Link 
                      href={`/book/${car.id}?${queryParams}`}
                      className="mt-auto w-full bg-white text-black h-12 flex items-center justify-between px-6 hover:bg-amber-400 transition-colors duration-300 group/btn"
                    >
                       <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Select Vehicle</span>
                       <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}