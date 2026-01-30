"use client";

import { useFleetConfig } from "@/lib/useFleetConfig";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const { testimonials, loading } = useFleetConfig();

  if (loading && (!testimonials || testimonials.length === 0)) return null;

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[120px] pointer-events-none" />

       <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-20">
             <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-3 block">Client Stories</span>
             <h2 className="font-serif text-4xl md:text-5xl text-white">Driven by Trust.</h2>
             <div className="h-px w-20 bg-zinc-800 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {testimonials.map((review, i) => (
                <div 
                  key={i} 
                  className="bg-[#0a0a0a] p-10 border border-white/5 relative group hover:border-amber-900/50 transition-colors duration-500 flex flex-col"
                >
                   {/* Gold Quote Icon */}
                   <div className="mb-6 text-amber-500/20 group-hover:text-amber-500 transition-colors duration-500">
                      <Quote size={32} fill="currentColor" strokeWidth={0} />
                   </div>

                   <p className="text-zinc-300 text-lg mb-8 relative z-10 font-serif leading-relaxed italic">
                      "{review.text}"
                   </p>
                   
                   <div className="mt-auto flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-10 h-10 rounded-none bg-amber-500 flex items-center justify-center font-bold text-black text-lg font-serif">
                         {review.name.charAt(0)}
                      </div>
                      <div>
                         <div className="font-sans font-bold text-white text-sm tracking-wide uppercase">{review.name}</div>
                         <div className="text-[10px] text-amber-500/80 font-bold uppercase tracking-widest mt-0.5">{review.role}</div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}