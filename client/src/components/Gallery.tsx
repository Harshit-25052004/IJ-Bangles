import React from "react";
import gallery1 from "../assets/images/gallery-1.png";
import gallery2 from "../assets/images/gallery-2.png";
import gallery3 from "../assets/images/gallery-3.png";

export default function Gallery() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background bg-pattern relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Styled with Tradition</h2>
          <div className="h-1 w-24 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light">
            Follow us on Instagram for daily inspiration. Tag @ijbangles to be featured.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden aspect-square cursor-pointer">
            <img src={gallery1} alt="Bride wearing bangles" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-widest border border-white px-6 py-2">Bridal</span>
            </div>
          </div>
          <div className="relative group overflow-hidden aspect-[3/4] md:aspect-square md:-mt-8 cursor-pointer">
            <img src={gallery2} alt="Festive look" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-widest border border-white px-6 py-2">Festive</span>
            </div>
          </div>
          <div className="relative group overflow-hidden aspect-square cursor-pointer">
            <img src={gallery3} alt="Close up of bangles" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-widest border border-white px-6 py-2">Details</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
