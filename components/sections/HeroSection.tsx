"use client";

import { Star, UserCheck, ShieldCheck } from "lucide-react";
import SearchConsole from "@/components/SearchConsole";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-6 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime-400/10 border border-lime-400/30 rounded-full text-lime-400 text-sm font-bold uppercase tracking-widest mb-2">
            <Star size={14} /> Premium Car Rentals
          </div>
          
          <h1 className="font-space text-5xl md:text-7xl font-black leading-[1.0] tracking-tight text-white">
            RELAX. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
              WE DRIVE.
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 max-w-xl leading-relaxed font-medium">
            Explore West Bengal with our professionally managed fleet. 
            Experienced chauffeurs, sanitized cars, and transparent pricing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4 text-base font-semibold text-gray-200">
            <span className="flex items-center gap-2"><UserCheck size={20} className="text-lime-400"/> Professional Drivers</span>
            <span className="flex items-center gap-2"><ShieldCheck size={20} className="text-lime-400"/> Safe & Sanitized</span>
          </div>
        </div>

        <div className="lg:col-span-5 relative z-20 flex justify-center lg:justify-end">
           <SearchConsole />
        </div>
      </div>
    </section>
  );
}