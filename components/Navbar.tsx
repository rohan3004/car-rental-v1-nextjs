"use client";

import { useState } from "react";
import { Menu, User, LogOut, Loader2 } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import MobileMenu from "@/components/MobileMenu";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Design Change: 
        Switched from a floating "pill" to a full-width, razor-sharp glass bar.
        This feels more architectural and premium.
      */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer opacity-90 hover:opacity-100 transition-opacity">
             <div className="relative w-32 h-10 md:w-40 md:h-12">
               {/* Ensure your logo image background is transparent or matches the dark theme */}
               <Image src="/logo.jpg" alt="GoCar" fill className="object-contain" priority />
             </div>
          </Link>

          {/* Desktop Links - Luxury Minimal Style */}
          <div className="hidden md:flex items-center gap-10">
            {['Fleet', 'Experience', 'Contact'].map((item, i) => (
              <Link 
                key={i}
                href={item === 'Experience' ? '/#how-it-works' : `/${item.toLowerCase()}`} 
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-amber-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
             {loading ? (
               <Loader2 className="animate-spin text-amber-400" size={18} />
             ) : user ? (
               <div className="hidden md:flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Welcome</p>
                    <p className="text-sm font-serif text-white">{user.phoneNumber}</p>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <button 
                    onClick={() => logout()} 
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider group"
                  >
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Sign Out
                  </button>
               </div>
             ) : (
               <button 
                  onClick={() => setAuthOpen(true)}
                  className="hidden md:flex items-center gap-2 bg-white text-black px-6 py-2.5 hover:bg-amber-400 transition-colors group"
               >
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Login</span>
                  <User size={14} className="group-hover:scale-110 transition-transform" />
               </button>
             )}
             
             {/* Mobile Menu Trigger */}
             <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white hover:text-amber-400 transition-colors">
                <Menu size={24} strokeWidth={1.5} />
             </button>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} onLoginSuccess={() => {}} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onLoginClick={() => setAuthOpen(true)} isLoggedIn={!!user} />
    </>
  );
}