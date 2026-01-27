export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-9xl font-bold text-lime-400 font-space">404</h1>
      <p className="text-xl mt-4">Lost on the road?</p>
      <a href="/" className="mt-8 px-6 py-3 bg-white text-black font-bold rounded-xl">Go Home</a>
    </div>
  )
}