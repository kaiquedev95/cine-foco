import type { Metadata, Viewport } from "next";

import "./globals.css";

import { Footer } from "../components/site/Footer";
import { Header } from "../components/site/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cinefoco.com.br"),
  title: {
    default: "CineFoco • Notícias de filmes e séries",
    template: "%s • CineFoco",
  },
  description:
    "Portal de notícias e críticas de filmes e séries com trailers, entrevistas, calendários de estreia e guias de streaming.",
  keywords: [
    "notícias de filmes",
    "notícias de séries",
    "críticas de cinema",
    "trailers",
    "streaming",
    "entrevistas",
    "premiações",
  ],
  openGraph: {
    title: "CineFoco • Notícias de filmes e séries",
    description:
      "Cobertura diária de lançamentos, bastidores e análises do universo do cinema e das séries.",
    url: "https://www.cinefoco.com.br",
    siteName: "CineFoco",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CineFoco - Notícias de filmes e séries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CineFoco • Notícias de filmes e séries",
    description:
      "Agenda de estreias, críticas rápidas e entrevistas exclusivas do mundo audiovisual.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://www.cinefoco.com.br",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
