import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// À remplacer par de vrais témoignages clients avec accord explicite
const testimonials = [
  {
    quote: "BNK Conseil nous a aidé à structurer notre approche commerciale de A à Z. Un accompagnement concret, opérationnel, avec des résultats visibles en quelques semaines.",
    author: "Client TPE",
    role: "Secteur Commerce — France",
    initials: "C",
    rating: 5,
  },
  {
    quote: "L'audit commercial a mis le doigt sur des blocages qu'on ne voyait plus. Le plan d'action était clair et applicable immédiatement. Je recommande.",
    author: "Dirigeant Startup",
    role: "Secteur Tech — France",
    initials: "D",
    rating: 5,
  },
  {
    quote: "Théo comprend vite les enjeux d'une petite structure. Pas de jargon, pas de théorie — que de l'opérationnel. C'est exactement ce dont on avait besoin.",
    author: "Co-fondatrice",
    role: "Secteur Services — France",
    initials: "S",
    rating: 5,
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="#F59E0B" className="w-4 h-4">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Rotation automatique toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir * -60 }),
  }

  const t = testimonials[current]

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Carte témoignage */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-2xl p-8 sm:p-10 bg-white border border-violet-100 shadow-sm shadow-violet-100/50"
          >
            {/* Guillemet */}
            <div
              className="text-6xl font-serif leading-none mb-4 opacity-70"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              "
            </div>

            <StarRating count={t.rating} />

            <p className="text-gray-600 text-lg leading-relaxed mt-4 mb-6 italic">
              {t.quote}
            </p>

            {/* Auteur */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full border-2 border-violet-200 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)', width: 48, height: 48 }}
                aria-label={t.author}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-gray-900 font-semibold text-sm">{t.author}</p>
                <p className="text-gray-400 text-sm">{t.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contrôles de navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 flex items-center justify-center text-gray-500 hover:text-violet-600 shadow-sm"
          aria-label="Témoignage précédent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Points indicateurs */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-6 h-2 bg-violet-500'
                  : 'w-2 h-2 bg-violet-200 hover:bg-violet-300'
              }`}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 flex items-center justify-center text-gray-500 hover:text-violet-600 shadow-sm"
          aria-label="Témoignage suivant"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
