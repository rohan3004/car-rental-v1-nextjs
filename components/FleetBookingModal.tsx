"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { X, MapPin, CalendarDays, ArrowRight, AlertCircle, ChevronDown, Clock } from "lucide-react";
import { useFleetConfig, Car } from "@/lib/useFleetConfig";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FleetBookingModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function FleetBookingModal({ car, onClose }: FleetBookingModalProps) {
  const router = useRouter();
  const { districts } = useFleetConfig();
  
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const availableCities = useMemo(() => {
    const d = districts.find(item => item.name === district);
    if (!d) return [];
    return [
      ...d.municipal_corporations,
      ...d.municipalities,
      ...d.census_towns,
      ...(d.other_urban_units || [])
    ].sort();
  }, [district, districts]);

  const handleContinue = () => {
    if (!district || !city || !startDate || !endDate) {
      setError("Please complete all fields to proceed.");
      return;
    }
    
    // Construct URL Params
    const params = new URLSearchParams({
      start: startDate,
      end: endDate,
      city: city,
      district: district
    });

    // Navigate to Booking Page with data
    router.push(`/book/${car?.id}?${params.toString()}`);
  };

  return (
    <AnimatePresence>
      {car && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header / Car Preview */}
            <div className="relative h-32 bg-[#050505] border-b border-white/5 p-6 flex justify-between items-start">
               <div>
                  <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-1">Selected Vehicle</p>
                  <h3 className="font-serif text-2xl text-white">{car.name}</h3>
               </div>
               <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={24} strokeWidth={1} />
               </button>
               
               {/* Car Image Overlap */}
               <div className="absolute -bottom-4 right-4 w-32 h-20 pointer-events-none">
                  <Image src={car.image} alt={car.name} fill className="object-contain" />
               </div>
            </div>

            <div className="p-8 space-y-6">
               <div className="space-y-1">
                  <h4 className="font-serif text-xl text-white">Trip Details</h4>
                  <p className="text-zinc-500 text-xs">Enter your itinerary to check availability.</p>
               </div>

               {/* Form Grid */}
               <div className="grid grid-cols-2 gap-5">
                  {/* District */}
                  <div className="group relative">
                     <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Region</label>
                     <div className="relative border-b border-white/10 group-hover:border-amber-400/50 transition-colors">
                        <select 
                           value={district} 
                           onChange={e => { setDistrict(e.target.value); setCity(""); }}
                           className="w-full bg-transparent text-white font-serif text-base py-2 appearance-none outline-none cursor-pointer"
                        >
                           <option value="" className="bg-[#0a0a0a] text-zinc-500">Select Region</option>
                           {districts.map(d => (
                              <option key={d.name} value={d.name} className="bg-[#0a0a0a]">{d.name}</option>
                           ))}
                        </select>
                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={14}/>
                     </div>
                  </div>

                  {/* City */}
                  <div className="group relative">
                     <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Pick-up City</label>
                     <div className="relative border-b border-white/10 group-hover:border-amber-400/50 transition-colors">
                        <select 
                           value={city} 
                           onChange={e => setCity(e.target.value)}
                           disabled={!district}
                           className="w-full bg-transparent text-white font-serif text-base py-2 appearance-none outline-none cursor-pointer disabled:opacity-30"
                        >
                           <option value="" className="bg-[#0a0a0a] text-zinc-500">Select City</option>
                           {availableCities.map(c => (
                              <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>
                           ))}
                        </select>
                        <MapPin className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={14}/>
                     </div>
                  </div>

                  {/* Start Date */}
                  <div className="group relative col-span-1">
                     <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Start Date</label>
                     <div className="relative border-b border-white/10 group-hover:border-amber-400/50 transition-colors flex items-center">
                        <input 
                           type="datetime-local" 
                           value={startDate} 
                           onChange={e => setStartDate(e.target.value)}
                           className="w-full bg-transparent text-white font-sans text-sm py-2 outline-none uppercase"
                           style={{colorScheme: 'dark'}}
                        />
                        {!startDate && <CalendarDays className="absolute right-0 text-zinc-600 pointer-events-none" size={14}/>}
                     </div>
                  </div>

                  {/* End Date */}
                  <div className="group relative col-span-1">
                     <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">End Date</label>
                     <div className="relative border-b border-white/10 group-hover:border-amber-400/50 transition-colors flex items-center">
                        <input 
                           type="datetime-local" 
                           value={endDate} 
                           onChange={e => setEndDate(e.target.value)}
                           className="w-full bg-transparent text-white font-sans text-sm py-2 outline-none uppercase"
                           style={{colorScheme: 'dark'}}
                        />
                        {!endDate && <Clock className="absolute right-0 text-zinc-600 pointer-events-none" size={14}/>}
                     </div>
                  </div>
               </div>
               
               {/* Error Message */}
               {error && (
                  <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wide bg-red-900/10 p-3 border border-red-900/20">
                     <AlertCircle size={14} /> {error}
                  </div>
               )}

               {/* Action */}
               <button 
                  onClick={handleContinue}
                  className="w-full bg-white text-black h-12 hover:bg-amber-400 transition-colors duration-300 flex items-center justify-between px-6 group mt-4"
               >
                  <span className="text-xs font-bold uppercase tracking-[0.25em]">Continue Booking</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}