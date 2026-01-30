"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, ChevronDown, CalendarDays, Clock, AlertCircle } from "lucide-react";
import { useFleetConfig } from "@/lib/useFleetConfig";

export default function SearchConsole() {
  const router = useRouter();
  const { districts, loading } = useFleetConfig();
  
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Custom Error State (No Browser Alerts)
  const [error, setError] = useState("");

  const availableCities = useMemo(() => {
    const district = districts.find(d => d.name === selectedDistrict);
    if (!district) return [];
    
    return [
      ...district.municipal_corporations,
      ...district.municipalities,
      ...district.census_towns,
      ...(district.other_urban_units || [])
    ].sort();
  }, [selectedDistrict, districts]);

  const handleSearch = () => {
    setError(""); // Clear previous errors

    if (!selectedDistrict) return setError("Please select a region.");
    if (!selectedCity) return setError("Please select a pick-up city.");
    if (!startDate || !endDate) return setError("Please select travel dates.");
    
    // Basic date validation
    if (new Date(startDate) >= new Date(endDate)) {
        return setError("End date must be after start date.");
    }

    router.push(`/search?start=${startDate}&end=${endDate}&city=${selectedCity}&district=${selectedDistrict}`);
  };

  return (
    <div className="w-full relative z-30">
      {/* Royal Card: Solid White, Amber Accent, Sharp Corners */}
      <div className="bg-white text-black shadow-2xl p-8 w-full max-w-xl mx-auto lg:ml-auto lg:mr-0 border-t-4 border-amber-500 relative">
        
        <div className="mb-8">
           <h3 className="font-serif text-4xl text-gray-900 tracking-tight mb-2">Book Your Journey</h3>
           <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Premium Chauffeur Service</p>
        </div>

        <div className="space-y-6">
          
          {/* LOCATION GRID */}
          <div className="grid grid-cols-2 gap-6">
            <div className="group relative">
               <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-amber-600 transition-colors">Region</label>
               <div className="relative border-b border-gray-200 group-focus-within:border-amber-500 transition-colors pb-1">
                 <select 
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedCity("");
                      setError("");
                    }}
                    className="w-full bg-transparent text-lg font-serif font-medium appearance-none outline-none cursor-pointer pr-4 py-1"
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
               </div>
            </div>

            <div className="group relative">
               <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-amber-600 transition-colors">Pick-up City</label>
               <div className="relative border-b border-gray-200 group-focus-within:border-amber-500 transition-colors pb-1">
                 <select 
                    value={selectedCity}
                    onChange={(e) => {
                        setSelectedCity(e.target.value);
                        setError("");
                    }}
                    disabled={!selectedDistrict}
                    className="w-full bg-transparent text-lg font-serif font-medium appearance-none outline-none cursor-pointer pr-4 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <option value="">Select City</option>
                    {availableCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <MapPin className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
               </div>
            </div>
          </div>

          {/* DATE PICKER GRID */}
          <div className="grid grid-cols-2 gap-6">
             <div className="group relative">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-amber-600 transition-colors">Start Date</label>
                <div className="relative border-b border-gray-200 group-focus-within:border-amber-500 transition-colors pb-1 flex items-center">
                   <input 
                     type="datetime-local" 
                     value={startDate}
                     onChange={(e) => {
                         setStartDate(e.target.value);
                         setError("");
                     }}
                     className="w-full bg-transparent text-sm font-sans font-semibold appearance-none outline-none uppercase text-gray-900 placeholder-transparent py-2"
                     style={{ colorScheme: 'light' }}
                   />
                   {!startDate && <span className="absolute left-0 text-gray-300 text-lg font-serif pointer-events-none italic">Select Date</span>}
                </div>
             </div>

             <div className="group relative">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-amber-600 transition-colors">End Date</label>
                <div className="relative border-b border-gray-200 group-focus-within:border-amber-500 transition-colors pb-1 flex items-center">
                   <input 
                     type="datetime-local" 
                     value={endDate}
                     onChange={(e) => {
                         setEndDate(e.target.value);
                         setError("");
                     }}
                     className="w-full bg-transparent text-sm font-sans font-semibold appearance-none outline-none uppercase text-gray-900 py-2"
                     style={{ colorScheme: 'light' }}
                   />
                   {!endDate && <span className="absolute left-0 text-gray-300 text-lg font-serif pointer-events-none italic">Select Date</span>}
                </div>
             </div>
          </div>

          {/* Error Message (Replaces Alert) */}
          <div className={`transition-all duration-300 overflow-hidden ${error ? "max-h-12 opacity-100" : "max-h-0 opacity-0"}`}>
             <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wide bg-red-50 p-3 rounded-lg">
                <AlertCircle size={16} /> {error}
             </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleSearch} 
            className="w-full mt-2 bg-gray-900 text-white h-16 hover:bg-black transition-all duration-300 flex items-center justify-between px-8 group shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <span className="font-sans text-xs font-bold tracking-[0.25em] uppercase text-amber-50 group-hover:text-white transition-colors">
              Find Your Fleet
            </span>
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-amber-500 group-hover:text-black transition-all">
                <ArrowRight className="w-5 h-5" />
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}