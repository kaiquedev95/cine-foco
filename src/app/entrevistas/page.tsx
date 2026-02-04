import type { Metadata } from "next";

import { SectionHeading } from "../../components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Entrevistas",
  description:
    "Entrevistas exclusivas com diretores, atores e showrunners do audiovisual.",
};

const interviewAreas = [
  {
    title: "Atores e atrizes",
    description: "Bate-papos sobre personagens, processos criativos e carreira.",
  },
  {
    title: "Direção e produção",
    description: "Visão dos bastidores, planejamento e decisões artísticas.",
  },
  {
    title: "Showrunners",
    description: "Estratégias de narrativa e planos para próximas temporadas.",
  },
];

export default function EntrevistasPage() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
      <SectionHeading title="Entrevistas" subtitle="Exclusivo" />
      <p className="max-w-2xl text-sm text-slate-300">
        Conversas aprofundadas sobre tendências criativas, bastidores e o futuro
        das produções que movem o mercado audiovisual.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {interviewAreas.map((item) => (
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
