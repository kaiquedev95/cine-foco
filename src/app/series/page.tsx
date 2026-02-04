import type { Metadata } from "next";

import { SectionHeading } from "../../components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Séries",
  description:
    "Acompanhe as principais notícias de séries, renovadas, canceladas e tendências de streaming.",
};

const seriesTopics = [
  {
    title: "Renovações e cancelamentos",
    description: "Status atualizado das principais produções do streaming.",
  },
  {
    title: "Guias de maratona",
    description: "Listas essenciais para acompanhar universos e franquias.",
  },
  {
    title: "Bastidores",
    description: "Informações sobre elenco, showrunners e produção.",
  },
];

export default function SeriesPage() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
      <SectionHeading title="Séries" subtitle="Streaming" />
      <p className="max-w-2xl text-sm text-slate-300">
        Notícias sobre séries em destaque, ranking de audiência e cobertura das
        plataformas de streaming, com o contexto que você precisa.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {seriesTopics.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
