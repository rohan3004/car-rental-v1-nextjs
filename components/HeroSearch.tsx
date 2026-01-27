// components/HeroSearch.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // npm install framer-motion
import { Calendar, MapPin, Search } from "lucide-react";

export default function HeroSearch() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative z-20 w-full max-w-4xl mx-auto mt-10">
      {/* Glow Effect behind search */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-25 transition duration-1000 group-hover:opacity-100 ${isFocused ? 'opacity-75' : ''}`}></div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-brand-black/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 items-center"
      >
        
        {/* Location Input (Fake for now as we are 1 city) */}
        <div className="relative group flex-1 w-full bg-white/5 rounded-xl hover:bg-white/10 transition-colors p-4 cursor-pointer">
          <label className="text-xs text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1">
            <MapPin size={12} /> City
          </label>
          <div className="text-white font-semibold text-lg mt-1">Bengaluru</div>
          <p className="text-xs text-gray-500">Service currently in Indiranagar</p>
        </div>

        {/* Date Selector */}
        <div 
          className="relative group flex-1 w-full bg-white/5 rounded-xl hover:bg-white/10 transition-colors p-4 cursor-pointer"
          onClick={() => setIsFocused(true)}
        >
          <label className="text-xs text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1">
            <Calendar size={12} /> Pick-up Date
          </label>
          <input 
            type="datetime-local" 
            className="w-full bg-transparent text-white font-semibold text-lg mt-1 outline-none border-none p-0 focus:ring-0 appearance-none dark-calendar"
          />
        </div>

        {/* Action Button */}
        <button className="w-full md:w-auto h-20 md:h-full px-8 bg-brand-accent hover:bg-brand-accentHover text-white rounded-xl font-bold text-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
          <Search size={24} />
          <span>Find</span>
        </button>

      </motion.div>
    </div>
  );
}