// components/LoadingScreen.tsx
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import ShadowBladeVector from '../imports/ShadowBladeVector1';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [showNinja, setShowNinja] = useState(false);
  const [showSlash, setShowSlash] = useState(false);
  const [splitScreen, setSplitScreen] = useState(false);

  useEffect(() => {
    const sequence = [
      { delay: 400, action: () => setShowNinja(true) },
      { delay: 1200, action: () => setShowSlash(true) },
      { delay: 1600, action: () => setSplitScreen(true) },
      { delay: 2400, action: () => onComplete() },
    ];

    const timers = sequence.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Ninja character with attack animation */}
      {showNinja && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Main ninja with attack sequence */}
          <motion.div
            className="w-[500px] h-[500px] relative"
            initial={false}
            animate={showSlash ? {
              // Attack sequence
              x: [0, 80, 80, -100, -60, 0],
              y: [0, 15, 15, -20, 5, 0],
              rotate: [0, -20, -25, 50, 25, 0],
              scale: [1, 0.9, 0.85, 1.3, 1.1, 1],
            } : {
              // Idle breathing
              y: [0, -10, 0],
              rotate: [0, -2, 0],
            }}
            transition={showSlash ? {
              duration: 0.8,
              times: [0, 0.25, 0.35, 0.5, 0.7, 1],
              ease: [0.4, 0, 0.2, 1],
            } : {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              '--stroke-0': '#00ff88',
              filter: 'drop-shadow(0 0 30px rgba(0, 255, 136, 0.6))',
            } as React.CSSProperties}
          >
            {/* Motion blur trails during slash */}
            {showSlash && (
              <>
                {/* Trail 1 */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: [0, 0, 0, 0.7, 0.4, 0],
                    x: [0, 0, 0, -60, -30, 0],
                    scaleX: [1, 1, 1, 1.6, 1.3, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    times: [0, 0.25, 0.35, 0.5, 0.7, 1],
                  }}
                  style={{
                    filter: 'blur(15px) brightness(1.2)',
                  }}
                >
                  <ShadowBladeVector />
                </motion.div>

                {/* Trail 2 */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: [0, 0, 0, 0.5, 0.3, 0],
                    x: [0, 0, 0, -80, -40, 0],
                    scaleX: [1, 1, 1, 1.8, 1.4, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    times: [0, 0.25, 0.35, 0.5, 0.7, 1],
                    delay: 0.05,
                  }}
                  style={{
                    filter: 'blur(20px) brightness(1.1)',
                  }}
                >
                  <ShadowBladeVector />
                </motion.div>

                {/* Slash arc trail */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: [0, 0, 0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    times: [0, 0.35, 0.45, 0.55, 1],
                  }}
                >
                  <svg className="w-full h-full" viewBox="0 0 500 500">
                    <motion.path
                      d="M 400 100 Q 300 200, 150 400"
                      stroke="#00ff88"
                      strokeWidth="3"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1] }}
                      transition={{
                        duration: 0.2,
                        delay: 0.35,
                        ease: 'easeOut',
                      }}
                      style={{
                        filter: 'drop-shadow(0 0 8px #00ff88)',
                      }}
                    />
                    <motion.path
                      d="M 400 100 Q 300 200, 150 400"
                      stroke="#ffffff"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1] }}
                      transition={{
                        duration: 0.2,
                        delay: 0.35,
                        ease: 'easeOut',
                      }}
                    />
                  </svg>
                </motion.div>
              </>
            )}

            {/* Main ninja SVG */}
            <motion.div
              className="relative z-10"
              animate={showSlash ? {
                skewX: [0, 0, 0, -12, -6, 0],
                skewY: [0, 0, 0, 3, 1, 0],
              } : {}}
              transition={{
                duration: 0.8,
                times: [0, 0.25, 0.35, 0.5, 0.7, 1],
              }}
            >
              <ShadowBladeVector />
            </motion.div>

            {/* Impact flash */}
            {showSlash && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: [0, 0, 0, 1, 0],
                  scale: [0.5, 0.5, 0.5, 2.5, 1.5],
                }}
                transition={{
                  duration: 0.8,
                  times: [0, 0.35, 0.45, 0.5, 1],
                }}
              >
                {/* Shockwave rings */}
                <motion.div
                  className="absolute border-4 border-[#00ff88] rounded-full opacity-80"
                  style={{ width: '40%', height: '40%' }}
                  animate={{
                    scale: [1, 4],
                    opacity: [0.8, 0],
                    borderWidth: [4, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.45,
                    ease: 'easeOut',
                  }}
                />
                <motion.div
                  className="absolute border-4 border-white rounded-full opacity-60"
                  style={{ width: '40%', height: '40%' }}
                  animate={{
                    scale: [1, 3.5],
                    opacity: [0.6, 0],
                    borderWidth: [4, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.48,
                    ease: 'easeOut',
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Diagonal slash cut effect */}
      {showSlash && (
        <>
          {/* Main slash line */}
          <motion.div
            initial={{
              x: '-150%',
              y: '-150%',
              rotate: -45,
            }}
            animate={{
              x: '150%',
              y: '150%',
            }}
            transition={{
              duration: 0.35,
              delay: 0.35,
              ease: [0.2, 0, 0.1, 1],
            }}
            className="absolute w-[300%] h-3 origin-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent blur-md scale-y-200" />
          </motion.div>

          {/* Speed lines */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-white origin-left"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                width: '100%',
                rotate: `${-45 + (Math.random() - 0.5) * 15}deg`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1.5],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 0.4,
                delay: 0.35 + (i * 0.01),
                ease: 'easeOut',
              }}
            />
          ))}

          {/* White flash */}
          <motion.div
            className="absolute inset-0 bg-white mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0] }}
            transition={{
              duration: 0.6,
              times: [0, 0.35, 0.5, 1],
            }}
          />
        </>
      )}

      {/* Screen tear/split */}
      {splitScreen && (
        <>
          {/* Top half */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-black"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              boxShadow: '0 8px 60px rgba(0, 255, 136, 0.5)',
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00ff88] blur-sm" />
          </motion.div>

          {/* Bottom half */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-black"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              boxShadow: '0 -8px 60px rgba(0, 255, 136, 0.5)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#00ff88] blur-sm" />
          </motion.div>

          {/* Split particles */}
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00ff88] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '50%',
                boxShadow: '0 0 4px #00ff88',
              }}
              animate={{
                y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 400],
                x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 300],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1.2,
                delay: Math.random() * 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}