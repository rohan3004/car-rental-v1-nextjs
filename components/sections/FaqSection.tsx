"use client";

import { useFleetConfig } from "@/lib/useFleetConfig";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function FaqSection() {
  const { faqs, loading } = useFleetConfig();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (loading && (!faqs || faqs.length === 0)) return null;

  return (
    <section id="faq" className="py-24 px-6 bg-[#050505] border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-16">
           <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-3 block">Support</span>
           <h2 className="font-serif text-3xl md:text-4xl text-white">Common Queries</h2>
        </div>
        
        <div className="space-y-0 divide-y divide-white/5 border-t border-b border-white/5">
          {faqs.map((item, i) => (
            <div key={i} className="group">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between py-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className={`font-serif text-lg transition-colors duration-300 ${openIndex === i ? "text-amber-400" : "text-zinc-300 group-hover:text-white"}`}>
                  {item.question}
                </span>
                <span className={`ml-6 mt-1 transition-colors duration-300 ${openIndex === i ? "text-amber-400" : "text-zinc-600"}`}>
                   {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-8 text-zinc-500 text-sm leading-relaxed max-w-xl">
                   {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}