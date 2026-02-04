import type { Metadata } from "next";

import { SectionHeading } from "../../components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a missão editorial e o time responsável pela cobertura do CineFoco.",
};

const values = [
  "Cobertura responsável e plural do audiovisual.",
  "Compromisso com dados, contexto e transparência.",
  "Apoio a novos talentos e produções independentes.",
];

export default function SobrePage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-10 px-6 py-16">
      <SectionHeading title="Sobre" subtitle="Nossa história" />
      <p className="text-sm text-slate-300">
        O CineFoco é uma plataforma de jornalismo cultural dedicada a contar as
        histórias por trás das telas. Atuamos com uma equipe multidisciplinar
        para trazer notícias rápidas, análises aprofundadas e entrevistas
        exclusivas.
      </p>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
        <h3 className="text-lg font-semibold text-white">Nossos valores</h3>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          {values.map((value) => (
            <li key={value}>• {value}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
