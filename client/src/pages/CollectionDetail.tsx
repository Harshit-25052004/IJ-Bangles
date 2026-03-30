import React from "react";
import { useRoute, Link } from "wouter";
import { mockCollections } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CollectionDetail() {
  const [, params] = useRoute("/collections/:id");
  const collectionId = params?.id;
  
  const collection = mockCollections.find(c => c.id === collectionId);

  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-serif text-primary mb-4">Collection Not Found</h1>
        <Link href="/collections">
          <Button variant="outline" className="rounded-none border-primary text-primary">Back to Collections</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <header className="bg-primary py-6 px-6 md:px-12 flex items-center justify-between shadow-md">
        <Link href="/">
          <a className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md tracking-wider">
            IJ <span className="text-secondary font-light italic">Bangles</span>
          </a>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-white text-sm tracking-widest uppercase">
          <Link href="/"><a className="hover:text-secondary transition-colors">Home</a></Link>
          <Link href="/collections"><a className="hover:text-secondary transition-colors">Collections</a></Link>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Banner Section */}
        <div className="w-full h-[40vh] md:h-[60vh] relative bg-black">
          <img 
            src={collection.mainImage} 
            alt={collection.name} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
            <Link href="/collections">
              <a className="inline-flex items-center text-secondary hover:text-white transition-colors mb-4 text-sm uppercase tracking-widest">
                <ArrowLeft size={16} className="mr-2" /> Back to all
              </a>
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-2">{collection.name}</h1>
            <p className="text-xl md:text-2xl text-secondary font-light">{collection.price}</p>
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
            
            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-none py-6 text-lg uppercase tracking-widest">
              <ShoppingBag className="mr-2" /> Shop Now
            </Button>
          </div>

          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif text-primary mb-6">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collection.images.map((img, idx) => (
                <div key={idx} className="relative group overflow-hidden aspect-square border border-border bg-card">
                  <img 
                    src={img} 
                    alt={`${collection.name} detail ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Mock Zoom-in functionality hint */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-sm tracking-widest uppercase border border-white px-4 py-2 bg-black/40 backdrop-blur-sm">Zoom</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
