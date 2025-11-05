import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const quotes = [
  "Every bug was a lesson.",
  "Every build, a step closer to mastery.",
  "Silent code. Bold ideas.",
  "Crafted with precision, delivered with clarity.",
  "Creation is my meditation.",
];

export function PathSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative py-20 px-6">
      {/* Geometric lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent"
            style={{
              top: `${20 + i * 20}%`,
              left: 0,
              right: 0,
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Green energy ribbons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-[#00ff88] to-transparent blur-sm"
            style={{
              left: `${30 + i * 20}%`,
            }}
            animate={{
              y: ['-20%', '120%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 text-[#00ff88] tracking-widest uppercase text-sm"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          The Path
        </motion.h2>

        <div className="space-y-12">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
              }
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className="relative group">
                <motion.div
                  className="absolute inset-0 bg-[#00ff88] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  whileHover={{ scale: 1.5 }}
                />
                <p className="relative text-[#f0f0f0] text-2xl md:text-3xl italic px-8 py-4 border-l-2 border-[#00ff88] bg-[#121212] bg-opacity-50" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
