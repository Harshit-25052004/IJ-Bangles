import React, { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import { Search, Trash2, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Collections() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "name">("default");
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const { data: collections = [], isLoading } = useQuery({
    queryKey: ['collections'],
    queryFn: api.getCollections
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete collection.",
        variant: "destructive"
      });
    }
  });

  const categories = ["All", "Bridal", "Kundan", "Lac", "Stone"];

  const parsePrice = (priceStr: string): number => {
    const numeric = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(numeric) || 0;
  };

  const filteredAndSortedCollections = useMemo(() => {
    return collections
      .filter((c) => {
        const matchesSearch = 
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          c.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = 
          selectedCategory === "All" ||
          c.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          c.description.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return parsePrice(a.price) - parsePrice(b.price);
        }
        if (sortBy === "price-desc") {
          return parsePrice(b.price) - parsePrice(a.price);
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [collections, searchTerm, selectedCategory, sortBy]);

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id);
      toast({
        title: "Collection Deleted",
        description: `${name} has been removed.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <header className="bg-primary py-6 px-6 md:px-12 flex items-center justify-between shadow-md">
        <Link href="/" className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md tracking-wider">
          IJ <span className="text-secondary font-light italic">Bangles</span>
        </Link>
        <nav className="flex items-center gap-6 text-white text-sm tracking-widest uppercase">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <Link href="/collections" className="text-secondary transition-colors font-medium">Collections</Link>
          {user && (
            <Link href="/admin/collections/new">
              <Button variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary hover:text-primary rounded-none cursor-pointer">
                + Add Collection
              </Button>
            </Link>
          )}
        </nav>
      </header>

      <main className="flex-grow py-16 px-6 md:px-12 bg-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">All Collections</h1>
            <div className="h-1 w-24 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto font-light">
              Explore our full range of handcrafted royal Rajasthani masterpieces.
            </p>
          </div>

          {/* Search, Categories & Filters */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 shadow-sm border border-border/50">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search collections..." 
                  className="pl-10 rounded-none border-input focus-visible:ring-secondary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <ArrowUpDown size={16} className="text-muted-foreground shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full md:w-auto bg-background border border-input px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary rounded-none"
                >
                  <option value="default">Featured (Default)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 text-sm uppercase tracking-wider transition-all rounded-none cursor-pointer border ${
                    selectedCategory === cat
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border/60 hover:border-secondary hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="py-24 flex justify-center items-center text-primary font-serif text-xl">
              Loading collections...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedCollections.map((item) => (
                <Link key={item.id} href={`/collections/${item.id}`} className="block group">
                  <Card className="h-full overflow-hidden rounded-none border-border/50 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer relative">
                    <CardContent className="p-0 overflow-hidden relative aspect-square">
                      {user && (
                        <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button 
                            size="icon" 
                            variant="destructive" 
                            className="h-8 w-8 rounded-full bg-destructive text-white hover:bg-destructive/90 cursor-pointer shadow-md" 
                            onClick={(e) => handleDelete(e, item.id, item.name)}
                            title="Delete Collection"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      )}
                      
                      <img 
                        src={item.mainImage} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/assets/images/bangle-kundan.webp";
                        }}
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </CardContent>
                    <CardFooter className="flex flex-col items-center text-center p-6 bg-card border-t border-border/30">
                      <h3 className="font-serif text-xl font-medium text-foreground mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                      <span className="font-semibold text-lg text-primary mt-auto">{item.price}</span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
              
              {filteredAndSortedCollections.length === 0 && (
                <div className="col-span-full py-16 text-center text-muted-foreground font-light text-lg">
                  No collections found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
