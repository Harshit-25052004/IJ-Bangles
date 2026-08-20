import React, { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { ArrowLeft, ShoppingBag, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function CollectionDetail() {
  const [, params] = useRoute("/collections/:id");
  const collectionId = params?.id;
  const [selectedZoomImage, setSelectedZoomImage] = useState<string | null>(null);
  
  const { data: collection, isLoading, error } = useQuery({
    queryKey: ['collection', collectionId],
    queryFn: () => api.getCollectionById(collectionId!),
    enabled: !!collectionId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4" />
        <h1 className="text-2xl font-serif text-primary">Loading collection details...</h1>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <h1 className="text-3xl font-serif text-primary mb-4">Collection Not Found</h1>
        <p className="text-muted-foreground mb-6">The collection you are looking for does not exist or has been removed.</p>
        <Link href="/collections">
          <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white">
            Back to Collections
          </Button>
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello IJ Bangles, I am interested in purchasing:\n\n*${collection.name}*\nPrice: ${collection.price}\n\nPlease share more details.`
  );
  const whatsappUrl = `https://wa.me/917010080079?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <header className="bg-primary py-6 px-6 md:px-12 flex items-center justify-between shadow-md">
        <Link href="/" className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md tracking-wider">
          IJ <span className="text-secondary font-light italic">Bangles</span>
        </Link>
        <nav className="flex items-center gap-8 text-white text-sm tracking-widest uppercase">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <Link href="/collections" className="text-secondary transition-colors font-medium">Collections</Link>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Banner Section */}
        <div className="w-full h-[45vh] md:h-[60vh] relative bg-black">
          <img 
            src={collection.mainImage} 
            alt={collection.name} 
            className="w-full h-full object-cover opacity-60"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/images/bangle-kundan.webp";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
            <Link href="/collections" className="inline-flex items-center text-secondary hover:text-white transition-colors mb-4 text-sm uppercase tracking-widest">
              <ArrowLeft size={16} className="mr-2" /> Back to all collections
            </Link>
            <h1 className="text-3xl md:text-6xl font-serif text-white mb-2">{collection.name}</h1>
            <p className="text-xl md:text-3xl text-secondary font-light">{collection.price}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Details */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-serif text-primary mb-4">Description</h2>
              <div className="h-0.5 w-12 bg-secondary mb-4"></div>
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                {collection.description}
              </p>
            </div>
            
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block"
            >
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-none py-6 text-lg uppercase tracking-widest cursor-pointer shadow-lg hover:shadow-xl transition-all">
                <ShoppingBag className="mr-2" /> Inquire / Order on WhatsApp
              </Button>
            </a>

            <div className="bg-card p-6 border border-border/50 space-y-3">
              <h3 className="font-serif text-lg text-primary">Handcrafted Excellence</h3>
              <ul className="text-sm text-muted-foreground space-y-2 font-light">
                <li>✓ 100% authentic Rajasthani craftsmanship</li>
                <li>✓ Handcrafted in Jaipur</li>
                <li>✓ Secure packaging & insured delivery</li>
              </ul>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif text-primary mb-6">Gallery Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {collection.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative group overflow-hidden aspect-square border border-border bg-card cursor-pointer"
                  onClick={() => setSelectedZoomImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${collection.name} detail ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/images/bangle-kundan.webp";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm tracking-widest uppercase border border-white px-4 py-2 bg-black/40 backdrop-blur-sm">Click to Zoom</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Zoom Dialog */}
      <Dialog open={!!selectedZoomImage} onOpenChange={(open) => !open && setSelectedZoomImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 border-none">
          <DialogTitle className="sr-only">Image Zoom Preview</DialogTitle>
          <div className="relative flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedZoomImage(null)}
              className="absolute top-4 right-4 z-50 text-white hover:text-secondary p-2 bg-black/50 rounded-full cursor-pointer"
              aria-label="Close image preview"
            >
              <X size={24} />
            </button>
            {selectedZoomImage && (
              <img 
                src={selectedZoomImage} 
                alt="Enlarged view" 
                className="max-h-[80vh] w-auto object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
