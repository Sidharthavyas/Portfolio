import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const timeline = [
  {
    position: 'Software Engineer Intern',
    organization: 'Translogistics Pvt. Ltd',
    period: 'Dec 2024 – Sep 2025',
    keywords: ['Backend APIs', 'Data optimization'],
  },
  {
    position: 'Software Engineer Intern',
    organization: 'Vighnesh.inc',
    period: 'Jul 2024 – Dec 2024',
    keywords: ['Interface latency reduction', 'Python integrations'],
  },
  {
    position: 'B.E. Electronics & Computer Science',
    organization: 'TCET',
    period: 'Nov 2022 – May 2026',
    keywords: ['Logic design', 'System architecture'],
  },
];

export function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="min-h-screen py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-[#00ff88] tracking-widest uppercase text-sm mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The Trials
          </h2>
          <p className="text-[#f0f0f0] text-xl opacity-80" style={{ fontFamily: "'Inter', sans-serif" }}>
            A journey of growth and mastery
          </p>
        </motion.div>

        <div className="relative">
          {/* Glowing thread */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#00ff88] to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Glow effect on thread */}
          <motion.div
            className="absolute left-8 w-0.5 h-32 bg-[#00ff88] blur-md"
            initial={{ top: 0, opacity: 0 }}
            animate={
              isInView
                ? {
                    top: ['0%', '100%'],
                    opacity: [0, 1, 1, 0],
                  }
                : { top: 0, opacity: 0 }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: 1.5,
            }}
          />

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="relative pl-20"
              >
                {/* Node */}
                <motion.div
                  className="absolute left-6 top-0 w-5 h-5 rounded-full border-2 border-[#00ff88] bg-[#0a0a0a]"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#00ff88]"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div className="bg-[#121212] border border-[#1c1c1c] rounded-lg p-6 hover:border-[#00ff88] transition-colors duration-500 group">
                  <div className="mb-2">
                    <h3 className="text-[#f0f0f0] text-xl group-hover:text-[#00ff88] transition-colors" style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 600 }}>
                      {item.position}
                    </h3>
                    <p className="text-[#00ff88] opacity-90" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.organization}
                    </p>
                  </div>
                  <p className="text-[#9aa0a6] text-sm mb-4">
                    {item.period}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="text-xs text-[#d4d4d4] bg-[#1c1c1c] px-3 py-1 rounded-full border border-[#00ff88] border-opacity-20"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
