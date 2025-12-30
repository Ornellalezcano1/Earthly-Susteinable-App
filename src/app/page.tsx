"use client";

import React, { useState } from 'react';
import {
  Map,
  Compass,
  Home as HomeIcon,
  Heart,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Globe,
  Search,
  User
} from 'lucide-react';

/* ==========================================================================
   COMPONENT: Header (Version with all extracted properties)
   ========================================================================== */
const Header = () => {
  const navItems = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Globe', href: 'https://eco-travel-globe-earthly.vercel.app/' },
    { name: 'Settings', href: '#' },
    { name: 'Help/FAQ', href: '#' },
    { name: 'Sign Up', href: '#' }
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-[30px] py-6 flex justify-between items-center">
      {/* LEFT SIDE: Logo */}
      <a href="/" className="flex items-center gap-2 group cursor-pointer no-underline">
        <Globe 
          className="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" 
          strokeWidth={1.5} 
        />
        <span className="text-white font-bold text-xl tracking-wide font-sans">
          EARTHLY
        </span>
      </a>

      {/* CENTER: Main navigation menu (Glassmorphism) */}
      <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-lg">
        {navItems.map((item) => (
          <a 
            key={item.name} 
            href={item.href} 
            className="text-white text-sm font-medium transition-all duration-300 hover:scale-110 transform no-underline"
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* RIGHT SIDE: Action buttons */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 border border-white/5">
          <Search size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 border border-white/5">
          <User size={18} />
        </button>
      </div>
    </header>
  );
};

/* ==========================================================================
   VIEW: Main Page Content
   ========================================================================== */
const HomeView = () => {
  const categories = [
    { name: 'Destinations', icon: <Map className="w-6 h-6 text-white" />, href: '/destinations' },
    { name: 'Experiences', icon: <Compass className="w-6 h-6 text-white" />, href: '/experiences' },
    { name: 'Lodges', icon: <HomeIcon className="w-6 h-6 text-white" />, href: '/lodges' },
    { name: 'Wishlist', icon: <Heart className="w-6 h-6 text-white" />, href: '/wishlist' },
  ];

  const destinationsData = [
    { id: 1, image: '/Popular_1.jpg', text: 'Tranquil lakes and majestic peaks await.', price: '$400' },
    { id: 2, image: '/Popular_2.jpg', text: 'Hike ancient trails and crystal-clear rivers.', price: '$400' },
    { id: 3, image: '/Popular_3.jpg', text: 'Explore alpine meadows and iconic summits.', price: '$400' },
    { id: 4, image: '/Popular_4.jpg', text: 'Relax on hidden beaches and turquoise waters.', price: '$400' },
  ];

  return (
    <div className="flex-1 relative flex flex-col w-full h-full overflow-hidden px-[30px]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 mt-12">
        <h1 className="text-white text-5xl md:text-7xl font-medium tracking-tight leading-tight drop-shadow-2xl animate-in slide-in-from-top duration-700">
          Discover Destinations
        </h1>
        <h2 className="mt-2 text-white/80 text-xl md:text-2xl font-light">
          Sustainable adventures start here
        </h2>

        {/* Category buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12">
          {categories.map((cat, index) => (
            <a key={index} href={cat.href} className="flex flex-col items-center gap-4 cursor-pointer group no-underline">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-lg shadow-black/20">
                {cat.icon}
              </div>
              <span className="text-white text-lg font-light tracking-wide">{cat.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Cards Section: Bottom margin 0 */}
      <section className="w-full z-20 pb-0 mt-auto">
        <div className="flex justify-between items-end mb-4 w-full">
          <h2 className="text-white text-xl md:text-2xl font-medium tracking-tight opacity-90">Popular Now</h2>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition backdrop-blur-sm">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition backdrop-blur-sm">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cards Container: Edge-to-edge layout */}
        <div className="flex xl:justify-between justify-start gap-6 overflow-x-auto snap-x scrollbar-hide w-full items-center pb-6">
          {destinationsData.map((dest) => (
            <div 
              key={dest.id} 
              className="relative shrink-0 w-80 h-64 md:w-[23%] md:h-72 rounded-[35px] bg-black/10 border border-white/10 overflow-hidden snap-center group cursor-pointer shadow-xl shadow-black/30"
            >
              <img 
                src={dest.image} 
                alt="Destination" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition z-10">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end gap-3 z-10">
                <p className="text-white text-base font-light leading-snug line-clamp-2 max-w-[220px] drop-shadow-md">{dest.text}</p>
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
                  <span className="text-white font-semibold text-sm">{dest.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
export default function App() {
  return (
    <main className="relative w-full h-screen bg-[#050609] font-sans text-white overflow-hidden">
      {/* Simulated fixed resolution container */}
      <div className="relative w-full h-full max-w-[1920px] mx-auto flex flex-col">
        
        {/* Decorative Background Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none select-none">
          <div className="absolute inset-0">
            <img
              src="/Back_Globe.png"
              alt="Earth Globe Background"
              className="w-full h-full object-cover"
            />
            {/* Soft global overlay to tone down general brightness */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>

        {/* Main structure */}
        <div className="relative z-10 flex flex-col h-full w-full">
          <Header />
          <HomeView />
        </div>
      </div>
    </main>
  );
}