import { Link } from 'react-router-dom';

export default function NominationCard({ title, subtitle, to, className = '' }) {
  return (
    <Link
      to={to}
      className={`max-w-[20em] h-[5em] hover:-translate-y-0.5 transition-transform duration-200 block relative ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <polygon
          points="14,0 100,0 100,86 86,100 0,100 0,14"
          fill="none"
          stroke="rgba(6,99,119,0.25)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4">
        <div className="text-[13px] font-semibold text-[#154359]">{title}</div>
        <div className="text-[12px] text-[#154359] opacity-80">{subtitle}</div>
      </div>
    </Link>
  );
}
