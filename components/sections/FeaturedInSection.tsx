export default function FeaturedInSection() {
  return (
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
  );
}