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

export function ContentsPage({ onSelect }: ContentsPageProps) {
  return (
    <div
      id="contents"
      className="relative w-full min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: 'var(--portfolio-bg)' }}
    >
      {/* Section label */}
      <div className="px-12 md:px-20 pt-16 pb-8">
        <p
          className="font-mono-subtitle text-white/30 text-xs tracking-[0.4em] uppercase mb-2"
        >
          Navigate
        </p>
        <h2
          className="font-pixel text-white"
          style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', letterSpacing: '0.05em' }}
        >
          Contents
        </h2>
      </div>

      {/* Divider */}
      <div className="px-12 md:px-20">
        <div className="w-full h-px bg-white/10" />
      </div>

      {/* Content items */}
      <ul className="flex-1 px-12 md:px-20" role="list">
        {CONTENTS.map((item) => (
          <li key={item.id} className="border-b border-white/10 last:border-b-0">
            <button
              onClick={() => onSelect(item.id)}
              className="w-full flex items-center justify-between py-8 md:py-10 group cursor-pointer text-left"
              aria-label={`Navigate to ${item.title} section`}
            >
              {/* Left: index + title */}
              <div className="flex items-baseline gap-6 md:gap-10">
                <span
                  className="font-pixel shrink-0 transition-colors duration-300 group-hover:text-[var(--brand-orange)]"
                  style={{
                    color: 'rgba(255,255,255,0.25)',
                    fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
                  }}
                >
                  {item.index}
                </span>
                <span
                  className="font-mono-subtitle font-normal text-white transition-colors duration-300 group-hover:text-[var(--brand-orange)]"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.01em' }}
                >
                  {item.title}
                </span>
              </div>

              {/* Right: description + arrow */}
              <div className="flex items-center gap-4 ml-4 shrink-0">
                <span
                  className="font-mono-subtitle text-white/30 text-sm hidden md:block transition-colors duration-300 group-hover:text-white/60"
                >
                  {item.description}
                </span>
                <span
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 transition-all duration-300 group-hover:border-[var(--brand-orange)] group-hover:text-[var(--brand-orange)] group-hover:scale-110"
                >
                  <ArrowRight size={16} strokeWidth={1.5} />
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Bottom divider */}
      <div className="px-12 md:px-20 pb-16">
        <div className="w-full h-px bg-white/10" />
      </div>
    </div>
  )
}
