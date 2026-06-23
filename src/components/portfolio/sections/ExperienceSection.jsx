import { motion } from 'framer-motion'
import { EXPERIENCE } from '../../../lib/portfolio-content'

function ExperienceRow({ exp, index, isLast }) {
  const isCurrent = index === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.55fr) minmax(0, 1.45fr)',
        gap: 'clamp(1.5rem, 4vw, 3.5rem)',
        paddingBottom: isLast ? 0 : 'clamp(2.5rem, 4vw, 3.5rem)',
        marginBottom: isLast ? 0 : 'clamp(2.5rem, 4vw, 3.5rem)',
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
      }}
      className="exp-row"
    >
      {/* Left — meta */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span className="mono" style={{
            fontSize: '0.62rem', letterSpacing: '0.06em',
            color: 'var(--text-muted)',
          }}>
            {exp.period}
          </span>
          <span className="mono" style={{
            fontSize: '0.55rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)', borderRadius: '3px',
            padding: '0.1rem 0.4rem',
          }}>
            {exp.type}
          </span>
        </div>
        <p className="mono" style={{
          fontSize: '0.7rem', letterSpacing: '0.04em', color: 'var(--text-muted)',
        }}>
          {exp.location}
        </p>
        {isCurrent && exp.badge && (
          <span style={{
            display: 'inline-block', marginTop: '0.75rem',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.6rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            fontWeight: 600, color: '#fff', background: 'var(--signal)',
            borderRadius: '4px', padding: '0.25rem 0.6rem',
          }}>
            🏆 {exp.badge}
          </span>
        )}
      </div>

      {/* Right — content */}
      <div>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1.25rem, 2.6vw, 1.75rem)',
          fontWeight: 700, color: 'var(--text)', lineHeight: 1.15,
          marginBottom: '0.15rem',
        }}>
          {exp.role}
        </h3>
        <p style={{
          fontSize: '1rem', color: 'var(--signal)', fontWeight: 600, marginBottom: '0.9rem',
        }}>
          {exp.company}
        </p>

        {exp.highlight && (
          <p style={{
            fontSize: '0.95rem', color: 'var(--text)', fontWeight: 500,
            lineHeight: 1.5, marginBottom: '1rem',
            paddingLeft: '0.9rem', borderLeft: '2px solid var(--signal)',
          }}>
            {exp.highlight}
          </p>
        )}

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {exp.missions.map((m, i) => (
            <li key={i} style={{
              display: 'flex', gap: '0.7rem', alignItems: 'flex-start',
              fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55,
            }}>
              <span style={{ color: 'var(--signal)', flexShrink: 0, marginTop: '1px', fontSize: '0.75rem' }}>♟</span>
              {m}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {exp.tags.map((t) => (
            <span key={t} className="mono" style={{
              fontSize: '0.58rem', letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--text-muted)', background: 'var(--surface-2)',
              borderRadius: '3px', padding: '0.2rem 0.5rem',
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .exp-row { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}</style>
    </motion.div>
  )
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid var(--border)',
        background: 'var(--surface-2)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p className="mono" style={{
          fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--signal)', marginBottom: '0.75rem',
        }}>
          Parcours
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, lineHeight: 1.05,
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '16ch',
        }}>
          5 ans de terrain, des résultats à chaque poste.
        </h2>

        <div>
          {EXPERIENCE.map((exp, i) => (
            <ExperienceRow
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === EXPERIENCE.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
