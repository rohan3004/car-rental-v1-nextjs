"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, MapPin, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-lime-400 selection:text-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
           <div>
              <h1 className="font-space text-4xl font-bold mb-2">My Trips</h1>
              <p className="text-gray-400">Manage your upcoming and past journeys.</p>
           </div>
           <div className="flex gap-4 mt-4 md:mt-0">
              <div className="bg-[#111] border border-white/10 px-6 py-3 rounded-xl">
                 <div className="text-2xl font-bold font-space text-lime-400">02</div>
                 <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Active</div>
              </div>
              <div className="bg-[#111] border border-white/10 px-6 py-3 rounded-xl">
                 <div className="text-2xl font-bold font-space text-white">14</div>
                 <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Completed</div>
              </div>
           </div>
        </div>

        {/* ACTIVE BOOKINGS */}
        <div className="mb-12">
           <h2 className="text-xl font-bold font-space mb-6 flex items-center gap-2">
              <Clock className="text-lime-400" size={20} /> Upcoming
           </h2>
           
           <div className="bg-[#111] border border-lime-400/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
              {/* Status Badge */}
              <div className="absolute top-0 right-0 bg-lime-400 text-black text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                 Confirmed
              </div>

              <div className="w-full md:w-64 h-40 bg-gray-800 rounded-xl relative overflow-hidden border border-white/10">
                 <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600" alt="Car" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 w-full">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold font-space">Swift Dzire</h3>
                    <p className="font-mono text-gray-500">#GCR-8821</p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                       <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Pickup</p>
                       <p className="font-bold text-white flex items-center gap-2"><Calendar size={14} className="text-gray-400"/> Oct 12, 10:00 AM</p>
                    </div>
                    <div>
                       <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Return</p>
                       <p className="font-bold text-white flex items-center gap-2"><Calendar size={14} className="text-gray-400"/> Oct 13, 10:00 AM</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button className="bg-white text-black font-bold px-6 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                       View Ticket
                    </button>
                    <button className="border border-red-500/30 text-red-400 font-bold px-6 py-2 rounded-lg text-sm hover:bg-red-500/10 transition-colors">
                       Cancel
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* PAST BOOKINGS */}
        <div>
           <h2 className="text-xl font-bold font-space mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-gray-500" size={20} /> History
           </h2>
           
           <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                 <div key={item} className="bg-[#0F0F11] border border-white/5 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                       <div className="w-16 h-12 bg-gray-800 rounded-lg overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale" />
                       </div>
                       <div>
                          <h4 className="font-bold text-white">Tata Nexon</h4>
                          <p className="text-xs text-gray-500">Sep 28 • 14 Hours</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                       <span className="text-sm font-bold text-white">₹1,850</span>
                       <div className="flex items-center gap-2 text-lime-400 text-xs font-bold bg-lime-400/10 px-3 py-1 rounded-full">
                          <CheckCircle2 size={12} /> Completed
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}