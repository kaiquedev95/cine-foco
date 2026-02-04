const footerLinks = [
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
  { label: "Política editorial", href: "/sobre" },
  { label: "Publicidade", href: "/contato" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">CineFoco</p>
          <p className="text-sm text-slate-400">
            Notícias diárias, críticas profundas e bastidores exclusivos do mundo
            audiovisual.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-amber-300"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="text-sm text-slate-500">
          © 2025 CineFoco. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
