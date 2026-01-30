"use client";

import { useState, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import { useFleetConfig } from "@/lib/useFleetConfig";
import { useAuth } from "@/context/AuthContext"; // <--- INTEGRATED AUTH CONTEXT
import { 
  Info, MapPin, CheckCircle2, ArrowRight, Loader2, 
  UserCheck, ShieldCheck, Fuel, AlertCircle 
} from "lucide-react";

export default function BookingPage({ params }: { params: Promise<{ carId: string }> }) {
  // 1. Unwrap Params
  const { carId } = use(params);

  // 2. Global State & Config
  const { allCars, config, loading } = useFleetConfig();
  const { user } = useAuth(); // <--- Check Global Login State
  const searchParams = useSearchParams();
  const router = useRouter();

  // 3. Local State
  const [start, setStart] = useState(searchParams.get("start") || "");
  const [end, setEnd] = useState(searchParams.get("end") || "");
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  // Parse Location
  const city = searchParams.get("city") || "";
  const district = searchParams.get("district") || "";
  const initialLocation = city && district ? `${city}, ${district}` : (city || "West Bengal");
  const [location] = useState(initialLocation);

  // 4. Find Car
  const car = allCars.find((c) => c.id === carId);

  // 5. Loading / Error UI
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-lime-400 mb-4" size={40} />
        <p className="text-gray-400 font-medium">Loading Booking Details...</p>
      </div>
    );
  }

  if (!config || !car) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2 font-space">Car Not Found</h1>
        <p className="text-gray-400 mb-6">We couldn't find a car with ID: <span className="text-white font-mono">{carId}</span></p>
        <button onClick={() => router.push('/')} className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
          Return to Fleet
        </button>
      </div>
    );
  }

  // 6. Pricing Logic
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

  // 7. Booking Handlers
  const handleBookingRequest = async () => {
    if (user) {
        // User is ALREADY logged in globally -> Direct Success
        const token = await user.getIdToken();
        submitLead(token);
    } else {
        // User NOT logged in -> Open Modal
        setAuthOpen(true);
    }
  };

  const submitLead = (token: string) => {
    // In a real app, send this to your backend
    console.log("Booking Confirmed!", {
        car: car.name,
        userToken: token,
        location,
        total
    });
    setSuccess(true);
  };

  // 8. Success Screen
  if (success) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(163,230,53,0.3)]">
           <CheckCircle2 size={48} className="text-black" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-space">Request Sent!</h1>
        <p className="text-gray-400 max-w-lg text-lg leading-relaxed">
           Thank you for choosing <strong>GoCar Rentals</strong>.<br/>
           Our team has received your request for the <span className="text-lime-400">{car.name}</span> in <strong>{location}</strong>.
           <br/><br/>
           We will call your verified number <span className="text-white font-bold">{user?.phoneNumber}</span> shortly.
        </p>
        <button onClick={() => router.push('/')} className="mt-10 px-8 py-4 bg-[#111] border border-white/20 rounded-xl hover:bg-white/10 transition-colors font-bold uppercase tracking-wider">
           Back to Home
        </button>
      </main>
    );
  }

  // 9. Main UI
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-lime-400 selection:text-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- LEFT: Car Info --- */}
        <div className="lg:col-span-7 space-y-8">
           <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
              <Image src={car.image} alt={car.name} fill className="object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                 <span className="bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 text-white flex items-center gap-1">
                    <UserCheck size={14} className="text-lime-400" /> Driver Included
                 </span>
                 <span className="bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 text-white flex items-center gap-1">
                    <ShieldCheck size={14} className="text-lime-400" /> Commercial Permit
                 </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
                 <h1 className="text-4xl font-bold font-space text-white">{car.name}</h1>
                 <p className="text-gray-300 font-medium text-lg mt-1">{car.brand} • {car.category_id?.toUpperCase()}</p>
              </div>
           </div>

           <div className="bg-[#0F0F11] border border-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2 font-space">
                 <Info size={20} className="text-lime-400"/> Tariff & Policies
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-[#1A1A1C] p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs uppercase text-gray-500 font-bold mb-2 tracking-wider">Hourly Rental</div>
                    <div className="text-3xl font-bold text-lime-400 font-space">₹{car.price_per_hr}</div>
                    <div className="text-[10px] text-gray-500 mt-1">Base Fare</div>
                 </div>
                 <div className="bg-[#1A1A1C] p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs uppercase text-gray-500 font-bold mb-2 tracking-wider">Extra Distance</div>
                    <div className="text-3xl font-bold text-white font-space">₹{car.price_per_km}</div>
                    <div className="text-[10px] text-gray-500 mt-1">Per Kilometer</div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-4">Important Notes</h4>
                 <ul className="space-y-3">
                    {config?.pricing_rules?.policies?.map((policy: string, i: number) => (
                       <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 shrink-0"></div>
                          {policy}
                       </li>
                    ))}
                    <li className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                       <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 shrink-0"></div>
                       <span className="flex items-center gap-1 text-orange-400 font-bold"><Fuel size={14}/> Fuel is not included (User pays for fuel).</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>

        {/* --- RIGHT: Form --- */}
        <div className="lg:col-span-5">
           <div className="bg-[#0F0F11] border border-white/10 p-6 md:p-8 rounded-3xl sticky top-28 shadow-2xl ring-1 ring-white/5">
              <h2 className="text-2xl font-bold mb-8 font-space">Booking Details</h2>
              
              <div className="space-y-6 mb-8">
                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Pickup Location</label>
                    <div className="flex items-center gap-3 bg-[#1A1A1C] border border-white/10 p-4 rounded-xl text-white">
                       <MapPin className="text-lime-400 shrink-0" size={20} />
                       <span className="font-bold text-lg truncate">{location}</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Start Time</label>
                       <input 
                         type="datetime-local" 
                         value={start} 
                         onChange={e => setStart(e.target.value)} 
                         className="w-full bg-[#1A1A1C] border border-white/10 p-3 rounded-xl text-sm font-bold outline-none focus:border-lime-400 transition-colors" 
                         style={{colorScheme: "dark"}} 
                       />
                    </div>
                    <div>
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">End Time</label>
                       <input 
                         type="datetime-local" 
                         value={end} 
                         onChange={e => setEnd(e.target.value)} 
                         className="w-full bg-[#1A1A1C] border border-white/10 p-3 rounded-xl text-sm font-bold outline-none focus:border-lime-400 transition-colors" 
                         style={{colorScheme: "dark"}} 
                       />
                    </div>
                 </div>
              </div>

              {total > 0 ? (
                 <div className="bg-white/5 p-5 rounded-2xl mb-8 border border-white/5">
                    <div className="flex justify-between mb-3 text-sm">
                       <span className="text-gray-400">Duration</span>
                       <span className="font-bold text-white">{duration} Hours</span>
                    </div>
                    {isMinApplied && (
                       <div className="flex justify-between mb-3 text-xs bg-orange-500/10 p-2 rounded text-orange-400 border border-orange-500/20">
                          <span>Minimum Billing Applied</span>
                          <span className="font-bold">{config.pricing_rules.min_hours} Hrs</span>
                       </div>
                    )}
                    <div className="flex justify-between border-t border-white/10 pt-4 mt-2">
                       <div>
                          <span className="text-white font-bold block text-lg">Estimated Total</span>
                          <span className="text-[10px] text-gray-500 uppercase block mt-1">*Excludes Fuel & Driver Batta</span>
                       </div>
                       <span className="text-3xl font-bold text-lime-400 font-space">₹{total.toLocaleString()}</span>
                    </div>
                 </div>
              ) : (
                 <div className="text-center text-sm text-gray-500 mb-8 py-8 bg-white/5 rounded-2xl border border-dashed border-white/10">
                    Select Start & End dates to view price estimate
                 </div>
              )}

              <button 
                disabled={!start || !end || total <= 0}
                onClick={handleBookingRequest}
                className="w-full bg-lime-400 text-black font-bold py-5 rounded-xl hover:bg-lime-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg uppercase tracking-wide shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)]"
              >
                 Request Booking <ArrowRight size={24} strokeWidth={2.5} />
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                 No payment required now. Pay after trip completion.
              </p>
           </div>
        </div>
      </div>
      
      {/* Auth Modal Triggered if user is NOT logged in */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setAuthOpen(false)} 
        onLoginSuccess={(token) => submitLead(token)} 
      />
    </main>
  );
}