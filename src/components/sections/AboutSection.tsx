import { useEffect, useRef, useState } from 'react'

interface AboutSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

interface TimelineEntry {
  period: string
  org: string
  role: string
  type: 'education' | 'work'
}

const TIMELINE: TimelineEntry[] = [
  {
    period: '2026 – Present',
    org: 'Latentview Analytics',
    role: 'Senior Analyst - Data Science',
    type: 'work',
  },
  {
    period: '2024 – 2026',
    org: 'Latentview Analytics',
    role: 'Analyst & MLOPs Engineer',
    type: 'work',
  },
  {
    period: '2023',
    org: 'Bosch Global Software Technologies',
    role: 'Digitalization Intern',
    type: 'work',
  },
  {
    period: '2019 – 2023',
    org: 'Vellore Institute Of Technology',
    role: 'BTech — Electronics & Communication Engineering',
    type: 'education',
  },

]

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const revealDelay = (TIMELINE.length - index - 1) * 150

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex gap-6 transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${revealDelay}ms`,
      }}
    >
      {/* Spine: dot + line */}
      <div className="flex flex-col items-center shrink-0" style={{ width: 20 }}>
        {/* Dot */}
        <div
          className="rounded-full shrink-0 z-10"
          style={{
            width: 12,
            height: 12,
            backgroundColor: 'var(--brand-orange)',
            boxShadow: '0 0 10px rgba(255,77,0,0.6)',
            marginTop: 6,
          }}
        />
        {/* Vertical line to next */}
        {index < TIMELINE.length - 1 && (
          <div
            className="mt-2 flex-1 transition-transform duration-700 ease-out"
            style={{
              width: 1,
              minHeight: 48,
              backgroundColor: 'rgba(255,77,0,0.25)',
              transform: visible ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'bottom',
              transitionDelay: `${revealDelay}ms`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-10">
        {/* Period */}
        <span
          className="font-pixel block mb-2"
          style={{ color: 'var(--brand-orange)', fontSize: '0.6rem', letterSpacing: '0.1em' }}
        >
          {entry.period}
        </span>
        {/* Org */}
        <p
          className="font-mono-subtitle text-white font-normal leading-tight mb-1"
          style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}
        >
          {entry.org}
        </p>
        {/* Role */}
        <p
          className="font-mono-subtitle text-white/40"
          style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)' }}
        >
          {entry.role}
        </p>
      </div>
    </div>
  )
}

export function AboutSection({ sectionRef }: AboutSectionProps) {
  return (
    <div
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 px-12 md:px-20 py-24">

        {/* ── Left: About text ── */}
        <div className="flex flex-col justify-center">
          <p className="font-mono-subtitle text-white/30 text-xs tracking-[0.4em] uppercase mb-4">
            01 — About
          </p>
          <h2
            className="font-pixel text-white mb-8 leading-snug"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)' }}
          >
            Who I Am
          </h2>
          <p
            className="font-mono-subtitle text-white/60 leading-relaxed mb-6"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}
          >
            ML Engineer specializing in MLOps, LLMOps, and production-scale machine learning systems. Developed
            and productionized scalable forecasting pipelines to support high-volume demand predictions at
            enterprise scale. 
          </p>
          <p
            className="font-mono-subtitle text-white/60 leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}
          >
            Architected a scalable MLOps platform enabling automated retraining, evaluation,
            deployment, rollbacks and end-to-end observability. Built an agentic AI system to convert SQL and Pandas workloads
            into optimized PySpark, significantly improving distributed processing efficiency.
          </p>
        </div>

        {/* ── Right: Timeline ── */}
        <div className="flex flex-col justify-center lg:pl-10 lg:border-l lg:border-white/10">
          <p className="font-mono-subtitle text-white/30 text-xs tracking-[0.4em] uppercase mb-10">
            Timeline
          </p>
          <div>
            {TIMELINE.map((entry, i) => (
              <TimelineItem key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
