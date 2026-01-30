"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FleetSection from "@/components/sections/FleetSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-amber-400 selection:text-black bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero + Search Console */}
      <HeroSection />
      
      {/* Core Value Prop (Process) */}
      <HowItWorksSection />
      
      {/* The Product (Cars) - ID used for scrolling */}
      <div id="fleet-section">
        <FleetSection />
      </div>
      
      {/* Social Proof (Reviews) */}
      <TestimonialsSection />
      
      {/* Trust/Info (FAQ) */}
      <FaqSection />
      
      <Footer />
    </main>
  );
}