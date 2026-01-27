"use client";

import { Ticket, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function OffersSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
  };

  return (
    <section id="offers" className="py-20 bg-[#0A0A0C] border-y border-white/10">
       <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-space text-3xl font-bold mb-10 text-white">Exclusive Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { code: "NEWRIDE", discount: "20% OFF", desc: "On your first booking" },
               { code: "WEEKEND500", discount: "FLAT ₹500", desc: "On bookings > 48 hrs" },
               { code: "SWIFTLOVER", discount: "15% OFF", desc: "Special for Swift Dzire" }
             ].map((offer, i) => (
               <div 
                 key={i} 
                 onClick={() => handleCopy(offer.code, i)}
                 className="relative bg-[#151515] border border-white/15 rounded-xl p-6 flex items-center justify-between overflow-hidden hover:border-lime-400 transition-all cursor-pointer group"
               >
                  {/* Perforation circles */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0A0A0C] rounded-full border border-white/15"></div>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0A0A0C] rounded-full border border-white/15"></div>
                  
                  <div>
                     <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{offer.desc}</div>
                     <div className="text-3xl font-space font-bold text-white group-hover:text-lime-400 transition-colors">{offer.discount}</div>
                     <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        {copiedIndex === i ? <span className="text-green-500 font-bold">Copied!</span> : "Click to copy"}
                     </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                     <Ticket className="text-lime-400 group-hover:scale-110 transition-transform" />
                     <button className="text-sm font-mono font-bold bg-lime-400/10 text-lime-400 px-3 py-1 rounded border border-lime-400/30 flex items-center gap-2 group-hover:bg-lime-400 group-hover:text-black transition-all">
                        {offer.code}
                        {copiedIndex === i ? <Check size={12} /> : <Copy size={12} />}
                     </button>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </section>
  );
}