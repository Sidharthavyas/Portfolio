import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface NinjaBladeArcProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function NinjaBladeArc({ trigger, onComplete }: NinjaBladeArcProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Chromatic aberration flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 0.2, times: [0, 0.2, 1] }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[#00ff88] mix-blend-screen translate-x-1" />
        <div className="absolute inset-0 bg-[#00ffff] mix-blend-screen -translate-x-1" />
        <div className="absolute inset-0 bg-white mix-blend-screen" />
      </motion.div>

      {/* Impact frame freeze lines */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`speedline-${i}`}
          initial={{ 
            scaleX: 0,
            opacity: 0,
          }}
          animate={{
            scaleX: [0, 1, 1],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.6,
            times: [0, 0.3, 1],
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute h-px bg-white origin-left"
          style={{
            top: `${Math.random() * 100}%`,
            left: 0,
            width: '100%',
            transform: `rotate(${-45 + (Math.random() - 0.5) * 10}deg)`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Main blade slash - Triple layer for depth */}
      <motion.div
        initial={{
          x: '-120%',
          y: '-120%',
          rotate: -45,
          opacity: 1,
        }}
        animate={{
          x: '120%',
          y: '120%',
          rotate: -45,
          opacity: [1, 1, 1, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1], // Anime-style ease
          times: [0, 0.4, 0.7, 1],
        }}
        className="absolute w-[250%] h-3 origin-center"
      >
        {/* Core white blade */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-90" 
             style={{ filter: 'blur(1px)' }} />
        
        {/* Green energy layer */}
        <div className="absolute inset-0 translate-y-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-80" 
             style={{ filter: 'blur(3px)' }} />
        
        {/* Cyan chromatic layer */}
        <div className="absolute inset-0 -translate-y-1 bg-gradient-to-r from-transparent via-[#00ffff] to-transparent opacity-60" 
             style={{ filter: 'blur(3px)' }} />

        {/* Sharp edge highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      </motion.div>

      {/* Secondary delayed slash for impact */}
      <motion.div
        initial={{
          x: '-120%',
          y: '-120%',
          rotate: -45,
          opacity: 0,
        }}
        animate={{
          x: '120%',
          y: '120%',
          rotate: -45,
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 0.4,
          delay: 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute w-[250%] h-4 origin-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent blur-lg" />
      </motion.div>

      {/* Energy spark bursts along the slash */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          initial={{
            x: `${-20 + i * 8}%`,
            y: `${-20 + i * 8}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: `${-20 + i * 8 + (Math.random() - 0.5) * 10}%`,
            y: `${-20 + i * 8 + (Math.random() - 0.5) * 10}%`,
            opacity: [0, 1, 0],
            scale: [0, Math.random() + 0.5, 0],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.02,
            ease: 'easeOut',
          }}
          className="absolute"
        >
          {/* Star burst shape */}
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 bg-[#00ff88] rotate-0" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
            <div className="absolute inset-0 bg-white opacity-70 scale-50" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
            <div className="absolute inset-0 bg-[#00ff88] blur-md" />
          </div>
        </motion.div>
      ))}

      {/* Impact shockwave rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 2.5],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: 'easeOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-[#00ff88] rounded-full"
          style={{
            boxShadow: '0 0 20px #00ff88',
          }}
        />
      ))}

      {/* Manga-style action lines radiating from center */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <motion.div
            key={`action-line-${i}`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 0.5,
              delay: 0.1 + (i * 0.02),
              ease: 'easeOut',
            }}
            className="absolute top-1/2 left-1/2 w-1 h-[50vh] origin-bottom bg-gradient-to-t from-[#00ff88] to-transparent"
            style={{
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              filter: 'blur(1px)',
            }}
          />
        );
      })}

      {/* Residual energy trail that lingers */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: [0, 0.8, 0.3, 0],
          scaleX: [0, 1.2, 1.2, 1.2],
        }}
        transition={{
          duration: 1.4,
          times: [0, 0.25, 0.7, 1],
          ease: 'easeOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-2 -rotate-45 origin-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-60 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
      </motion.div>

      {/* Screen shake effect overlay */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, -3, 3, -2, 2, 0],
          y: [0, 2, -2, 1, -1, 0],
        }}
        transition={{
          duration: 0.4,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
        className="absolute inset-0"
      />
    </div>
  );
}