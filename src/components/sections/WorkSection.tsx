import { useState } from 'react'

interface WorkSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

const PROJECTS = [
  {
    id: 'project-1',
    title: 'On-Time Delivery',
    description: 'Predicting pre-shipment delivery delays to help supply-chain teams proactively mitigate on-time delivery risks.',
    image: '/on-time-delivery-2.webp',
  },
  {
    id: 'project-2',
    title: 'Overtime Prediction',
    description: 'Predicting overtime requirements and hours across production lines to identify workload risks and reduce unnecessary overtime.',
    image: '/overtime.jpeg',
  },
  {
    id: 'project-3',
    title: 'Demand Forecasting',
    description: 'Forecasting intermittent spare-parts demand to optimize inventory levels, reduce overstocking, and lower inventory costs.',
    image: '/demand_forecasting.jpeg',
  },
]

export function WorkSection({ sectionRef }: WorkSectionProps) {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('Problem')
  const selectedProjectData = selectedProject === null ? null : PROJECTS[selectedProject]

  const openProject = (index: number) => {
    setSelectedProject(index)
    setActiveTab('Problem')
  }

  return (
    <div
      id="work"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden px-6 sm:px-12 md:px-20 py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {selectedProjectData ? (
        <div className="flex min-h-[min(72vh,760px)] flex-col">
          <div className="mb-16 flex flex-col gap-6 border-b border-white/30 pb-3 md:mb-28 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="font-mono-subtitle text-sm text-white/60 transition-colors hover:text-[var(--brand-orange)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-orange)]"
              >
                ← Projects
              </button>
              <span className="h-4 w-px bg-white/30" aria-hidden="true" />
              <p className="font-sans text-sm text-white/90">
                Project: <span className="font-semibold text-white">{selectedProjectData.title}</span>
              </p>
            </div>

            <div role="tablist" aria-label="Project details" className="grid grid-cols-3 gap-4 md:flex md:gap-5">
              {['Problem', 'Solution', 'Impact'].map((tab) => {
                const isSelected = activeTab === tab

                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(tab)}
                    className={`relative min-w-0 pb-3 text-left font-sans text-sm transition-colors sm:text-base md:min-w-28 ${isSelected ? 'text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    {isSelected && (
                      <span
                        className="absolute -left-3 top-1.5 h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: 'var(--brand-orange)' }}
                        aria-hidden="true"
                      />
                    )}
                    {tab}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full ${isSelected ? 'bg-white' : 'bg-white/50'}`}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div role="tabpanel" className="max-w-4xl">
            <span
              className="inline-flex rounded-md px-4 py-2 font-sans text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--brand-orange)' }}
            >
              {activeTab.toUpperCase()}
            </span>
            <h3
              className="mt-4 font-sans font-bold leading-[0.95] tracking-[-0.065em] text-white"
              style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}
            >
              Title
            </h3>
            <p className="mt-7 max-w-3xl font-sans text-lg leading-[1.35] text-white/90 sm:text-xl md:text-2xl">
              Placeholder copy for the {activeTab.toLowerCase()} behind this project. Replace this with the story, decisions, and outcomes when the project content is ready.
            </p>

            <ul className="mt-10 space-y-3 sm:mt-14">
              {['First placeholder detail', 'Second placeholder detail', 'Third placeholder detail'].map((detail) => (
                <li key={detail} className="flex items-center gap-4 font-mono-subtitle text-2xl text-white sm:text-3xl md:text-5xl">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#1a1a1a] sm:h-9 sm:w-9"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
      <>
      <div className="mb-10 md:mb-14">
        <p className="font-mono-subtitle text-white/30 text-xs tracking-[0.4em] uppercase mb-5">
          02 — Work
        </p>
        <h2
          className="font-sans font-semibold leading-[0.95] tracking-[-0.07em] text-white"
          style={{ fontSize: 'clamp(3.25rem, 8vw, 7rem)' }}
        >
          Born to <span style={{ color: 'var(--brand-orange)' }}>Build</span>
        </h2>
      </div>

      <div
        className="flex min-h-[460px] flex-col gap-7 sm:min-h-[500px] sm:flex-row sm:gap-6 lg:gap-10"
        onMouseLeave={() => setActiveProject(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setActiveProject(null)
          }
        }}
      >
        {PROJECTS.map((project, index) => {
          const isActive = activeProject === index

          return (
            <button
              key={project.id}
              type="button"
              aria-label={`Select project ${index + 1}`}
              aria-pressed={isActive}
              onMouseEnter={() => setActiveProject(index)}
              onFocus={() => setActiveProject(index)}
              onClick={() => openProject(index)}
              className={`group flex min-w-0 flex-col text-left transition-[flex,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-orange)] sm:h-auto ${isActive ? 'h-[460px] sm:flex-[2.65]' : 'h-[310px] sm:flex-1'}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className={`block w-full rounded-[2px] object-cover transition-[height,filter] duration-500 sm:h-[min(22vw,280px)] ${isActive ? 'h-[min(64vw,280px)]' : 'h-[min(45vw,190px)]'}`}
              />
              <span
                aria-hidden="true"
                className="mt-2.5 block h-9 w-full rounded-[2px] bg-[#d9d9d9] transition-colors duration-300 group-hover:bg-white"
              />
              <span
                aria-hidden="true"
                className="mt-2.5 block h-9 w-full rounded-[2px] bg-[#d9d9d9] transition-colors duration-300 group-hover:bg-white"
              />

              <span
                className={`mt-5 block font-mono-subtitle leading-none text-white transition-[font-size,color] duration-300 group-hover:text-[var(--brand-orange)] ${isActive ? 'text-2xl sm:text-3xl' : 'text-xl'}`}
              >
                {project.title}
              </span>
              <span className="mt-5 block max-w-[34rem] font-sans text-sm leading-snug text-white/75 sm:text-base">
                {project.description}
              </span>
            </button>
          )
        })}
      </div>
      </>
      )}
    </div>
  )
}
