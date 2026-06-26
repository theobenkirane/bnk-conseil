import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStellar } from '../../contexts/StellarContext'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  stagger = 0,
  className = '',
  // eslint-disable-next-line no-unused-vars
  as: Element = 'div',
}) {
  const ref = useRef(null)
  const { scrollRef } = useStellar()

  useEffect(() => {
    const el = ref.current
    const scroller = scrollRef?.current
    if (!el || !scroller) return
    if (prefersReduced()) {
      gsap.set(el, { opacity: 1, clearProps: 'all' })
      return
    }

    const ctx = gsap.context(() => {
      const targets =
        variant === 'chars'
          ? el.querySelectorAll('[data-reveal-word]')
          : el

      const from =
        variant === 'clip'
          ? { clipPath: 'inset(100% 0 0 0)', opacity: 1 }
          : variant === 'chars'
            ? { y: '110%', opacity: 0 }
            : { y: 40, opacity: 0 }

      const to =
        variant === 'clip'
          ? { clipPath: 'inset(0% 0 0 0)' }
          : variant === 'chars'
            ? { y: '0%', opacity: 1 }
            : { y: 0, opacity: 1 }

      gsap.fromTo(targets, from, {
        ...to,
        duration: 0.8,
        ease: 'power3.out',
        delay,
        stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [scrollRef, variant, delay, stagger])

  // Pour variant 'chars', découper le texte en mots masqués
  if (variant === 'chars' && typeof children === 'string') {
    return (
      <Element ref={ref} className={className} aria-label={children}>
        {children.split(' ').map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            aria-hidden="true"
          >
            <span data-reveal-word className="inline-block">
              {word}&nbsp;
            </span>
          </span>
        ))}
      </Element>
    )
  }

  return (
    <Element ref={ref} className={className}>
      {children}
    </Element>
  )
}
