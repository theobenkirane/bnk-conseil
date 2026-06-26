export default function LiquidDivider({ color = 'var(--c-bg-results)', flip = false }) {
  return (
    <div
      className="relative w-full h-16 sm:h-24 pointer-events-none -mt-px"
      style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
      aria-hidden="true"
    >
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
            <feColorMatrix
              in="b"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            />
          </filter>
        </defs>
      </svg>
      <div
        className="absolute inset-0 flex justify-around items-end"
        style={{ filter: 'url(#liquid-goo)' }}
      >
        <span className="block w-1/3 h-full rounded-t-full" style={{ background: color }} />
        <span className="block w-1/2 h-3/4 rounded-t-full" style={{ background: color }} />
        <span className="block w-1/4 h-full rounded-t-full" style={{ background: color }} />
        <span className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: color }} />
      </div>
    </div>
  )
}
