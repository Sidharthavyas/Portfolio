// components/ScrollProgress.tsx - NO PERCENTAGE
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Smoother spring config for better performance
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });

  // Transform for percentage width
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      {/* Simplified top progress bar - single element with CSS gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50 will-change-transform"
        style={{ 
          scaleX,
          background: 'linear-gradient(90deg, #00ff88, #00ffff, #00ff88)',
          boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)'
        }}
      />

      {/* Simplified katana blade indicator */}
      <motion.div
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-48 h-1 bg-[#1a1a1a]/80 rounded-full overflow-hidden backdrop-blur-sm">
          {/* Progress fill */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00ff88] to-[#00ffff]"
            style={{ width: scrollPercentage }}
          />

          {/* Simplified blade tip using CSS only */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ 
              left: scrollPercentage,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div 
              className="w-full h-full bg-[#00ff88] rotate-45"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                filter: 'drop-shadow(0 0 4px rgba(0, 255, 136, 0.8))'
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}