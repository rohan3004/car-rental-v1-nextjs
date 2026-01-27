"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Loader2, Phone, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('PHONE');
      setPhone("");
      setOtp(["", "", "", ""]);
      setLoading(false);
    }
  }, [isOpen]);

  // Simulate Sending OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
    }, 1500);
  };

  // Simulate Verifying OTP
  const handleVerifyOtp = () => {
    if (otp.join("").length < 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop Blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-[#0F0F11] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-lime-400/10 rounded-full flex items-center justify-center mx-auto mb-4 text-lime-400">
              {step === 'PHONE' ? <Phone size={24} /> : <ShieldCheck size={24} />}
            </div>
            <h2 className="text-2xl font-space font-bold text-white">
              {step === 'PHONE' ? 'Welcome Back' : 'Verify OTP'}
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              {step === 'PHONE' 
                ? 'Enter your mobile number to continue' 
                : `We sent a code to +91 ${phone}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'PHONE' ? (
              <motion.form 
                key="phone-form"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                onSubmit={handleSendOtp}
              >
                <div className="relative mb-6">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold border-r border-white/10 pr-3">+91</span>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full bg-[#1A1A1C] border border-white/10 rounded-xl py-4 pl-16 pr-4 text-white font-bold text-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                    placeholder="98765 43210"
                    autoFocus
                  />
                </div>
                <button 
                  disabled={phone.length < 10 || loading}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Get OTP <ArrowRight size={20} /></>}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="otp-form"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <div className="flex justify-between gap-3 mb-8">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      value={digit}
                      maxLength={1}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[i] = e.target.value;
                        setOtp(newOtp);
                        if (e.target.value && i < 3) document.getElementById(`otp-${i+1}`)?.focus();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[i] && i > 0) {
                           document.getElementById(`otp-${i-1}`)?.focus();
                        }
                      }}
                      className="w-full h-14 bg-[#1A1A1C] border border-white/10 rounded-xl text-center text-2xl font-bold text-white focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none transition-all"
                    />
                  ))}
                </div>
                <button 
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full bg-lime-400 text-black font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:bg-lime-500 transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Verify & Login'}
                </button>
                <button 
                  onClick={() => setStep('PHONE')}
                  className="w-full mt-4 text-sm text-gray-500 hover:text-white font-medium"
                >
                  Change Phone Number
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}