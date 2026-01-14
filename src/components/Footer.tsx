import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="font-display text-3xl md:text-4xl tracking-wide">
                <span className="text-[hsl(220,60%,25%)]">NOTÍCIA</span>
                <span className="text-[hsl(45,90%,50%)]"> C</span>
                <span className="text-[hsl(0,80%,50%)]">I</span>
                <span className="text-[hsl(45,90%,50%)]">N</span>
                <span className="text-[hsl(0,80%,50%)]">E</span>
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
                href="https://www.instagram.com/noticiacine/"
                target="_blank"
                rel="noopener noreferrer"
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
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Noticia Cine. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
