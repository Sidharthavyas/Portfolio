// components/ComicProjectsSection.tsx
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'AI Mock Interview',
    description: 'AI-powered interview simulator built to challenge and refine technical skills.',
    tech: ['Next.JS', 'React.JS', 'AI', 'Firebase', 'Better-Auth'],
    link: 'https://ai-mock-interview-mu-brown.vercel.app/sign-in',
    github: 'https://github.com/Sidharthavyas',
    bubble: "Master your interview skills!",
    color: '#00ff88',
  },
  {
    title: 'NidssCrochet',
    description: 'A creative handmade store where code meets craft in beautiful design.',
    tech: ['Next.js', 'CSS', 'GSAP', 'MongoDB'],
    link: 'https://nidsscrochet-shopping.vercel.app/',
    github: 'https://github.com/Sidharthavyas',
    bubble: "Crafted with precision!",
    color: '#00ffff',
  },
  {
    title: 'LMS Frontend',
    description: 'Learning platform with precision in structure and seamless navigation.',
    tech: ['React', 'Express.JS', 'Redux', 'MongoDB', 'Clerk', 'Stripe'],
    link: 'https://lms-frontend-two-tau.vercel.app/',
    github: 'https://github.com/Sidharthavyas',
    bubble: "Learn like a ninja!",
    color: '#e50914',
  },
];

export function ComicProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="projects" className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Comic book dots background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle, #00ff88 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#00ff88] tracking-widest uppercase text-sm mb-4" 
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Project Chronicles
          </h2>
          <h3 className="text-[#f0f0f0] text-5xl mb-6" 
              style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>
            Battle-Tested Creations
          </h3>
        </motion.div>

        {/* Staggered manga-style panels */}
        <div className="space-y-12">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -100 : 100, rotate: isEven ? -2 : 2 }}
                animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative ${isEven ? 'ml-0 mr-auto' : 'ml-auto mr-0'} max-w-4xl`}
              >
                {/* Manga panel border effect */}
                <div 
                  className="absolute -inset-1 rounded-lg opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}40, transparent)`,
                    transform: 'skew(-2deg)',
                  }}
                />

                {/* Main panel */}
                <div 
                  className="relative bg-[#0a0a0a] border-4 rounded-lg overflow-hidden"
                  style={{ 
                    borderColor: project.color,
                    transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {/* Diagonal speed lines */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-px bg-white"
                        style={{
                          width: '150%',
                          top: `${i * 15}%`,
                          left: '-50%',
                          transform: `rotate(-${isEven ? 10 : -10}deg)`,
                        }}
                        animate={hoveredIndex === index ? { x: [0, 50] } : {}}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      />
                    ))}
                  </div>

                  <div className="relative p-8">
                    {/* Speech bubble */}
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={hoveredIndex === index ? { scale: 1, rotate: 0 } : { scale: 0 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className={`absolute ${isEven ? 'right-8' : 'left-8'} -top-6 z-10`}
                    >
                      <div 
                        className="relative px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap"
                        style={{ 
                          backgroundColor: project.color,
                          color: '#000',
                          fontFamily: "'Space Grotesk', sans-serif"
                        }}
                      >
                        {project.bubble}
                        {/* Speech bubble tail */}
                        <div 
                          className="absolute top-full w-0 h-0"
                          style={{
                            [isEven ? 'right' : 'left']: '20px',
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderTop: `10px solid ${project.color}`,
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Project title with action lines */}
                    <div className="relative mb-4">
                      <h3 
                        className="text-3xl font-bold uppercase tracking-wide relative z-10"
                        style={{ 
                          color: project.color,
                          fontFamily: "'Orbitron', sans-serif",
                          textShadow: `2px 2px 0px rgba(0,0,0,0.8), 0 0 10px ${project.color}40`
                        }}
                      >
                        {project.title}
                      </h3>
                      
                      {/* Manga impact lines behind title */}
                      <motion.div
                        className="absolute inset-0 -z-10"
                        animate={hoveredIndex === index ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute h-1 opacity-30"
                            style={{
                              backgroundColor: project.color,
                              width: `${60 + i * 20}%`,
                              top: `${30 + i * 20}%`,
                              left: isEven ? '0' : 'auto',
                              right: isEven ? 'auto' : '0',
                              transform: `skew(${isEven ? -10 : 10}deg)`,
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>

                    <p 
                      className="text-[#d4d4d4] mb-6 text-lg leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {project.description}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                          className="px-3 py-1 rounded-full text-xs font-bold border-2"
                          style={{
                            backgroundColor: `${project.color}10`,
                            borderColor: project.color,
                            color: project.color,
                            fontFamily: "'Space Grotesk', sans-serif"
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-4">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-300"
                        style={{
                          backgroundColor: project.color,
                          color: '#000',
                          fontFamily: "'Exo 2', sans-serif"
                        }}
                        whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${project.color}80` }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={18} />
                        <span>Launch</span>
                      </motion.a>

                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold border-2 transition-all duration-300"
                        style={{
                          borderColor: project.color,
                          color: project.color,
                          fontFamily: "'Exo 2', sans-serif"
                        }}
                        whileHover={{ 
                          backgroundColor: `${project.color}20`,
                          boxShadow: `0 0 15px ${project.color}40`
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={18} />
                        <span>Code</span>
                      </motion.a>
                    </div>
                  </div>

                  {/* Comic panel corner fold */}
                  <div 
                    className="absolute bottom-0 right-0 w-12 h-12"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${project.color}20 50%)`,
                      borderLeft: `2px solid ${project.color}40`,
                      borderTop: `2px solid ${project.color}40`,
                    }}
                  />
                </div>

                {/* Panel number */}
                <div 
                  className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4"
                  style={{
                    backgroundColor: '#0a0a0a',
                    borderColor: project.color,
                    color: project.color,
                    fontFamily: "'Orbitron', sans-serif",
                    boxShadow: `0 0 20px ${project.color}60`
                  }}
                >
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}