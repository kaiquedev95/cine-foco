import { NewsletterForm } from "../components/site/NewsletterForm";
import { NewsCard } from "../components/site/NewsCard";
import { SectionHeading } from "../components/site/SectionHeading";
import { Tag } from "../components/site/Tag";

const highlights = [
  {
    title: "Superproduções do verão ganham novo calendário mundial",
    category: "Calendário",
    summary:
      "Estúdios reorganizam estreias para apostar em eventos globais e reforçar franquias premiadas.",
    author: "Marina Costa",
    time: "há 2 horas",
    image: "Destaque 01",
  },
  {
    title: "Séries nacionais dominam ranking de audiência nos streamings",
    category: "Streaming",
    summary:
      "Plataformas investem em roteiristas locais e colhem aumento expressivo de assinantes.",
    author: "João Vidal",
    time: "há 4 horas",
    image: "Destaque 02",
  },
  {
    title: "Festivais internacionais anunciam line-up com foco em diversidade",
    category: "Festivais",
    summary:
      "Mostras ampliam presença de diretoras e obras latino-americanas em 2025.",
    author: "Letícia Prado",
    time: "há 6 horas",
    image: "Destaque 03",
  },
];

const trending = [
  {
    title: "Crítica expressa: drama sci-fi surpreende em roteiro e fotografia",
    category: "Crítica rápida",
    summary:
      "Um olhar direto sobre o longa que mistura ficção científica e emoções contidas.",
    author: "Pedro Nunes",
    time: "há 1 dia",
    image: "Trending 01",
  },
  {
    title: "Bastidores: como foi filmar a nova série histórica no Brasil",
    category: "Bastidores",
    summary:
      "Equipe compartilha desafios de produção e o trabalho de consultoria histórica.",
    author: "Ana Lima",
    time: "há 1 dia",
    image: "Trending 02",
  },
  {
    title: "Guia rápido: o que assistir antes do próximo universo expandido",
    category: "Guia",
    summary:
      "Organizamos filmes e séries essenciais para entrar no ritmo da nova saga.",
    author: "Lucas Faria",
    time: "há 2 dias",
    image: "Trending 03",
  },
  {
    title: "Entrevista: showrunner fala sobre o futuro de sua série de mistério",
    category: "Entrevista",
    summary:
      "Declarações exclusivas sobre personagens, arcos e próximos episódios.",
    author: "Bruna Rocha",
    time: "há 3 dias",
    image: "Trending 04",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-20 pb-16">
      <section className="border-b border-slate-800">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Tag>Notícia em destaque</Tag>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              O hub definitivo para notícias, críticas e tendências do cinema e
              das séries.
            </h1>
            <p className="text-lg text-slate-300">
              Cobertura diária com análise editorial, calendário de estreias,
              bastidores e guias de streaming para você não perder nada.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-amber-400 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-amber-300">
                Ver últimas notícias
              </button>
              <button className="rounded-full border border-slate-700 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-amber-300 hover:text-amber-300">
                Agenda de estreias
              </button>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-slate-400">
              <div>
                <p className="text-2xl font-semibold text-white">+250</p>
                <p>notícias por mês</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">+40</p>
                <p>críticas semanais</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">24/7</p>
                <p>monitoramento de trends</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Últimas do minuto
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Boletim diário com alertas rápidos, trailers e entrevistas ao
                vivo.
              </h2>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>• Estreias globais e nacionais em tempo real.</li>
                <li>• Painéis de festivais com análises instantâneas.</li>
                <li>• Repercussão dos principais prêmios da temporada.</li>
              </ul>
              <button className="mt-2 rounded-full border border-amber-400/40 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-amber-200 transition hover:border-amber-300 hover:text-amber-100">
                Ativar alertas
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-10 px-6">
        <SectionHeading
          title="Destaques da semana"
          subtitle="Curadoria"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <NewsCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
          <SectionHeading title="Radar de streaming" subtitle="Dados" />
          <p className="text-sm text-slate-300">
            Acompanhe os conteúdos mais assistidos em cada plataforma, com foco
            em tendências regionais e picos de audiência.
          </p>
          <div className="space-y-4 text-sm text-slate-200">
            <div className="flex items-center justify-between">
              <span>Drama policial</span>
              <span className="text-amber-300">▲ 24%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Comédias românticas</span>
              <span className="text-amber-300">▲ 18%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Séries documentais</span>
              <span className="text-amber-300">▲ 11%</span>
            </div>
          </div>
          <button className="rounded-full bg-amber-400 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-amber-300">
            Ver painel completo
          </button>
        </div>
        <div className="space-y-10">
          <SectionHeading title="Em alta" subtitle="Trending" />
          <div className="grid gap-6 md:grid-cols-2">
            {trending.map((item) => (
              <NewsCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <SectionHeading
              title="Receba a newsletter diária"
              subtitle="Inscreva-se"
            />
            <p className="text-sm text-slate-300">
              Curadoria exclusiva com as notícias mais relevantes do dia,
              recomendações de streaming e análises em profundidade.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
