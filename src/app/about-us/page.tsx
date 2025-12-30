"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, 
  Search, 
  User, 
  Settings, 
  Bell, 
  ShieldCheck, 
  CreditCard, 
  Leaf, 
  ChevronRight,
  Camera,
  LogOut,
  Moon,
  Languages
} from 'lucide-react';

/* ==========================================================================
   COMPONENT: Header (Consistente con About Us)
   ========================================================================== */
const Header = () => {
  const navItems = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Globe', href: 'https://eco-travel-globe-earthly.vercel.app/' },
    { name: 'Settings', href: '/settings' },
    { name: 'Help/FAQ', href: '#' },
    { name: 'Sign Up', href: '#' }
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-[30px] py-6 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 group cursor-pointer no-underline">
        <Globe 
          className="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:text-blue-400" 
          strokeWidth={1.5} 
        />
        <span className="text-white font-bold text-xl tracking-wide font-sans transition-colors group-hover:text-white/90">
          EARTHLY
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-lg transition-all hover:bg-white/[0.15] hover:border-white/20">
        {navItems.map((item) => {
          const isExternal = item.href.startsWith('http');
          const commonClasses = "text-white text-sm font-medium transition-all duration-300 hover:scale-110 hover:text-blue-300 transform no-underline active:scale-95";
          
          if (isExternal) {
            return (
              <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                {item.name}
              </a>
            );
          }
          return (
            <Link key={item.name} href={item.href} className={commonClasses}>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-90 border border-white/5">
          <Search size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-90 border border-white/5">
          <User size={18} />
        </button>
      </div>
    </header>
  );
};

/* ==========================================================================
   PÁGINA: Settings
   ========================================================================== */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: <User size={18} /> },
    { id: 'preferences', label: 'Travel Preferences', icon: <Leaf size={18} /> },
    { id: 'security', label: 'Security & Access', icon: <ShieldCheck size={18} /> },
    { id: 'billing', label: 'Payments & Billing', icon: <CreditCard size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  ];

  return (
    <main className="relative w-full min-h-screen bg-[#050609] font-sans text-white overflow-x-hidden
                    [&::-webkit-scrollbar]:w-2 
                    [&::-webkit-scrollbar-track]:bg-transparent 
                    [&::-webkit-scrollbar-thumb]:bg-white/10 
                    hover:[&::-webkit-scrollbar-thumb]:bg-white/20 
                    [&::-webkit-scrollbar-thumb]:rounded-full">
      
      {/* Background Decor (Igual que About Us) */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[80px] left-[-200px] w-[900px] h-[900px] bg-blue-900/10 blur-[160px] rounded-full mix-blend-screen opacity-50" />
        <div className="absolute bottom-0 right-[-200px] w-[700px] h-[700px] bg-emerald-900/10 blur-[140px] rounded-full opacity-30" />
      </div>

      <Header />

      <div className="relative z-10 max-w-7xl mx-auto px-[30px] pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Settings</h1>
          <p className="text-white/40 text-base font-light">Manage your regenerative journey and platform experience.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:w-1/4">
            <nav className="flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 text-left group
                    ${activeTab === item.id 
                      ? 'bg-white/10 text-white border border-white/20 shadow-xl' 
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                >
                  <span className={`${activeTab === item.id ? 'text-blue-400' : 'text-inherit'} transition-colors group-hover:scale-110 duration-300`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium tracking-wide">{item.label}</span>
                  {activeTab === item.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
                </button>
              ))}
              <div className="h-px bg-white/5 my-4" />
              <button className="flex items-center gap-4 px-5 py-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all text-sm font-medium">
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* MAIN CONTENT AREA */}
          <section className="flex-1">
            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-10 backdrop-blur-sm">
              
              {/* PROFILE SECTION */}
              {activeTab === 'profile' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
                  <div className="flex flex-col md:flex-row items-center gap-8 border-b border-white/5 pb-10">
                    <div className="relative group">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 transition-all group-hover:border-blue-400/50">
                        <img 
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300" 
                          alt="Avatar" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-4 border-[#0a0b10] hover:scale-110 transition-all">
                        <Camera size={14} />
                      </button>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-medium mb-1">Julian Alexander</h3>
                      <p className="text-white/40 text-[10px] font-light uppercase tracking-[0.2em] mb-4">Premium Eco-Traveler</p>
                      <button className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold ml-3">Full Name</label>
                      <input type="text" defaultValue="Julian Alexander" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-blue-400/50 transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold ml-3">Email Address</label>
                      <input type="email" defaultValue="julian.alex@earthly.travel" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-blue-400/50 transition-all" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold ml-3">Biography</label>
                      <textarea rows={3} defaultValue="Explorer by nature, conservator by choice. Searching for the hidden corners of the world that need our protection." className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-blue-400/50 transition-all resize-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* PREFERENCES SECTION */}
              {activeTab === 'preferences' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
                  <div>
                    <h3 className="text-xl font-medium mb-1">Platform Preferences</h3>
                    <p className="text-white/40 text-xs font-light">Customize how you interact with Earthly and the Eco Globe.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400">
                          <Leaf size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Automatic Carbon Offset</p>
                          <p className="text-[10px] text-white/30">Automatically donate to reforestation projects per trip booked.</p>
                        </div>
                      </div>
                      <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer shadow-lg shadow-blue-500/20">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center text-purple-400">
                          <Languages size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">System Language</p>
                          <p className="text-[10px] text-white/30">Currently set to English (Global).</p>
                        </div>
                      </div>
                      <button className="text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300">Change</button>
                    </div>

                    <div className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400">
                          <Moon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Dynamic Interface</p>
                          <p className="text-[10px] text-white/30">Adapt UI colors based on the destination ecosystem you explore.</p>
                        </div>
                      </div>
                      <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white/40 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION FOOTER */}
              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-end">
                <button className="px-6 py-3 rounded-xl text-white/40 font-medium hover:text-white transition-all text-xs">
                  Cancel Changes
                </button>
                <button className="px-8 py-3 bg-white !text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-all active:scale-95 shadow-xl shadow-white/5" style={{ color: '#000000' }}>
                  Save All Changes
                </button>
              </div>

            </div>
          </section>
        </div>
      </div>

      {/* FOOTER (Igual que About Us) */}
      <footer className="px-[30px] py-12 border-t border-white/5 relative z-10 text-center group cursor-default">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] group-hover:text-blue-400 group-hover:tracking-[0.5em] transition-all duration-700">EARTHLY TRAVEL PLATFORM • THE FUTURE OF SUSTAINABILITY</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
        a.no-underline { text-decoration: none !important; }
      `}} />
    </main>
  );
}