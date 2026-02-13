"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, ChevronDown, AlertCircle, Navigation } from "lucide-react";
import { useFleetConfig } from "@/lib/useFleetConfig";
import { calculateDistance, formatDuration } from "@/lib/distanceService";

export default function SearchConsole() {
  const router = useRouter();
  const { districts, loading } = useFleetConfig();
  
  // Pickup
  const [pickupDistrict, setPickupDistrict] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  
  // Dropoff
  const [dropoffDistrict, setDropoffDistrict] = useState("");
  const [dropoffCity, setDropoffCity] = useState("");
  
  // Dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Error State
  const [error, setError] = useState("");

  const pickupCities = useMemo(() => {
    const district = districts.find(d => d.name === pickupDistrict);
    if (!district) return [];
    return [
      ...district.municipal_corporations,
      ...district.municipalities,
      ...district.census_towns,
      ...(district.other_urban_units || [])
    ].sort();
  }, [pickupDistrict, districts]);

  const dropoffCities = useMemo(() => {
    const district = districts.find(d => d.name === dropoffDistrict);
    if (!district) return [];
    return [
      ...district.municipal_corporations,
      ...district.municipalities,
      ...district.census_towns,
      ...(district.other_urban_units || [])
    ].sort();
  }, [dropoffDistrict, districts]);

  // Calculate distance preview
  const distanceInfo = useMemo(() => {
    if (!pickupCity || !dropoffCity) return null;
    return calculateDistance(pickupCity, dropoffCity);
  }, [pickupCity, dropoffCity]);

  const handleSearch = () => {
    setError("");

    if (!pickupDistrict) return setError("Please select a pickup region.");
    if (!pickupCity) return setError("Please select a pickup city.");
    if (!dropoffDistrict) return setError("Please select a drop-off region.");
    if (!dropoffCity) return setError("Please select a drop-off city.");
    if (!startDate || !endDate) return setError("Please select travel dates.");
    
    if (new Date(startDate) >= new Date(endDate)) {
      return setError("End date must be after start date.");
    }

    const params = new URLSearchParams({
      start: startDate,
      end: endDate,
      pickupCity,
      pickupDistrict,
      dropoffCity,
      dropoffDistrict
    });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full relative z-30">
      <div className="bg-white text-black shadow-2xl p-5 md:p-8 w-full max-w-xl mx-auto lg:ml-auto lg:mr-0 border-t-4 border-amber-500 relative">
        
        <div className="mb-5 md:mb-8">
          <h3 className="font-serif text-2xl md:text-4xl text-gray-900 tracking-tight mb-1 md:mb-2">Book Your Journey</h3>
          <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Premium Chauffeur Service</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          
          {/* PICKUP LOCATION */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-amber-600 uppercase tracking-widest">
              <MapPin size={11} /> Pick-up Location
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="group relative">
                <label className="block text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2">Region</label>
                <div className="relative border-b border-gray-200 group-focus-within:border-amber-500 transition-colors pb-1">
                  <select 
                    value={pickupDistrict}
                    onChange={(e) => {
                      setPickupDistrict(e.target.value);
                      setPickupCity("");
                      setError("");
                    }}
                    className="w-full bg-transparent text-sm md:text-base font-serif font-medium appearance-none outline-none cursor-pointer pr-4 py-1"
                  >
                    <option value="">Select</option>
                    {districts.map((d) => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="group relative">
                <label className="block text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2">City</label>
                <div className="relative border-b border-gray-200 group-focus-within:border-amber-500 transition-colors pb-1">
                  <select 
                    value={pickupCity}
                    onChange={(e) => {
                      setPickupCity(e.target.value);
                      setError("");
                    }}
                    disabled={!pickupDistrict}
                    className="w-full bg-transparent text-sm md:text-base font-serif font-medium appearance-none outline-none cursor-pointer pr-4 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <option value="">Select</option>
                    {pickupCities.map((c, i) => (
                      <option key={`${c}-${i}`} value={c}>{c}</option>
                    ))}
                  </select>
                  <MapPin className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* DROPOFF LOCATION */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              <Navigation size={11} /> Drop-off Location
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="group relative">
                <label className="block text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2">Region</label>
                <div className="relative border-b border-gray-200 group-focus-within:border-emerald-500 transition-colors pb-1">
                  <select 
                    value={dropoffDistrict}
                    onChange={(e) => {
                      setDropoffDistrict(e.target.value);
                      setDropoffCity("");
                      setError("");
                    }}
                    className="w-full bg-transparent text-sm md:text-base font-serif font-medium appearance-none outline-none cursor-pointer pr-4 py-1"
                  >
                    <option value="">Select</option>
                    {districts.map((d) => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="group relative">
                <label className="block text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2">City</label>
                <div className="relative border-b border-gray-200 group-focus-within:border-emerald-500 transition-colors pb-1">
                  <select 
                    value={dropoffCity}
                    onChange={(e) => {
                      setDropoffCity(e.target.value);
                      setError("");
                    }}
                    disabled={!dropoffDistrict}
                    className="w-full bg-transparent text-sm md:text-base font-serif font-medium appearance-none outline-none cursor-pointer pr-4 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <option value="">Select</option>
                    {dropoffCities.map((c, i) => (
                      <option key={`${c}-${i}`} value={c}>{c}</option>
                    ))}
                  </select>
                  <Navigation className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Distance Preview */}
          {distanceInfo && (
            <div className="bg-gray-50 p-3 md:p-4 border-l-2 border-amber-500">
              <div className="flex justify-between items-center">
                <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Est. Distance (one way)</span>
                <span className="font-serif text-base md:text-lg text-gray-900">{distanceInfo.distanceKm} km</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Est. Travel Time</span>
                <span className="text-xs md:text-sm text-gray-600">{formatDuration(distanceInfo.durationMinutes)}</span>
              </div>
            </div>
          )}

          {/* DATE PICKER GRID */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div className="group relative">
              <label className="block text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2 group-focus-within:text-amber-600 transition-colors">Start Date</label>
              <div className="relative border-b border-gray-200 group-focus-within:border-amber-500 transition-colors pb-1">
                <input 
                  type="datetime-local" 
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setError("");
                  }}
                  className="w-full bg-white text-xs md:text-sm font-sans font-semibold outline-none text-gray-900 py-1.5 md:py-2 cursor-pointer"
                />
              </div>
            </div>

            <div className="group relative">
              <label className="block text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2 group-focus-within:text-amber-600 transition-colors">End Date</label>
              <div className="relative border-b border-gray-200 group-focus-within:border-amber-500 transition-colors pb-1">
                <input 
                  type="datetime-local" 
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setError("");
                  }}
                  className="w-full bg-white text-xs md:text-sm font-sans font-semibold outline-none text-gray-900 py-1.5 md:py-2 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className={`transition-all duration-300 overflow-hidden ${error ? "max-h-12 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="flex items-center gap-2 text-red-600 text-[10px] md:text-xs font-bold uppercase tracking-wide bg-red-50 p-2.5 md:p-3 rounded-lg">
              <AlertCircle size={14} /> {error}
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleSearch} 
            className="w-full mt-1 md:mt-2 bg-gray-900 text-white h-12 md:h-16 hover:bg-black transition-all duration-300 flex items-center justify-between px-5 md:px-8 group shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.25em] uppercase text-amber-50 group-hover:text-white transition-colors">
              Find Your Fleet
            </span>
            <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-amber-500 group-hover:text-black transition-all">
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
