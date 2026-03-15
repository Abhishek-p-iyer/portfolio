import { useState, useEffect, useRef } from 'react'
import { Menu, ChevronDown } from 'lucide-react'
import { useTypewriter } from '@/hooks/useTypewriter'

const TOPICS = ['Data', 'ML', 'AI']
const HERO_NAME = 'Abhishek Iyer'

const ASCII_CHARS = ['%', '&', '!', '.', '+', ' ', ' ', ' ']

interface AsciiCharacter {
  id: number
  char: string
  x: number
  y: number
  opacity: number
  size: number
}

function useAsciiBackground(count: number): AsciiCharacter[] {
  const [chars, setChars] = useState<AsciiCharacter[]>([])

  useEffect(() => {
    const generated: AsciiCharacter[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      char: ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0.05 + Math.random() * 0.15,
      size: 10 + Math.random() * 6,
    }))
    setChars(generated)
  }, [count])

  return chars
}

interface HeroSectionProps {
  onScrollDown?: () => void
  menuItems?: string[]
}

export function HeroSection({ onScrollDown, menuItems = ['Home', 'About', 'Work', 'Contact'] }: HeroSectionProps) {
  const typedWord = useTypewriter(TOPICS)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const asciiChars = useAsciiBackground(200)
  const containerRef = useRef<HTMLDivElement>(null)

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: 'var(--portfolio-bg)' }}
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/texture-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 'var(--texture-opacity)',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />

      {/* ASCII background characters */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {asciiChars.map((c) => (
          <span
            key={c.id}
            className="absolute select-none font-mono-subtitle"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              opacity: c.opacity,
              fontSize: `${c.size}px`,
              color: '#ffffff',
            }}
          >
            {c.char}
          </span>
        ))}
      </div>

      {/* ── Hamburger menu (top-right) ── */}
      <header className="relative z-20 flex justify-end p-8">
        <button
          className="w-11 h-11 flex items-center justify-center text-white hover:text-[var(--brand-orange)] transition-colors duration-200 cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <Menu size={28} strokeWidth={2} />
        </button>
      </header>

      {/* ── Main hero content ── */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-12 md:px-20 -mt-16">
        {/* Pixel NAME heading */}
        <h1
          className="font-pixel leading-none select-none"
          style={{
            color: 'var(--brand-orange)',
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            letterSpacing: '-0.02em',
            textShadow: '0 0 80px rgba(255, 77, 0, 0.3)',
          }}
        >
          {HERO_NAME}
        </h1>

        {/* Typewriter subtitle */}
        <div className="mt-10 flex items-center gap-0 flex-wrap">
          <span
            className="font-mono-subtitle text-white"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', letterSpacing: '0.02em' }}
          >
            Let&#39;s talk about&nbsp;
          </span>
          <span
            className="font-mono-subtitle"
            style={{
              color: 'var(--brand-orange)',
              fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
              letterSpacing: '0.02em',
            }}
          >
            {typedWord}
            <span
              className="inline-block w-[3px] h-[1em] align-middle ml-0.5 relative -top-0.5"
              style={{
                backgroundColor: 'var(--brand-orange)',
                opacity: cursorVisible ? 1 : 0,
                transition: 'opacity 0.1s',
              }}
              aria-hidden="true"
            />
          </span>
        </div>
      </main>

      {/* ── Scroll indicator (bottom-center) ── */}
      <footer className="relative z-20 flex justify-center items-center pb-8">
        <button
          onClick={onScrollDown}
          aria-label="Scroll to contents"
          className="flex flex-col items-center gap-2 text-white/50 hover:text-[var(--brand-orange)] transition-colors duration-300 cursor-pointer group"
        >
          <span className="font-mono-subtitle text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown
            size={20}
            strokeWidth={1.5}
            className="animate-bounce group-hover:text-[var(--brand-orange)]"
          />
        </button>
      </footer>

      {/* ── Mobile nav overlay ── */}
      {menuOpen && (
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: 'rgba(26,26,26,0.97)' }}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-[var(--brand-orange)] transition-colors cursor-pointer"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="4" x2="24" y2="24" />
              <line x1="24" y1="4" x2="4" y2="24" />
            </svg>
          </button>
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-mono-subtitle text-white text-3xl hover:text-[var(--brand-orange)] transition-colors duration-200 tracking-widest uppercase"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
