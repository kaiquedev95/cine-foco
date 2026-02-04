import type { Metadata } from "next";

import { Tag } from "../../../components/site/Tag";

type NewsPageProps = {
  params: { slug: string };
};

const newsBySlug = {
  "estreias-globais": {
    title: "Estreias globais entram em nova fase com foco em eventos",
    category: "Mercado",
    excerpt:
      "Distribuidoras consolidam lançamentos mundiais para maximizar impacto nas bilheterias.",
  },
  "streaming-em-alta": {
    title: "Streaming brasileiro cresce com novos modelos de assinatura",
    category: "Streaming",
    excerpt:
      "Plataformas locais investem em formatos híbridos e experiências ao vivo.",
  },
  "guia-premiacoes": {
    title: "Guia de premiações: o que esperar da temporada",
    category: "Prêmios",
    excerpt:
      "Calendário completo com os principais eventos e expectativas do mercado.",
  },
};

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const article =
    newsBySlug[params.slug as keyof typeof newsBySlug] ??
    newsBySlug["estreias-globais"];

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default function NewsArticlePage({ params }: NewsPageProps) {
  const article =
    newsBySlug[params.slug as keyof typeof newsBySlug] ??
    newsBySlug["estreias-globais"];

  return (
    <article className="mx-auto w-full max-w-3xl space-y-6 px-6 py-16">
      <Tag>{article.category}</Tag>
      <h1 className="text-3xl font-semibold text-white md:text-4xl">
        {article.title}
      </h1>
      <p className="text-sm text-slate-400">Publicado há 3 horas</p>
      <div className="space-y-4 text-base text-slate-200">
        <p>{article.excerpt}</p>
        <p>
          O CineFoco acompanha em tempo real as decisões dos principais estúdios,
          trazendo impacto para salas de cinema e streamings. A nova estratégia
          tem como objetivo alinhar campanhas globais, com forte presença em
          eventos digitais e ativações locais.
        </p>
        <p>
          Nossa equipe analisou a movimentação do mercado e conversou com
          especialistas para entender como essas mudanças afetam o público e os
          criadores de conteúdo.
        </p>
      </div>
    </article>
  );
}
