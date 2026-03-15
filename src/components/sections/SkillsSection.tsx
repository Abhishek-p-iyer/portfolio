interface SkillsSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

const SKILLS = ['Python', 'PySpark', 'SQL', 'TensorFlow', 'MLflow', 'Docker', 'Azure Databricks', 'Git', 'CI/CD', 'MLOPs', 'LLMOPs','Gen AI']

export function SkillsSection({ sectionRef }: SkillsSectionProps) {
  return (
    <div
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center px-12 md:px-20 py-24"
      style={{ backgroundColor: 'var(--portfolio-bg)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
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
    </div>
  )
}
