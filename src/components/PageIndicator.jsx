import { useState, useEffect } from 'react'

export default function PageIndicator({ scrollRef }) {
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    if (!scrollRef?.current) return

    const handleScroll = () => {
      const scrollTop = scrollRef.current.scrollTop
      const scrollHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight

      if (scrollHeight <= 0) {
        setCurrent(1)
        return
      }

      const progress = scrollTop / scrollHeight
      const sectionNum = Math.round(1 + progress * 2)
      setCurrent(Math.min(Math.max(sectionNum, 1), 3))
    }

    const element = scrollRef.current
    element.addEventListener('scroll', handleScroll)

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [scrollRef])

  return (
    <div
      className="pointer-events-none absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-40 flex items-center gap-3"
      style={{ mixBlendMode: 'difference' }}
    >
      <span className="text-white/80 text-[10px] font-medium uppercase tracking-[0.18em]">
        0{current}
      </span>
      <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.4)' }} />
      <span className="text-white/80 text-[10px] font-medium uppercase tracking-[0.18em]">
        03
      </span>
    </div>
  )
}
