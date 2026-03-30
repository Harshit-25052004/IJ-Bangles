import React, { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { mockCollections } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import { Search, SlidersHorizontal, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Collections() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredCollections = mockCollections.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (e: React.MouseEvent, name: string) => {
    e.preventDefault(); // Prevent navigating to detail page
    e.stopPropagation();
    toast({
      title: "Collection Deleted",
      description: `${name} has been removed (Mock action).`,
      variant: "destructive"
    });
  };

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
          <Link href="/collections"><a className="text-secondary transition-colors">Collections</a></Link>
          <Link href="/admin/collections/new">
            <Button variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary hover:text-primary rounded-none">
              Admin: Add Collection
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-grow py-16 px-6 md:px-12 bg-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">All Collections</h1>
            <div className="h-1 w-24 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto font-light">
              Explore our full range of handcrafted masterpieces.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center bg-card p-4 shadow-sm border border-border/50">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search collections..." 
                className="pl-10 rounded-none border-input focus-visible:ring-secondary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full md:w-auto rounded-none border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-wider">
              <SlidersHorizontal className="mr-2" size={16} /> Filters
            </Button>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCollections.map((item) => (
              <Link key={item.id} href={`/collections/${item.id}`}>
                <a className="block group">
                  <Card className="h-full overflow-hidden rounded-none border-border/50 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer relative">
                    <CardContent className="p-0 overflow-hidden relative aspect-square">
                      {/* Admin Actions Overlay (Mock) */}
                      <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white text-primary hover:bg-gray-100" onClick={(e) => { e.preventDefault(); /* Mock Edit Navigation */ }}>
                          <Edit size={14} />
                        </Button>
                        <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full bg-destructive text-white hover:bg-destructive/90" onClick={(e) => handleDelete(e, item.name)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                      
                      <img 
                        src={item.mainImage} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </CardContent>
                    <CardFooter className="flex flex-col items-center text-center p-6 bg-card border-t border-border/30">
                      <h3 className="font-serif text-xl font-medium text-foreground mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                      <span className="font-semibold text-lg text-primary mt-auto">{item.price}</span>
                    </CardFooter>
                  </Card>
                </a>
              </Link>
            ))}
            
            {filteredCollections.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground font-light text-lg">
                No collections found matching "{searchTerm}".
              </div>
            )}
          </div>
          
          {/* Mock Pagination */}
          {filteredCollections.length > 0 && (
            <div className="mt-16 flex justify-center gap-2">
              <Button variant="outline" disabled className="rounded-none border-border">Previous</Button>
              <Button variant="default" className="rounded-none bg-primary text-white">1</Button>
              <Button variant="outline" className="rounded-none border-border">2</Button>
              <Button variant="outline" className="rounded-none border-border">3</Button>
              <Button variant="outline" className="rounded-none border-border">Next</Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
