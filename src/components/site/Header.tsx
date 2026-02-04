const navLinks = [
  { label: "Filmes", href: "/filmes" },
  { label: "Séries", href: "/series" },
  { label: "Críticas", href: "/criticas" },
  { label: "Entrevistas", href: "/entrevistas" },
  { label: "Guias", href: "/guias" },
];

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <span className="text-xl font-semibold text-white">CineFoco</span>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
            Cinema & Séries
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-amber-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-amber-300 hover:text-amber-300">
            Assinar newsletter
          </button>
          <button className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-amber-300">
            Seja membro
          </button>
        </div>
      </div>
    </header>
  );
}
