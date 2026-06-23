import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'

const CSS_VARS = {
  '--bg': '#0B0D10',
  '--surface': '#14171C',
  '--border': '#23262C',
  '--text': '#F2F0EA',
  '--text-muted': '#8B8F98',
  '--signal': '#E8483A',
  '--data': '#D9A95B',
}

export default function PortfolioShell({ children }) {
  return (
    <div
      id="portfolio-root"
      style={{
        ...CSS_VARS,
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        #portfolio-root h1,
        #portfolio-root h2,
        #portfolio-root h3,
        #portfolio-root h4 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          letter-spacing: -0.03em;
        }
        #portfolio-root .mono {
          font-family: 'IBM Plex Mono', monospace;
        }
        #portfolio-root a:focus-visible,
        #portfolio-root button:focus-visible {
          outline: 2px solid var(--signal);
          outline-offset: 3px;
          border-radius: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          #portfolio-root * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      {children}
    </div>
  )
}
