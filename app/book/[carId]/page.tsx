"use client";

import { useState, use, Suspense } from "react"; // 1. Import Suspense
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import { useFleetConfig } from "@/lib/useFleetConfig";
import { useAuth } from "@/context/AuthContext"; 
import { 
  Info, MapPin, CheckCircle2, ArrowRight, Loader2, 
  UserCheck, ShieldCheck, Fuel, AlertCircle, CalendarClock, Lock 
} from "lucide-react";

// 2. Extract logic into BookingContent
function BookingContent({ carId }: { carId: string }) {
  const { allCars, config, loading } = useFleetConfig();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const city = searchParams.get("city");
  const district = searchParams.get("district");
  const urlStart = searchParams.get("start") || "";
  const urlEnd = searchParams.get("end") || "";

  const [start, setStart] = useState(urlStart);
  const [end, setEnd] = useState(urlEnd);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const location = city && district ? `${city}, ${district}` : (city || district || "");
  const car = allCars.find((c) => c.id === carId);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-amber-400" size={32} />
        <p className="text-zinc-500 font-serif tracking-widest uppercase text-xs">Retrieving Reservation...</p>
      </div>
    );
  }

  if (!config || !car || !location) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={48} className="text-red-900 mb-6 opacity-80" />
        <h1 className="text-3xl font-serif mb-2 text-white">Incomplete Itinerary</h1>
        <p className="text-zinc-500 mb-8 font-sans max-w-md">
          {(!car) ? "The vehicle ID is invalid." : "Please select a Pick-up Region and City before booking."}
        </p>
        <button onClick={() => router.push('/')} className="px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors">
          Return to Collection
        </button>
      </div>
    );
  }

  const calculateTotal = () => {
    if (!start || !end) return 0;
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    if (isNaN(s) || isNaN(e) || e <= s) return 0; 
    
    const diffHours = (e - s) / (1000 * 60 * 60);
    const minHours = config?.pricing_rules?.min_hours || 10;
    const billedHours = Math.max(diffHours, minHours);
    
    return billedHours * (car.price_per_hr || 0);
  };

  const total = calculateTotal();
  const duration = start && end ? ((new Date(end).getTime() - new Date(start).getTime()) / 36e5).toFixed(1) : 0;
  const isMinApplied = Number(duration) < (config?.pricing_rules?.min_hours || 10);

  const handleBookingRequest = async () => {
    if (user) {
        const token = await user.getIdToken();
        submitLead(token);
    } else {
        setAuthOpen(true);
    }
  };

  const submitLead = (token: string) => {
    console.log("Booking Confirmed!", { car: car.name, userToken: token, location, total });
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 border border-amber-400/50 rounded-full flex items-center justify-center mb-8 bg-amber-400/10">
           <CheckCircle2 size={40} className="text-amber-400" />
        </div>
        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-4 block">Request Received</span>
        <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white">Journey Initiated.</h1>
        <p className="text-zinc-400 max-w-lg text-lg leading-relaxed font-light mb-10">
           We have received your request for the <span className="text-white font-medium">{car.name}</span>. 
           Our concierge will contact <span className="text-white font-medium">{user?.phoneNumber}</span> shortly to finalize your chauffeur.
        </p>
        <button onClick={() => router.push('/')} className="px-10 py-4 bg-white text-black hover:bg-amber-400 transition-colors font-bold uppercase tracking-widest text-xs">
           Return Home
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* --- LEFT: Car Visuals & Policies --- */}
        <div className="lg:col-span-7 space-y-12">
           <div className="relative w-full aspect-[16/9] bg-[#0a0a0a] border border-white/5 group">
              <Image src={car.image} alt={car.name} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                 <span className="bg-black/80 backdrop-blur-md px-4 py-2 text-[10px] uppercase tracking-widest border border-white/10 text-white flex items-center gap-2 w-fit">
                    <UserCheck size={12} className="text-amber-400" /> Chauffeur Driven
                 </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-8 pt-24">
                 <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">{car.brand}</p>
                 <h1 className="text-5xl font-serif text-white">{car.name}</h1>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8 border-t border-b border-white/5 py-8">
              <div>
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Hourly Rate</p>
                 <div className="text-3xl font-serif text-white">₹{car.price_per_hr}</div>
                 <p className="text-xs text-zinc-600 mt-1">Base Rental Cost</p>
              </div>
              <div>
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Distance Rate</p>
                 <div className="text-3xl font-serif text-zinc-400">₹{car.price_per_km}</div>
                 <p className="text-xs text-zinc-600 mt-1">Per Kilometer</p>
              </div>
           </div>

           <div>
              <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-3">
                 <Info size={18} className="text-amber-400"/> Tariff Inclusions
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                 {config?.pricing_rules?.policies?.map((policy: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-zinc-400 leading-relaxed font-light">
                       <div className="w-1 h-1 rounded-full bg-amber-400 mt-2 shrink-0"></div>
                       {policy}
                    </li>
                 ))}
                 <li className="flex items-start gap-4 text-sm text-zinc-300 leading-relaxed bg-amber-900/10 p-4 border-l-2 border-amber-500">
                    <Fuel size={16} className="text-amber-500 mt-0.5 shrink-0"/> 
                    <span>Fuel is not included. <span className="text-amber-500 opacity-80">Guest pays as per usage (Level-to-Level).</span></span>
                 </li>
              </ul>
           </div>
        </div>

        {/* --- RIGHT: Booking Console --- */}
        <div className="lg:col-span-5">
           <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-10 sticky top-28 shadow-2xl">
              
              <div className="mb-8 pb-8 border-b border-white/5">
                 <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Reservation</span>
                 <h2 className="text-3xl font-serif text-white">Secure Your Ride</h2>
              </div>
              
              <div className="space-y-8 mb-10">
                 <div className="group opacity-80">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Pick-up Location</label>
                        <Lock size={12} className="text-zinc-600" />
                    </div>
                    <div className="flex items-center gap-4 text-zinc-300 border-b border-white/10 pb-3">
                       <MapPin className="text-amber-400 shrink-0" size={18} />
                       <span className="font-serif text-lg truncate select-none">{location}</span>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="group relative">
                       <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Start Date</label>
                       <div className="flex items-center border-b border-white/10 group-focus-within:border-amber-400/50 transition-colors pb-1">
                          <input 
                            type="datetime-local" 
                            value={start} 
                            onChange={e => setStart(e.target.value)} 
                            className="w-full bg-transparent text-white font-sans text-sm py-2 outline-none uppercase placeholder-zinc-700" 
                            style={{colorScheme: "dark"}} 
                          />
                          {!start && <CalendarClock className="absolute right-0 text-zinc-600 pointer-events-none" size={16}/>}
                       </div>
                    </div>

                    <div className="group relative">
                       <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">End Date</label>
                       <div className="flex items-center border-b border-white/10 group-focus-within:border-amber-400/50 transition-colors pb-1">
                          <input 
                            type="datetime-local" 
                            value={end} 
                            onChange={e => setEnd(e.target.value)} 
                            className="w-full bg-transparent text-white font-sans text-sm py-2 outline-none uppercase" 
                            style={{colorScheme: "dark"}} 
                          />
                          {!end && <CalendarClock className="absolute right-0 text-zinc-600 pointer-events-none" size={16}/>}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-[#050505] p-6 border border-white/5 mb-8">
                 {total > 0 ? (
                    <>
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-zinc-500 text-xs uppercase tracking-wider">Duration</span>
                          <span className="text-white font-bold">{duration} Hours</span>
                       </div>
                       
                       <div className="flex justify-between items-end border-t border-white/5 pt-4">
                          <div>
                             <span className="text-zinc-400 text-sm font-serif italic block mb-1">Estimated Total</span>
                             {isMinApplied && <span className="text-[10px] text-amber-500 uppercase tracking-wider">Min. Booking Applied</span>}
                          </div>
                          <span className="text-3xl font-serif text-white">₹{total.toLocaleString()}</span>
                       </div>
                    </>
                 ) : (
                    <div className="text-center py-4">
                       <span className="text-zinc-600 text-xs uppercase tracking-widest">Select dates to view estimate</span>
                    </div>
                 )}
              </div>

              <button 
                disabled={!start || !end || total <= 0}
                onClick={handleBookingRequest}
                className="w-full bg-white text-black h-14 hover:bg-amber-400 transition-all duration-300 flex items-center justify-between px-6 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 <span className="text-xs font-bold uppercase tracking-[0.25em]">Confirm Request</span>
                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-[10px] text-zinc-600 mt-6 uppercase tracking-widest">
                 Pay after service completion
              </p>
           </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setAuthOpen(false)} 
        onLoginSuccess={(token) => submitLead(token)} 
      />
    </>
  );
}

// 3. Export Page Wrapped in Suspense
export default function BookingPage({ params }: { params: Promise<{ carId: string }> }) {
  const { carId } = use(params);
  
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />
      <Suspense fallback={
         <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-amber-400" size={32} />
         </div>
      }>
        <BookingContent carId={carId} />
      </Suspense>
    </main>
  );
}