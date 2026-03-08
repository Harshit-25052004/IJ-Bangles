import React from "react";
import artisanImg from "../assets/images/artisan-hands.png";

export default function Craftsmanship() {
  const steps = [
    { title: "Traditional Lac Melting", desc: "Sourcing and melting natural lac resin over hot coals." },
    { title: "Meticulous Shaping", desc: "Hand-rolling and shaping the material onto wooden cylinders." },
    { title: "Stone Embedding", desc: "Setting semi-precious stones and mirrors while the lac is warm." },
    { title: "Design Finishing", desc: "Hand-polishing and detailing for a flawless, royal finish." }
  ];

  return (
    <section className="py-0 bg-background flex flex-col lg:flex-row">
      {/* Left side: Image */}
      <div className="w-full lg:w-1/2 min-h-[50vh] relative">
        <img 
          src={artisanImg} 
          alt="Artisans crafting bangles" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Right side: Content */}
      <div className="w-full lg:w-1/2 p-12 md:p-20 lg:p-24 flex flex-col justify-center bg-card">
        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">The Art of Handmade</h2>
        <div className="h-1 w-16 bg-secondary mb-10"></div>
        
        <p className="text-muted-foreground mb-12 text-lg leading-relaxed font-light">
          Our master artisans pour their heart and soul into every piece. The process is a labor of love, requiring immense patience, precision, and an eye for intricate detail.
        </p>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-secondary flex items-center justify-center text-secondary font-serif text-xl group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2 font-serif">{step.title}</h3>
                <p className="text-muted-foreground font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
