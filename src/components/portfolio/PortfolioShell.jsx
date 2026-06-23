import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'

const CSS_VARS = {
  '--bg':          '#F8F5F0',
  '--surface':     '#FFFFFF',
  '--surface-2':   '#EEE9E0',
  '--border':      '#E0D9CF',
  '--text':        '#1C1917',
  '--text-muted':  '#7A7268',
  '--signal':      '#B91C1C',
  '--data':        '#92400E',
  '--chess-light': '#F0E6CE',
  '--chess-dark':  '#2C2018',
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
        #portfolio-root ::selection {
          background: var(--chess-dark);
          color: var(--chess-light);
        }
      `}</style>
      {children}
    </div>
  )
}
