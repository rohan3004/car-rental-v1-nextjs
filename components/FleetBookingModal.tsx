"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { X, MapPin, CalendarDays, ArrowRight, AlertCircle, ChevronDown, Clock, Navigation, Route, Gauge, Moon } from "lucide-react";
import { useFleetConfig, Car } from "@/lib/useFleetConfig";
import { calculateDistance, formatDuration, calculatePricingEstimate } from "@/lib/distanceService";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FleetBookingModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function FleetBookingModal({ car, onClose }: FleetBookingModalProps) {
  const router = useRouter();
  const { districts, pricingRules } = useFleetConfig();
  
  const [pickupDistrict, setPickupDistrict] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [dropoffDistrict, setDropoffDistrict] = useState("");
  const [dropoffCity, setDropoffCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const pickupCities = useMemo(() => {
    const d = districts.find(item => item.name === pickupDistrict);
    if (!d) return [];
    return [...d.municipal_corporations, ...d.municipalities, ...d.census_towns, ...(d.other_urban_units || [])].sort();
  }, [pickupDistrict, districts]);

  const dropoffCities = useMemo(() => {
    const d = districts.find(item => item.name === dropoffDistrict);
    if (!d) return [];
    return [...d.municipal_corporations, ...d.municipalities, ...d.census_towns, ...(d.other_urban_units || [])].sort();
  }, [dropoffDistrict, districts]);

  const distanceInfo = useMemo(() => {
    if (!pickupCity || !dropoffCity) return null;
    return calculateDistance(pickupCity, dropoffCity);
  }, [pickupCity, dropoffCity]);

  const pricingEstimate = useMemo(() => {
    if (!car || !startDate || !endDate) return null;
    const nightConfig = pricingRules?.night_charges;
    return calculatePricingEstimate(
      startDate, endDate, distanceInfo?.distanceKm ?? null,
      car.price_per_hr || 0, car.price_per_km || 0,
      pricingRules?.min_hours || 10,
      pricingRules?.min_km || 100,
      nightConfig?.flat_rate || 300,
      nightConfig?.enabled ?? true,
      nightConfig?.start_hour || 22,
      nightConfig?.end_hour || 6
    );
  }, [startDate, endDate, distanceInfo, car, pricingRules]);

  const handleContinue = () => {
    if (!pickupDistrict || !pickupCity) return setError("Please select pickup location.");
    if (!dropoffDistrict || !dropoffCity) return setError("Please select drop-off location.");
    if (!startDate || !endDate) return setError("Please select travel dates.");
    if (new Date(startDate) >= new Date(endDate)) return setError("End date must be after start date.");
    
    const params = new URLSearchParams({ start: startDate, end: endDate, pickupCity, pickupDistrict, dropoffCity, dropoffDistrict });
    router.push(`/book/${car?.id}?${params.toString()}`);
  };

  return (
    <AnimatePresence>
      {car && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8 overflow-y-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col overflow-hidden my-auto max-h-[90vh]">
            <div className="relative h-24 md:h-28 bg-[#050505] border-b border-white/5 p-4 md:p-6 flex justify-between items-start shrink-0">
              <div>
                <p className="text-amber-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1">Selected Vehicle</p>
                <h3 className="font-serif text-xl md:text-2xl text-white">{car.name}</h3>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X size={22} strokeWidth={1} /></button>
              <div className="absolute -bottom-4 right-4 w-28 h-16 md:w-32 md:h-20 pointer-events-none">
                <Image src={car.image} alt={car.name} fill className="object-contain" />
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-5 overflow-y-auto flex-1">
              <div className="space-y-1">
                <h4 className="font-serif text-lg md:text-xl text-white">Trip Details</h4>
                <p className="text-zinc-500 text-[10px] md:text-xs">Enter your itinerary to check availability.</p>
              </div>

              {/* Pickup */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-amber-500 uppercase tracking-widest"><MapPin size={11} /> Pick-up Location</div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="group relative">
                    <label className="block text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 md:mb-2">Region</label>
                    <div className="relative border-b border-white/10 group-hover:border-amber-400/50 transition-colors">
                      <select value={pickupDistrict} onChange={e => { setPickupDistrict(e.target.value); setPickupCity(""); setError(""); }} className="w-full bg-transparent text-white font-serif text-xs md:text-sm py-1.5 md:py-2 appearance-none outline-none cursor-pointer">
                        <option value="" className="bg-[#0a0a0a] text-zinc-500">Select</option>
                        {districts.map(d => <option key={d.name} value={d.name} className="bg-[#0a0a0a]">{d.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={12}/>
                    </div>
                  </div>
                  <div className="group relative">
                    <label className="block text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 md:mb-2">City</label>
                    <div className="relative border-b border-white/10 group-hover:border-amber-400/50 transition-colors">
                      <select value={pickupCity} onChange={e => { setPickupCity(e.target.value); setError(""); }} disabled={!pickupDistrict} className="w-full bg-transparent text-white font-serif text-xs md:text-sm py-1.5 md:py-2 appearance-none outline-none cursor-pointer disabled:opacity-30">
                        <option value="" className="bg-[#0a0a0a] text-zinc-500">Select</option>
                        {pickupCities.map((c, i) => <option key={`${c}-${i}`} value={c} className="bg-[#0a0a0a]">{c}</option>)}
                      </select>
                      <MapPin className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={12}/>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dropoff */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-emerald-500 uppercase tracking-widest"><Navigation size={11} /> Drop-off Location</div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="group relative">
                    <label className="block text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 md:mb-2">Region</label>
                    <div className="relative border-b border-white/10 group-hover:border-emerald-400/50 transition-colors">
                      <select value={dropoffDistrict} onChange={e => { setDropoffDistrict(e.target.value); setDropoffCity(""); setError(""); }} className="w-full bg-transparent text-white font-serif text-xs md:text-sm py-1.5 md:py-2 appearance-none outline-none cursor-pointer">
                        <option value="" className="bg-[#0a0a0a] text-zinc-500">Select</option>
                        {districts.map(d => <option key={d.name} value={d.name} className="bg-[#0a0a0a]">{d.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={12}/>
                    </div>
                  </div>
                  <div className="group relative">
                    <label className="block text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 md:mb-2">City</label>
                    <div className="relative border-b border-white/10 group-hover:border-emerald-400/50 transition-colors">
                      <select value={dropoffCity} onChange={e => { setDropoffCity(e.target.value); setError(""); }} disabled={!dropoffDistrict} className="w-full bg-transparent text-white font-serif text-xs md:text-sm py-1.5 md:py-2 appearance-none outline-none cursor-pointer disabled:opacity-30">
                        <option value="" className="bg-[#0a0a0a] text-zinc-500">Select</option>
                        {dropoffCities.map((c, i) => <option key={`${c}-${i}`} value={c} className="bg-[#0a0a0a]">{c}</option>)}
                      </select>
                      <Navigation className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={12}/>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distance Preview */}
              {distanceInfo && (
                <div className="bg-[#050505] p-3 md:p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2"><Route size={14} className="text-blue-400" /><span className="text-zinc-400 text-xs md:text-sm">Est. Distance (one way)</span></div>
                  <div className="text-left sm:text-right"><span className="text-white font-serif text-sm md:text-base">{distanceInfo.distanceKm} km</span><span className="text-zinc-500 text-[10px] md:text-xs ml-2">({formatDuration(distanceInfo.durationMinutes)})</span></div>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="group relative">
                  <label className="block text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 md:mb-2">Start Date</label>
                  <div className="relative border-b border-white/10 group-hover:border-amber-400/50 transition-colors flex items-center">
                    <input type="datetime-local" value={startDate} onChange={e => { setStartDate(e.target.value); setError(""); }} className="w-full bg-transparent text-white font-sans text-xs md:text-sm py-1.5 md:py-2 outline-none" style={{colorScheme: 'dark'}} />
                    {!startDate && <CalendarDays className="absolute right-0 text-zinc-600 pointer-events-none" size={12}/>}
                  </div>
                </div>
                <div className="group relative">
                  <label className="block text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 md:mb-2">End Date</label>
                  <div className="relative border-b border-white/10 group-hover:border-amber-400/50 transition-colors flex items-center">
                    <input type="datetime-local" value={endDate} onChange={e => { setEndDate(e.target.value); setError(""); }} className="w-full bg-transparent text-white font-sans text-xs md:text-sm py-1.5 md:py-2 outline-none" style={{colorScheme: 'dark'}} />
                    {!endDate && <Clock className="absolute right-0 text-zinc-600 pointer-events-none" size={12}/>}
                  </div>
                </div>
              </div>

              {/* Pricing Estimate */}
              {pricingEstimate && (
                <div className="bg-[#050505] p-3 md:p-4 border border-white/5 space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-zinc-500">Hourly ({pricingEstimate.hours}h)</span>
                    <span className={pricingEstimate.billingType === 'hourly' ? 'text-amber-400 font-bold' : 'text-zinc-500'}>₹{pricingEstimate.hourlyTotal.toLocaleString()}</span>
                  </div>
                  {pricingEstimate.hasDistanceData && pricingEstimate.distanceTotal !== null && (
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-zinc-500">Distance ({pricingEstimate.distance}km)</span>
                      <span className={pricingEstimate.billingType === 'distance' ? 'text-amber-400 font-bold' : 'text-zinc-500'}>₹{pricingEstimate.distanceTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {pricingEstimate.hasNightHours && (
                    <div className="flex justify-between items-center text-xs md:text-sm bg-purple-900/20 -mx-3 md:-mx-4 px-3 md:px-4 py-1.5 md:py-2">
                      <div className="flex items-center gap-1.5 md:gap-2"><Moon size={11} className="text-purple-400" /><span className="text-purple-300">Night Charges</span></div>
                      <span className="text-purple-300">+₹{pricingEstimate.nightCharges}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-white/5">
                    <span className="text-white font-serif text-sm md:text-base">Total Estimate</span>
                    <span className="text-lg md:text-xl font-serif text-amber-400">₹{pricingEstimate.finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-[10px] md:text-xs font-bold uppercase tracking-wide bg-red-900/10 p-2.5 md:p-3 border border-red-900/20">
                  <AlertCircle size={12} /> {error}
                </div>
              )}

              <button onClick={handleContinue} className="w-full bg-white text-black h-10 md:h-12 hover:bg-amber-400 transition-colors duration-300 flex items-center justify-between px-4 md:px-6 group">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]">Continue Booking</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform md:w-4 md:h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
