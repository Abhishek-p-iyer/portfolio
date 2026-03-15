import { useRef } from 'react'
import './index.css'
import { HeroSection } from '@/components/HeroSection'
import { ContentsPage } from '@/components/ContentsPage'
import { AboutSection } from '@/components/sections/AboutSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ContactSection } from '@/components/sections/ContactSection'

function App() {
  const contentsRef  = useRef<HTMLDivElement>(null)
  const aboutRef     = useRef<HTMLDivElement>(null)
  const workRef      = useRef<HTMLDivElement>(null)
  const skillsRef    = useRef<HTMLDivElement>(null)
  const contactRef   = useRef<HTMLDivElement>(null)

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    about:   aboutRef,
    work:    workRef,
    skills:  skillsRef,
    contact: contactRef,
  }

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSelectSection = (id: string) => {
    const ref = sectionRefs[id]
    if (ref) scrollTo(ref)
  }

  return (
    <div
      className="w-full"
      style={{ backgroundColor: 'var(--portfolio-bg)' }}
    >
      {/* 1 — Hero */}
      <HeroSection onScrollDown={() => scrollTo(contentsRef)} />

      {/* 2 — Contents index */}
      <div ref={contentsRef}>
        <ContentsPage onSelect={handleSelectSection} />
      </div>

      {/* 3 — Individual sections */}
      <AboutSection   sectionRef={aboutRef}   />
      <WorkSection    sectionRef={workRef}    />
      <SkillsSection  sectionRef={skillsRef}  />
      <ContactSection sectionRef={contactRef} />
    </div>
  )
}

export default App
