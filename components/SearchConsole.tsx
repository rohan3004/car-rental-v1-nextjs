"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, ChevronDown, Calendar, UserCheck } from "lucide-react";
import { useFleetConfig } from "@/lib/useFleetConfig";

export default function SearchConsole() {
  const router = useRouter();
  const { districts, loading } = useFleetConfig();
  
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Logic to get cities based on selected District
  const availableCities = useMemo(() => {
    const district = districts.find(d => d.name === selectedDistrict);
    if (!district) return [];
    
    // Merge all urban unit types into one list
    const allUnits = [
      ...district.municipal_corporations,
      ...district.municipalities,
      ...district.census_towns,
      ...(district.other_urban_units || [])
    ];
    
    // Sort alphabetically
    return allUnits.sort();
  }, [selectedDistrict, districts]);

  const handleSearch = () => {
    if (!startDate || !endDate) return alert("Please select dates");
    if (!selectedCity) return alert("Please select a city");
    
    router.push(`/search?start=${startDate}&end=${endDate}&city=${selectedCity}&district=${selectedDistrict}`);
  };

  return (
    <div className="w-full max-w-md bg-[#111] border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      
      {/* Badge */}
      <div className="absolute top-4 right-4 bg-lime-400 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
        <UserCheck size={12} /> Chauffeur Driven
      </div>

      <div className="space-y-4 mt-2">
        
        {/* DISTRICT SELECTOR */}
        <div className="relative">
          <label className="text-xs text-gray-400 font-bold uppercase tracking-widest ml-1 mb-1 block">Select District</label>
          <div className="relative bg-black border border-white/20 rounded-xl p-3 flex items-center gap-3 hover:border-lime-400 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-lime-400/10 flex items-center justify-center text-lime-400">
              <MapPin size={16} />
            </div>
            <div className="flex-1">
               <select 
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedCity(""); // Reset city when district changes
                  }}
                  className="w-full bg-transparent text-white font-bold text-sm outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="bg-black text-gray-500">Select District</option>
                  {districts.map((d) => (
                    <option key={d.name} value={d.name} className="bg-black text-white">{d.name}</option>
                  ))}
                </select>
            </div>
            <ChevronDown size={16} className="text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* CITY SELECTOR (Disabled until District selected) */}
        <div className={`relative ${!selectedDistrict ? 'opacity-50 pointer-events-none' : ''}`}>
          <label className="text-xs text-gray-400 font-bold uppercase tracking-widest ml-1 mb-1 block">Pick Up Point</label>
          <div className="relative bg-black border border-white/20 rounded-xl p-3 flex items-center gap-3 hover:border-lime-400 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-lime-400/10 flex items-center justify-center text-lime-400">
              <MapPin size={16} />
            </div>
            <div className="flex-1">
               <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedDistrict}
                  className="w-full bg-transparent text-white font-bold text-lg outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="bg-black text-gray-500">Select City / Area</option>
                  {availableCities.map((c) => (
                    <option key={c} value={c} className="bg-black text-white">{c}</option>
                  ))}
                </select>
            </div>
            <ChevronDown size={16} className="text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* DATES */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black border border-white/20 rounded-xl p-3">
             <div className="flex items-center gap-2 mb-1"><Calendar size={12} className="text-lime-400" /><span className="text-[10px] text-gray-400 font-bold uppercase">Start Date</span></div>
             <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-transparent text-white font-bold text-xs outline-none" style={{ colorScheme: 'dark' }} />
          </div>
          <div className="bg-black border border-white/20 rounded-xl p-3">
             <div className="flex items-center gap-2 mb-1"><Calendar size={12} className="text-lime-400" /><span className="text-[10px] text-gray-400 font-bold uppercase">End Date</span></div>
             <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-transparent text-white font-bold text-xs outline-none" style={{ colorScheme: 'dark' }} />
          </div>
        </div>

        <button onClick={handleSearch} className="w-full mt-2 bg-lime-400 hover:bg-lime-500 text-black h-14 rounded-xl font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]">
          Search Fleet <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}