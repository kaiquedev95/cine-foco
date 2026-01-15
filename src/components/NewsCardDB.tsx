import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { News } from "@/hooks/useNews";
import { cn } from "@/lib/utils";

const categoryLabels = {
  filme: "Filme",
  serie: "Série",
  streaming: "Streaming",
  review: "Review",
};

interface NewsCardDBProps {
  news: News;
  variant?: "default" | "featured" | "compact";
}

const NewsCardDB = ({ news, variant = "default" }: NewsCardDBProps) => {
  if (variant === "compact") {
    return (
      <Link
        to={`/noticia/${news.slug}`}
        className="flex items-center gap-4 p-3 hover:bg-secondary/50 rounded-lg transition-colors group"
      >
        <img
          src={news.image_url || "https://via.placeholder.com/80x60"}
          alt={news.title}
          className="w-20 h-14 object-cover rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {news.title}
          </h4>
          <span className="text-xs text-muted-foreground">
            {new Date(news.created_at).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        to={`/noticia/${news.slug}`}
        className="group relative block overflow-hidden rounded-2xl card-hover"
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={news.image_url || "https://via.placeholder.com/800x500"}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Overlay mais forte para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge variant="default" className="mb-3 bg-primary text-primary-foreground shadow-lg">
            {categoryLabels[news.category]}
          </Badge>
          <h2 className="font-display text-2xl md:text-3xl text-white mb-3 leading-tight group-hover:text-primary transition-colors drop-shadow-lg">
            {news.title}
          </h2>
          <p className="text-gray-200 line-clamp-2 mb-4 drop-shadow-md">
            {news.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{news.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                {new Date(news.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/noticia/${news.slug}`}
      className={cn(
        "group block bg-card rounded-xl overflow-hidden card-hover",
        "border border-border/50"
      )}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={news.image_url || "https://via.placeholder.com/400x225"}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <Badge
          variant="secondary"
          className="mb-3 text-xs"
        >
          {categoryLabels[news.category]}
        </Badge>
        <h3 className="font-display text-xl text-foreground mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {news.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {news.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{news.author}</span>
          <span>•</span>
          <span>{new Date(news.created_at).toLocaleDateString("pt-BR")}</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCardDB;
