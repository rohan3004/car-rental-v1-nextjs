"use client";

import { motion, AnimatePresence, Variants } from "framer-motion"; // 1. Import Variants
import { X, User, ChevronRight, LogOut, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

export default function MobileMenu({ isOpen, onClose, onLoginClick, isLoggedIn }: MobileMenuProps) {
  const { user, logout } = useAuth();
  
  // 2. Explicitly type this object as 'Variants'
  const menuVariants: Variants = {
    closed: { x: "100%", transition: { type: "tween", ease: "easeInOut", duration: 0.4 } },
    open: { x: 0, transition: { type: "tween", ease: "easeInOut", duration: 0.4 } },
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({ 
        opacity: 1, 
        x: 0, 
        transition: { delay: i * 0.1 + 0.2, duration: 0.4 } 
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60]"
          />

          {/* Menu Panel */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#0a0a0a] border-l border-amber-900/30 z-[70] p-8 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif italic text-2xl text-amber-400">Menu.</span>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-transform hover:rotate-90">
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            {/* Links Section */}
            <div className="flex-1 space-y-6">
              {[
                { label: "Our Fleet", href: "/" },
                { label: "The Experience", href: "/#how-it-works" },
                { label: "Client Stories", href: "/#testimonials" },
                { label: "FAQs", href: "/#faq" },
              ].map((link, i) => (
                <motion.div key={i} custom={i} variants={linkVariants}>
                    <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center justify-between border-b border-white/5 pb-4"
                    >
                    <span className="font-serif text-3xl text-gray-300 group-hover:text-white transition-colors">{link.label}</span>
                    <ChevronRight size={18} className="text-gray-600 group-hover:text-amber-400 transition-colors" />
                    </Link>
                </motion.div>
              ))}
            </div>

            {/* Auth Footer */}
            <div className="mt-auto">
              {isLoggedIn ? (
                <div className="bg-white/5 border border-white/10 p-6 rounded-none">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-black">
                       <User size={20} />
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs uppercase tracking-widest">Signed In</div>
                        <div className="text-white font-serif">{user?.phoneNumber}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => { logout(); onClose(); }}
                    className="w-full flex items-center justify-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest py-3 hover:bg-white/5 transition-colors border-t border-white/5"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onLoginClick();
                  }}
                  className="w-full bg-white text-black h-14 flex items-center justify-between px-6 hover:bg-amber-400 transition-colors group"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">Access Account</span>
                  <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              )}
              
              <div className="mt-8 flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest">
                 <span>© 2024 GoCar</span>
                 <span>West Bengal</span>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}