import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNewsByCategory } from "@/hooks/useNews";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCardDB from "@/components/NewsCardDB";

const categoryInfo: Record<string, { title: string; description: string }> = {
  filme: {
    title: "Filmes",
    description: "As últimas notícias sobre lançamentos, bastidores e tudo sobre o mundo do cinema.",
  },
  serie: {
    title: "Séries",
    description: "Fique por dentro das novidades das suas séries favoritas e novas produções.",
  },
  streaming: {
    title: "Streaming",
    description: "Notícias sobre plataformas de streaming e conteúdo digital.",
  },
  review: {
    title: "Reviews",
    description: "Análises e críticas dos principais lançamentos do cinema e TV.",
  },
};

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const { data: news, isLoading } = useNewsByCategory(category || "");
  const info = category ? categoryInfo[category] : null;

  if (!info) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="font-display text-4xl text-foreground mb-4">
              Categoria não encontrada
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

      <main className="pt-24 container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        {/* Category Header */}
        <div className="mb-12">
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-4 animate-fade-in">
            {info.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {info.description}
          </p>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : news && news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {news.map((item, index) => (
              <div
                key={item.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <NewsCardDB news={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Nenhuma notícia encontrada nesta categoria.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;
