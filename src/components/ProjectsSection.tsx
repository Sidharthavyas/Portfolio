// components/ProjectsSection.tsx
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import { NinjaBladeArc } from './NinjaBladeArc';

const projects = [
  {
    title: 'AI Mock Interview',
    mood: 'A dojo of algorithms and reflection',
    description: 'AI-powered interview simulator — built to challenge and refine technical interview skills through realistic, intelligent simulations.',
    tech: ['Next.JS', 'React.JS', 'Ai', 'Firebase','Better-Auth'],
    link: 'https://ai-mock-interview-mu-brown.vercel.app/sign-in',
    github: 'https://github.com/Sidharthavyas/Ai-mock-Interview',
  },
  {
    title: 'NidssCrochet',
    mood: 'Threads of design and creation',
    description: 'A creative handmade store — where code meets craft in a beautifully designed e-commerce experience.',
    tech: ['Next.js', 'CSS', 'GSAP', 'MongoDB'],
    link: 'https://nidsscrochet-shopping.vercel.app/',
    github: 'https://github.com/Sidharthavyas/Nidsscrochet',
  },
  {
    title: 'NexLearn - A Learning Mangement System',
    mood: 'Structure, balance, and learning',
    description: 'Learning platform — precision in structure and design for seamless course navigation and progress tracking.',
    tech: ['React', 'Express.JS', 'Redux', 'MongoDB','Clerk','Stripe'],
    link: 'https://lms-frontend-two-tau.vercel.app/',
    github: 'https://github.com/Sidharthavyas/LMS',
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showBladeArc, setShowBladeArc] = useState(false);

  const handleProjectClick = (index: number) => {
    setShowBladeArc(true);
    setTimeout(() => {
      setSelectedProject(index);
      setShowBladeArc(false);
    }, 400);
  };

  return (
    <section ref={ref} className="min-h-screen py-20 px-6 relative">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#00ff88 1px, transparent 1px),
                            linear-gradient(90deg, #00ff88 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#00ff88] tracking-widest uppercase text-sm mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The Creation Grounds
          </h2>
          <p className="text-[#f0f0f0] text-xl opacity-80" style={{ fontFamily: "'Inter', sans-serif" }}>
            Crafted with discipline and purpose
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => handleProjectClick(index)}
              className="group cursor-pointer relative"
            >
              {/* Card glow */}
              <motion.div
                className="absolute inset-0 bg-[#00ff88] rounded-lg blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                whileHover={{ scale: 1.1 }}
              />

              {/* Card */}
              <div className="relative bg-[#121212] border border-[#1e1e1e] rounded-lg p-6 h-full hover:border-[#00ff88] transition-colors duration-500 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-[#f0f0f0] text-xl mb-2 group-hover:text-[#00ff88] transition-colors uppercase tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {project.title}
                  </h3>
                  <p className="text-[#00ff88] text-sm italic opacity-70" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {project.mood}
                  </p>
                </div>

                <p className="text-[#c8c8c8] opacity-90 text-sm line-clamp-3 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs text-[#000000] bg-[#00ff88] bg-opacity-10 px-2 py-1 rounded border border-[#00ff88] border-opacity-30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(index);
                  }}
                  className="w-full bg-[#00ff88] text-[#000000] px-4 py-2.5 rounded-full uppercase tracking-wide transition-all duration-300 hover:bg-[#00ff88] hover:brightness-110 hover:shadow-[0_0_20px_#00ff88] border border-[#00ff88] mt-auto"
                  style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 600 }}
                >
                  View Project
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Blade Arc Animation */}
      <NinjaBladeArc trigger={showBladeArc} />

      {/* Project Modal */}
      {selectedProject !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121212] border border-[#00ff88] rounded-lg p-8 max-w-2xl w-full relative"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-[#eaeaea] hover:text-[#00ff88] transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="text-[#00ff88] text-3xl mb-2 uppercase tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {projects[selectedProject].title}
            </h3>
            <p className="text-[#c8c8c8] italic opacity-90 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              {projects[selectedProject].mood}
            </p>

            <p className="text-[#d4d4d4] opacity-90 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              {projects[selectedProject].description}
            </p>

            <div className="mb-6">
              <p className="text-[#00ff88] text-sm mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Technologies</p>
              <div className="flex flex-wrap gap-2">
                {projects[selectedProject].tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-sm text-[#000000] bg-[#00ff88] bg-opacity-90 px-3 py-1 rounded border border-[#00ff88]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href={projects[selectedProject].link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#00ff88] text-[#000000] px-6 py-3 rounded-full uppercase tracking-wide transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_#00ff88] border border-[#00ff88]"
                style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 600 }}
              >
                <ExternalLink size={18} />
                <span>View Project</span>
              </a>
              <a
                href={projects[selectedProject].github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#00ff88] hover:text-[#f0f0f0] transition-all duration-300 border border-[#00ff88] px-6 py-3 rounded-full hover:bg-[#00ff88] hover:bg-opacity-10 hover:shadow-[0_0_8px_rgba(0,255,136,0.3)]"
                style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 600 }}
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}