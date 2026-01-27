import { CarFront, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
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
  );
}