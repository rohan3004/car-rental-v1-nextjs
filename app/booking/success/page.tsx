"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, MapPin, Calendar, Clock, Navigation } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-lime-400 selection:text-black font-sans">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 text-center">
        
        {/* Animated Checkmark */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(163,230,53,0.4)]"
        >
          <Check size={48} className="text-black stroke-[3]" />
        </motion.div>

        <h1 className="font-space text-4xl md:text-5xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-gray-400 text-lg mb-8">
          You are all set. A confirmation has been sent to your WhatsApp.
        </p>

        {/* Booking Card */}
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 text-left max-w-xl mx-auto mb-8 relative overflow-hidden">
          {/* Top Green Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 to-green-600" />
          
          <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
             <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Booking ID</p>
                <p className="text-2xl font-space font-bold text-white">#GCR-8821</p>
             </div>
             <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Car</p>
                <p className="text-lg font-bold text-lime-400">Swift Dzire</p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
             <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                   <Calendar size={14} /> <span className="text-xs font-bold uppercase">Pickup</span>
                </div>
                <div className="font-bold text-white">Oct 12, 10:00 AM</div>
             </div>
             <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                   <Clock size={14} /> <span className="text-xs font-bold uppercase">Return</span>
                </div>
                <div className="font-bold text-white">Oct 13, 10:00 AM</div>
             </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 flex items-start gap-3">
             <MapPin className="text-lime-400 shrink-0 mt-1" />
             <div>
                <p className="font-bold text-white text-sm">Pickup Location</p>
                <p className="text-gray-400 text-sm mt-1">
                   GoCar Hub, 12th Main Rd, Indiranagar, Bangalore, 560038
                </p>
                <a 
                   href="https://maps.google.com" 
                   target="_blank" 
                   className="inline-flex items-center gap-1 text-lime-400 text-xs font-bold mt-2 hover:underline"
                >
                   <Navigation size={12} /> Get Directions
                </a>
             </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link href="/" className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
              Book Another Car
           </Link>
           <button className="px-8 py-4 bg-[#111] border border-white/20 text-white font-bold rounded-xl hover:border-lime-400 hover:text-lime-400 transition-colors">
              Download Invoice
           </button>
        </div>

      </div>

      <Footer />
    </main>
  );
}