import React from "react";

export default function Heritage() {
  return (
    <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 border-2 border-secondary/30 rounded-t-full hidden lg:block"></div>
            <img 
              src="/assets/images/heritage-women.png" 
              alt="Rajasthani Heritage" 
              className="w-full h-auto object-cover rounded-t-[40%] rounded-b-md shadow-2xl relative z-10"
            />
          </div>
          
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <span className="text-secondary font-semibold tracking-widest uppercase text-sm mb-2 block">The Legacy</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                Heritage of <br/><span className="text-secondary italic">Rajasthan</span>
              </h2>
            </div>
            
            <p className="text-lg md:text-xl leading-relaxed text-primary-foreground/90 font-light border-l-4 border-secondary pl-6">
              "Bangles have been an essential part of Rajasthani culture for centuries, symbolizing prosperity, tradition, and beauty."
            </p>
            
            <p className="text-base text-primary-foreground/80 leading-loose">
              At IJ Bangles, we preserve this magnificent heritage by blending age-old traditional craftsmanship with elegant modern designs. Every piece we create carries the soul of Jaipur, the vibrancy of desert festivals, and the intricate details passed down through generations of master artisans.
            </p>
            
            <div className="pt-4 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-secondary">100+</span>
                <span className="text-sm uppercase tracking-wider opacity-80">Years Legacy</span>
              </div>
              <div className="w-px h-12 bg-secondary/30"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-secondary">500+</span>
                <span className="text-sm uppercase tracking-wider opacity-80">Artisans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
