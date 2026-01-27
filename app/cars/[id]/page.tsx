"use client";

import { use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // <--- Reusing Footer
import FaqSection from "@/components/sections/FaqSection"; // <--- Reusing FAQ
import BookingWidget from "@/components/booking/BookingWidget";
import { getCarById } from "@/lib/mockData";
import { 
  Fuel, Gauge, Cog, Check, Info, MapPin, Zap 
} from "lucide-react";
import Image from "next/image";

export default function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const car = getCarById(unwrappedParams.id);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-lime-400 selection:text-black font-sans">
      <Navbar />

      {/* --- CAR DETAILS CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* Breadcrumb / Title */}
        <div className="mb-8">
           <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              <span>Home</span> / <span>Fleet</span> / <span className="text-lime-400">Details</span>
           </div>
           <h1 className="font-space text-4xl md:text-6xl font-bold">{car.modelName}</h1>
           <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">{car.transmission}</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">{car.fuelType}</span>
              <span className="flex items-center gap-1 text-lime-400"><MapPin size={14}/> Indiranagar, Bangalore</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Content (Images + Specs) */}
          <div className="lg:col-span-8 space-y-12">
             
             {/* Bento Grid Gallery */}
             <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[300px] md:h-[500px]">
                <div className="col-span-4 row-span-2 md:col-span-3 md:row-span-2 relative rounded-2xl overflow-hidden border border-white/10 group">
                   <Image src={car.images[0]} alt="Main" fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
                </div>
                <div className="hidden md:block col-span-1 row-span-1 relative rounded-2xl overflow-hidden border border-white/10 group">
                   <Image src={car.images[1]} alt="Interior" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="hidden md:block col-span-1 row-span-1 relative rounded-2xl overflow-hidden border border-white/10 group">
                   <Image src={car.images[2]} alt="Rear" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
             </div>

             {/* Description */}
             <div>
                <h3 className="font-space text-2xl font-bold mb-4 text-white">About the Machine</h3>
                <p className="text-gray-300 leading-relaxed text-lg font-medium">{car.description}</p>
             </div>

             {/* Tech Specs Grid */}
             <div>
                <h3 className="font-space text-2xl font-bold mb-6 text-white">Technical Data</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {[
                     { label: "Engine", value: car.specs.engine, icon: Cog },
                     { label: "Power", value: car.specs.power, icon: Zap },
                     { label: "0-100", value: car.specs.topSpeed, icon: Gauge },
                     { label: "Fuel Tank", value: car.specs.fuelTank, icon: Fuel },
                   ].map((spec, i) => (
                      <div key={i} className="bg-[#111] p-4 rounded-xl border border-white/10 hover:border-lime-400/30 transition-colors">
                         <spec.icon className="text-lime-400 mb-3" size={24} strokeWidth={1.5} />
                         <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">{spec.label}</div>
                         <div className="text-lg font-bold text-white">{spec.value}</div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Features List */}
             <div>
                <h3 className="font-space text-2xl font-bold mb-6 text-white">Included Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                   {car.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                         <div className="w-6 h-6 rounded-full bg-lime-400/10 flex items-center justify-center text-lime-400">
                            <Check size={14} strokeWidth={3} />
                         </div>
                         <span>{feature}</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* Rental Policies */}
             <div className="bg-[#111] rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                   <Info className="text-lime-400" />
                   <h3 className="font-space text-xl font-bold text-white">Important Policies</h3>
                </div>
                <ul className="space-y-4">
                   {car.policies.map((policy, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                         <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2"></span>
                         {policy}
                      </li>
                   ))}
                </ul>
             </div>

          </div>

          {/* RIGHT COLUMN: Sticky Booking Widget */}
          <div className="lg:col-span-4 relative">
             <BookingWidget carPrice={car.basePricePerHour} />
          </div>

        </div>
      </div>

      {/* --- REUSABLE SECTIONS --- */}
      <div className="border-t border-white/10">
        <FaqSection />
      </div>
      
      <Footer />
    </main>
  );
}