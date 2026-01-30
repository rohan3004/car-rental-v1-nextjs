"use client";

import { useState, useEffect, useRef } from "react";
import { X, Loader2, Phone, ShieldCheck, ArrowRight, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "@/lib/firebase";

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  // Custom Error State
  const [error, setError] = useState<string | null>(null);

  const recaptchaInitialized = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      setStep('PHONE');
      setPhone("");
      setOtp(["", "", "", "", "", ""]);
      setLoading(false);
      setError(null);
      recaptchaInitialized.current = false;
      
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
  }, [isOpen]);

  const initRecaptcha = () => {
    if (window.recaptchaVerifier) return;
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {},
        'expired-callback': () => {
          setError("Security check expired. Please try again.");
          setLoading(false);
        }
      });
      recaptchaInitialized.current = true;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    initRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = `+91${phone}`;

    try {
      const confirmation = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      setConfirmationResult(confirmation);
      setLoading(false);
      setStep('OTP');
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      if (err.code === 'auth/too-many-requests') setError("Too many requests. Try again later.");
      else if (err.code === 'auth/invalid-phone-number') setError("Invalid phone format.");
      else if (err.code === 'auth/quota-exceeded') setError("System busy (Quota). Try test number.");
      else setError("Failed to send code. Please try again.");
      
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    setError(null);
    if (code.length < 6) return setError("Please enter the 6-digit code.");
    
    setLoading(true);

    try {
      const result = await confirmationResult?.confirm(code);
      if (result?.user) {
        const token = await result.user.getIdToken();
        onLoginSuccess(token);
        onClose();
      }
    } catch (err) {
      setError("Incorrect OTP. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
        <div id="recaptcha-container"></div>

        <div className="mb-6 text-center">
          <div className="w-12 h-12 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-400 border border-amber-400/20">
             {step === 'PHONE' ? <Phone size={20} /> : <ShieldCheck size={20} />}
          </div>
          <h2 className="text-xl font-serif text-white tracking-wide">
            {step === 'PHONE' ? 'Sign In' : 'Verify Code'}
          </h2>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">
            {step === 'PHONE' ? 'Secure Access' : `Sent to +91 ${phone}`}
          </p>
        </div>

        {/* ERROR BANNER */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-4 flex items-center gap-2"
            >
               <AlertTriangle size={14} className="shrink-0" /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {step === 'PHONE' ? (
          <form onSubmit={handleSendOtp}>
            <div className="relative mb-4 group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold border-r border-white/10 pr-3 group-focus-within:text-amber-400 transition-colors">+91</span>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                    setError(null);
                }}
                className="w-full bg-[#1A1A1C] border border-white/10 rounded-xl py-3 pl-16 pr-4 text-white font-bold tracking-widest focus:border-amber-400 outline-none transition-colors placeholder-gray-700"
                placeholder="00000 00000"
                autoFocus
              />
            </div>
            <button disabled={loading} className="w-full bg-white text-black font-bold py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 uppercase tracking-wider">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Get Code <ArrowRight size={16}/></>}
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, i) => (
                 <input 
                   key={i} 
                   type="text" 
                   maxLength={1}
                   value={digit}
                   onChange={(e) => {
                       handleOtpChange(e.target, i);
                       setError(null);
                   }}
                   className="w-10 h-12 bg-[#1A1A1C] border border-white/10 rounded-lg text-center text-lg font-bold text-white focus:border-amber-400 outline-none transition-colors" 
                 />
              ))}
            </div>
            <button onClick={handleVerifyOtp} disabled={loading} className="w-full bg-amber-400 text-black font-bold py-3 rounded-xl text-sm hover:bg-amber-500 transition-colors flex justify-center uppercase tracking-wider">
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Verify & Login"}
            </button>
            <button onClick={() => setStep('PHONE')} className="w-full mt-4 text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Change Number</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}