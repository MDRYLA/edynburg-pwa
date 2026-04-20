interface Props {
  slug: string;
  size?: number;
  className?: string;
}

function CastleArt() {
  return (
    <>
      <path d="M20 180 L20 90 L60 90 L60 70 L70 60 L80 70 L80 90 L120 90 L120 60 L130 50 L140 60 L140 90 L180 90 L180 180 Z" />
      <path d="M20 120 L180 120" />
      <path d="M50 120 L50 180 M100 120 L100 180 M150 120 L150 180" />
      <path d="M70 60 L70 45 M130 50 L130 35" />
      <rect x="40" y="135" width="10" height="15" />
      <rect x="90" y="135" width="20" height="25" />
      <rect x="150" y="135" width="10" height="15" />
      <path d="M20 90 L15 90 L15 85 L20 85 M180 90 L185 90 L185 85 L180 85" />
    </>
  );
}

function CaltonHillArt() {
  return (
    <>
      <path d="M30 160 Q100 70 170 160" />
      <rect x="70" y="100" width="60" height="50" />
      <path d="M70 100 L70 85 M80 100 L80 85 M90 100 L90 85 M100 100 L100 85 M110 100 L110 85 M120 100 L120 85 M130 100 L130 85" />
      <path d="M65 100 L135 100 L135 95 L65 95 Z" />
      <path d="M140 110 L155 110 L155 150 L140 150 Z" />
      <circle cx="147" cy="100" r="5" />
    </>
  );
}

function ScottMonumentArt() {
  return (
    <>
      <path d="M100 20 L110 40 L110 60 L115 65 L115 90 L125 100 L125 140 L140 160 L140 180 L60 180 L60 160 L75 140 L75 100 L85 90 L85 65 L90 60 L90 40 Z" />
      <path d="M75 140 L125 140 M85 100 L115 100 M90 65 L110 65" />
      <circle cx="100" cy="35" r="2" />
    </>
  );
}

function StGilesArt() {
  return (
    <>
      <rect x="40" y="80" width="120" height="100" />
      <path d="M100 30 L100 80" />
      <path d="M85 50 L115 50 L115 80 L85 80 Z" />
      <path d="M92 50 L92 40 L108 40 L108 50" />
      <path d="M78 42 L92 42 L92 46 M108 46 L108 42 L122 42" />
      <rect x="55" y="110" width="15" height="30" />
      <rect x="92" y="110" width="16" height="40" />
      <rect x="130" y="110" width="15" height="30" />
      <path d="M55 110 Q62 100 70 110 M92 110 Q100 95 108 110 M130 110 Q137 100 145 110" />
    </>
  );
}

function RoyalMileArt() {
  return (
    <>
      <path d="M20 180 L180 180" />
      <path d="M20 180 L20 60 L60 60 L60 180" />
      <path d="M60 180 L60 80 L90 80 L90 180" />
      <path d="M90 180 L90 70 L130 70 L130 180" />
      <path d="M130 180 L130 90 L165 90 L165 180" />
      <path d="M165 180 L165 75 L185 75 L185 180" />
      <rect x="30" y="100" width="10" height="15" />
      <rect x="65" y="110" width="10" height="15" />
      <rect x="100" y="95" width="10" height="15" />
      <rect x="140" y="115" width="10" height="15" />
      <path d="M20 60 L10 65 M60 60 L60 55 M90 70 L100 60 M130 70 L140 65 M165 75 L175 70" />
    </>
  );
}

function VictoriaStreetArt() {
  return (
    <>
      <path d="M30 170 Q100 140 170 100" />
      <path d="M30 170 L30 120" />
      <path d="M55 155 L55 110" />
      <path d="M85 140 L85 95" />
      <path d="M115 125 L115 85" />
      <path d="M145 110 L145 75" />
      <path d="M30 120 L55 110 L85 95 L115 85 L145 75 L170 65" />
      <rect x="35" y="140" width="15" height="20" />
      <rect x="62" y="130" width="18" height="20" />
      <rect x="92" y="115" width="18" height="20" />
      <rect x="122" y="100" width="18" height="20" />
    </>
  );
}

const illustrations: Record<string, () => JSX.Element> = {
  "edinburgh-castle": CastleArt,
  "calton-hill": CaltonHillArt,
  "scott-monument": ScottMonumentArt,
  "st-giles-cathedral": StGilesArt,
  "royal-mile": RoyalMileArt,
  "victoria-street": VictoriaStreetArt,
};

export function PlaceIllustration({ slug, size = 200, className = "" }: Props) {
  const Art = illustrations[slug];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-fg-secondary ${className}`}
      aria-hidden
    >
      {Art ? <Art /> : <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />}
    </svg>
  );
}
