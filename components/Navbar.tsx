"use client";

import { useState } from "react";
import { Menu, User, LogOut, Loader2 } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import MobileMenu from "@/components/MobileMenu";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext"; // <--- USE THE HOOK

export default function Navbar() {
  const { user, loading, logout } = useAuth(); // <--- Get Global State
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-[#080808]/80 border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
             <div className="relative w-32 h-10 md:w-40 md:h-12">
               <Image src="/logo.jpg" alt="GoCar" fill className="object-contain" priority />
             </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/" className="hover:text-lime-400 transition-colors">Fleet</Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
          </div>

          <div className="flex items-center gap-4">
             {loading ? (
               <Loader2 className="animate-spin text-lime-400" size={18} />
             ) : user ? (
               <div className="hidden md:flex items-center gap-4">
                  <span className="text-sm font-bold text-white">{user.phoneNumber}</span>
                  <button onClick={() => logout()} className="text-gray-400 hover:text-red-400 transition-colors" title="Logout">
                    <LogOut size={20} />
                  </button>
               </div>
             ) : (
               <button 
                  onClick={() => setAuthOpen(true)}
                  className="hidden md:flex items-center gap-2 text-sm font-bold bg-lime-400 text-black px-5 py-2.5 rounded-xl hover:bg-lime-500 transition-colors"
                >
                  <User size={18} /> Login
                </button>
             )}
             
             {/* Mobile Menu Trigger */}
             <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white"><Menu size={24} /></button>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} onLoginSuccess={() => {}} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onLoginClick={() => setAuthOpen(true)} isLoggedIn={!!user} />
    </>
  );
}