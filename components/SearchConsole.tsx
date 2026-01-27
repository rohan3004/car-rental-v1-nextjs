"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, ChevronDown, Plane, Car, Calendar, Clock } from "lucide-react";

export default function SearchConsole() {
  const router = useRouter();
  const [tab, setTab] = useState<'round' | 'airport'>('round');
  const [city, setCity] = useState("Bangalore");
  
  // Default: Start tomorrow, End day after tomorrow
  const [startDate, setStartDate] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 16));
  const [endDate, setEndDate] = useState(new Date(Date.now() + 172800000).toISOString().slice(0, 16));

  const handleSearch = () => {
    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      alert("Return time must be after Pickup time."); // Simple validation
      return;
    }

    // Navigate with Query Params
    const params = new URLSearchParams({
      city,
      type: tab,
      start: startDate,
      end: endDate
    });
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-md bg-[#111] border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-lime-400/50 blur-[20px] rounded-full"></div>

      {/* TABS */}
      <div className="flex bg-white/5 p-1 rounded-xl mb-6 border border-white/5">
        <button 
          onClick={() => setTab('round')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
            tab === 'round' ? 'bg-[#222] text-lime-400 border border-white/20 shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Car size={16} /> Round Trip
        </button>
        <button 
          onClick={() => setTab('airport')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
            tab === 'airport' ? 'bg-[#222] text-lime-400 border border-white/20 shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Plane size={16} /> Airport
        </button>
      </div>

      {/* LOCATION PICKER */}
      <div className="space-y-4">
        <div className="relative">
          <label className="text-xs text-gray-400 font-bold uppercase tracking-widest ml-1 mb-1 block">Pick Up City</label>
          <div className="relative bg-black border border-white/20 rounded-xl p-4 flex items-center gap-3 hover:border-lime-400 transition-colors cursor-pointer group/input">
            <div className="w-10 h-10 rounded-full bg-lime-400/10 flex items-center justify-center text-lime-400 group-hover/input:bg-lime-400 group-hover/input:text-black transition-colors">
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent text-white font-space font-bold text-xl outline-none appearance-none cursor-pointer"
              >
                <option value="Bangalore" className="bg-black text-gray-300">Bangalore</option>
                <option value="Mumbai" className="bg-black text-gray-300">Mumbai</option>
                <option value="Delhi" className="bg-black text-gray-300">Delhi</option>
              </select>
              <div className="text-gray-400 text-sm mt-1 font-medium pointer-events-none">Select City</div>
            </div>
            <ChevronDown size={20} className="text-gray-500" />
          </div>
        </div>

        {/* DATE/TIME SPLIT */}
        <div className="grid grid-cols-2 gap-3">
          {/* Start Date */}
          <div className="bg-black border border-white/20 rounded-xl p-4 hover:border-white/40 transition-colors relative">
             <div className="flex items-center gap-2 mb-2">
                <Calendar size={12} className="text-lime-400" />
                <span className="text-xs text-gray-400 font-bold uppercase">Start</span>
             </div>
             <input 
               type="datetime-local"
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
               className="w-full bg-transparent text-white font-space font-bold text-sm outline-none" 
               style={{ colorScheme: 'dark' }}
             />
          </div>

          {/* End Date */}
          <div className="bg-black border border-white/20 rounded-xl p-4 hover:border-white/40 transition-colors relative">
             <div className="flex items-center gap-2 mb-2">
                <Clock size={12} className="text-lime-400" />
                <span className="text-xs text-gray-400 font-bold uppercase">End</span>
             </div>
             <input 
               type="datetime-local"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
               className="w-full bg-transparent text-white font-space font-bold text-sm outline-none" 
               style={{ colorScheme: 'dark' }}
             />
          </div>
        </div>

        {/* CTA BUTTON */}
        <button 
          onClick={handleSearch}
          className="w-full mt-4 bg-lime-400 hover:bg-lime-500 text-black h-16 rounded-xl font-bold text-xl uppercase tracking-wide flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]"
        >
          Find Cars <ArrowRight size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}