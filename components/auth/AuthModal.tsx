"use client";

import { useState, useEffect, useRef } from "react";
import { X, Loader2, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
  
  // Ref to prevent double-initialization of ReCAPTCHA
  const recaptchaInitialized = useRef(false);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      setStep('PHONE');
      setPhone("");
      setOtp(["", "", "", "", "", ""]);
      setLoading(false);
      recaptchaInitialized.current = false;
      
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.warn("Recaptcha clear error", e);
        }
        window.recaptchaVerifier = null;
      }
    }
  }, [isOpen]);

  const initRecaptcha = () => {
    if (window.recaptchaVerifier) return;
    
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // ReCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("ReCAPTCHA Verified");
        },
        'expired-callback': () => {
          console.warn("ReCAPTCHA Expired");
          alert("Security check expired. Please try again.");
          setLoading(false);
        }
      });
      recaptchaInitialized.current = true;
    } catch (error) {
      console.error("Recaptcha Init Error:", error);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Basic Validation
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    
    // 2. Initialize ReCAPTCHA
    initRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = `+91${phone}`; // Force India Code

    try {
      console.log("Sending OTP to:", formatPh);
      const confirmation = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      setConfirmationResult(confirmation);
      setLoading(false);
      setStep('OTP');
    } catch (error: any) {
      console.error("SMS Error:", error);
      setLoading(false);
      
      // 3. Specific Error Handling
      if (error.code === 'auth/too-many-requests') {
        alert("Too many requests. Try again later or use a different number.");
      } else if (error.code === 'auth/invalid-phone-number') {
        alert("Invalid phone number format.");
      } else if (error.code === 'auth/quota-exceeded') {
        alert("SMS Quota exceeded for this project.");
      } else {
        alert(`Failed to send SMS: ${error.message}`);
      }
      
      // Reset ReCAPTCHA on error so user can try again
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) return;
    
    setLoading(true);

    try {
      const result = await confirmationResult?.confirm(code);
      if (result?.user) {
        const token = await result.user.getIdToken();
        console.log("Login Success!");
        onLoginSuccess(token);
        onClose();
      }
    } catch (error: any) {
      console.error("OTP Error:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-focus helper
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
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md bg-[#0F0F11] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-8"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
        
        {/* RECAPTCHA CONTAINER (Must be present) */}
        <div id="recaptcha-container"></div>

        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-lime-400/10 rounded-full flex items-center justify-center mx-auto mb-4 text-lime-400">
             {step === 'PHONE' ? <Phone size={24} /> : <ShieldCheck size={24} />}
          </div>
          <h2 className="text-2xl font-space font-bold text-white">
            {step === 'PHONE' ? 'Login' : 'Verify Code'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {step === 'PHONE' ? 'Enter your mobile number' : `Sent to +91 ${phone}`}
          </p>
        </div>

        {step === 'PHONE' ? (
          <form onSubmit={handleSendOtp}>
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold border-r border-white/10 pr-3">+91</span>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full bg-[#1A1A1C] border border-white/10 rounded-xl py-4 pl-16 pr-4 text-white font-bold text-lg focus:border-lime-400 outline-none"
                placeholder="98765 43210"
                autoFocus
              />
            </div>
            <button disabled={phone.length < 10 || loading} className="w-full bg-white text-black font-bold py-4 rounded-xl text-lg hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : <>Get OTP <ArrowRight size={20}/></>}
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between gap-2 mb-8">
              {otp.map((digit, i) => (
                 <input 
                   key={i} 
                   type="text" 
                   maxLength={1}
                   value={digit}
                   onChange={(e) => handleOtpChange(e.target, i)}
                   className="w-10 h-14 bg-[#1A1A1C] border border-white/10 rounded-lg text-center text-xl font-bold text-white focus:border-lime-400 outline-none" 
                 />
              ))}
            </div>
            <button onClick={handleVerifyOtp} disabled={loading} className="w-full bg-lime-400 text-black font-bold py-4 rounded-xl text-lg hover:bg-lime-500 transition-colors flex justify-center">
              {loading ? <Loader2 className="animate-spin" /> : "Verify & Login"}
            </button>
            <button onClick={() => setStep('PHONE')} className="w-full mt-4 text-sm text-gray-500 hover:text-white">Change Number</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}