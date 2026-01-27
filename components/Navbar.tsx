"use client";

import { useState } from "react";
import { CarFront, Menu, User, LogOut } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import MobileMenu from "@/components/MobileMenu"; // <--- Import
import Link from "next/link";

export default function Navbar() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // <--- State
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => setLoggedIn(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-[#080808]/80 border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl">
          
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center text-black shadow-[0_0_15px_rgba(163,230,53,0.4)] group-hover:scale-105 transition-transform">
              <CarFront size={24} />
            </div>
            <span className="font-space font-bold text-xl tracking-tight text-white group-hover:text-lime-400 transition-colors">
              gocarrentals
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/" className="hover:text-lime-400 transition-colors">Fleet</Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="/#offers" className="hover:text-white transition-colors">Offers</Link>
            <Link href="/#faq" className="hover:text-white transition-colors">FAQs</Link>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                 <div className="hidden md:block text-right">
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Welcome</div>
                    <div className="text-sm font-bold text-white">John Doe</div>
                 </div>
                 <div className="group relative">
                    <button className="w-10 h-10 rounded-full bg-lime-400 text-black font-bold flex items-center justify-center border-2 border-transparent group-hover:border-white transition-all">
                      JD
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-32 bg-[#111] border border-white/10 rounded-xl overflow-hidden hidden group-hover:block">
                       <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2">
                         <LogOut size={14} /> Logout
                       </button>
                    </div>
                 </div>
              </div>
            ) : (
              <button 
                onClick={() => setAuthOpen(true)}
                className="hidden md:flex items-center gap-2 text-sm font-bold hover:bg-white/10 px-4 py-2 rounded-lg transition-colors text-white border border-transparent hover:border-white/10"
              >
                <User size={16} />
                Login
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)} // <--- Toggle
              className="md:hidden text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setAuthOpen(false)} 
        onLoginSuccess={() => setLoggedIn(true)}
      />

      {/* Mobile Menu Component */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onLoginClick={() => setAuthOpen(true)}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}