import React, { useState, useEffect } from "react";
import { Link } from "wouter";
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
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";

export default function Home() {
  const [openLogin, setOpenLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const { toast } = useToast();

  const handleLoginSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoadingAuth(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setOpenLogin(false);
      setEmail("");
      setPassword("");
      toast({
        title: "Login Successful",
        description: "Welcome back to IJ Bangles!",
      });
    } catch (error: any) {
      let message = "Invalid email or password. Please try again.";
      if (error.code === "auth/user-not-found") {
        message = "No account found with this email address.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.message) {
        message = error.message;
      }
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Logout Error",
        description: error.message || "Failed to logout.",
        variant: "destructive",
      });
    }
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
        <Link href="/" className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md tracking-wider">
          IJ <span className="text-secondary font-light italic">Bangles</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-white text-sm tracking-widest uppercase">
          <Link
            href="/"
            className="hover:text-secondary transition-colors"
            data-testid="nav-home"
          >
            Home
          </Link>
          <Link
            href="/collections"
            className="hover:text-secondary transition-colors"
            data-testid="nav-collections"
          >
            Collections
          </Link>
          <a
            href="#heritage"
            className="hover:text-secondary transition-colors"
            data-testid="nav-heritage"
          >
            Heritage
          </a>
          <a
            href="#contact"
            className="hover:text-secondary transition-colors"
            data-testid="nav-contact"
          >
            Contact
          </a>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-white text-sm flex items-center gap-1">
                <UserIcon size={14} className="text-secondary" />
                {user.email?.split("@")[0] || "Admin"}
              </span>

              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-white bg-white/10 text-white hover:bg-white/20 cursor-pointer"
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
                  className="rounded-none border-white bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                >
                  Login
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif text-primary">
                    Login to IJ Bangles
                  </DialogTitle>

                  <DialogDescription>
                    Enter your email and password to access admin privileges.
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
                    className="rounded-none"
                  />

                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="rounded-none"
                  />

                  <DialogFooter className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white rounded-none py-5 uppercase tracking-wider"
                      disabled={isLoadingAuth}
                    >
                      {isLoadingAuth ? "Signing in..." : "Sign In"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          data-testid="btn-mobile-menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md pt-24 px-6 flex flex-col md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-6 text-white text-lg tracking-widest uppercase text-center">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-secondary py-2 border-b border-white/10 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-secondary py-2 border-b border-white/10 transition-colors"
            >
              Collections
            </Link>
            <a
              href="#heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-secondary py-2 border-b border-white/10 transition-colors"
            >
              Heritage
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-secondary py-2 border-b border-white/10 transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="mt-8 pt-6 border-t border-white/20 flex flex-col items-center gap-4">
            {user ? (
              <div className="flex flex-col items-center gap-3 w-full">
                <span className="text-white text-sm">
                  Logged in as {user.email?.split("@")[0]}
                </span>
                <Button
                  variant="outline"
                  className="w-full rounded-none border-white text-white hover:bg-white/10"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={16} className="mr-2" /> Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full rounded-none border-secondary text-secondary hover:bg-secondary hover:text-primary py-5 uppercase tracking-widest"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOpenLogin(true);
                }}
              >
                Admin Login
              </Button>
            )}
          </div>
        </div>
      )}

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