"use client";

import { useState, use, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import { useFleetConfig } from "@/lib/useFleetConfig";
import { useAuth } from "@/context/AuthContext"; 
import { calculateDistance, calculatePricingEstimate, formatDuration } from "@/lib/distanceService";
import { 
  MapPin, CheckCircle2, ArrowRight, Loader2, UserCheck, AlertCircle, 
  CalendarClock, Lock, Navigation, Route, Clock, Gauge, Moon, Fuel,
  Shield, Receipt, Car, Ban, CheckCircle, XCircle
} from "lucide-react";

// Icon mapping for dynamic icons from config
const iconMap: Record<string, any> = {
  fuel: Fuel,
  driver: UserCheck,
  insurance: Shield,
  gst: Receipt,
  toll: Car,
  allowance: Receipt,
  permit: Car,
  night: Moon
};

function BookingContent({ carId }: { carId: string }) {
  const { allCars, config, pricingRules, loading } = useFleetConfig();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pickupCity = searchParams.get("pickupCity") || searchParams.get("city") || "";
  const pickupDistrict = searchParams.get("pickupDistrict") || searchParams.get("district") || "";
  const dropoffCity = searchParams.get("dropoffCity") || "";
  const dropoffDistrict = searchParams.get("dropoffDistrict") || "";
  const urlStart = searchParams.get("start") || "";
  const urlEnd = searchParams.get("end") || "";

  const [start, setStart] = useState(urlStart);
  const [end, setEnd] = useState(urlEnd);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const pickupLocation = pickupCity && pickupDistrict ? `${pickupCity}, ${pickupDistrict}` : (pickupCity || pickupDistrict || "");
  const dropoffLocation = dropoffCity && dropoffDistrict ? `${dropoffCity}, ${dropoffDistrict}` : (dropoffCity || dropoffDistrict || "");
  
  const car = allCars.find((c) => c.id === carId);

  const distanceInfo = useMemo(() => {
    if (!pickupCity || !dropoffCity) return null;
    return calculateDistance(pickupCity, dropoffCity);
  }, [pickupCity, dropoffCity]);

  const pricingEstimate = useMemo(() => {
    if (!car) return null;
    const nightConfig = pricingRules?.night_charges;
    return calculatePricingEstimate(
      start, end, distanceInfo?.distanceKm ?? null,
      car.price_per_hr || 0, car.price_per_km || 0,
      pricingRules?.min_hours || 10,
      pricingRules?.min_km || 100,
      nightConfig?.flat_rate || 300,
      nightConfig?.enabled ?? true,
      nightConfig?.start_hour || 22,
      nightConfig?.end_hour || 6
    );
  }, [start, end, distanceInfo, car, pricingRules]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-amber-400" size={32} />
        <p className="text-zinc-500 font-serif tracking-widest uppercase text-xs">Retrieving Reservation...</p>
      </div>
    );
  }

  if (!config || !car || !pickupLocation) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={48} className="text-red-900 mb-6 opacity-80" />
        <h1 className="text-3xl font-serif mb-2 text-white">Incomplete Itinerary</h1>
        <p className="text-zinc-500 mb-8 font-sans max-w-md">
          {(!car) ? "The vehicle ID is invalid." : "Please select Pick-up and Drop-off locations before booking."}
        </p>
        <button onClick={() => router.push('/')} className="px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors">
          Return to Collection
        </button>
      </div>
    );
  }

  const handleBookingRequest = async () => {
    if (user) {
      const token = await user.getIdToken();
      submitLead(token);
    } else {
      setAuthOpen(true);
    }
  };

  const submitLead = (token: string) => {
    console.log("Booking Confirmed!", { car: car.name, userToken: token, pickup: pickupLocation, dropoff: dropoffLocation, distance: distanceInfo?.distanceKm, estimate: pricingEstimate });
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
          Our concierge will contact <span className="text-white font-medium">{user?.phoneNumber}</span> shortly.
        </p>
        <button onClick={() => router.push('/')} className="px-10 py-4 bg-white text-black hover:bg-amber-400 transition-colors font-bold uppercase tracking-widest text-xs">
          Return Home
        </button>
      </div>
    );
  }

  const inclusions = pricingRules?.inclusions || [];
  const exclusions = pricingRules?.exclusions || [];

  return (
    <>
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-7 space-y-6 md:space-y-10">
          {/* Car Image */}
          <div className="relative w-full aspect-[16/9] bg-[#0a0a0a] border border-white/5 group">
            <Image src={car.image} alt={car.name} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-3 left-3 md:top-6 md:left-6">
              <span className="bg-black/80 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[10px] uppercase tracking-widest border border-white/10 text-white flex items-center gap-2 w-fit">
                <UserCheck size={10} className="text-amber-400 md:w-3 md:h-3" /> Chauffeur Driven
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-4 md:p-8 pt-16 md:pt-24">
              <p className="text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2">{car.brand}</p>
              <h1 className="text-3xl md:text-5xl font-serif text-white">{car.name}</h1>
            </div>
          </div>

          {/* Route Summary */}
          <div className="bg-[#0a0a0a] border border-white/5 p-4 md:p-6 space-y-4">
            <h3 className="font-serif text-lg md:text-xl text-white flex items-center gap-2 md:gap-3">
              <Route size={16} className="text-amber-400 md:w-[18px] md:h-[18px]"/> Route Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-amber-400 shrink-0 mt-1" size={16} />
                <div className="min-w-0">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Pick-up</span>
                  <span className="text-white font-serif text-sm md:text-base break-words">{pickupLocation}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Navigation className="text-emerald-400 shrink-0 mt-1" size={16} />
                <div className="min-w-0">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Drop-off</span>
                  <span className="text-white font-serif text-sm md:text-base break-words">{dropoffLocation || "Same as pickup"}</span>
                </div>
              </div>
            </div>
            {distanceInfo && (
              <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Gauge size={14} className="text-blue-400" />
                  <span className="text-zinc-400 text-xs md:text-sm">{distanceInfo.distanceKm} km (one way)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-blue-400" />
                  <span className="text-zinc-400 text-xs md:text-sm">{formatDuration(distanceInfo.durationMinutes)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Rates */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-b border-white/5 py-6 md:py-8">
            <div>
              <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Hourly Rate</p>
              <div className="text-2xl md:text-3xl font-serif text-white">₹{car.price_per_hr}</div>
              <p className="text-[10px] md:text-xs text-zinc-600 mt-1">Per Hour</p>
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Distance Rate</p>
              <div className="text-2xl md:text-3xl font-serif text-zinc-400">₹{car.price_per_km}</div>
              <p className="text-[10px] md:text-xs text-zinc-600 mt-1">Per Kilometer</p>
            </div>
          </div>

          {/* Inclusions */}
          {inclusions.length > 0 && (
            <div>
              <h3 className="font-serif text-lg md:text-xl text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <CheckCircle size={16} className="text-emerald-400 md:w-[18px] md:h-[18px]"/> What's Included
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {inclusions.map((item, i) => {
                  const IconComponent = iconMap[item.icon] || CheckCircle;
                  return (
                    <div key={i} className="flex items-start gap-3 md:gap-4 bg-emerald-900/10 p-3 md:p-4 border-l-2 border-emerald-500">
                      <IconComponent size={16} className="text-emerald-400 mt-0.5 shrink-0 md:w-[18px] md:h-[18px]" />
                      <div className="min-w-0">
                        <span className="text-white text-xs md:text-sm font-medium block">{item.title}</span>
                        <span className="text-zinc-500 text-[10px] md:text-xs">{item.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Exclusions */}
          {exclusions.length > 0 && (
            <div>
              <h3 className="font-serif text-lg md:text-xl text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <XCircle size={16} className="text-red-400 md:w-[18px] md:h-[18px]"/> Not Included (Pay Extra)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {exclusions.map((item, i) => {
                  const IconComponent = iconMap[item.icon] || Ban;
                  return (
                    <div key={i} className="flex items-start gap-3 md:gap-4 bg-red-900/10 p-3 md:p-4 border-l-2 border-red-500/50">
                      <IconComponent size={16} className="text-red-400 mt-0.5 shrink-0 md:w-[18px] md:h-[18px]" />
                      <div className="min-w-0">
                        <span className="text-zinc-300 text-xs md:text-sm font-medium block">{item.title}</span>
                        <span className="text-zinc-500 text-[10px] md:text-xs">{item.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Booking Console */}
        <div className="lg:col-span-5">
          <div className="bg-[#0a0a0a] border border-white/5 p-5 md:p-8 lg:p-10 lg:sticky lg:top-28 shadow-2xl">
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-white/5">
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-1 md:mb-2 block">Reservation</span>
              <h2 className="text-2xl md:text-3xl font-serif text-white">Secure Your Ride</h2>
            </div>
            
            <div className="space-y-5 md:space-y-6 mb-6 md:mb-8">
              {/* Locations */}
              <div className="space-y-4">
                <div className="group opacity-80">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Pick-up</label>
                    <Lock size={12} className="text-zinc-600" />
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300 border-b border-white/10 pb-3">
                    <MapPin className="text-amber-400 shrink-0" size={16} />
                    <span className="font-serif text-sm md:text-base truncate select-none">{pickupLocation}</span>
                  </div>
                </div>
                <div className="group opacity-80">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Drop-off</label>
                    <Lock size={12} className="text-zinc-600" />
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300 border-b border-white/10 pb-3">
                    <Navigation className="text-emerald-400 shrink-0" size={16} />
                    <span className="font-serif text-sm md:text-base truncate select-none">{dropoffLocation || "Same as pickup"}</span>
                  </div>
                </div>
              </div>

              {/* Date Inputs */}
              <div className="space-y-5 md:space-y-6">
                <div className="group relative">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Start Date & Time</label>
                  <div className="flex items-center border-b border-white/10 group-focus-within:border-amber-400/50 transition-colors pb-1">
                    <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} className="w-full bg-transparent text-white font-sans text-xs md:text-sm py-2 outline-none" style={{colorScheme: "dark"}} />
                    {!start && <CalendarClock className="absolute right-0 text-zinc-600 pointer-events-none" size={16}/>}
                  </div>
                </div>
                <div className="group relative">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">End Date & Time</label>
                  <div className="flex items-center border-b border-white/10 group-focus-within:border-amber-400/50 transition-colors pb-1">
                    <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} className="w-full bg-transparent text-white font-sans text-xs md:text-sm py-2 outline-none" style={{colorScheme: "dark"}} />
                    {!end && <CalendarClock className="absolute right-0 text-zinc-600 pointer-events-none" size={16}/>}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-[#050505] p-4 md:p-6 border border-white/5 mb-6 md:mb-8">
              {pricingEstimate ? (
                <>
                  <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider">Duration</span>
                      <span className="text-white font-bold text-sm md:text-base">{pricingEstimate.hours} Hours</span>
                    </div>
                    {pricingEstimate.hasDistanceData && pricingEstimate.distance && (
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider">Round Trip</span>
                        <span className="text-white font-bold text-sm md:text-base">{pricingEstimate.distance} km</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <Clock size={12} className="text-zinc-500 md:w-[14px] md:h-[14px]" />
                        <span className="text-zinc-400 text-xs md:text-sm">Hourly</span>
                        {pricingEstimate.minHoursApplied && <span className="text-[8px] md:text-[9px] text-amber-500 uppercase">Min</span>}
                      </div>
                      <span className={`font-serif text-sm md:text-base ${pricingEstimate.billingType === 'hourly' ? 'text-amber-400' : 'text-zinc-500'}`}>
                        ₹{pricingEstimate.hourlyTotal.toLocaleString()}
                      </span>
                    </div>
                    {pricingEstimate.hasDistanceData && pricingEstimate.distanceTotal !== null && (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <Gauge size={12} className="text-zinc-500 md:w-[14px] md:h-[14px]" />
                          <span className="text-zinc-400 text-xs md:text-sm">Distance</span>
                          {pricingEstimate.minKmApplied && <span className="text-[8px] md:text-[9px] text-amber-500 uppercase">Min</span>}
                        </div>
                        <span className={`font-serif text-sm md:text-base ${pricingEstimate.billingType === 'distance' ? 'text-amber-400' : 'text-zinc-500'}`}>
                          ₹{pricingEstimate.distanceTotal.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Base Total */}
                  <div className="flex justify-between items-center py-2 md:py-3 border-t border-white/5">
                    <span className="text-zinc-400 text-xs md:text-sm">Base Fare</span>
                    <span className="text-white font-serif text-sm md:text-base">₹{pricingEstimate.baseTotal.toLocaleString()}</span>
                  </div>

                  {/* Night Charges */}
                  {pricingEstimate.hasNightHours && (
                    <div className="flex justify-between items-center py-2 md:py-3 border-t border-white/5 bg-purple-900/10 -mx-4 md:-mx-6 px-4 md:px-6">
                      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                        <Moon size={12} className="text-purple-400 md:w-[14px] md:h-[14px]" />
                        <span className="text-purple-300 text-xs md:text-sm">Night</span>
                        <span className="text-[8px] md:text-[9px] text-purple-400 uppercase">({pricingEstimate.nightHoursCount}h)</span>
                      </div>
                      <span className="text-purple-300 font-serif text-sm md:text-base">+₹{pricingEstimate.nightCharges.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Final Total */}
                  <div className="flex justify-between items-end border-t border-white/5 pt-3 md:pt-4 mt-3 md:mt-4">
                    <div>
                      <span className="text-zinc-400 text-xs md:text-sm font-serif italic block mb-0.5 md:mb-1">Total Estimate</span>
                      <span className="text-[9px] md:text-[10px] text-amber-500 uppercase tracking-wider">
                        {pricingEstimate.hasDistanceData 
                          ? (pricingEstimate.billingType === 'hourly' ? 'Based on Hours' : 'Based on Distance')
                          : 'Based on Hours'
                        }
                        {pricingEstimate.hasNightHours && ' + Night'}
                      </span>
                    </div>
                    <span className="text-2xl md:text-3xl font-serif text-white">₹{pricingEstimate.finalTotal.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <span className="text-zinc-600 text-[10px] md:text-xs uppercase tracking-widest">Select dates to view estimate</span>
                </div>
              )}
            </div>

            <button disabled={!start || !end || !pricingEstimate} onClick={handleBookingRequest} className="w-full bg-white text-black h-12 md:h-14 hover:bg-amber-400 transition-all duration-300 flex items-center justify-between px-4 md:px-6 group disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]">Confirm Request</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform md:w-[18px] md:h-[18px]" />
            </button>
            <p className="text-center text-[9px] md:text-[10px] text-zinc-600 mt-4 md:mt-6 uppercase tracking-widest">Fuel included • Pay after service</p>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} onLoginSuccess={(token) => submitLead(token)} />
    </>
  );
}

export default function BookingPage({ params }: { params: Promise<{ carId: string }> }) {
  const { carId } = use(params);
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-amber-400" size={32} /></div>}>
        <BookingContent carId={carId} />
      </Suspense>
    </main>
  );
}
