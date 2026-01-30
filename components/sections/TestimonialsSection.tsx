"use client";

import { useFleetConfig } from "@/lib/useFleetConfig";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const { testimonials, loading } = useFleetConfig();

  // Don't show the section if loading or if no testimonials exist
  if (loading && (!testimonials || testimonials.length === 0)) return null;

  return (
    <section className="py-24 bg-[#080808] border-t border-white/10">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-4">Driven by Trust</h2>
             <p className="text-gray-400">Hear from our happy customers across West Bengal.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {testimonials.map((review, i) => (
                <div 
                  key={i} 
                  className="bg-[#111] p-8 rounded-3xl border border-white/10 relative hover:border-lime-400/30 transition-all group"
                >
                   {/* Decorative Quote Icon */}
                   <div className="absolute top-8 right-8 text-gray-800 group-hover:text-lime-400/20 transition-colors">
                      <Quote size={40} fill="currentColor" />
                   </div>

                   <p className="text-gray-200 text-lg mb-8 relative z-10 leading-relaxed font-medium">
                      "{review.text}"
                   </p>
                   
                   <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                      <div className="w-12 h-12 rounded-full bg-lime-400/10 text-lime-400 flex items-center justify-center font-bold text-xl border border-lime-400/20">
                         {review.name.charAt(0)}
                      </div>
                      <div>
                         <div className="font-bold text-white text-base font-space">{review.name}</div>
                         <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{review.role}</div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}