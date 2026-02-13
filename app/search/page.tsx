"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useFleetConfig } from "@/lib/useFleetConfig";
import { calculateDistance, formatDuration } from "@/lib/distanceService";
import Image from "next/image";
import Link from "next/link";
import { Loader2, CalendarDays, ArrowRight, User, MapPin, Navigation, Route } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const { allCars, loading } = useFleetConfig();
  
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";
  const pickupCity = searchParams.get("pickupCity") || searchParams.get("city") || "";
  const pickupDistrict = searchParams.get("pickupDistrict") || searchParams.get("district") || "";
  const dropoffCity = searchParams.get("dropoffCity") || "";
  const dropoffDistrict = searchParams.get("dropoffDistrict") || "";

  const pickupLabel = pickupDistrict ? `${pickupCity}, ${pickupDistrict}` : pickupCity;
  const dropoffLabel = dropoffDistrict ? `${dropoffCity}, ${dropoffDistrict}` : dropoffCity;
  
  // Calculate distance
  const distanceInfo = useMemo(() => {
    if (!pickupCity || !dropoffCity) return null;
    return calculateDistance(pickupCity, dropoffCity);
  }, [pickupCity, dropoffCity]);

  const queryParams = new URLSearchParams({
    start, 
    end, 
    pickupCity, 
    pickupDistrict,
    dropoffCity,
    dropoffDistrict
  }).toString();

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:gap-6 mb-10 md:mb-16 border-b border-white/5 pb-6 md:pb-10">
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="h-px w-6 md:w-8 bg-amber-400"></span>
            <span className="text-amber-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]">
              Available Fleet
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-3 md:mb-4">
            Your Journey
          </h1>
        </div>

        {/* Route Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 bg-[#0a0a0a] p-4 md:p-6 border border-white/5">
          <div className="flex items-start gap-2 md:gap-3">
            <MapPin className="text-amber-400 shrink-0 mt-0.5 md:mt-1" size={16} />
            <div className="min-w-0">
              <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest block mb-0.5 md:mb-1">Pick-up</span>
              <span className="text-white font-serif text-base md:text-lg break-words">{pickupLabel || "Not specified"}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-2 md:gap-3">
            <Navigation className="text-emerald-400 shrink-0 mt-0.5 md:mt-1" size={16} />
            <div className="min-w-0">
              <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest block mb-0.5 md:mb-1">Drop-off</span>
              <span className="text-white font-serif text-base md:text-lg break-words">{dropoffLabel || "Not specified"}</span>
            </div>
          </div>

          {distanceInfo && (
            <div className="flex items-start gap-2 md:gap-3 sm:col-span-2 md:col-span-1">
              <Route className="text-blue-400 shrink-0 mt-0.5 md:mt-1" size={16} />
              <div>
                <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest block mb-0.5 md:mb-1">Est. Distance</span>
                <span className="text-white font-serif text-base md:text-lg">{distanceInfo.distanceKm} km</span>
                <span className="text-zinc-500 text-[10px] md:text-xs ml-2">({formatDuration(distanceInfo.durationMinutes)})</span>
              </div>
            </div>
          )}
        </div>

        {start && end && (
          <p className="text-zinc-500 text-xs md:text-sm font-sans flex items-center gap-2">
            <CalendarDays size={12} className="md:w-[14px] md:h-[14px]" /> 
            {new Date(start).toLocaleDateString()} — {new Date(end).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 md:py-32 gap-4">
          <Loader2 className="animate-spin text-amber-400" size={28} />
          <p className="text-zinc-500 font-serif text-[10px] md:text-xs uppercase tracking-widest">Consulting Garage...</p>
        </div>
      ) : (
        /* FLEET GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-8 md:gap-y-12">
          {allCars.map((car) => (
            <div key={car.id} className="group flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-amber-400/30 transition-all duration-500">
              
              {/* Image Area */}
              <div className="relative h-48 md:h-64 w-full overflow-hidden bg-[#080808]">
                <Image 
                  src={car.image} 
                  alt={car.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-black/60 backdrop-blur-md px-2 py-1 md:px-3 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 flex items-center gap-1">
                  <User size={9} className="text-amber-400 md:w-[10px] md:h-[10px]" /> With Chauffeur
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 md:p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <div>
                    <span className="text-zinc-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 md:mb-1 block">{car.brand}</span>
                    <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-amber-50 transition-colors">{car.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 border-t border-white/5 py-4 md:py-6 mb-4 md:mb-6">
                  <div>
                    <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-wider block mb-0.5 md:mb-1">Rate / Hour</span>
                    <span className="font-serif text-lg md:text-xl text-amber-400">₹{car.price_per_hr}</span>
                  </div>
                  <div>
                    <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-wider block mb-0.5 md:mb-1">Rate / KM</span>
                    <span className="font-serif text-lg md:text-xl text-zinc-400">₹{car.price_per_km}</span>
                  </div>
                </div>

                <Link 
                  href={`/book/${car.id}?${queryParams}`}
                  className="mt-auto w-full bg-white text-black h-10 md:h-12 flex items-center justify-between px-4 md:px-6 hover:bg-amber-400 transition-colors duration-300 group/btn"
                >
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em]">Select Vehicle</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform md:w-4 md:h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-amber-400" size={32} />
        </div>
      }>
        <SearchContent />
      </Suspense>
    </main>
  );
}
