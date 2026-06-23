import { motion } from 'framer-motion'
import { PROJECTS } from '../../../lib/portfolio-content'

function ProjectCard({ project, index }) {
  const isExternal = project.url !== '#'

  return (
    <motion.a
      href={project.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(28,25,23,0.1)' }}
      style={{
        display: 'block',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '2rem',
        textDecoration: 'none',
        cursor: isExternal ? 'pointer' : 'default',
        transition: 'box-shadow 0.3s, transform 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '2rem', right: '2rem',
        height: '2px',
        background: 'var(--signal)',
        opacity: index === 0 ? 1 : 0.3,
      }} aria-hidden="true" />

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '1.25rem', marginTop: '0.5rem',
      }}>
        <span className="mono" style={{
          fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--text-muted)', border: '1px solid var(--border)',
          borderRadius: '3px', padding: '0.2rem 0.5rem',
        }}>
          Projet
        </span>
        <span className="mono" style={{
          fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase',
          color: project.status === 'Actif' ? 'var(--signal)' : 'var(--text-muted)',
        }}>
          {project.status}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.35rem', fontWeight: 700,
        color: 'var(--text)', marginBottom: '0.3rem', lineHeight: 1.2,
      }}>
        {project.name}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--signal)', marginBottom: '0.85rem', fontWeight: 500 }}>
        {project.tagline}
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.tags.map((tag) => (
          <span key={tag} className="mono" style={{
            fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--text-muted)', padding: '0.2rem 0.5rem',
            background: 'var(--surface-2)', borderRadius: '3px',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {isExternal && (
        <div style={{
          position: 'absolute', bottom: '2rem', right: '2rem',
          color: 'var(--text-muted)', fontSize: '1rem',
        }} aria-hidden="true">↗</div>
      )}
    </motion.a>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid var(--border)',
        background: 'var(--surface-2)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="mono" style={{
          fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--signal)', marginBottom: '0.75rem',
        }}>
          Re1 — Projets
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.05,
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}>
          Ce que je construis
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
