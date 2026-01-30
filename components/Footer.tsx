import { CarFront, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="relative w-32 h-10 mb-6 opacity-80">
               {/* Replace with your logo image if available, else text */}
               <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl text-white tracking-tight">GoCar.</span>
               </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-8 font-sans">
              West Bengal's premier chauffeur-driven car rental service. 
              Engineered for comfort, designed for reliability.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-zinc-400 hover:border-amber-400 hover:text-amber-400 transition-all duration-300">
                  <Icon size={16} strokeWidth={1.5}/>
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-serif text-white text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              {['About Us', 'Careers', 'Press', 'Blog'].map((item) => (
                 <li key={item}><Link href="#" className="hover:text-amber-400 transition-colors tracking-wide">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-serif text-white text-lg mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Refund Policy'].map((item) => (
                 <li key={item}><Link href="#" className="hover:text-amber-400 transition-colors tracking-wide">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-serif text-white text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="leading-relaxed">
                Park Street, Kolkata<br />
                West Bengal, 700016
              </li>
              <li>
                <a href="tel:+919876543210" className="text-amber-400 hover:text-amber-300 font-bold tracking-wide text-base block">
                   +91 98765 43210
                </a>
                <span className="text-xs uppercase tracking-widest mt-1 block opacity-50">Mon - Sun, 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
          <div>© 2024 GoCar Rentals. All rights reserved.</div>
          <div className="flex gap-8">
             <span>West Bengal</span>
             <span>India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}