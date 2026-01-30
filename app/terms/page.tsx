import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <h1 className="font-space text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="space-y-6 text-gray-400 leading-relaxed">
          <p>Last updated: October 2024</p>
          <section>
            <h2 className="text-xl font-bold text-white mb-2">1. Rental Agreement</h2>
            <p>By booking a vehicle with GoCarRentals, you agree to abide by the speed limits (80km/h) and traffic laws of Karnataka.</p>
          </section>
          <section>
             <h2 className="text-xl font-bold text-white mb-2">2. Security Deposit</h2>
             <p>A fully refundable deposit of ₹2,000 is collected. It will be refunded within 24 hours of trip completion, subject to no damage.</p>
          </section>
          <section>
             <h2 className="text-xl font-bold text-white mb-2">3. Fuel Policy</h2>
             <p>The vehicle is provided with a certain fuel level. You must return it at the same level. Any deficit will be charged at actuals + service fee.</p>
          </section>
          {/* Add more legal filler text here */}
        </div>
      </div>
      <Footer />
    </main>
  );
}