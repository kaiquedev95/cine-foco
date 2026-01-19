import { Link } from "react-router-dom";
import { useAllNews, useFeaturedNews, useWorldNews } from "@/hooks/useNews";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCardDB from "@/components/NewsCardDB";
import { Loader2, Globe, ArrowRight } from "lucide-react";

const Index = () => {
  const { data: allNews, isLoading: isLoadingAll } = useAllNews();
  const { data: featuredNews, isLoading: isLoadingFeatured } = useFeaturedNews();
  const { data: worldNews, isLoading: isLoadingWorld } = useWorldNews();

  const latestNews = allNews?.filter((n) => !n.featured && n.category !== 'mundo') || [];
  const isLoading = isLoadingAll || isLoadingFeatured;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section with Featured News */}
        <section className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : featuredNews && featuredNews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {featuredNews.map((news, index) => (
                <div
                  key={news.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <NewsCardDB news={news} variant="featured" />
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {/* Latest News */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Últimas Notícias
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((news, index) => (
                <div
                  key={news.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <NewsCardDB news={news} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma notícia disponível ainda.</p>
            </div>
          )}
        </section>

        {/* World News Section */}
        {!isLoadingWorld && worldNews && worldNews.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="font-display text-3xl md:text-4xl text-foreground">
                  Notícias do Mundo
                </h2>
                <div className="flex-1 h-px bg-border hidden md:block" />
              </div>
              <Link 
                to="/categoria/mundo" 
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                Ver todas
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {worldNews.slice(0, 6).map((news, index) => (
                <div
                  key={news.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <NewsCardDB news={news} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sidebar with Compact News */}
        {!isLoading && allNews && allNews.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-display text-2xl text-foreground">
                    Mais Lidas
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="bg-card rounded-xl p-4">
                  {allNews.filter(n => n.category !== 'mundo').slice(0, 4).map((news) => (
                    <NewsCardDB key={news.id} news={news} variant="compact" />
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
