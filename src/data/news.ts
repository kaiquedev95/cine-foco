export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: "filme" | "serie" | "streaming" | "review";
  author: string;
  date: string;
  featured?: boolean;
}

export const newsData: NewsItem[] = [
  {
    id: "1",
    slug: "novo-trailer-homem-aranha-4",
    title: "Novo trailer de Homem-Aranha 4 revela vilão surpresa",
    excerpt: "O aguardado trailer do quarto filme solo do Homem-Aranha finalmente chegou e trouxe revelações impactantes para os fãs.",
    content: `O aguardado trailer do quarto filme solo do Homem-Aranha finalmente chegou e trouxe revelações impactantes para os fãs. O vídeo, lançado hoje pela Sony Pictures e Marvel Studios, mostra Peter Parker enfrentando novos desafios após os eventos do filme anterior.

A grande surpresa ficou por conta da revelação do vilão principal, que estava sendo mantido em segredo até agora. O trailer mostra cenas intensas de ação e promete ser o filme mais emocionante da franquia até o momento.

Os fãs rapidamente lotaram as redes sociais para comentar sobre as revelações, e as teorias já começaram a surgir. O filme está programado para estrear em dezembro do próximo ano.

"Este é o projeto mais ambicioso que já fizemos com o personagem", declarou o produtor em entrevista exclusiva. "Os fãs vão ficar muito surpresos com o que preparamos."`,
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=500&fit=crop",
    category: "filme",
    author: "Carlos Silva",
    date: "2024-01-15",
    featured: true,
  },
  {
    id: "2",
    slug: "stranger-things-5-data-lancamento",
    title: "Stranger Things 5: Netflix confirma data de lançamento",
    excerpt: "A temporada final da série cult está chegando e promete encerrar a saga de Hawkins de forma épica.",
    content: `A Netflix finalmente confirmou a data de lançamento da quinta e última temporada de Stranger Things, uma das séries mais populares da plataforma. Os episódios finais chegarão no segundo semestre deste ano.

Os irmãos Duffer, criadores da série, prometem um final grandioso para a história de Eleven e seus amigos. "Estamos muito emocionados em poder dar aos fãs o encerramento que eles merecem", disseram em comunicado.

A temporada contará com episódios mais longos, alguns chegando a duas horas de duração, para dar conta de toda a narrativa planejada.`,
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=500&fit=crop",
    category: "serie",
    author: "Ana Rodrigues",
    date: "2024-01-14",
    featured: true,
  },
  {
    id: "3",
    slug: "disney-plus-novidades-2024",
    title: "Disney+ anuncia lineup impressionante para 2024",
    excerpt: "Plataforma promete dezenas de novos títulos exclusivos, incluindo séries do universo Marvel e Star Wars.",
    content: `O Disney+ revelou seu calendário de lançamentos para 2024, e os fãs têm muito o que esperar. A plataforma anunciou mais de 30 novos títulos exclusivos, incluindo séries do universo Marvel, Star Wars e Pixar.

Entre os destaques estão novas séries derivadas de sucessos como Loki e The Mandalorian, além de produções originais que prometem conquistar o público.

A empresa também anunciou investimentos em produções locais, incluindo conteúdo brasileiro exclusivo para a plataforma.`,
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&h=500&fit=crop",
    category: "streaming",
    author: "Pedro Costa",
    date: "2024-01-13",
  },
  {
    id: "4",
    slug: "review-oppenheimer-obra-prima",
    title: "Review: Oppenheimer é obra-prima de Christopher Nolan",
    excerpt: "O épico biográfico do diretor britânico entrega uma experiência cinematográfica incomparável.",
    content: `Christopher Nolan mais uma vez prova porque é um dos maiores cineastas da atualidade com Oppenheimer, um épico biográfico que mergulha na vida do físico J. Robert Oppenheimer e a criação da bomba atômica.

Com uma performance arrebatadora de Cillian Murphy no papel principal, o filme é uma jornada intensa de três horas que nunca perde o ritmo. A direção impecável de Nolan, combinada com a fotografia deslumbrante e trilha sonora envolvente, cria uma experiência cinematográfica única.

Nota: 9.5/10 - Um filme obrigatório para qualquer amante de cinema.`,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
    category: "review",
    author: "Marina Santos",
    date: "2024-01-12",
  },
  {
    id: "5",
    slug: "the-last-of-us-temporada-2",
    title: "The Last of Us: Segunda temporada terá mais episódios",
    excerpt: "HBO confirma expansão da série e revela detalhes sobre a adaptação do segundo jogo.",
    content: `A HBO confirmou que a segunda temporada de The Last of Us terá mais episódios do que a primeira, devido à complexidade da narrativa do segundo jogo da franquia.

Os showrunners Craig Mazin e Neil Druckmann explicaram que a história de The Last of Us Part II é muito maior e mais densa, exigindo mais tempo para ser contada adequadamente.

Pedro Pascal e Bella Ramsey retornam em seus papéis icônicos, e novos personagens importantes serão introduzidos ao longo da temporada.`,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=500&fit=crop",
    category: "serie",
    author: "Lucas Mendes",
    date: "2024-01-11",
  },
  {
    id: "6",
    slug: "avatar-3-titulo-revelado",
    title: "James Cameron revela título oficial de Avatar 3",
    excerpt: "O diretor compartilhou o nome do terceiro filme da franquia e prometeu uma experiência ainda mais imersiva.",
    content: `James Cameron finalmente revelou o título oficial do terceiro filme da franquia Avatar, que está em produção há anos. O diretor prometeu que o novo capítulo levará os espectadores a partes nunca antes vistas de Pandora.

"Este filme vai expandir o universo de maneiras que os fãs nem imaginam", disse Cameron em entrevista. "Estamos usando tecnologias que ainda não existiam quando fizemos os dois primeiros filmes."

O lançamento está previsto para 2025, e as filmagens já foram concluídas.`,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop",
    category: "filme",
    author: "Fernanda Lima",
    date: "2024-01-10",
  },
];

export const getNewsById = (id: string): NewsItem | undefined => {
  return newsData.find((news) => news.id === id);
};

export const getNewsBySlug = (slug: string): NewsItem | undefined => {
  return newsData.find((news) => news.slug === slug);
};

export const getFeaturedNews = (): NewsItem[] => {
  return newsData.filter((news) => news.featured);
};

export const getNewsByCategory = (category: NewsItem["category"]): NewsItem[] => {
  return newsData.filter((news) => news.category === category);
};
