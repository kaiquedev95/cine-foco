import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2, Clock, User, Loader2, Instagram, Youtube, Twitter, Facebook, Globe, Link as LinkIcon } from "lucide-react";
import { useNewsBySlug, useNewsByCategory } from "@/hooks/useNews";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCardDB from "@/components/NewsCardDB";
import { Badge } from "@/components/ui/badge";

interface ExternalLink {
  type: 'instagram' | 'youtube' | 'twitter' | 'tiktok' | 'facebook' | 'website' | 'other';
  url: string;
}

const getLinkIcon = (type: ExternalLink['type']) => {
  switch (type) {
    case 'instagram': return Instagram;
    case 'youtube': return Youtube;
    case 'twitter': return Twitter;
    case 'facebook': return Facebook;
    case 'website': return Globe;
    default: return LinkIcon;
  }
};

const getLinkLabel = (type: ExternalLink['type']) => {
  switch (type) {
    case 'instagram': return 'Instagram';
    case 'youtube': return 'YouTube';
    case 'twitter': return 'Twitter/X';
    case 'tiktok': return 'TikTok';
    case 'facebook': return 'Facebook';
    case 'website': return 'Site Oficial';
    default: return 'Link';
  }
};

const categoryLabels = {
  filme: "Filme",
  serie: "Série",
  streaming: "Streaming",
  review: "Review",
};

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: news, isLoading } = useNewsBySlug(slug || "");
  const { data: categoryNews } = useNewsByCategory(news?.category || "filme");

  const relatedNews = categoryNews
    ?.filter((n) => n.id !== news?.id)
    .slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="font-display text-4xl text-foreground mb-4">
              Notícia não encontrada
            </h1>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para a home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[70vh]">
          <img
            src={news.image_url || "https://via.placeholder.com/1920x1080"}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <article className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>

            {/* Article Header */}
            <Badge variant="default" className="mb-4 bg-primary text-primary-foreground">
              {categoryLabels[news.category]}
            </Badge>

            <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6 leading-tight animate-fade-in">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(news.created_at).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}</span>
              </div>
              <button className="ml-auto flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
            </div>

            {/* External Links */}
            {(() => {
              const raw = (news as any).external_links;
              const externalLinks: ExternalLink[] = Array.isArray(raw) ? (raw as ExternalLink[]) : [];
              if (externalLinks.length === 0) return null;

              return (
                <div className="flex flex-wrap gap-3 mb-8">
                  {externalLinks.map((link, index) => {
                    const Icon = getLinkIcon(link.type);
                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                      >
                        <Icon className="w-4 h-4" />
                        {getLinkLabel(link.type)}
                      </a>
                    );
                  })}
                </div>
              );
            })()}

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {news.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-foreground/90 leading-relaxed mb-6 text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-3xl text-foreground">
                Notícias Relacionadas
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <NewsCardDB key={item.id} news={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
