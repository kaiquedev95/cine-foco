import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2, Clock, User } from "lucide-react";
import { getNewsBySlug, newsData } from "@/data/news";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { Badge } from "@/components/ui/badge";

const categoryLabels = {
  filme: "Filme",
  serie: "Série",
  streaming: "Streaming",
  review: "Review",
};

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const news = getNewsBySlug(slug || "");

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

  const relatedNews = newsData
    .filter((n) => n.category === news.category && n.id !== news.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[70vh]">
          <img
            src={news.image}
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

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(news.date).toLocaleDateString("pt-BR", {
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
              {relatedNews.map((news) => (
                <NewsCard key={news.id} news={news} />
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
