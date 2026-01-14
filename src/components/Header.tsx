import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Film, Tv, Play, Star } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Filmes", href: "/categoria/filme", icon: Film },
  { name: "Séries", href: "/categoria/serie", icon: Tv },
  { name: "Streaming", href: "/categoria/streaming", icon: Play },
  { name: "Reviews", href: "/categoria/review", icon: Star },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Noticia Cine" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-lg animate-fade-in">
          <nav className="flex flex-col p-6 gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-secondary transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <link.icon className="w-5 h-5 text-primary" />
                <span className="font-display text-xl tracking-wide text-foreground">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
