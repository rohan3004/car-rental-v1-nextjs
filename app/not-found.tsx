export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#050505] text-white selection:bg-amber-400 selection:text-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 text-center">
        <h1 className="text-[10rem] font-serif font-bold text-amber-500/20 leading-none select-none">
          404
        </h1>
        
        <div className="-mt-12 space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif text-white">
            Off the map.
          </h2>
          <p className="text-zinc-500 font-sans tracking-wide">
            The destination you are looking for does not exist.
          </p>
          
          <a 
            href="/" 
            className="inline-flex h-12 items-center justify-center px-8 bg-white text-black font-bold text-xs uppercase tracking-[0.25em] hover:bg-amber-400 transition-colors duration-300"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  )
}