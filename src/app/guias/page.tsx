import type { Metadata } from "next";

import { SectionHeading } from "../../components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Guias",
  description:
    "Guias de streaming, listas essenciais e recomendações personalizadas.",
};

const guides = [
  {
    title: "O que assistir agora",
    description: "Seleção semanal com as melhores estreias do streaming.",
  },
  {
    title: "Universos compartilhados",
    description: "Ordem ideal para acompanhar franquias e sagas.",
  },
  {
    title: "Premiações",
    description: "Listas dos indicados e vencedores dos grandes prêmios.",
  },
];

export default function GuiasPage() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
      <SectionHeading title="Guias" subtitle="Curadoria" />
      <p className="max-w-2xl text-sm text-slate-300">
        Roteiros e listas inteligentes para aproveitar o melhor do cinema e das
        séries sem perder tempo.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {guides.map((item) => (
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
