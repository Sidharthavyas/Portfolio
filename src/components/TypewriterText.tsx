// components/TypewriterText.tsx
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
  accelerate?: boolean;
  burst?: boolean;
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  className = '',
  style = {},
  onComplete,
  accelerate = false,
  burst = false
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        // Calculate how many characters to add
        let charsToAdd = 1;
        if (burst) {
          // Add 2-3 characters at once for ultra-fast effect
          charsToAdd = Math.min(Math.floor(Math.random() * 2) + 2, text.length - currentIndex);
        }

        // Calculate dynamic speed
        let currentSpeed = speed;
        if (accelerate) {
          const progress = currentIndex / text.length;
          currentSpeed = Math.max(1, speed * (1 - progress * 0.9)); // Gets 90% faster
        }

        const timeout = setTimeout(() => {
          const newChars = text.slice(currentIndex, currentIndex + charsToAdd);
          setDisplayedText(prev => prev + newChars);
          setCurrentIndex(prev => prev + charsToAdd);
        }, currentSpeed);

        return () => clearTimeout(timeout);
      } else if (!isComplete) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [currentIndex, text, delay, speed, isComplete, onComplete, accelerate, burst]);

  // Separate effect for cursor blinking after completion
  useEffect(() => {
    if (isComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 300);

      return () => clearInterval(cursorInterval);
    }
  }, [isComplete]);

  return (
    <span className={className} style={style}>
      {/* Ultra-fast character animation */}
      {displayedText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.3, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 0.05, // Super quick animation
            type: "spring",
            stiffness: 500,
            damping: 15
          }}
          style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      
      {/* Hyperactive cursor - now uses showCursor state */}
      {(currentIndex <= text.length) && (
        <motion.span
          animate={
            isComplete 
              ? { 
                  opacity: showCursor ? 1 : 0, // Use showCursor for blinking after completion
                  scaleY: 1,
                  scaleX: 1
                }
              : {
                  opacity: [1, 0.3, 1], // Pulsing while typing
                  scaleY: [1, 1.5, 1],
                  scaleX: [1, 0.8, 1]
                }
          }
          transition={
            isComplete
              ? { duration: 0.1 } // Quick transition for blinking
              : { 
                  duration: 0.15,
                  repeat: Infinity
                }
          }
          className="inline-block w-[3px] h-[1.2em] bg-gradient-to-b from-[#00ff88] via-[#00ffaa] to-[#00cc66] ml-[2px] shadow-[0_0_15px_rgba(0,255,136,1)]"
          style={{ verticalAlign: 'text-bottom' }}
        />
      )}
    </span>
  );
}