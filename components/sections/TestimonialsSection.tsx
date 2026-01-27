export default function TestimonialsSection() {
  return (
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
  );
}