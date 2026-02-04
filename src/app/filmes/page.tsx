import type { Metadata } from "next";

import { SectionHeading } from "../../components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Filmes",
  description:
    "Notícias de lançamentos, críticas e bastidores do cinema mundial em um só lugar.",
};

const movieUpdates = [
  {
    title: "Estreias da semana",
    description: "Calendário com as principais estreias nos cinemas brasileiros.",
  },
  {
    title: "Críticas rápidas",
    description: "Análises objetivas de filmes recém-lançados.",
  },
  {
    title: "Entrevistas",
    description: "Conversas com diretores, atores e produtores.",
  },
];

export default function FilmesPage() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
      <SectionHeading title="Filmes" subtitle="Cobertura" />
      <p className="max-w-2xl text-sm text-slate-300">
        Acompanhe estreias, críticas e bastidores das grandes produções e do
        cinema independente, com curadoria editorial e foco em diversidade.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {movieUpdates.map((item) => (
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
