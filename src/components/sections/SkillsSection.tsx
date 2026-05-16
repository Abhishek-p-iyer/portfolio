import { useEffect, useRef, useState } from 'react'

interface SkillsSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

const SKILLS = ['Python', 'PySpark', 'SQL', 'TensorFlow', 'MLflow', 'Docker', 'Azure Databricks', 'Git', 'CI/CD', 'MLOPs', 'LLMOPs', 'Gen AI']

interface Certification {
  name: string
  issuer: string
  year: string
}

const CERTIFICATIONS: Certification[] = [
  { name: 'Databricks Certified Machine Learning Professional', issuer: 'Databricks', year: '2025' },
  { name: 'Databricks Certified Generative AI Associate', issuer: 'Databricks', year: '2025' },
  { name: 'Databricks Certified Data Engineer Professional', issuer: 'Databricks', year: '2025' },
  { name: 'Databricks Certified Data Engineer Associate', issuer: 'Databricks', year: '2024' },
]

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="border border-white/20 px-5 py-4 flex flex-col gap-2 hover:border-[var(--brand-orange)] transition-colors duration-200 group cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s ease',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Year badge */}
      <span
        className="font-pixel group-hover:text-[var(--brand-orange)] transition-colors duration-200"
        style={{ color: 'var(--brand-orange)', fontSize: '0.55rem', letterSpacing: '0.1em' }}
      >
        {cert.year}
      </span>
      {/* Cert name */}
      <p
        className="font-mono-subtitle text-white/80 group-hover:text-white transition-colors duration-200 leading-snug"
        style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}
      >
        {cert.name}
      </p>
      {/* Issuer */}
      <p
        className="font-mono-subtitle text-white/30 group-hover:text-white/50 transition-colors duration-200"
        style={{ fontSize: '0.78rem' }}
      >
        {cert.issuer}
      </p>
    </div>
  )
}

export function SkillsSection({ sectionRef }: SkillsSectionProps) {
  return (
    <div
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center px-12 md:px-20 py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* ── Tech Stack ── */}
      <p className="font-mono-subtitle text-white/30 text-xs tracking-[0.4em] uppercase mb-4">03 — Skills</p>
      <h2
        className="font-pixel text-white mb-10"
        style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
      >
        Tech Stack
      </h2>
      <div className="flex flex-wrap gap-3 max-w-2xl">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            className="font-mono-subtitle text-white/80 border border-white/20 px-4 py-2 text-sm hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition-colors duration-200 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="w-full max-w-2xl h-px bg-white/10 my-14" />

      {/* ── Certifications ── */}
      <p className="font-mono-subtitle text-white/30 text-xs tracking-[0.4em] uppercase mb-4">
        Certifications
      </p>
      <h2
        className="font-pixel text-white mb-10"
        style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
      >
        Credentials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {CERTIFICATIONS.map((cert, i) => (
          <CertCard key={cert.name} cert={cert} index={i} />
        ))}
      </div>
    </div>
  )
}
