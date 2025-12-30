"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Leaf, 
  Globe, 
  Search, 
  User, 
  ArrowUpRight,
  Fingerprint,
  Compass
} from 'lucide-react';

/* ==========================================================================
   COMPONENT: Header (Integrated Version)
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
      {/* LEFT SIDE: Logo */}
      <Link href="/" className="flex items-center gap-2 group cursor-pointer no-underline">
        <Globe 
          className="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:text-blue-400" 
          strokeWidth={1.5} 
        />
        <span className="text-white font-bold text-xl tracking-wide font-sans transition-colors group-hover:text-white/90">
          EARTHLY
        </span>
      </Link>

      {/* CENTER: Main Navigation Menu */}
      <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-lg transition-all hover:bg-white/[0.15] hover:border-white/20">
        {navItems.map((item) => {
          const isExternal = item.href.startsWith('http');
          const commonClasses = "text-white text-sm font-medium transition-all duration-300 hover:scale-110 hover:text-blue-300 transform no-underline active:scale-95";
          
          if (isExternal) {
            return (
              <a 
                key={item.name} 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={commonClasses}
              >
                {item.name}
              </a>
            );
          }

          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={commonClasses}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* RIGHT SIDE: Action Buttons */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:border-white/30 active:scale-90 border border-white/5">
          <Search size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:border-white/30 active:scale-90 border border-white/5">
          <User size={18} />
        </button>
      </div>
    </header>
  );
};

/* ==========================================================================
   PAGE: About Us
   ========================================================================== */
export default function App() {
  const pillars = [
    { 
      title: "Sustainable Stewardship", 
      desc: "Earthly is not just a catalog; it&apos;s a filter. We evaluate every lodge and experience under rigorous ecological standards.", 
      icon: <Fingerprint className="text-blue-400" size={24} /> 
    },
    { 
      title: "Interactive Impact", 
      desc: "Through our Eco Travel Globe, we visualize global data to guide you toward areas where your presence fosters conservation.", 
      icon: <Globe className="text-yellow-400" size={24} /> 
    },
    { 
      title: "Ancestral Wisdom", 
      desc: "We blend modern luxury with ancient environmental management by partnering directly with local cultures.", 
      icon: <Compass className="text-emerald-400" size={24} /> 
    }
  ];

  return (
    <main className="relative w-full min-h-screen bg-[#050609] font-sans text-white overflow-x-hidden
                    [&::-webkit-scrollbar]:w-2 
                    [&::-webkit-scrollbar-track]:bg-transparent 
                    [&::-webkit-scrollbar-thumb]:bg-white/10 
                    hover:[&::-webkit-scrollbar-thumb]:bg-white/20 
                    [&::-webkit-scrollbar-thumb]:rounded-full">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[80px] left-[-200px] w-[900px] h-[900px] bg-blue-900/10 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-[-200px] w-[700px] h-[700px] bg-teal-900/10 blur-[140px] rounded-full" />
      </div>

      <Header />

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="px-[30px] pt-32 md:pt-48 pb-20 max-w-6xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:bg-white/10 transition-colors cursor-default">
            <Leaf size={14} />
            The Earthly Manifesto
          </div>
          <h1 className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-10 animate-in fade-in slide-in-from-top-8 duration-1000">
            A new era of <br /> <span className="text-white/40 italic font-light hover:text-white transition-colors duration-500 cursor-default">regenerative travel.</span>
          </h1>
          <h2 className="sr-only">Our Vision</h2>
          <p className="text-white/60 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto tracking-tight animate-in fade-in duration-1000 delay-300">
            Earthly was born from a simple idea: travel should give back more than it takes. We are a digital ecosystem dedicated to the preservation of our planet&apos;s most fragile corners.
          </p>
        </section>

        {/* ECO TRAVEL GLOBE DEEP DIVE */}
        <section className="px-[30px] py-20 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight">The Eco Travel Globe.</h2>
              <p className="text-white/50 text-lg font-light leading-relaxed italic">
                Our core innovation isn&apos;t just a map; it&apos;s the living pulse of the planet.
              </p>
              <p className="text-white/40 text-base font-light leading-relaxed">
                The **Eco Travel Globe** serves as the analytical heart of Earthly. It integrates real-time environmental data with our luxury network, allowing travelers to visualize the ecological health of their destination.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-sm font-medium text-blue-400 uppercase tracking-widest group cursor-default">
                  <div className="w-8 h-px bg-blue-400 transition-all group-hover:w-12" />
                  Visualize Health
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-emerald-400 uppercase tracking-widest group cursor-default">
                  <div className="w-8 h-px bg-emerald-400 transition-all group-hover:w-12" />
                  Map Sustainability
                </div>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-video rounded-[60px] overflow-hidden border border-white/10 group shadow-2xl shadow-blue-500/10 cursor-pointer">
              <Image 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
                alt="Technology and Earth" 
                fill
                unoptimized
                className="object-cover group-hover:scale-110 transition-transform duration-[4000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-black/60 opacity-60 group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center animate-pulse group-hover:scale-125 group-hover:bg-white/20 transition-all duration-500">
                    <Globe className="text-white" size={32} />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* PILLARS GRID */}
        <section className="px-[30px] py-24 w-full max-w-7xl mx-auto bg-white/[0.01] rounded-[80px] border border-white/5">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-4xl font-medium tracking-tight cursor-default hover:tracking-wide transition-all duration-700">Our Strategic Pillars</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-10 rounded-[40px] hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-transform duration-500">
                  {p.icon}
                </div>
                <h3 className="text-xl font-medium mb-4 group-hover:text-blue-300 transition-colors">{p.title}</h3>
                <p className="text-white/40 font-light leading-relaxed group-hover:text-white/70 transition-colors">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="px-[30px] w-full max-w-7xl mx-auto my-32">
          <div className="bg-[#0a0b10] border border-white/10 rounded-[60px] p-8 md:p-20 flex flex-col md:flex-row items-center gap-16 overflow-hidden relative group shadow-2xl hover:border-white/20 transition-all duration-700">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -mr-64 -mt-64 transition-opacity group-hover:opacity-80" />
            
            <div className="md:w-1/2 relative z-10 space-y-8 text-left">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight">
                Inspiring <br /> responsible <br /> exploration.
              </h2>
              <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
                We believe travel should be a force for good. Our philosophy values the planet&apos;s natural beauty while protecting it for future generations through transparency and local empowerment.
              </p>
              <div className="pt-4">
                <a href="https://eco-travel-globe-earthly.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium border-b border-white/20 pb-1 hover:border-blue-400 hover:text-blue-300 transition-all group no-underline">
                  Explore the Eco Globe
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 relative h-[450px] w-full rounded-[40px] overflow-hidden border border-white/10 shadow-inner group-hover:border-white/30 transition-all">
              <Image 
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200" 
                alt="Earthly Landscape" 
                fill
                unoptimized
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        </section>

        {/* VALUES / FOOTER PREVIEW */}
        <section className="px-[30px] pb-32 text-center max-w-4xl mx-auto">
          <div className="w-px h-24 bg-gradient-to-b from-blue-500 to-transparent mx-auto mb-12 opacity-50 group-hover:h-32 transition-all duration-1000" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">Join the movement.</h2>
          <p className="text-white/30 text-lg font-light mb-12 italic hover:text-white/50 transition-colors cursor-default">
            &quot;We do not inherit the earth from our ancestors, we borrow it from our children.&quot;
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/destinations" 
              className="px-10 py-5 bg-white !text-black no-underline rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all active:scale-95 shadow-2xl flex items-center justify-center min-w-[240px]"
              style={{ color: '#000000' }}
            >
              Start your journey
            </Link>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="px-[30px] py-12 border-t border-white/5 relative z-10 text-center group cursor-default">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] group-hover:text-blue-400 group-hover:tracking-[0.5em] transition-all duration-700">
          EARTHLY TRAVEL PLATFORM • THE FUTURE OF SUSTAINABILITY
        </p>
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