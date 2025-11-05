import { motion } from 'motion/react';
import ShadowBladeVector from '../imports/ShadowBladeVector1';

export function NinjaShowcase() {
  return (
    <div className="relative w-full h-full">
      {/* Intense energy crackling background */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Lightning-style energy bolts */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`lightning-${i}`}
            className="absolute w-px h-20 bg-gradient-to-b from-[#e50914] via-[#ff3344] to-transparent"
            style={{
              left: `${20 + i * 15}%`,
              top: `${15 + (i % 2) * 10}%`,
              filter: 'blur(1px)',
              boxShadow: '0 0 8px #e50914, 0 0 12px #e50914',
            }}
            animate={{
              opacity: [0, 1, 0, 1, 0],
              scaleY: [0.8, 1, 0.8, 1, 0.8],
              x: [0, Math.random() * 4 - 2, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              delay: i * 0.4,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Primary diagonal slash with impact effect */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-[80%] h-2"
          style={{
            transform: 'rotate(-35deg)',
          }}
        >
          {/* Main slash */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e50914] to-transparent"
            style={{
              filter: 'blur(2px)',
              boxShadow: '0 0 15px #e50914, 0 0 30px #e50914',
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scaleX: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* White hot core */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent -translate-y-1/2"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Secondary crossing slash */}
        <motion.div
          className="absolute top-[30%] left-[15%] w-[70%] h-1 bg-gradient-to-r from-transparent via-[#ff3344] to-transparent"
          style={{
            transform: 'rotate(-40deg)',
            filter: 'blur(1.5px)',
            boxShadow: '0 0 10px #ff3344',
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scaleX: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />

        {/* Animated energy sparks with trails */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute"
            style={{
              left: `${25 + i * 6}%`,
              top: `${20 + (i % 4) * 8}%`,
            }}
          >
            {/* Main spark */}
            <motion.div
              className="w-2 h-2 bg-[#e50914] rounded-full relative"
              style={{
                boxShadow: '0 0 6px #e50914, 0 0 12px #e50914',
              }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1.5, 1, 0],
                x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
                y: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 30],
              }}
              transition={{
                duration: 1.2 + Math.random() * 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeOut',
              }}
            />
            
            {/* Spark trail */}
            <motion.div
              className="absolute w-px h-4 bg-gradient-to-b from-[#e50914] to-transparent top-0 left-1"
              animate={{
                opacity: [0, 0.6, 0],
                scaleY: [0, 1, 0.5],
              }}
              transition={{
                duration: 1.2 + Math.random() * 0.8,
                repeat: Infinity,
                delay: i * 0.15 + 0.1,
              }}
            />
          </motion.div>
        ))}

        {/* Blade gleam/shimmer effect */}
        <motion.div
          className="absolute top-[24%] left-[30%] w-[50%] h-0.5"
          style={{
            transform: 'rotate(-35deg)',
          }}
        >
          <motion.div
            className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              filter: 'blur(0.5px)',
            }}
            animate={{
              opacity: [0, 1, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 1,
            }}
          />
        </motion.div>

        {/* Impact distortion lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`distortion-${i}`}
            className="absolute left-[40%] w-px h-16 bg-gradient-to-b from-[#e50914] to-transparent"
            style={{
              top: `${30 + i * 8}%`,
              transform: `rotate(${-35 + (Math.random() - 0.5) * 20}deg)`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              delay: i * 0.1,
              repeatDelay: 3,
            }}
          />
        ))}
      </motion.div>

      {/* Ninja character with enhanced anime effects */}
      <motion.div
        className="relative w-full h-full"
        style={{
          '--stroke-0': '#e50914',
          filter: 'drop-shadow(0 0 25px rgba(229, 9, 20, 0.5))',
        } as React.CSSProperties}
        animate={{
          y: [0, -10, 0],
          filter: [
            'drop-shadow(0 0 25px rgba(229, 9, 20, 0.5))',
            'drop-shadow(0 0 35px rgba(229, 9, 20, 0.7))',
            'drop-shadow(0 0 25px rgba(229, 9, 20, 0.5))',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ShadowBladeVector />
        
        {/* Action pose tremor effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: [0, -1, 1, 0],
            y: [0, 1, -1, 0],
          }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            repeatDelay: 4,
          }}
        />
      </motion.div>

      {/* Intense red aura with pulsing */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 45% 45%, rgba(229, 9, 20, 0.2) 0%, rgba(255, 51, 68, 0.1) 40%, transparent 70%)',
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary outer aura ring */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 45% 45%, transparent 30%, rgba(229, 9, 20, 0.15) 50%, transparent 70%)',
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.25,
        }}
      />

      {/* Battle dust and debris particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute bg-[#f5f5f5] rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.2,
          }}
          animate={{
            y: [0, -(30 + Math.random() * 40), -(60 + Math.random() * 40)],
            x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Energy ripples emanating from character */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#e50914] rounded-full"
          style={{
            width: '200px',
            height: '200px',
          }}
          animate={{
            scale: [0.8, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}