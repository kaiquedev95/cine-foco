export function NewsletterForm() {
  return (
    <form className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        placeholder="Seu melhor e-mail"
        className="h-12 flex-1 rounded-full border border-slate-700 bg-slate-900 px-5 text-sm text-slate-100 placeholder:text-slate-500"
        aria-label="Seu melhor e-mail"
      />
      <button
        type="submit"
        className="h-12 rounded-full bg-amber-400 px-6 text-xs font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-amber-300"
      >
        Quero receber
      </button>
    </form>
  );
}
