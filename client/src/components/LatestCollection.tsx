import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function LatestCollection() {
  const { data: collections = [], isLoading } = useQuery({
    queryKey: ['collections'],
    queryFn: api.getCollections
  });

  if (isLoading) {
    return (
      <section className="py-24 px-6 md:px-12 bg-background bg-pattern relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Our Latest Collection</h2>
            <div className="h-1 w-24 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto font-light">
              Loading collections...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Take only first 4 collections for display
  const displayCollections = collections.slice(0, 4);
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
          {displayCollections.map((item) => (
            <Card key={item.id} className="group overflow-hidden rounded-none border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-0 overflow-hidden relative aspect-square">
                <img 
                  src={item.mainImage} 
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
                  <Link href={`/collections/${item.id}`}>
                    <Button 
                      variant="outline" 
                      className="rounded-none border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                      data-testid={`button-view-details-${item.id}`}
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center space-x-4">
          <Link href="/collections">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 rounded-none uppercase tracking-widest"
              data-testid="button-view-all"
            >
              View All Collections
            </Button>
          </Link>
          <Link href="/admin/collections/new">
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white px-10 py-6 rounded-none uppercase tracking-widest"
              data-testid="button-add-collection"
            >
              Add Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
