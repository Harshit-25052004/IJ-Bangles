import React from "react";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground relative border-t-8 border-secondary">
      {/* Decorative top border pattern */}
      <div className="absolute top-0 left-0 w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGwyMCAyMEgwem0yMCAwbC0yMCAyMGgyMHoiIGZpbGw9IiNkNGFmMzciIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Story */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-3xl font-serif text-secondary mb-6">IJ Bangles</h3>
            <p className="text-primary-foreground/80 font-light leading-relaxed max-w-md">
              A celebration of Rajasthan's vibrant culture and unparalleled craftsmanship. We bring you hand-crafted, authentic traditional bangles that carry the legacy of centuries-old royal aesthetics, right from the heart of Jaipur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 font-light text-primary-foreground/80">
              <li><a href="#" className="hover:text-secondary transition-colors inline-block" data-testid="link-home">Home</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors inline-block" data-testid="link-collections">Collections</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors inline-block" data-testid="link-heritage">Heritage</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors inline-block" data-testid="link-contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="text-xl font-serif mb-6 text-white">Get in Touch</h4>
            <ul className="space-y-3 font-light text-primary-foreground/80 mb-8">
              <li>+91 98765 43210</li>
              <li>hello@ijbangles.com</li>
              <li>Hawa Mahal Road, Jaipur, <br/>Rajasthan, India</li>
            </ul>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-secondary/50 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all" data-testid="social-instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-secondary/50 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all" data-testid="social-facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-secondary/50 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all" data-testid="social-whatsapp">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-primary-foreground/60 font-light text-sm">
          <p>© 2026 IJ Bangles – Celebrating the Heritage of Rajasthan</p>
        </div>
      </div>
    </footer>
  );
}
