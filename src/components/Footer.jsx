import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Offres', path: '/offres' },
  { label: 'À propos', path: '/a-propos' },
  { label: 'Contact', path: '/rdv' },
]

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-violet-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Colonne marque */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <span
                className="text-3xl font-black tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                BNK
              </span>
              <span className="text-gray-400 text-sm font-semibold">Conseil</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              On booste votre moteur commercial. Nous accompagnons les TPE et startups à structurer et accélérer leur croissance.
            </p>
            {/* Liens sociaux */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/theobenkirane/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 text-violet-500 hover:bg-violet-100 hover:text-violet-700 transition-all duration-200"
                aria-label="LinkedIn BNK Conseil"
              >
                <LinkedInIcon />
              </a>
              <a
                href="mailto:conseil.bnk@gmail.com"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 text-violet-500 hover:bg-violet-100 hover:text-violet-700 transition-all duration-200"
                aria-label="Email BNK Conseil"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne navigation */}
          <div>
            <h3 className="text-gray-800 font-semibold text-sm mb-5 uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-500 text-sm hover:text-violet-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne contact */}
          <div>
            <h3 className="text-gray-800 font-semibold text-sm mb-5 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:conseil.bnk@gmail.com"
                  className="text-gray-500 text-sm hover:text-violet-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 text-violet-400">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  conseil.bnk@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/theobenkirane/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 text-sm hover:text-violet-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/rdv"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-violet-300/40"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  Réserver un appel
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} BNK Conseil. Tous droits réservés.
          </p>
          <p className="text-gray-400 text-sm">
            Fait avec ambition, pour les entreprises qui veulent croître.
          </p>
        </div>
      </div>
    </footer>
  )
}
