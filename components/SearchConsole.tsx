"use client";
import { useState } from "react";
import { MapPin, ArrowRight, ChevronDown, Plane, Car } from "lucide-react";

export default function SearchConsole() {
  const [tab, setTab] = useState<'round' | 'airport'>('round');

  return (
    <div className="w-full max-w-md bg-[#111] border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
      
      {/* TABS */}
      <div className="flex bg-white/5 p-1 rounded-xl mb-6">
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
          <div className="relative bg-black border border-white/20 rounded-xl p-4 flex items-center gap-3 hover:border-lime-400 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400">
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              {/* High Contrast Text */}
              <div className="text-white font-space font-bold text-xl leading-none">Bangalore</div>
              <div className="text-gray-400 text-sm mt-1 font-medium">Select local area...</div>
            </div>
            <ChevronDown size={20} className="text-gray-500" />
          </div>
        </div>

        {/* DATE/TIME SPLIT */}
        <div className="grid grid-cols-2 gap-3">
          {/* Start */}
          <div className="bg-black border border-white/20 rounded-xl p-4 hover:border-white/40 transition-colors cursor-pointer">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-lime-400"></div>
                <span className="text-xs text-gray-400 font-bold uppercase">Start</span>
             </div>
             <div className="text-white font-space font-bold text-lg">Today</div>
             <div className="text-gray-400 text-sm font-mono font-medium">10:00 AM</div>
          </div>

          {/* End */}
          <div className="bg-black border border-white/20 rounded-xl p-4 hover:border-white/40 transition-colors cursor-pointer">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-xs text-gray-400 font-bold uppercase">End</span>
             </div>
             <div className="text-white font-space font-bold text-lg">Tomorrow</div>
             <div className="text-gray-400 text-sm font-mono font-medium">10:00 PM</div>
          </div>
        </div>

        {/* CTA BUTTON - VERY HIGH VISIBILITY */}
        <button className="w-full mt-4 bg-lime-400 hover:bg-lime-500 text-black h-16 rounded-xl font-bold text-xl uppercase tracking-wide flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg">
          Find Cars <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}