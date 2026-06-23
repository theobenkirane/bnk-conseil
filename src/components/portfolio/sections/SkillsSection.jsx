import { motion } from 'framer-motion'
import { SKILLS } from '../../../lib/portfolio-content'

function SkillChip({ label }) {
  return (
    <motion.span
      whileHover={{ scale: 1.04, backgroundColor: 'var(--surface-2)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{
        display: 'inline-block',
        padding: '0.35rem 0.75rem',
        border: '1px solid var(--border)',
        borderRadius: '3px',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        background: 'var(--surface)',
        cursor: 'default',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      }}
    >
      {label}
    </motion.span>
  )
}

function SkillCategory({ cat, index }) {
  const isAI = cat.category === 'IA & Tech'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      style={{
        background: isAI ? 'var(--chess-dark)' : 'var(--surface)',
        border: '1px solid',
        borderColor: isAI ? 'var(--chess-dark)' : 'var(--border)',
        borderRadius: '10px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isAI && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '80px', height: '80px',
          background: 'radial-gradient(circle, rgba(185,28,28,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1rem', color: isAI ? 'rgba(240,230,206,0.7)' : 'var(--signal)' }}>
          {cat.icon}
        </span>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.95rem', fontWeight: 600,
          color: isAI ? 'var(--chess-light)' : 'var(--text)',
        }}>
          {cat.category}
          {isAI && <span style={{ marginLeft: '0.5rem', fontSize: '0.6rem', opacity: 0.6 }}>⚡ Nouveau levier</span>}
        </h3>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {cat.items.map((item) => (
          isAI ? (
            <span key={item} style={{
              display: 'inline-block',
              padding: '0.35rem 0.75rem',
              border: '1px solid rgba(240,230,206,0.2)',
              borderRadius: '3px',
              fontSize: '0.8rem',
              color: 'rgba(240,230,206,0.7)',
              background: 'rgba(240,230,206,0.06)',
              fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
            }}>
              {item}
            </span>
          ) : (
            <SkillChip key={item} label={item} />
          )
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="mono" style={{
          fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--signal)', marginBottom: '0.75rem',
        }}>
          Compétences
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, lineHeight: 1.05,
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '16ch',
        }}>
          Ce que j'apporte, outillé par l'IA.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.25rem',
        }}>
          {SKILLS.map((cat, i) => (
            <SkillCategory key={cat.category} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
