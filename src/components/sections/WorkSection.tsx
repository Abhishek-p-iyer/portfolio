interface WorkSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

export function WorkSection({ sectionRef }: WorkSectionProps) {
  return (
    <div
      id="work"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center px-12 md:px-20 py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <p className="font-mono-subtitle text-white/30 text-xs tracking-[0.4em] uppercase mb-4">02 — Work</p>
      <h2
        className="font-pixel text-white mb-10"
        style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
      >
        Projects
      </h2>
      <p
        className="font-mono-subtitle text-white/70 max-w-2xl leading-relaxed"
        style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}
      >
        A collection of ML and data engineering projects — from model training pipelines 
        to real-time inference systems. More content coming soon.
      </p>
    </div>
  )
}
