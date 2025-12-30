'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Star, 
  MapPin, 
  ArrowRight,
  Globe, 
  User, 
  X, 
  SlidersHorizontal,
  CloudSun,
  CheckCircle2,
  CreditCard,
  ChevronRight,
  Heart
} from 'lucide-react';

/* ==========================================================================
   INTERFACES
   ========================================================================== */
interface Destination {
  id: number;
  name: string;
  location: string;
  rating: number;
  category: string;
  image: string;
  description: string;
  price: number;
}

interface DestinationDetailsOverlayProps {
  destination: Destination | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

/* ==========================================================================
   STATIC DATA (Moved outside to fix ESLint dependency warnings)
   ========================================================================== */
const ALL_DESTINATIONS: Destination[] = [
  { id: 1, name: 'The Canadian Rockies', location: 'Canada', rating: 4.9, category: 'Mountains', image: '/D_1.png', description: 'Majestic turquoise lakes and snow-capped peaks in the heart of Banff and Jasper.', price: 450 },
  { id: 2, name: 'The Himalayas', location: 'Nepal', rating: 5.0, category: 'Mountains', image: '/D_2.png', description: 'The roof of the world. Experience ancient culture and the tallest summits on Earth.', price: 600 },
  { id: 3, name: 'The Swiss Alps', location: 'Switzerland', rating: 4.9, category: 'Mountains', image: '/D_3.png', description: 'Charming alpine villages and world-class skiing under the shadow of the Matterhorn.', price: 550 },
  { id: 4, name: 'Icelandic Glaciers', location: 'Iceland', rating: 4.8, category: 'Mountains', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200', description: 'A land of fire and ice featuring massive glaciers, black sand beaches, and active volcanoes.', price: 480 },
  { id: 5, name: 'Santorini Blue', location: 'Greece', rating: 4.9, category: 'Beaches', image: '/D_7.jpg', description: 'Sun-drenched white villas overlooking the deep blue waters of the Aegean Sea.', price: 520 },
  { id: 6, name: 'Kyoto Zen Gardens', location: 'Japan', rating: 5.0, category: 'City', image: '/D_6.jpg', description: 'Immerse yourself in history with peaceful temples and traditional tea ceremonies.', price: 400 },
  { id: 7, name: 'Amazon Canopy', location: 'Brazil', rating: 4.7, category: 'Forest', image: '/D_4.jpg', description: 'Explore the richest biodiversity on the planet deep within the rainforest.', price: 380 },
  { id: 8, name: 'Sahara Nights', location: 'Morocco', rating: 4.6, category: 'Desert', image: '/D_5.jpg', description: 'Luxury camping under a blanket of stars in the infinite golden dunes.', price: 320 },
];

const CATEGORIES = ['All', 'Mountains', 'Beaches', 'Desert', 'Forest', 'City'];

/* ==========================================================================
   COMPONENTE: Header (Versión Neta / Integrada)
   ========================================================================== */
const Header = () => {
  const navItems = ['About Us', 'Globe', 'Settings', 'Help/FAQ', 'Sign Up'];

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-[30px] py-6 flex justify-between items-center">
      {/* LADO IZQUIERDO: Logo */}
      <Link href="/" className="flex items-center gap-2 group cursor-pointer no-underline">
        <Globe 
          className="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" 
          strokeWidth={1.5} 
        />
        <span className="text-white font-bold text-xl tracking-wide font-sans">
          EARTHLY
        </span>
      </Link>

      {/* CENTRO: Menú de navegación principal */}
      <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
        {navItems.map((item) => {
          const isAbout = item === 'About Us';
          const isGlobe = item === 'Globe';
          
          let href = '#';
          if (isAbout) href = '/about-us';
          // Actualización del link al globo de Vercel
          if (isGlobe) href = 'https://eco-travel-globe-earthly.vercel.app/';

          const isExternal = href.startsWith('http');

          if (isExternal) {
            return (
              <a 
                key={item} 
                href={href} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-medium transition-all duration-300 hover:scale-110 transform no-underline"
              >
                {item}
              </a>
            );
          }

          return (
            <Link 
              key={item} 
              href={href} 
              className="text-white text-sm font-medium transition-all duration-300 hover:scale-110 transform no-underline"
            >
              {item}
            </Link>
          );
        })}
      </nav>

      {/* LADO DERECHO: Botones de acción */}
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
   DETAILS OVERLAY
   ========================================================================== */
const DestinationDetailsOverlay: React.FC<DestinationDetailsOverlayProps> = ({ 
  destination, 
  onClose, 
  isFavorite, 
  onToggleFavorite 
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-[#0a0b10] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-12 h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <button 
          onClick={() => onToggleFavorite(destination.id)}
          className="absolute top-6 left-6 z-30 w-12 h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center transition-all hover:bg-white/10 active:scale-90"
        >
          <Heart 
            size={24} 
            className={`transition-all duration-300 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white/70'}`} 
          />
        </button>

        <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden shrink-0">
          <Image 
            src={destination.image} 
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-[3000ms] hover:scale-105"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-8 left-10 right-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                {destination.category}
              </span>
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] text-white flex items-center gap-1.5 transition-colors hover:bg-white/20">
                <MapPin size={12} />
                {destination.location}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white leading-none">
              {destination.name}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar bg-[#0a0b10]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white uppercase tracking-tighter flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-white/20" />
                  The Experience
                </h3>
                <p className="text-white/90 text-2xl md:text-3xl font-light leading-snug tracking-tight">
                  {destination.description}
                </p>
                <p className="text-white/40 text-lg font-light leading-relaxed tracking-tight">
                  Designed for the conscious traveler who values the subtle balance between human luxury and the raw power of nature.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-white uppercase tracking-tighter">Amenities</h4>
                  <div className="space-y-4">
                    {["Eco-Transfers", "Organic Breakfast", "Zero-Waste Kit"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white/50">
                        <CheckCircle2 size={18} className="text-white/10" />
                        <span className="text-base font-light tracking-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-white uppercase tracking-tighter">Highlights</h4>
                  <div className="space-y-4">
                    {["Photography", "Stargazing", "Wellness"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white/50">
                        <CheckCircle2 size={18} className="text-white/10" />
                        <span className="text-base font-light tracking-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-6 md:p-8 space-y-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/5 pb-5 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                      <Star size={20} fill="currentColor" />
                    </div>
                    <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Rating</span>
                  </div>
                  <span className="text-lg font-medium tracking-tight text-white">{destination.rating}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 pb-5 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <CloudSun size={20} />
                    </div>
                    <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Climate</span>
                  </div>
                  <span className="text-lg font-medium tracking-tight text-white">24°C</span>
                </div>

                <div className="flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                      <CreditCard size={20} />
                    </div>
                    <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Price</span>
                  </div>
                  <span className="text-xl font-medium text-white tracking-tighter">${destination.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-white text-black py-4 rounded-[18px] font-bold text-xs tracking-[0.1em] uppercase transition-all hover:bg-white/90 hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 shadow-2xl shadow-white/5 group">
                  Book Journey
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <p className="text-center text-[10px] text-white/20 uppercase tracking-[0.2em] cursor-default">Curated experience • Private Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   DESTINATIONS PAGE
   ========================================================================== */
export default function App() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice] = useState(1000);
  const [minRating] = useState(0);

  // FAVORITES STATE
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredDestinations = useMemo(() => {
    return ALL_DESTINATIONS.filter(dest => {
      const matchCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      const matchPrice = dest.price <= maxPrice;
      const matchRating = dest.rating >= minRating;
      return matchCategory && matchPrice && matchRating;
    });
  }, [selectedCategory, maxPrice, minRating]);

  return (
    <main className="relative w-full h-screen bg-[#050609] font-sans text-white overflow-x-hidden overflow-y-auto 
                      [&::-webkit-scrollbar]:w-2 
                      [&::-webkit-scrollbar-track]:bg-transparent 
                      [&::-webkit-scrollbar-thumb]:bg-white/10 
                      hover:[&::-webkit-scrollbar-thumb]:bg-white/20 
                      [&::-webkit-scrollbar-thumb]:rounded-full">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[80px] left-[-200px] w-[900px] h-[900px] bg-blue-900/10 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute top-0 right-[-200px] w-[700px] h-[700px] bg-teal-900/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col w-full min-h-full pb-[60px]">
        {/* Header Neto */}
        <Header />

        <div className="px-[30px] pt-32 pb-12">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">Explore Destinations</h1>
          <p className="text-white/60 text-lg max-w-2xl font-light leading-relaxed">
            Our curated collection of sustainable adventures around the globe.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="px-[30px] flex flex-col lg:flex-row gap-6 mb-16 items-center justify-between">
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full border border-white/10 text-sm transition-all duration-300
                  ${selectedCategory === cat ? 'bg-white text-black font-medium' : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <button 
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium ${
                  selectedCategory !== 'All'
                    ? 'bg-white text-black border-white shadow-lg shadow-white/5'
                    : ''
                }`}
             >
                <SlidersHorizontal size={18} />
                Advanced Filters
             </button>
          </div>
        </div>

        {/* Grid */}
        <div className="px-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative flex flex-col bg-white/5 rounded-[35px] border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:-translate-y-2 shadow-2xl shadow-black/40"
            >
              <div className="relative w-full h-72 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050609]/80 via-transparent to-transparent opacity-60" />
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(dest.id);
                  }}
                  className="absolute top-5 right-5 w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 active:scale-90 z-20 group/heart"
                >
                  <Heart 
                    size={18} 
                    className={`transition-colors duration-300 ${favorites.includes(dest.id) ? 'text-red-500 fill-red-500' : 'text-white/70 group-hover/heart:text-white'}`} 
                  />
                </button>
                
                <div className="absolute bottom-5 left-6 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium tracking-wider">{dest.rating}</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div className="max-w-[70%]">
                    <h3 className="text-2xl font-medium tracking-tight mb-1 truncate">{dest.name}</h3>
                    <div className="flex items-center gap-1.5 text-white/40 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{dest.location}</span>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-xl">
                    <span className="text-white font-semibold text-sm">${dest.price}</span>
                  </div>
                </div>
                <p className="text-white/50 text-sm font-light leading-relaxed mb-6 line-clamp-2">{dest.description}</p>
                <button 
                  onClick={() => setSelectedDestination(dest)}
                  className="mt-auto flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group/btn"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OVERLAY RENDER */}
      {selectedDestination && (
        <DestinationDetailsOverlay 
          destination={selectedDestination} 
          onClose={() => setSelectedDestination(null)} 
          isFavorite={favorites.includes(selectedDestination.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </main>
  );
}