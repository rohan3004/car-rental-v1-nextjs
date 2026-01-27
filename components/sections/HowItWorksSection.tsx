import { Smartphone, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  return (
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
  );
}