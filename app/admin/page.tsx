"use client";

import { useState } from "react";
import { 
  LayoutDashboard, Car, CalendarDays, Users, Settings, 
  LogOut, TrendingUp, AlertCircle, Check, X, Search, FileText 
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex">
      
      {/* --- ADMIN SIDEBAR --- */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col fixed h-full bg-[#0A0A0C]">
        <div className="flex items-center gap-2 mb-10 text-lime-400">
          <LayoutDashboard size={24} />
          <span className="font-space font-bold text-xl tracking-tight text-white">GoCar<span className="text-gray-500 text-xs ml-1">ADMIN</span></span>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'bookings', label: 'Bookings', icon: CalendarDays },
            { id: 'fleet', label: 'Fleet Status', icon: Car },
            { id: 'users', label: 'Customers', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-lime-400 text-black' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-bold transition-colors">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-64 p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-space text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back, Admin.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2 text-gray-400">
                <Search size={16} />
                <input type="text" placeholder="Search booking ID..." className="bg-transparent outline-none text-sm text-white w-48" />
             </div>
             <div className="w-10 h-10 rounded-full bg-lime-400 text-black font-bold flex items-center justify-center">
                AD
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
           {[
             { label: "Total Revenue", value: "₹4.2L", change: "+12%", icon: TrendingUp, color: "text-lime-400" },
             { label: "Active Trips", value: "05", change: "3 cars idle", icon: Car, color: "text-blue-400" },
             { label: "Pending KYC", value: "03", change: "Action needed", icon: AlertCircle, color: "text-orange-400" },
             { label: "Total Users", value: "1,240", change: "+5 this week", icon: Users, color: "text-purple-400" },
           ].map((stat, i) => (
              <div key={i} className="bg-[#111] border border-white/10 p-5 rounded-2xl">
                 <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                       <stat.icon size={20} />
                    </div>
                    <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-green-400">{stat.change}</span>
                 </div>
                 <div className="text-2xl font-bold font-space text-white">{stat.value}</div>
                 <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">{stat.label}</div>
              </div>
           ))}
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
           <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-bold text-lg">Recent Bookings</h2>
              <button className="text-xs font-bold text-lime-400 uppercase tracking-wider hover:underline">View All</button>
           </div>
           
           <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-white/5 text-gray-200 uppercase font-bold text-xs tracking-wider">
                 <tr>
                    <th className="p-4 pl-6">Booking ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Car</th>
                    <th className="p-4">Dates</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">KYC</th>
                    <th className="p-4 text-right pr-6">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {[
                   { id: "GCR-8821", name: "Rahul Sharma", car: "Swift Dzire", date: "Oct 12 - 13", status: "Confirmed", kyc: "Verified" },
                   { id: "GCR-8822", name: "Priya Singh", car: "Tata Nexon", date: "Oct 14 - 15", status: "Pending", kyc: "Pending" },
                   { id: "GCR-8823", name: "Amit Kumar", car: "Swift Dzire", date: "Oct 18 - 19", status: "Active", kyc: "Verified" },
                 ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                       <td className="p-4 pl-6 font-mono text-white">{row.id}</td>
                       <td className="p-4 font-bold text-white">{row.name}</td>
                       <td className="p-4">{row.car}</td>
                       <td className="p-4">{row.date}</td>
                       <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                             row.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' :
                             row.status === 'Pending' ? 'bg-orange-500/20 text-orange-400' :
                             'bg-blue-500/20 text-blue-400'
                          }`}>
                             {row.status}
                          </span>
                       </td>
                       <td className="p-4">
                          {row.kyc === 'Verified' ? (
                             <span className="text-green-400 flex items-center gap-1 text-xs font-bold"><Check size={12} /> Verified</span>
                          ) : (
                             <button className="text-orange-400 flex items-center gap-1 text-xs font-bold hover:underline"><FileText size={12} /> Review</button>
                          )}
                       </td>
                       <td className="p-4 pr-6 text-right">
                          <button className="p-2 hover:bg-white/10 rounded-lg text-white">
                             <Settings size={16} />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

      </main>
    </div>
  );
}