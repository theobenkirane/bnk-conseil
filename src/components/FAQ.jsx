import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Composant accordéon FAQ — expand/collapse par item
export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white border border-gray-200 overflow-hidden transition-all duration-200 hover:border-violet-300"
        >
          {/* Question */}
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
            aria-expanded={openIndex === i}
          >
            <span className="text-gray-900 font-semibold text-base leading-snug">
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-violet-600"
              style={{ background: openIndex === i ? 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.08))' : 'transparent' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </motion.span>
          </button>

          {/* Réponse */}
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <div className="px-6 pb-5 border-t border-gray-100">
                  <p className="text-gray-600 text-sm leading-relaxed pt-4">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
