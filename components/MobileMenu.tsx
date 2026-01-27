"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CarFront, User, ChevronRight } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

export default function MobileMenu({ isOpen, onClose, onLoginClick, isLoggedIn }: MobileMenuProps) {
  const menuVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Menu Panel */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#0F0F11] border-l border-white/10 z-[70] p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2 text-white">
                <CarFront className="text-lime-400" />
                <span className="font-space font-bold text-xl">Menu</span>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Auth Section */}
            <div className="mb-8 border-b border-white/10 pb-8">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-lime-400 text-black font-bold flex items-center justify-center text-lg">
                    JD
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">John Doe</div>
                    <div className="text-sm text-gray-500">View Profile</div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onLoginClick();
                  }}
                  className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-lime-400 transition-all"
                >
                  <User size={20} /> Login / Signup
                </button>
              )}
            </div>

            {/* Links */}
            <div className="space-y-2">
              {[
                { label: "Browse Fleet", href: "/" },
                { label: "How it Works", href: "/#how-it-works" },
                { label: "Special Offers", href: "/#offers" },
                { label: "Support & FAQs", href: "/#faq" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors group"
                >
                  <span className="font-bold text-lg">{link.label}</span>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-lime-400" />
                </Link>
              ))}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-center text-xs text-gray-600">
                v1.0.0 • GoCarRentals
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}