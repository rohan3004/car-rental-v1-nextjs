"use client";
import { useState } from "react";
import { ShieldCheck, Info, Zap } from "lucide-react";

export default function BookingWidget({ carPrice }: { carPrice: number }) {
  const [protection, setProtection] = useState<'basic' | 'max'>('basic');
  
  // Mock Calculation
  const durationHours = 24; 
  const baseTotal = carPrice * durationHours;
  const protectionCost = protection === 'max' ? 299 : 0;
  const taxes = (baseTotal + protectionCost) * 0.18;
  const finalTotal = baseTotal + protectionCost + taxes;

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-6">
        <div>
           <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Estimate</p>
           <h3 className="text-3xl font-space font-bold text-white">₹{finalTotal.toFixed(0)}</h3>
        </div>
        <div className="text-right">
           <p className="text-lime-400 text-sm font-bold">{durationHours} Hours</p>
           <p className="text-gray-500 text-xs">Oct 12 - Oct 13</p>
        </div>
      </div>

      {/* Protection Plans */}
      <div className="space-y-3 mb-8">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Protection Plan</p>
        
        {/* Basic Plan */}
        <div 
          onClick={() => setProtection('basic')}
          className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
            protection === 'basic' ? 'bg-white/5 border-lime-400' : 'bg-transparent border-white/10 hover:border-white/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${protection === 'basic' ? 'border-lime-400' : 'border-gray-600'}`}>
              {protection === 'basic' && <div className="w-2.5 h-2.5 bg-lime-400 rounded-full" />}
            </div>
            <div>
              <p className="text-sm font-bold text-white">Standard</p>
              <p className="text-xs text-gray-500">Liability: ₹5,000</p>
            </div>
          </div>
          <span className="text-xs font-bold text-gray-400">Free</span>
        </div>

        {/* Max Plan */}
        <div 
          onClick={() => setProtection('max')}
          className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
            protection === 'max' ? 'bg-white/5 border-lime-400' : 'bg-transparent border-white/10 hover:border-white/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${protection === 'max' ? 'border-lime-400' : 'border-gray-600'}`}>
              {protection === 'max' && <div className="w-2.5 h-2.5 bg-lime-400 rounded-full" />}
            </div>
            <div>
              <p className="text-sm font-bold text-white">Max Cover</p>
              <p className="text-xs text-gray-500">Liability: ₹0</p>
            </div>
          </div>
          <span className="text-xs font-bold text-lime-400">+₹299</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 text-sm text-gray-400 mb-8 border-t border-dashed border-white/10 pt-4">
         <div className="flex justify-between">
            <span>Trip Fare</span>
            <span>₹{baseTotal}</span>
         </div>
         <div className="flex justify-between">
            <span>Damage Protection</span>
            <span>₹{protectionCost}</span>
         </div>
         <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{taxes.toFixed(0)}</span>
         </div>
         <div className="flex justify-between text-lime-400 font-bold pt-2">
            <span>Refundable Deposit</span>
            <span>₹2,000</span>
         </div>
      </div>

      <button className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-4 rounded-xl text-lg uppercase tracking-wide transition-all active:scale-[0.98]">
        Proceed to Pay
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
         <ShieldCheck size={14} /> 100% Secure Transaction
      </div>
    </div>
  );
}