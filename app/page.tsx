"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedInSection from "@/components/sections/FeaturedInSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import OffersSection from "@/components/sections/OffersSection";
import FleetSection from "@/components/sections/FleetSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-lime-400 selection:text-black font-sans bg-[#050505] text-white">
      <Navbar />
      
      <HeroSection />
      
      <FeaturedInSection />
      
      <HowItWorksSection />
      
      <OffersSection />
      
      {/* Wrapper ID for scrolling from Hero */}
      <div id="fleet-section">
        <FleetSection />
      </div>
      
      <TestimonialsSection />
      
      <FaqSection />
      
      <Footer />
    </main>
  );
}