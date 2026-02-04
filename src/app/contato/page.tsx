import type { Metadata } from "next";

import { SectionHeading } from "../../components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a redação do CineFoco para sugestões, assessoria e imprensa.",
};

export default function ContatoPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-10 px-6 py-16">
      <SectionHeading title="Contato" subtitle="Fale conosco" />
      <p className="text-sm text-slate-300">
        Quer compartilhar uma pauta, enviar material de imprensa ou anunciar?
        Estamos prontos para ouvir você.
      </p>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
        <div className="space-y-4 text-sm text-slate-200">
          <p>📨 imprensa@cinefoco.com.br</p>
          <p>📣 comercial@cinefoco.com.br</p>
          <p>📍 Avenida das Estrelas, 1200 - São Paulo, SP</p>
        </div>
      </div>
    </section>
  );
}
