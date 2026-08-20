import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface GalleryProps {
  isLoggedIn: boolean;
}

export default function Gallery({ isLoggedIn }: GalleryProps) {
  return (
    <section id="gallery" className="py-24 px-6 md:px-12 bg-background bg-pattern relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 text-center md:text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Styled with Tradition</h2>
            <div className="h-1 w-24 bg-secondary mb-6"></div>
            <p className="text-muted-foreground max-w-2xl font-light">
              Follow us on Instagram for daily inspiration. Tag @ijbangles to be featured.
            </p>
          </div>
          {isLoggedIn && (
            <Link href="/admin/collections/new">
              <Button
                variant="outline"
                size="icon"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                aria-label="Add gallery item"
                data-testid="button-add-gallery-icon"
              >
                +
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden aspect-square cursor-pointer">
            <img src="/assets/images/gallery-1.webp" alt="Bride wearing bangles" loading="lazy" decoding="async" width="600" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-widest border border-white px-6 py-2">Bridal</span>
            </div>
          </div>
          <div className="relative group overflow-hidden aspect-[3/4] md:aspect-square md:-mt-8 cursor-pointer">
            <img src="/assets/images/gallery-2.webp" alt="Festive look" loading="lazy" decoding="async" width="600" height="800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-widest border border-white px-6 py-2">Festive</span>
            </div>
          </div>
          <div className="relative group overflow-hidden aspect-square cursor-pointer">
            <img src="/assets/images/gallery-3.webp" alt="Close up of bangles" loading="lazy" decoding="async" width="600" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-widest border border-white px-6 py-2">Details</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
