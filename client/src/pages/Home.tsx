import React, { useState } from "react";
import Hero from "@/components/Hero";
import LatestCollection from "@/components/LatestCollection";
import Heritage from "@/components/Heritage";
import Craftsmanship from "@/components/Craftsmanship";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { auth } from "@/firebase";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { useEffect } from "react";

export default function Home() {
  const [openLogin, setOpenLogin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLoginSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    setOpenLogin(false);
    setEmail("");
    setPassword("");

    alert("Login Successful");
  } catch (error: any) {
    alert(error.message);
  }
};

const handleLogout = async () => {
  await signOut(auth);
};


  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-secondary selection:text-primary">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex items-center justify-between">
        <div className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md tracking-wider">
          IJ <span className="text-secondary font-light italic">Bangles</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-white text-sm tracking-widest uppercase">
          <a
            href="#"
            className="hover:text-secondary transition-colors"
            data-testid="nav-home"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-secondary transition-colors"
            data-testid="nav-collections"
          >
            Collections
          </a>
          <a
            href="#"
            className="hover:text-secondary transition-colors"
            data-testid="nav-heritage"
          >
            Heritage
          </a>
          <a
            href="#"
            className="hover:text-secondary transition-colors"
            data-testid="nav-contact"
          >
            Contact
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-white text-sm">
                Welcome back
              </span>

              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-white bg-white/10 text-white hover:bg-white/20"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Dialog open={openLogin} onOpenChange={setOpenLogin}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none border-white bg-white/10 text-white hover:bg-white/20"
                >
                  Login
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    Login to IJ Bangles
                  </DialogTitle>

                  <DialogDescription>
                    Enter your email and password to continue.
                  </DialogDescription>
                </DialogHeader>

                <form
                  className="grid gap-4"
                  onSubmit={handleLoginSubmit}
                >
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                  <DialogFooter>
                    <Button type="submit">
                      Sign In
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          data-testid="btn-mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Hero />
       <LatestCollection isLoggedIn={!!user} />
        <Heritage />
        <Craftsmanship />
       <Gallery isLoggedIn={!!user} />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/917010080079?text=Hi%20IJ%20Bangles"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
        data-testid="whatsapp-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </a>
    </div>
  );
}