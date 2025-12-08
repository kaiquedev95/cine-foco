import { Link } from "react-router-dom";
import { Film, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Film className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl tracking-wider text-foreground">
                CINE<span className="text-primary">NEWS</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Seu portal de notícias sobre filmes, séries e o mundo do entretenimento. 
              Fique por dentro de tudo que acontece no universo cinematográfico.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/categoria/filme" className="text-muted-foreground hover:text-primary transition-colors">
                  Filmes
                </Link>
              </li>
              <li>
                <Link to="/categoria/serie" className="text-muted-foreground hover:text-primary transition-colors">
                  Séries
                </Link>
              </li>
              <li>
                <Link to="/categoria/streaming" className="text-muted-foreground hover:text-primary transition-colors">
                  Streaming
                </Link>
              </li>
              <li>
                <Link to="/categoria/review" className="text-muted-foreground hover:text-primary transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CineNews. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
