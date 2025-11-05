// components/KonamiCode.tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export function KonamiCode() {
  const [keys, setKeys] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => [...prev, e.key].slice(-10));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (keys.join(',') === KONAMI_CODE.join(',')) {
      setActivated(true);
      // Add fun effect - raining shurikens or something
      setTimeout(() => setActivated(false), 5000);
    }
  }, [keys]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              className="text-9xl mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              🥷
            </motion.div>
            <div className="text-[#00ff88] text-4xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              NINJA MODE ACTIVATED!
            </div>
          </div>

          {/* Raining shurikens */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ 
                top: -50, 
                left: `${Math.random() * 100}%`,
                rotate: 0 
              }}
              animate={{ 
                top: '110%',
                rotate: 720
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 2,
                ease: 'linear'
              }}
            >
              ⭐
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}