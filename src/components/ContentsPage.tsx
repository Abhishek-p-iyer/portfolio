import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export interface ContentItem {
  id: string
  index: string
  title: string
  description: string
}

const CONTENTS: ContentItem[] = [
  { id: 'about',   index: '01', title: 'About',   description: 'Who I am & what drives me'       },
  { id: 'work',    index: '02', title: 'Work',     description: 'Projects & experience'            },
  { id: 'skills',  index: '03', title: 'Skills',   description: 'Tech stack & tools'               },
  { id: 'contact', index: '04', title: 'Contact',  description: 'Let\'s build something together'  },
]

interface ContentsPageProps {
  onSelect: (id: string) => void
}

function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

interface ContentRowProps {
  item: ContentItem
  index: number
  onSelect: (id: string) => void
}

function ContentRow({ item, index, onSelect }: ContentRowProps) {
  const { ref, visible } = useInView<HTMLLIElement>(0.1)

  return (
    <li
      ref={ref}
      className="border-b border-white/10 last:border-b-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        transitionDelay: `${index * 90}ms`,
      }}
    >
      <button
        onClick={() => onSelect(item.id)}
        className="w-full flex items-center justify-between py-8 md:py-10 group cursor-pointer text-left"
        aria-label={`Navigate to ${item.title} section`}
      >
        {/* Left: index + title */}
        <div className="flex items-baseline gap-6 md:gap-10">
          <span
            className="font-pixel shrink-0 transition-all duration-300 group-hover:text-[var(--brand-orange)] group-hover:scale-110"
            style={{
              color: 'rgba(255,255,255,0.25)',
              fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
              display: 'inline-block',
            }}
          >
            {item.index}
          </span>
          <span
            className="font-mono-subtitle font-normal text-white transition-all duration-300 group-hover:text-[var(--brand-orange)] group-hover:translate-x-2"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.01em',
              display: 'inline-block',
            }}
          >
            {item.title}
          </span>
        </div>

        {/* Right: description + arrow */}
        <div className="flex items-center gap-4 ml-4 shrink-0">
          <span
            className="font-mono-subtitle text-white/30 text-sm hidden md:block transition-all duration-300 group-hover:text-white/70 group-hover:translate-x-1"
          >
            {item.description}
          </span>
          <span
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 transition-all duration-300 group-hover:border-[var(--brand-orange)] group-hover:text-[var(--brand-orange)] group-hover:scale-110 group-hover:translate-x-1"
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </span>
        </div>
      </button>
    </li>
  )
}

export function ContentsPage({ onSelect }: ContentsPageProps) {
  const { ref: headerRef, visible: headerVisible } = useInView(0.2)
  const { ref: dividerTopRef, visible: dividerTopVisible } = useInView(0.5)
  const { ref: dividerBottomRef, visible: dividerBottomVisible } = useInView(0.5)

  return (
    <div
      id="contents"
      className="relative w-full min-h-screen flex flex-col justify-center"
      style={{}}
    >
      {/* Section label + heading */}
      <div
        ref={headerRef}
        className="px-12 md:px-20 pt-16 pb-8"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <p className="font-mono-subtitle text-white/30 text-xs tracking-[0.4em] uppercase mb-2">
          Navigate
        </p>
        <h2
          className="font-pixel text-white"
          style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', letterSpacing: '0.05em' }}
        >
          Contents
        </h2>
      </div>

      {/* Top divider — draws in */}
      <div className="px-12 md:px-20" ref={dividerTopRef}>
        <div
          className="h-px bg-white/10"
          style={{
            width: dividerTopVisible ? '100%' : '0%',
            transition: 'width 0.8s ease',
            transitionDelay: '0.2s',
          }}
        />
      </div>

      {/* Content rows */}
      <ul className="flex-1 px-12 md:px-20" role="list">
        {CONTENTS.map((item, i) => (
          <ContentRow key={item.id} item={item} index={i} onSelect={onSelect} />
        ))}
      </ul>

      {/* Bottom divider — draws in */}
      <div className="px-12 md:px-20 pb-16" ref={dividerBottomRef}>
        <div
          className="h-px bg-white/10"
          style={{
            width: dividerBottomVisible ? '100%' : '0%',
            transition: 'width 0.8s ease',
            transitionDelay: '0.4s',
          }}
        />
      </div>
    </div>
  )
}
