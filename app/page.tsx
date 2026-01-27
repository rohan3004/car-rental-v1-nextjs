"use client";

import Navbar from "@/components/Navbar";
import SearchConsole from "@/components/SearchConsole";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { MOCK_CARS } from "@/lib/mockData";
import { 
  ArrowRight, Fuel, ShieldCheck, Star, Zap, Smartphone, 
  IndianRupee, CheckCircle2, ChevronDown, Ticket, Instagram, Twitter, Linkedin, Facebook,
  CarFront
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-lime-400 selection:text-black font-sans bg-[#050505] text-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-6 overflow-hidden border-b border-white/10">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 relative z-10">
            {/* Tag: Increased contrast text */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime-400/10 border border-lime-400/30 rounded-full text-lime-400 text-sm font-bold uppercase tracking-widest mb-2">
              <Zap size={14} /> The Future of Rentals
            </div>
            
            <h1 className="font-space text-5xl md:text-7xl font-black leading-[1.0] tracking-tight text-white">
              UNLIMIT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
                YOUR DRIVE.
              </span>
            </h1>
            
            {/* Description: Lighter grey for readability */}
            <p className="text-xl text-gray-200 max-w-xl leading-relaxed font-medium">
              Experience the freedom of self-drive. Book top-rated cars in Bangalore. 
              Zero paperwork. Unlimited KMs available.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4 text-base font-semibold text-gray-200">
              <span className="flex items-center gap-2"><CheckCircle2 size={20} className="text-lime-400"/> No Security Deposit</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={20} className="text-lime-400"/> 24/7 Roadside Support</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative z-20 flex justify-center lg:justify-end">
             <SearchConsole />
          </div>
        </div>
      </section>

      {/* --- FEATURED IN --- */}
      <section className="py-10 border-b border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Trusted by 10,000+ Users & Featured in</p>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
              <span className="text-xl font-bold font-space text-white">TechCrunch</span>
              <span className="text-xl font-bold font-space text-white">YourStory</span>
              <span className="text-xl font-bold font-space text-white">Inc42</span>
              <span className="text-xl font-bold font-space text-white">Forbes India</span>
           </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Clear Steps) --- */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-space text-3xl md:text-5xl font-bold mb-4 text-white">Book. Unlock. Drive.</h2>
             <p className="text-lg text-gray-300 font-medium">A seamless experience designed for everyone.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-lime-400/30 to-transparent"></div>

             {[
               { icon: Smartphone, title: "1. Book", desc: "Choose your car via app or web." },
               { icon: ShieldCheck, title: "2. Verify", desc: "Upload Driving License once." },
               { icon: Zap, title: "3. Unlock", desc: "Reach location & unlock via OTP." },
               { icon: ArrowRight, title: "4. Return", desc: "End trip & get instant refund." }
             ].map((step, i) => (
               <div key={i} className="relative flex flex-col items-center text-center z-10">
                  <div className="w-24 h-24 rounded-2xl bg-[#111] border-2 border-white/10 flex items-center justify-center text-lime-400 shadow-xl mb-6 group hover:border-lime-400 transition-colors">
                     <step.icon size={36} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-space text-2xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-base text-gray-300 max-w-[200px] leading-relaxed">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- TRENDING OFFERS --- */}
      <section id="offers" className="py-20 bg-[#0A0A0C] border-y border-white/10">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-space text-3xl font-bold mb-10 text-white">Exclusive Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { code: "NEWRIDE", discount: "20% OFF", desc: "On your first booking" },
                 { code: "WEEKEND500", discount: "FLAT ₹500", desc: "On bookings > 48 hrs" },
                 { code: "SWIFTLOVER", discount: "15% OFF", desc: "Special for Swift Dzire" }
               ].map((offer, i) => (
                 <div key={i} className="relative bg-[#151515] border border-white/15 rounded-xl p-6 flex items-center justify-between overflow-hidden hover:border-lime-400 transition-all cursor-pointer">
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0A0A0C] rounded-full border border-white/15"></div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0A0A0C] rounded-full border border-white/15"></div>
                    
                    <div>
                       <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{offer.desc}</div>
                       <div className="text-3xl font-space font-bold text-white">{offer.discount}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <Ticket className="text-lime-400" />
                       <span className="text-sm font-mono font-bold bg-lime-400/10 text-lime-400 px-3 py-1 rounded border border-lime-400/30">{offer.code}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- LIVE FLEET --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-space text-4xl font-bold text-white">The Garage</h2>
            <p className="text-lg text-gray-300 mt-2">Meticulously maintained machinery.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_CARS.map((car) => (
            <SpotlightCard key={car.id} className="group border border-white/15">
              <div className="p-6">
                <div className="relative h-56 w-full mb-6 rounded-xl overflow-hidden border border-white/5">
                  <Image src={car.imageUrl} alt={car.modelName} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold border border-white/20 text-white">
                     {car.transmission}
                  </div>
                </div>
                <h3 className="font-space text-2xl font-bold text-white mb-1">{car.modelName}</h3>
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">Hourly Rate</span>
                    <span className="text-2xl font-bold font-space text-lime-400">₹{car.basePricePerHour}</span>
                  </div>
                  <button className="px-8 py-3 bg-white text-black font-bold rounded-xl text-base hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Book Now
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-[#080808] border-t border-white/10">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-space text-3xl font-bold mb-12 text-center text-white">Driven by You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { name: "Rahul S.", role: "Tech Lead", text: "The cleanest cars I've found in Indiranagar. The keyless unlock is a game changer." },
                 { name: "Priya M.", role: "Travel Blogger", text: "Took the Dzire for a weekend trip to Coorg. Zero issues, and the refund was instant." },
                 { name: "Arjun K.", role: "Entrepreneur", text: "Better than owning a car. I just book when I need it. No maintenance headaches." }
               ].map((review, i) => (
                  <div key={i} className="bg-[#111] p-8 rounded-2xl border border-white/10 relative hover:border-white/20 transition-colors">
                     <p className="text-gray-200 text-lg mb-6 relative z-10 leading-relaxed font-medium">"{review.text}"</p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-lg">
                           {review.name.charAt(0)}
                        </div>
                        <div>
                           <div className="font-bold text-white text-base">{review.name}</div>
                           <div className="text-sm text-gray-400">{review.role}</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
         <h2 className="font-space text-3xl font-bold mb-10 text-center text-white">Common Questions</h2>
         <div className="space-y-4">
            {[
               { q: "Is fuel included in the price?", a: "No, we follow a 'Fill as you drive' policy. You get the car with a certain fuel level, and you return it at the same level." },
               { q: "What documents are required?", a: "You need a valid Driving Licence (Original) and an Aadhaar Card / Voter ID for ID proof." },
               { q: "Is there a security deposit?", a: "We charge a small fully refundable security deposit of ₹2000. This is refunded instantly after trip end." },
               { q: "What if the car breaks down?", a: "We have 24/7 Roadside Assistance. Just call the support number on the dashboard." }
            ].map((item, i) => (
               <details key={i} className="group bg-[#111] rounded-xl border border-white/10 open:border-lime-400/50 transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-lg text-gray-100 group-hover:text-white">
                     {item.q}
                     <ChevronDown className="group-open:rotate-180 transition-transform text-gray-400" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 text-base leading-relaxed border-t border-white/5 pt-4">
                     {item.a}
                  </div>
               </details>
            ))}
         </div>
      </section>

      {/* --- MEGA FOOTER --- */}
      <footer className="bg-[#020202] border-t border-white/10 pt-20 pb-10 px-6">
         <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
               <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                     <CarFront className="text-lime-400" size={30} />
                     <span className="font-space font-bold text-2xl text-white">gocarrentals</span>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed max-w-xs mb-6 font-medium">
                     Bengaluru's premium self-drive car rental service. 
                     Engineered for local travel and outstation trips.
                  </p>
                  <div className="flex gap-4">
                     {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-lime-400 hover:text-black transition-all">
                           <Icon size={18}/>
                        </a>
                     ))}
                  </div>
               </div>

               <div>
                  <h4 className="font-bold text-white text-lg mb-6">Company</h4>
                  <ul className="space-y-4 text-base text-gray-400">
                     <li><a href="#" className="hover:text-lime-400 transition-colors">About Us</a></li>
                     <li><a href="#" className="hover:text-lime-400 transition-colors">Careers</a></li>
                     <li><a href="#" className="hover:text-lime-400 transition-colors">Blog</a></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-white text-lg mb-6">Support</h4>
                  <ul className="space-y-4 text-base text-gray-400">
                     <li><a href="#" className="hover:text-lime-400 transition-colors">Help Center</a></li>
                     <li><a href="#" className="hover:text-lime-400 transition-colors">Terms & Conditions</a></li>
                     <li><a href="#" className="hover:text-lime-400 transition-colors">Privacy Policy</a></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-white text-lg mb-6">Contact</h4>
                  <ul className="space-y-4 text-base text-gray-400">
                     <li>Indiranagar, Bangalore</li>
                     <li>Karnataka, 560038</li>
                     <li className="pt-2 text-lime-400 font-bold text-lg">+91 98765 43210</li>
                  </ul>
               </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
               <div>© 2024 GoCarRentals Pvt Ltd. All rights reserved.</div>
            </div>
         </div>
      </footer>
    </main>
  );
}