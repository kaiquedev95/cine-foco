import { Link } from "react-router-dom";
import { NewsItem } from "@/data/news";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  news: NewsItem;
  variant?: "default" | "featured" | "compact";
}

const categoryLabels: Record<NewsItem["category"], string> = {
  filme: "Filme",
  serie: "Série",
  streaming: "Streaming",
  review: "Review",
};

const NewsCard = ({ news, variant = "default" }: NewsCardProps) => {
  if (variant === "featured") {
    return (
      <Link
        to={`/noticia/${news.slug}`}
        className="group relative block h-[500px] md:h-[600px] rounded-xl overflow-hidden card-hover"
      >
        <img
          src={news.image}
          alt={news.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Badge variant="default" className="mb-4 bg-primary text-primary-foreground">
            {categoryLabels[news.category]}
          </Badge>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-3 leading-tight">
            {news.title}
          </h2>
          <p className="text-muted-foreground text-lg line-clamp-2 mb-4">
            {news.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{news.author}</span>
            <span>•</span>
            <span>{new Date(news.date).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to={`/noticia/${news.slug}`}
        className="group flex gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
      >
        <img
          src={news.image}
          alt={news.title}
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex flex-col justify-center min-w-0">
          <Badge variant="outline" className="w-fit mb-2 text-xs border-primary/50 text-primary">
            {categoryLabels[news.category]}
          </Badge>
          <h3 className="font-display text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {news.title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/noticia/${news.slug}`}
      className="group block rounded-xl overflow-hidden bg-card card-hover"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
      </div>
      <div className="p-5">
        <Badge variant="outline" className="mb-3 border-primary/50 text-primary">
          {categoryLabels[news.category]}
        </Badge>
        <h3 className="font-display text-xl md:text-2xl text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {news.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {news.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{news.author}</span>
          <span>•</span>
          <span>{new Date(news.date).toLocaleDateString("pt-BR")}</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
