import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// We will use import for images once they are available, or use placeholder strings that will map to the generated files.
// For now, since they are being generated to src/assets/images/, we will import them directly.
// If Vite fails to resolve them initially, we might need a fallback, but assuming they generate correctly.

import kundanImg from "../assets/images/bangle-kundan.png";
import lacImg from "../assets/images/bangle-lac.png";
import bridalImg from "../assets/images/bangle-bridal.png";
import stoneImg from "../assets/images/bangle-stone.png";

const collections = [
  {
    id: 1,
    name: "Royal Kundan Bangles",
    description: "Intricate Kundan work with classic gold finish.",
    price: "₹2,499",
    image: kundanImg
  },
  {
    id: 2,
    name: "Traditional Lac Bangles",
    description: "Vibrant colors with authentic Rajasthani mirror work.",
    price: "₹899",
    image: lacImg
  },
  {
    id: 3,
    name: "Bridal Chooda Collection",
    description: "Complete bridal set symbolizing prosperity.",
    price: "₹5,999",
    image: bridalImg
  },
  {
    id: 4,
    name: "Stone Studded Bangles",
    description: "Elegant artificial diamonds for a luxurious look.",
    price: "₹1,899",
    image: stoneImg
  }
];

export default function LatestCollection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background bg-pattern relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Our Latest Collection</h2>
          <div className="h-1 w-24 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light">
            Discover our meticulously handcrafted designs, where every piece tells a story of royal heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((item) => (
            <Card key={item.id} className="group overflow-hidden rounded-none border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-0 overflow-hidden relative aspect-square">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              </CardContent>
              <CardFooter className="flex flex-col items-center text-center p-6 bg-card border-t border-border/30">
                <h3 className="font-serif text-xl font-medium text-foreground mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                <div className="w-full flex items-center justify-between mt-auto">
                  <span className="font-semibold text-lg text-primary">{item.price}</span>
                  <Button 
                    variant="outline" 
                    className="rounded-none border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    data-testid={`button-view-details-${item.id}`}
                  >
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 rounded-none uppercase tracking-widest"
            data-testid="button-view-all"
          >
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
}
