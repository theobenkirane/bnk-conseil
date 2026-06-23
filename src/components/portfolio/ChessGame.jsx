import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CHESS_GAME, CHESS_GAME_CREDIT } from '../../lib/portfolio-content'

// Unicode glyphs
const GLYPH = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
}

// Standard starting position as a flat list of piece instances.
// Each piece keeps a stable id so the board can animate moves and captures.
const BACK_RANK = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
const INITIAL_PIECES = (() => {
  const list = []
  for (let f = 0; f < 8; f++) {
    const file = String.fromCharCode(97 + f)
    list.push({ id: `w-${file}1`, sq: `${file}1`, type: BACK_RANK[f], color: 'w' })
    list.push({ id: `w-${file}2`, sq: `${file}2`, type: 'P', color: 'w' })
    list.push({ id: `b-${file}7`, sq: `${file}7`, type: 'P', color: 'b' })
    list.push({ id: `b-${file}8`, sq: `${file}8`, type: BACK_RANK[f], color: 'b' })
  }
  return list
})()

// Replay the game up to `ply` half-moves and return the living pieces.
function piecesAtPly(ply) {
  const pieces = INITIAL_PIECES.map((p) => ({ ...p, alive: true }))
  for (let i = 0; i < ply; i++) {
    const m = CHESS_GAME[i]
    const captured = pieces.find((p) => p.alive && p.sq === m.to)
    if (captured) captured.alive = false
    const mover = pieces.find((p) => p.alive && p.sq === m.from)
    if (mover) mover.sq = m.to
    if (m.castle) {
      const rook = pieces.find((p) => p.alive && p.sq === m.castle.from)
      if (rook) rook.sq = m.castle.to
    }
  }
  return pieces.filter((p) => p.alive)
}

function squareToXY(sq) {
  const file = sq.charCodeAt(0) - 97        // a..h -> 0..7
  const rank = parseInt(sq[1], 10) - 1       // 1..8 -> 0..7
  return { left: file * 12.5, top: (7 - rank) * 12.5 }
}

// 64 static square backgrounds
const SQUARES = Array.from({ length: 64 }, (_, i) => {
  const f = i % 8
  const r = Math.floor(i / 8)
  return { i, light: (f + r) % 2 === 0 }
})

export default function ChessGame() {
  const [ply, setPly] = useState(0)
  const reducedRef = useRef(false)

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      // Reach checkmate slightly before the very bottom so the final move lands on Contact.
      const target = Math.round(progress * CHESS_GAME.length * 1.04)
      setPly(Math.min(CHESS_GAME.length, target))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const pieces = useMemo(() => piecesAtPly(ply), [ply])
  const lastMove = ply > 0 ? CHESS_GAME[ply - 1] : null
  const highlight = lastMove ? new Set([lastMove.from, lastMove.to]) : new Set()
  const moveNo = lastMove ? lastMove.n : 0
  const isMate = ply >= CHESS_GAME.length

  return (
    <div className="chess-game" aria-hidden="true">
      <style>{`
        .chess-game {
          position: fixed;
          left: 1.5rem;
          bottom: 1.5rem;
          z-index: 40;
          width: 196px;
          padding: 0.7rem;
          border-radius: 12px;
          background: rgba(255,255,255,0.82);
          border: 1px solid var(--border);
          box-shadow: 0 18px 50px rgba(28,25,23,0.16), 0 2px 8px rgba(28,25,23,0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: none;
          user-select: none;
        }
        @media (min-width: 1100px) {
          .chess-game { display: block; }
        }
      `}</style>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: '0.55rem',
      }}>
        <span className="mono" style={{
          fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          La partie
        </span>
        <span className="mono" style={{
          fontSize: '0.58rem', fontWeight: 600,
          color: isMate ? 'var(--signal)' : 'var(--text)',
        }}>
          {isMate ? 'Mat' : `${moveNo} / 17`}
        </span>
      </div>

      {/* Board */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid var(--chess-dark)',
      }}>
        {/* square backgrounds */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(8, 1fr)',
        }}>
          {SQUARES.map(({ i, light }) => {
            const f = i % 8
            const r = Math.floor(i / 8)
            const sq = `${String.fromCharCode(97 + f)}${8 - r}`
            const hot = highlight.has(sq)
            return (
              <div key={i} style={{
                background: hot
                  ? (light ? 'rgba(185,28,28,0.30)' : 'rgba(185,28,28,0.42)')
                  : (light ? 'var(--chess-light)' : 'var(--chess-dark)'),
                transition: 'background 0.3s',
              }} />
            )
          })}
        </div>

        {/* pieces */}
        <AnimatePresence>
          {pieces.map((p) => {
            const { left, top } = squareToXY(p.sq)
            return (
              <motion.div
                key={p.id}
                initial={false}
                animate={{ left: `${left}%`, top: `${top}%` }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={reducedRef.current
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 220, damping: 26 }}
                style={{
                  position: 'absolute',
                  width: '12.5%',
                  height: '12.5%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  lineHeight: 1,
                  color: p.color === 'w' ? '#F7EFD8' : '#140C06',
                  textShadow: p.color === 'w'
                    ? '0 1px 2px rgba(0,0,0,0.55)'
                    : '0 1px 1px rgba(255,255,255,0.18)',
                  pointerEvents: 'none',
                }}
              >
                {GLYPH[`${p.color}${p.type}`]}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Caption */}
      <div style={{
        marginTop: '0.55rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span className="mono" style={{
          fontSize: '0.62rem', fontWeight: 600,
          color: isMate ? 'var(--signal)' : 'var(--text)',
        }}>
          {lastMove ? `${moveNo}. ${lastMove.san}` : 'Position de départ'}
        </span>
        <span className="mono" style={{
          fontSize: '0.5rem', letterSpacing: '0.06em',
          color: 'var(--text-muted)', opacity: 0.7,
        }}>
          {CHESS_GAME_CREDIT}
        </span>
      </div>
    </div>
  )
}
