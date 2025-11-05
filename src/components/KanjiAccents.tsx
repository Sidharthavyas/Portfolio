// components/KanjiAccents.tsx
import { motion } from 'motion/react';

export function KanjiAccents() {
  return (
    <>
      {/* Hero Section - 忍 (Ninja) */}
      <div className="fixed top-20 right-10 pointer-events-none z-[1] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ 
            opacity: [0.08, 0.12, 0.08],
            rotate: [-10, -8, -10],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="text-[#00ff88] text-[300px] font-bold select-none"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          忍
        </motion.div>
      </div>

      {/* Path Section - 道 (Way/Path) */}
      <div className="fixed top-1/2 left-10 -translate-y-1/2 pointer-events-none z-[1] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, rotate: 5 }}
          animate={{ 
            opacity: [0.06, 0.1, 0.06],
            rotate: [5, 7, 5]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="text-[#00ff88] text-[250px] font-bold select-none"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          道
        </motion.div>
      </div>

      {/* Skills Section - 技 (Technique) */}
      <div className="fixed bottom-20 right-20 pointer-events-none z-[1] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, rotate: 15 }}
          animate={{ 
            opacity: [0.06, 0.1, 0.06],
            rotate: [15, 18, 15]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="text-[#00ffff] text-[200px] font-bold select-none"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          技
        </motion.div>
      </div>

      {/* Projects Section - 創 (Create) */}
      <div className="fixed top-40 left-20 pointer-events-none z-[1] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ 
            opacity: [0.07, 0.11, 0.07],
            rotate: [-5, -3, -5]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="text-[#e50914] text-[280px] font-bold select-none"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          創
        </motion.div>
      </div>
    </>
  );
}