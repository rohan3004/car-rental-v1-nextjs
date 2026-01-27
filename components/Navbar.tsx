import { CarFront, Menu, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
      <div className="max-w-7xl mx-auto backdrop-blur-xl bg-[#080808]/80 border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center text-black shadow-[0_0_15px_rgba(163,230,53,0.4)] group-hover:scale-105 transition-transform">
            <CarFront size={24} />
          </div>
          <span className="font-space font-bold text-xl tracking-tight text-white group-hover:text-lime-400 transition-colors">
            gocarrentals
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-lime-400 transition-colors">Fleet</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#offers" className="hover:text-white transition-colors">Offers</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQs</a>
        </div>

        {/* Auth / Menu */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-sm font-bold hover:bg-white/10 px-4 py-2 rounded-lg transition-colors text-white border border-transparent hover:border-white/10">
            <User size={16} />
            Login
          </button>
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}