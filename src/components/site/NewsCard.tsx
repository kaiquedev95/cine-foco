import { Tag } from "./Tag";

export type NewsCardProps = {
  title: string;
  category: string;
  summary: string;
  author: string;
  time: string;
  image: string;
};

export function NewsCard({
  title,
  category,
  summary,
  author,
  time,
  image,
}: NewsCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
      <div className="h-44 w-full bg-slate-800">
        <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-500">
          {image}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <Tag>{category}</Tag>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-slate-300">{summary}</p>
        </div>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-400">
          <span>{author}</span>
          <span>{time}</span>
        </div>
      </div>
    </article>
  );
}
