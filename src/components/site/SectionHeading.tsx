export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
        {subtitle}
      </p>
      <h2 className="text-2xl font-semibold text-white md:text-3xl">
        {title}
      </h2>
    </div>
  );
}
