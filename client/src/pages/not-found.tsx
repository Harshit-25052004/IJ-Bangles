import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background bg-pattern p-6 text-center">
      <div className="max-w-md bg-card p-10 shadow-xl border border-border/60 flex flex-col items-center">
        <h1 className="text-7xl font-serif font-bold text-primary mb-2">404</h1>
        <div className="h-1 w-16 bg-secondary mb-6"></div>
        <h2 className="text-2xl font-serif text-foreground mb-3">Page Not Found</h2>
        <p className="text-muted-foreground font-light mb-8 text-sm leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-none px-8 py-6 uppercase tracking-widest text-sm cursor-pointer shadow-md">
            <ArrowLeft size={16} className="mr-2" /> Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
