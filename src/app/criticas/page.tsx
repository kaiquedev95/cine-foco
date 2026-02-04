import type { Metadata } from "next";

import { SectionHeading } from "../../components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Críticas",
  description:
    "Críticas aprofundadas de filmes e séries, com análises técnicas e contexto editorial.",
};

const reviewFormats = [
  {
    title: "Crítica aprofundada",
    description: "Textos longos com análise narrativa, direção e fotografia.",
  },
  {
    title: "Express",
    description: "Insights rápidos para decidir o que assistir hoje.",
  },
  {
    title: "Painel crítico",
    description: "Debates entre críticos convidados e especialistas.",
  },
];

export default function CriticasPage() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
      <SectionHeading title="Críticas" subtitle="Análises" />
      <p className="max-w-2xl text-sm text-slate-300">
        Opiniões editoriais para ajudar você a escolher o próximo filme ou série
        com base em critérios técnicos e narrativos.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {reviewFormats.map((item) => (
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
