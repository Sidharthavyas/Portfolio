// components/SkillsSection.tsx
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Frontend Jutsu',
    color: '#00ff88',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
    ]
  },
  {
    title: 'Backend Techniques',
    color: '#00ffff',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 88 },
      { name: 'MongoDB', level: 80 },
      { name: 'Firebase', level: 83 },
    ]
  },
  {
    title: 'Mastery Tools',
    color: '#e50914',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 75 },
      { name: 'GSAP', level: 80 },
    ]
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="skills" className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2300ff88' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#00ff88] tracking-widest uppercase text-sm mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Arsenal of Skills
          </h2>
          <h3 className="text-[#f0f0f0] text-5xl mb-6" style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>
            Ninja Techniques
          </h3>
          <p className="text-[#c8c8c8] max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Mastered through countless battles in the realm of code
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              className="relative group"
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 "
                style={{ background: category.color }}
              />

              <div 
                className="relative bg-[#121212] border rounded-lg p-6 h-full transition-all duration-500"
                style={{ 
                  borderColor: `${category.color}4D`,
                }}
              >
                <h4 
                  className="text-2xl mb-6 uppercase tracking-wide flex items-center gap-3"
                  style={{ 
                    fontFamily: "'Orbitron', sans-serif",
                    color: category.color 
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse" 
                    style={{ 
                      background: category.color, 
                      boxShadow: `0 0 10px ${category.color}` 
                    }} 
                  />
                  {category.title}
                </h4>

                <div className="space-y-7">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2 gap-2">
                        <span className="text-[#00ff88] text-sm font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {skill.name}
                        </span>
                        <span className="text-[#00ff88] text-sm font-mono ">
                        {skill.level}%
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#2a2a2a]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ 
                            duration: 1.5, 
                            delay: catIndex * 0.2 + skillIndex * 0.1,
                            ease: 'easeOut'
                          }}
                          className="h-full relative"
                          style={{ 
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}dd)`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 blur-sm" />
                          
                          {/* Gleam effect */}
                          <motion.div
                            className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-white/50"
                            animate={{ x: [0, 100] }}
                            transition={{ 
                              duration: 2, 
                              delay: catIndex * 0.2 + skillIndex * 0.1 + 1,
                              repeat: Infinity,
                              repeatDelay: 3
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}