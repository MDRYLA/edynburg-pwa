interface Props {
  title: string;
  content: string;
  index: number;
}

export function PlaceSection({ title, content, index }: Props) {
  const paragraphs = content.split(/\n\s*\n/).filter(Boolean);
  return (
    <section className={index > 0 ? "mt-10" : ""}>
      <h2 className="font-display text-2xl md:text-3xl leading-tight text-fg-primary">
        {title}
      </h2>
      <div className="h-px w-10 bg-accent mt-2 mb-4" aria-hidden />
      <div className="space-y-4 text-fg-secondary leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p.trim()}</p>
        ))}
      </div>
    </section>
  );
}
