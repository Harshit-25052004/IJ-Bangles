import React from "react";
import { Button } from "@/components/ui/button";

// Optional: import video once generated or use a placeholder/conditional rendering
// import heroVideo from "../assets/videos/hero-bg.mp4";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-black z-0">
         <video 
           autoPlay 
           loop 
           muted 
           playsInline
           className="w-full h-full object-cover opacity-80"
         >
            <source src="/src/assets/videos/hero-bg.mp4" type="video/mp4" />
         </video>
      </div>

      {/* Subtle Golden Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-black/40 to-black/70 mix-blend-multiply z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[#d4af37]/10 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg tracking-wide">
          Crafting Tradition, <br className="hidden md:block" />
          <span className="text-secondary italic">One Bangle at a Time</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light tracking-widest uppercase text-sm md:text-base">
          Experience the timeless beauty of Rajasthan with IJ Bangles
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button 
            size="lg" 
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 rounded-none uppercase tracking-widest border border-secondary"
            data-testid="button-explore-collection"
          >
            Explore Collection
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-6 rounded-none uppercase tracking-widest backdrop-blur-sm"
            data-testid="button-watch-craftsmanship"
          >
            Watch Craftsmanship
          </Button>
        </div>
      </div>
    </section>
  );
}
