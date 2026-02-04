export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
        404
      </p>
      <h1 className="text-3xl font-semibold text-white">
        Página não encontrada
      </h1>
      <p className="text-sm text-slate-300">
        A notícia que você procura pode ter sido movida. Explore nossas últimas
        atualizações na home.
      </p>
      <a
        href="/"
        className="rounded-full bg-amber-400 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-950"
      >
        Voltar para a home
      </a>
    </section>
  );
}
