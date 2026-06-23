import { motion } from 'framer-motion'
import { SKILLS } from '../../../lib/portfolio-content'

function SkillChip({ label }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, color: 'var(--text)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{
        display: 'inline-block',
        padding: '0.35rem 0.75rem',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        cursor: 'default',
        transition: 'border-color 0.2s',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      }}
    >
      {label}
    </motion.span>
  )
}

function SkillCategory({ cat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ borderColor: 'rgba(35,38,44,0.8)' }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'border-color 0.3s',
      }}
    >
      {/* Header catégorie */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.1rem', color: 'var(--signal)' }}>{cat.icon}</span>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text)',
          }}
        >
          {cat.category}
        </h3>
      </div>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {cat.items.map((item) => (
          <SkillChip key={item} label={item} />
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
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 3rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Eyebrow */}
      <p
        className="mono"
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--signal)',
          marginBottom: '0.75rem',
        }}
      >
        O-O — Compétences
      </p>

      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '3rem',
        }}
      >
        Maîtrise & outils
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {SKILLS.map((cat, i) => (
          <SkillCategory key={cat.category} cat={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
