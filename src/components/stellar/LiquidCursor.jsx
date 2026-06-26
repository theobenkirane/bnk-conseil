import { useEffect, useRef } from 'react'

export default function LiquidCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    const dot = dotRef.current
    if (!dot) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let x = mx
    let y = my
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      const t = e.target
      const interactive = t.closest('a, button, [data-cursor]')
      dot.style.width = interactive ? '46px' : '18px'
      dot.style.height = interactive ? '46px' : '18px'
      dot.style.opacity = interactive ? '0.6' : '1'
    }

    const loop = () => {
      x += (mx - x) * 0.18
      y += (my - y) * 0.18
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="hidden md:block fixed top-0 left-0 z-[60] pointer-events-none rounded-full mix-blend-difference"
      style={{
        width: 18,
        height: 18,
        background: 'var(--c-chrome-hi)',
        transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease',
      }}
    />
  )
}
