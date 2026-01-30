"use client";

import { useFleetConfig } from "@/lib/useFleetConfig";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function FaqSection() {
  const { faqs, loading } = useFleetConfig();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (loading && (!faqs || faqs.length === 0)) return null;

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold font-space text-center text-white mb-12">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div 
            key={i} 
            className="border border-white/10 rounded-xl bg-[#111] overflow-hidden transition-all"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-white text-lg">{item.question}</span>
              {openIndex === i ? <Minus className="text-lime-400" /> : <Plus className="text-gray-500" />}
            </button>
            
            <div 
              className={`px-6 text-gray-400 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === i ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}