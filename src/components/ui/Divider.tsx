type Ornament = "star" | "thistle" | "cross" | "knot";

const marks: Record<Ornament, string> = {
  star: "✦",
  thistle: "❈",
  cross: "✚",
  knot: "❖",
};

export function Divider({ ornament = "star" }: { ornament?: Ornament }) {
  return (
    <div className="divider-ornament" role="separator" aria-hidden>
      <span className="divider-ornament__mark">{marks[ornament]}</span>
    </div>
  );
}
