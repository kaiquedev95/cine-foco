import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Film, Tv, Play, Star, Search, User, ChevronRight, ChevronLeft } from "lucide-react";
import noticiaCineLogo from "@/assets/noticia-cine-logo.png";
import { Input } from "@/components/ui/input";

const navLinks = [
  { name: "Filmes", href: "/categoria/filme", icon: Film },
  { name: "Séries", href: "/categoria/serie", icon: Tv },
  { name: "Streaming", href: "/categoria/streaming", icon: Play },
  { name: "Reviews", href: "/categoria/review", icon: Star },
];

const quickLinks = [
  "Oscar 2025",
  "Melhores Filmes",
  "Melhores Séries",
  "Lançamentos",
  "Críticas",
  "Trailers",
  "Netflix",
  "Disney+",
  "HBO Max",
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      {/* Main Header Row */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left - Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <img 
              src={noticiaCineLogo} 
              alt="Notícia Cine" 
              className="h-10 md:h-12"
            />
          </Link>

          {/* Right - Search & User */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-muted rounded-md px-3 py-1.5">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <Input
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent h-7 w-32 lg:w-48 p-0 focus-visible:ring-0 text-sm"
              />
            </form>
            
            {/* Search - Mobile */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Icon */}
            <button className="p-2 text-foreground hover:text-primary transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <form onSubmit={handleSearch} className="md:hidden px-4 pb-3 bg-background">
          <div className="flex items-center bg-muted rounded-md px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <Input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent h-7 p-0 focus-visible:ring-0 text-sm"
              autoFocus
            />
          </div>
        </form>
      )}

      {/* Quick Links Row */}
      <div className="relative bg-background/80 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center">
            {/* Scroll Left Button */}
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-0 z-10 h-full items-center bg-gradient-to-r from-background to-transparent pr-4"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>

            {/* Scrollable Links */}
            <div
              ref={scrollRef}
              className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-2 px-2 md:px-8"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {quickLinks.map((link) => (
                <Link
                  key={link}
                  to="/"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                  {link}
                </Link>
              ))}
            </div>

            {/* Scroll Right Button */}
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-0 z-10 h-full items-center bg-gradient-to-l from-background to-transparent pl-4"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <div
        className={`fixed inset-0 top-14 z-40 transition-all duration-300 ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-background border-r border-border transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 hover:bg-secondary transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                  <span className="text-foreground group-hover:text-primary">
                    {link.name}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-primary" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
