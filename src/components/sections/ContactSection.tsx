interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

export function ContactSection({ sectionRef }: ContactSectionProps) {
  return (
    <div
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center px-12 md:px-20 py-24"
      style={{ backgroundColor: 'var(--portfolio-bg)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <p className="font-mono-subtitle text-white/30 text-xs tracking-[0.4em] uppercase mb-4">04 — Contact</p>
      <h2
        className="font-pixel text-white mb-10"
        style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
      >
        Get In Touch
      </h2>
      <p
        className="font-mono-subtitle text-white/70 max-w-xl leading-relaxed mb-8"
        style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}
      >
        Open to new opportunities and collaborations. Let's build something great together.
      </p>
      <a
        href="mailto:hello@abhishekiyer.dev"
        className="font-mono-subtitle inline-block text-[var(--brand-orange)] border border-[var(--brand-orange)] px-8 py-4 hover:bg-[var(--brand-orange)] hover:text-white transition-all duration-300 self-start"
        style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', letterSpacing: '0.1em' }}
      >
        Say Hello →
      </a>
    </div>
  )
}
