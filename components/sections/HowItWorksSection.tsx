"use client";

import { MapPin, CalendarDays, ShieldCheck, Star } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    { 
      id: "01",
      icon: MapPin, 
      title: "Select Region", 
      desc: "Choose your district and pick-up city from our curated locations." 
    },
    { 
      id: "02", 
      icon: CalendarDays, 
      title: "Schedule Dates", 
      desc: "Select your travel dates to view available vehicles." 
    },
    { 
      id: "03", 
      icon: ShieldCheck, 
      title: "Request Booking", 
      desc: "Choose your preferred class and submit a request." 
    },
    { 
      id: "04", 
      icon: Star, 
      title: "Chauffeur Arrives", 
      desc: "We confirm the driver details. Sit back and enjoy the ride." 
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#050505] relative border-b border-white/5 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
           <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
             The Process
           </span>
           <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
             Effortless Luxury.
           </h2>
           <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto"></div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
           
           {/* Connecting Line (Desktop Only) */}
           <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

           {steps.map((step, i) => (
             <div key={i} className="relative group">
                
                {/* Step Content */}
                <div className="flex flex-col items-center text-center relative z-10">
                   
                   {/* Icon Container - Floating on line */}
                   <div className="w-24 h-24 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center mb-8 group-hover:border-amber-400/50 transition-colors duration-500 relative">
                      <step.icon size={28} strokeWidth={1} className="text-white group-hover:text-amber-400 transition-colors duration-500" />
                      
                      {/* Small Dot on line */}
                      <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-auto md:top-auto md:bottom-0 md:translate-y-1/2 w-2 h-2 bg-[#050505] border border-amber-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   </div>

                   {/* Large Watermark Number */}
                   <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-serif text-white/5 font-bold select-none pointer-events-none transition-all group-hover:text-white/10 group-hover:scale-110 duration-700">
                     {step.id}
                   </span>

                   {/* Text */}
                   <h3 className="font-serif text-xl text-white mb-3 tracking-wide">{step.title}</h3>
                   <p className="text-sm text-zinc-500 font-sans leading-relaxed max-w-[220px]">
                     {step.desc}
                   </p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}