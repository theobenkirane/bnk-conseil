import { motion } from 'framer-motion'
import { PROJECTS } from '../../../lib/portfolio-content'

function ProjectCard({ project, index }) {
  const isExternal = project.url !== '#'

  return (
    <motion.a
      href={project.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{
        y: -4,
        borderColor: 'rgba(232,72,58,0.35)',
        boxShadow: '0 8px 32px rgba(232,72,58,0.08)',
      }}
      style={{
        display: 'block',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '2rem',
        textDecoration: 'none',
        cursor: isExternal ? 'pointer' : 'default',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent top-left */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: 'var(--signal)',
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <span
          className="mono"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            borderRadius: '3px',
            padding: '0.2rem 0.5rem',
          }}
        >
          Projet
        </span>
        <span
          className="mono"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: project.status === 'Actif' ? 'var(--data)' : 'var(--text-muted)',
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Nom */}
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '0.4rem',
          lineHeight: 1.2,
        }}
      >
        {project.name}
      </h3>

      {/* Tagline */}
      <p style={{ fontSize: '0.9rem', color: 'var(--signal)', marginBottom: '1rem', fontWeight: 500 }}>
        {project.tagline}
      </p>

      {/* Description */}
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="mono"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              padding: '0.2rem 0.5rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '3px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Lien flèche */}
      {isExternal && (
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            color: 'var(--text-muted)',
            fontSize: '1rem',
          }}
          aria-hidden="true"
        >
          ↗
        </div>
      )}
    </motion.a>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
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
        Re1 — Projets
      </p>

      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '3rem',
        }}
      >
        Ce que je construis
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
