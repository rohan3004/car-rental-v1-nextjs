import { Smartphone, CalendarCheck, UserCheck, Smile } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <h2 className="font-space text-3xl md:text-5xl font-bold mb-4 text-white">Your Journey, Simplified.</h2>
           <p className="text-lg text-gray-300 font-medium">Book a chauffeur-driven car in 4 easy steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
           <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-lime-400/30 to-transparent"></div>
           {[
             { icon: Smartphone, title: "1. Select", desc: "Choose your district, city, and dates." },
             { icon: CalendarCheck, title: "2. Book", desc: "Select your preferred car and request booking." },
             { icon: UserCheck, title: "3. Confirm", desc: "We confirm availability & assign a driver." },
             { icon: Smile, title: "4. Enjoy", desc: "Driver arrives at your doorstep. Enjoy the ride." }
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
  );
}