"use client";

import { Star, Shield, Gem } from "lucide-react";
import SearchConsole from "@/components/SearchConsole";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 md:pt-0 px-6 overflow-hidden bg-[#0a0a0a]">
      
      {/* Minimal Background Elements - Subtle Gradient */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#111] to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Content - Typography Focused */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Premium Tag */}
          <div className="inline-flex items-center gap-3 border-l-2 border-amber-400 pl-4">
             <span className="text-amber-400/80 font-serif italic text-lg">Est. 2024</span>
             <span className="h-px w-8 bg-zinc-800"></span>
             <span className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">West Bengal's Finest</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif leading-[0.9]">
            <span className="block text-zinc-400">The Art of</span>
            <span className="block italic text-amber-100">Being Driven.</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg text-zinc-400 max-w-md font-light leading-relaxed border-l border-zinc-800 pl-6 py-2">
            Experience the luxury of professional chauffeur services. 
            Impeccable fleet, verified drivers, and transparent pricing across West Bengal.
          </p>

          {/* Minimal Trust Indicators */}
          <div className="flex gap-8 md:gap-12 pt-4">
             <div className="group">
                <Shield className="text-amber-400/60 mb-3 group-hover:text-amber-400 transition-colors" size={24} strokeWidth={1} />
                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Secure</h4>
                <p className="text-zinc-500 text-xs">Verified Chauffeurs</p>
             </div>
             <div className="group">
                <Gem className="text-amber-400/60 mb-3 group-hover:text-amber-400 transition-colors" size={24} strokeWidth={1} />
                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Premium</h4>
                <p className="text-zinc-500 text-xs">Top-tier Fleet</p>
             </div>
             <div className="group">
                <Star className="text-amber-400/60 mb-3 group-hover:text-amber-400 transition-colors" size={24} strokeWidth={1} />
                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Reliable</h4>
                <p className="text-zinc-500 text-xs">Always on time</p>
             </div>
          </div>
        </div>

        {/* Right Content - The Floating Console */}
        <div className="lg:col-span-5">
           <SearchConsole />
        </div>
      </div>
    </section>
  );
}