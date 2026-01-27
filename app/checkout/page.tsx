"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqSection from "@/components/sections/FaqSection";
import { Upload, ShieldCheck, Lock, FileText, Trash2, Calendar } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const [kycFile, setKycFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setKycFile(e.target.files[0]);
    }
  };

  const handlePayment = () => {
    // In a real app, this would trigger Razorpay/Stripe
    // For now, we simulate success
    router.push('/booking/success');
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-lime-400 selection:text-black font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <h1 className="font-space text-4xl font-bold mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Forms (Trip Details & KYC) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Trip Summary Card */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold font-space mb-6 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-lime-400 text-black flex items-center justify-center text-xs font-bold">1</span>
                Trip Details
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-full sm:w-40 h-32 rounded-lg overflow-hidden border border-white/10">
                   <Image 
                     src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600" 
                     alt="Car" fill className="object-cover" 
                   />
                </div>
                <div className="flex-1">
                   <h3 className="text-xl font-bold text-white mb-1">Maruti Suzuki Swift Dzire</h3>
                   <p className="text-sm text-gray-500 mb-4">Manual • Petrol • 5 Seater</p>
                   
                   <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                      <div>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                           <Calendar size={12} /> <span className="text-xs uppercase font-bold tracking-wider">Pick Up</span>
                        </div>
                        <div className="text-white font-medium">Oct 12, 10:00 AM</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                           <Calendar size={12} /> <span className="text-xs uppercase font-bold tracking-wider">Drop Off</span>
                        </div>
                        <div className="text-white font-medium">Oct 13, 10:00 AM</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* 2. KYC Upload Section */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold font-space mb-2 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-lime-400 text-black flex items-center justify-center text-xs font-bold">2</span>
                Driver Verification
              </h2>
              <p className="text-gray-400 text-sm mb-6 ml-9 max-w-md">
                Government regulations require us to verify your original Driving Licence.
              </p>

              {!kycFile ? (
                <div className="ml-0 sm:ml-9 relative border-2 border-dashed border-white/10 bg-white/5 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-lime-400/50 transition-colors group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-14 h-14 bg-[#222] rounded-full flex items-center justify-center text-gray-400 group-hover:text-lime-400 group-hover:scale-110 transition-all mb-4 border border-white/10">
                    <Upload size={24} />
                  </div>
                  <p className="font-bold text-white text-lg">Upload Driving Licence</p>
                  <p className="text-xs text-gray-500 mt-2">Front Side • Max 5MB • JPG/PNG</p>
                </div>
              ) : (
                <div className="ml-0 sm:ml-9 flex items-center justify-between bg-[#1A1A1C] border border-lime-400/30 p-4 rounded-xl">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-lime-400/10 rounded-lg flex items-center justify-center text-lime-400">
                        <FileText size={20} />
                      </div>
                      <div>
                         <p className="font-bold text-white text-sm">{kycFile.name}</p>
                         <p className="text-xs text-gray-500 flex items-center gap-1">
                            <ShieldCheck size={10} className="text-lime-400" /> Ready for verification
                         </p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setKycFile(null)} 
                     className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                   >
                      <Trash2 size={18} />
                   </button>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Price & Pay */}
          <div className="lg:col-span-4 space-y-6 relative">
             
             {/* Sticky Payment Card */}
             <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl">
                <h3 className="font-space text-lg font-bold mb-6 text-white">Payment Details</h3>
                
                <div className="space-y-3 text-sm text-gray-400 pb-6 border-b border-white/10">
                   <div className="flex justify-between">
                      <span>Trip Fare (24 hrs)</span>
                      <span className="text-white font-medium">₹2,400</span>
                   </div>
                   <div className="flex justify-between">
                      <span>Damage Protection</span>
                      <span className="text-white font-medium">₹299</span>
                   </div>
                   <div className="flex justify-between">
                      <span>Taxes & Fees (18%)</span>
                      <span className="text-white font-medium">₹485</span>
                   </div>
                </div>

                <div className="flex justify-between items-center py-4 text-white font-bold text-xl">
                   <span>To Pay</span>
                   <span>₹3,184</span>
                </div>

                <div className="bg-lime-400/10 border border-lime-400/20 rounded-lg p-3 text-xs text-lime-400 flex gap-2 items-start mb-6">
                   <ShieldCheck size={14} className="mt-0.5 shrink-0" />
                   <span className="leading-relaxed">
                     A fully refundable security deposit of <strong>₹2,000</strong> will be charged.
                   </span>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={!kycFile}
                  className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-4 rounded-xl text-lg uppercase tracking-wide transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(163,230,53,0.2)]"
                >
                  <Lock size={18} /> Pay Securely
                </button>

                <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-wider font-bold">
                   100% Secure Transaction
                </p>
             </div>

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