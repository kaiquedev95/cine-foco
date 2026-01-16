import { useSearchParams } from "react-router-dom";
import { useAllNews } from "@/hooks/useNews";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCardDB from "@/components/NewsCardDB";
import { Loader2, Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data: allNews, isLoading } = useAllNews();

  const filteredNews = allNews?.filter((news) => {
    const searchLower = query.toLowerCase();
    return (
      news.title.toLowerCase().includes(searchLower) ||
      news.excerpt.toLowerCase().includes(searchLower) ||
      news.author.toLowerCase().includes(searchLower) ||
      news.category.toLowerCase().includes(searchLower)
    );
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <section className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <SearchIcon className="w-6 h-6 text-primary" />
            <h1 className="font-display text-2xl md:text-3xl text-foreground">
              Resultados para "{query}"
            </h1>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredNews.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                {filteredNews.length} resultado{filteredNews.length !== 1 ? "s" : ""} encontrado{filteredNews.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((news, index) => (
                  <div
                    key={news.id}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <NewsCardDB news={news} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <SearchIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-xl text-foreground mb-2">Nenhum resultado encontrado</h2>
              <p className="text-muted-foreground">
                Não encontramos nenhuma notícia para "{query}". Tente outro termo.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
