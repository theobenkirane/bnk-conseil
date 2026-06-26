import { useState, useEffect } from 'react'

export default function ScrollHint({ scrollRef }) {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    if (!scrollRef?.current) return

    const handleScroll = () => {
      const scrollTop = scrollRef.current.scrollTop
      const scrollHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight

      if (scrollHeight <= 0) {
        setOpacity(1)
        return
      }

      const progress = scrollTop / scrollHeight
      setOpacity(1 - Math.min(progress / 0.2, 1))
    }

    const element = scrollRef.current
    element.addEventListener('scroll', handleScroll)

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [scrollRef])

  return (
    <div
      className="pointer-events-none absolute bottom-4 sm:bottom-6 left-4 sm:left-8 z-40"
      style={{ mixBlendMode: 'difference', opacity }}
    >
      <span className="text-white/80 text-[10px] font-medium uppercase tracking-[0.18em]">
        Faites défiler
      </span>
    </div>
  )
}
