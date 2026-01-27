import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  return (
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
  );
}