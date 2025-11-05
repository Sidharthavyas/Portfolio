// components/ScrollProgress.tsx
import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00ff88] via-[#00ffff] to-[#00ff88] origin-left z-50"
        style={{ scaleX }}
      >
        <div className="absolute inset-0 bg-white/30 blur-sm" />
      </motion.div>

      {/* Katana blade indicator */}
      <motion.div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative w-64 h-2 bg-[#1a1a1a] border border-[#00ff88]/30 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00ff88] to-[#00ffff]"
            style={{ width: scrollYProgress }}
          >
            <div className="absolute inset-0 bg-white/20 blur-sm" />
          </motion.div>

          {/* Blade tip */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6"
            style={{ 
              left: scrollYProgress,
              x: '-50%'
            }}
          >
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#00ff88] rotate-90 drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}