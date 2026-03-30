import React from "react";
import Hero from "@/components/Hero";
import LatestCollection from "@/components/LatestCollection";
import Heritage from "@/components/Heritage";
import Craftsmanship from "@/components/Craftsmanship";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-secondary selection:text-primary">
      {/* Top Bar / Header */}
      <header className="absolute top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex items-center justify-between">
        <div className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md tracking-wider">
          IJ <span className="text-secondary font-light italic">Bangles</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-white text-sm tracking-widest uppercase">
          <a href="#" className="hover:text-secondary transition-colors" data-testid="nav-home">Home</a>
          <a href="#" className="hover:text-secondary transition-colors" data-testid="nav-collections">Collections</a>
          <a href="#" className="hover:text-secondary transition-colors" data-testid="nav-heritage">Heritage</a>
          <a href="#" className="hover:text-secondary transition-colors" data-testid="nav-contact">Contact</a>
        </nav>
        {/* Mobile menu button placeholder */}
        <button className="md:hidden text-white" data-testid="btn-mobile-menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </header>

      <main className="flex-grow">
        <Hero />
        <LatestCollection />
        <Heritage />
        <Craftsmanship />
        <Gallery />
      </main>

      <Footer />
    </div>
  );
}
