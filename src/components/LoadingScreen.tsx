// components/LoadingScreen.tsx - MOBILE OPTIMIZED
import { motion } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import ShadowBladeVector from '../imports/ShadowBladeVector1';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Custom hook for responsive values
function useResponsive() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isSmallMobile: typeof window !== 'undefined' ? window.innerWidth < 480 : false,
    isTinyMobile: typeof window !== 'undefined' ? window.innerWidth < 380 : false,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isSmallMobile: window.innerWidth < 480,
        isTinyMobile: window.innerWidth < 380,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<
    'script' | 'summon' | 'dualAppear' | 'standoff' | 'charge' | 'clash' | 'slice' | 'split' | 'reveal'
  >('script');
  const [screenFlash, setScreenFlash] = useState(false);
  const { width, height, isMobile, isTablet, isSmallMobile, isTinyMobile } = useResponsive();

  // OPTIMIZED NINJA SIZE - Much bigger on mobile
  const ninjaSize = useMemo(() => {
    // Use viewport dimensions for better scaling
    const vw = width;
    const vh = height;
    const minDimension = Math.min(vw, vh);
    
    if (isTinyMobile) {
      // For very small phones (< 380px), use 70% of smaller dimension
      return Math.min(minDimension * 0.7, 280);
    }
    if (isSmallMobile) {
      // For small phones (< 480px), use 65% of smaller dimension
      return Math.min(minDimension * 0.65, 320);
    }
    if (isMobile) {
      // For mobile (< 768px), use 55% of smaller dimension
      return Math.min(minDimension * 0.55, 380);
    }
    if (isTablet) {
      // For tablets, use 40% of smaller dimension
      return Math.min(minDimension * 0.4, 450);
    }
    // Desktop: use 30% of smaller dimension
    return Math.min(minDimension * 0.3, 500);
  }, [width, height, isMobile, isTablet, isSmallMobile, isTinyMobile]);

  // Adjusted particle counts for performance
  const particleCount = useMemo(() => {
    if (isTinyMobile) return 5;
    if (isSmallMobile) return 6;
    if (isMobile) return 8;
    if (isTablet) return 12;
    return 20;
  }, [isMobile, isTablet, isSmallMobile, isTinyMobile]);

  const debrisCount = useMemo(() => {
    if (isTinyMobile) return 12;
    if (isSmallMobile) return 15;
    if (isMobile) return 25;
    if (isTablet) return 35;
    return 60;
  }, [isMobile, isTablet, isSmallMobile, isTinyMobile]);

  useEffect(() => {
    const sequence = [
      { delay: 800, action: () => setPhase('summon') },
      { delay: 1400, action: () => setPhase('dualAppear') },
      { delay: 2100, action: () => setPhase('standoff') },
      { delay: 2600, action: () => setPhase('charge') },
      { delay: 3200, action: () => setPhase('clash') },
      { delay: 3400, action: () => { setScreenFlash(true); setPhase('slice'); }},
      { delay: 3500, action: () => setScreenFlash(false) },
      { delay: 3700, action: () => setPhase('split') },
      { delay: 4800, action: () => setPhase('reveal') },
      { delay: 5200, action: () => onComplete() },
    ];

    const timers = sequence.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const scriptCharacters = [
    '忍','者','刀','影','斬','破','魂','龍','武','道',
    '戦','闇','光','力','速','技','心','風','火','水',
    '雷','土','気','剣','護','攻','守','極','神','鬼'
  ];

  // OPTIMIZED RESPONSIVE POSITIONS for larger ninjas
  const getResponsivePosition = (baseValue: number) => {
    if (isTinyMobile) {
      // Reduce movement range for very small screens
      return baseValue * 0.4;
    }
    if (isSmallMobile) {
      // Slightly reduced movement for small screens
      return baseValue * 0.5;
    }
    if (isMobile) {
      // Moderate movement for mobile
      return baseValue * 0.6;
    }
    if (isTablet) {
      return baseValue * 0.75;
    }
    const factor = width / 1920;
    return baseValue * Math.max(0.5, Math.min(factor, 1.5));
  };

  // Generate background character positions
  const backgroundCharacters = useMemo(() => {
    const chars = [];
    const gridCols = isTinyMobile ? 3 : isSmallMobile ? 3 : isMobile ? 4 : isTablet ? 5 : 8;
    const gridRows = isTinyMobile ? 4 : isSmallMobile ? 5 : isMobile ? 6 : isTablet ? 7 : 10;
    
    for (let i = 0; i < gridCols * gridRows; i++) {
      chars.push({
        char: scriptCharacters[i % scriptCharacters.length],
        x: (i % gridCols) * (100 / gridCols) + (100 / gridCols / 2),
        y: Math.floor(i / gridCols) * (100 / gridRows) + (100 / gridRows / 2),
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      });
    }
    return chars;
  }, [isMobile, isTablet, isSmallMobile, isTinyMobile]);

  // ENHANCED STYLES for better mobile visibility
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&display=swap');

    * {
      will-change: auto;
    }

    @keyframes floatGlow {
      0%, 100% {
        text-shadow:
          0 0 ${isMobile ? '20px' : 'clamp(15px, 4vw, 30px)'} rgba(0, 255, 136, 1),
          0 0 ${isMobile ? '40px' : 'clamp(30px, 8vw, 60px)'} rgba(0, 255, 136, 0.8),
          0 0 ${isMobile ? '60px' : 'clamp(50px, 12vw, 100px)'} rgba(0, 255, 136, 0.5);
        transform: translateZ(0);
      }
      50% {
        text-shadow:
          0 0 ${isMobile ? '35px' : 'clamp(30px, 6vw, 50px)'} rgba(0, 255, 136, 1),
          0 0 ${isMobile ? '70px' : 'clamp(60px, 12vw, 100px)'} rgba(0, 255, 136, 1),
          0 0 ${isMobile ? '100px' : 'clamp(90px, 18vw, 150px)'} rgba(0, 255, 136, 0.7);
        transform: translateZ(0);
      }
    }

    @keyframes electricPulse {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }

    @keyframes dimensional {
      0% { transform: rotateY(0deg) rotateX(0deg) translateZ(0); }
      100% { transform: rotateY(360deg) rotateX(360deg) translateZ(0); }
    }

    @keyframes spacetime {
      0% { filter: hue-rotate(0deg) saturate(${isMobile ? '1.5' : '1'}); }
      50% { filter: hue-rotate(180deg) saturate(${isMobile ? '2' : '1.5'}); }
      100% { filter: hue-rotate(360deg) saturate(${isMobile ? '1.5' : '1'}); }
    }

    @keyframes backgroundFloat {
      0%, 100% { 
        transform: translateY(0) translateZ(0);
        opacity: ${isMobile ? '0.2' : '0.05'};
      }
      50% { 
        transform: translateY(-10px) translateZ(0);
        opacity: ${isMobile ? '0.3' : '0.08'};
      }
    }

    .ancient-script {
      font-family: 'Noto Sans JP', serif;
      font-weight: 900;
      color: #00ff88;
      animation: floatGlow 2s ease-in-out infinite;
      z-index: 1;
      font-size: ${isTinyMobile ? '2.5rem' : isSmallMobile ? '3rem' : isMobile ? '3.5rem' : 'clamp(1.5rem, 5vw, 3.75rem)'};
    }

    .ancient-script-bg {
      font-family: 'Noto Sans JP', serif;
      font-weight: 900;
      color: #00ffaa;
      opacity: ${isMobile ? '0.2' : '0.05'};
      animation: backgroundFloat 4s ease-in-out infinite;
      font-size: ${isTinyMobile ? '1.5rem' : isSmallMobile ? '2rem' : isMobile ? '2.5rem' : 'clamp(1.5rem, 3vw, 2.5rem)'};
      text-shadow: ${isMobile ? '0 0 25px rgba(0, 255, 136, 0.7)' : 'none'};
    }

    .ancient-script-large {
      font-size: ${isTinyMobile ? '5rem' : isSmallMobile ? '6rem' : isMobile ? '7rem' : 'clamp(3rem, 10vw, 9rem)'};
    }

    .ninja-ultra {
      filter: 
        drop-shadow(0 ${isMobile ? '10px 20px' : 'clamp(8px, 2vw, 15px) clamp(15px, 4vw, 30px)'} rgba(0, 0, 0, 1))
        drop-shadow(0 0 ${isMobile ? '60px' : 'clamp(40px, 10vw, 80px)'} rgba(0, 255, 136, 1))
        drop-shadow(0 0 ${isMobile ? '100px' : 'clamp(80px, 20vw, 150px)'} rgba(0, 255, 136, 0.7))
        contrast(${isMobile ? '1.8' : '1.4'}) 
        brightness(${isMobile ? '1.5' : '1.1'})
        saturate(${isMobile ? '1.6' : '1.2'});
      stroke: rgba(0, 255, 136, ${isMobile ? '0.9' : '0.5'});
      stroke-width: ${isMobile ? '2.5' : '1.5'};
      paint-order: stroke fill;
      transform: translateZ(0);
    }

    .ninja-charging {
      filter:
        drop-shadow(0 0 ${isMobile ? '80px' : 'clamp(50px, 12vw, 100px)'} rgba(255, 0, 64, 1))
        drop-shadow(0 0 ${isMobile ? '150px' : 'clamp(100px, 24vw, 200px)'} rgba(255, 136, 0, 0.9))
        drop-shadow(0 ${isMobile ? '10px 30px' : 'clamp(8px, 2vw, 15px) clamp(25px, 6vw, 50px)'} rgba(0, 0, 0, 1))
        contrast(${isMobile ? '2' : '1.6'})
        brightness(${isMobile ? '1.6' : '1.3'})
        saturate(${isMobile ? '2' : '1.5'});
      animation: spacetime 1s linear infinite;
      transform: translateZ(0);
    }

    .ninja-clashing {
      filter:
        drop-shadow(0 0 ${isMobile ? '150px' : 'clamp(100px, 25vw, 200px)'} rgba(255, 255, 255, 1))
        drop-shadow(0 0 ${isMobile ? '250px' : 'clamp(200px, 50vw, 400px)'} rgba(0, 255, 136, 1))
        drop-shadow(0 ${isMobile ? '20px 50px' : 'clamp(15px, 4vw, 30px) clamp(40px, 10vw, 80px)'} rgba(0, 0, 0, 1))
        contrast(${isMobile ? '2.5' : '2'})
        brightness(${isMobile ? '2.2' : '1.8'})
        saturate(${isMobile ? '2.5' : '2'});
      transform: translateZ(0);
    }

    .dimension-portal {
      background: conic-gradient(
        from 0deg,
        #00ff88,
        #ff0040,
        #ffff00,
        #00ffff,
        #ff00ff,
        #00ff88
      );
      animation: dimensional 2s linear infinite;
      filter: blur(${isMobile ? '50px' : 'clamp(40px, 10vw, 80px)'}) brightness(${isMobile ? '1.5' : '1'});
      opacity: ${isMobile ? '0.9' : '0.6'};
      transform: translateZ(0);
    }

    .energy-ring {
      border: ${isMobile ? '4px' : 'clamp(2px, 0.5vw, 3px)'} solid;
      border-image: linear-gradient(90deg, #00ff88, #ff0040, #00ff88) 1;
      animation: electricPulse 0.5s ease-out infinite;
      transform: translateZ(0);
      box-shadow: ${isMobile ? '0 0 40px rgba(0, 255, 136, 0.9)' : '0 0 30px rgba(0, 255, 136, 0.6)'};
    }

    .horizontal-slash {
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(255, 255, 255, ${isMobile ? '0.5' : '0.2'}) 10%,
        rgba(255, 255, 255, ${isMobile ? '1' : '0.8'}) 45%,
        #ffffff 50%,
        rgba(255, 255, 255, ${isMobile ? '1' : '0.8'}) 55%,
        rgba(255, 255, 255, ${isMobile ? '0.5' : '0.2'}) 90%,
        transparent 100%
      );
      box-shadow:
        0 0 ${isMobile ? '80px' : 'clamp(60px, 15vw, 120px)'} rgba(255, 255, 255, 1),
        0 0 ${isMobile ? '160px' : 'clamp(120px, 30vw, 240px)'} rgba(0, 255, 136, 1),
        0 0 ${isMobile ? '240px' : 'clamp(180px, 45vw, 360px)'} rgba(0, 255, 136, ${isMobile ? '1' : '0.8'});
      transform: translateZ(0);
    }

    .screen-flash {
      animation: flash 0.2s ease-out;
    }

    @keyframes flash {
      0% { background: rgba(255, 255, 255, 0); }
      50% { background: rgba(255, 255, 255, ${isMobile ? '0.9' : '1'}); }
      100% { background: rgba(255, 255, 255, 0); }
    }

    .reality-tear {
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(0, 255, 136, ${isMobile ? '0.5' : '0.2'}) 48%,
        #ffffff 50%,
        rgba(0, 255, 136, ${isMobile ? '0.5' : '0.2'}) 52%,
        transparent 100%
      );
      filter: blur(${isMobile ? '4px' : '2px'});
      box-shadow: 0 0 50px rgba(255, 255, 255, ${isMobile ? '1' : '0.8'});
      transform: translateZ(0);
    }

    .physics-particle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      transform: translateZ(0);
    }

    @media (max-width: 768px) {
      .ancient-script {
        animation-duration: 2.5s;
      }
      .ancient-script-bg {
        animation-duration: 5s;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed inset-0 bg-black flex items-center justify-center overflow-hidden ${
          screenFlash ? 'screen-flash' : ''
        }`}
        style={{ zIndex: 99999 }}
      >
        
        {/* Ancient Script Background Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {backgroundCharacters.map((char, i) => (
            <motion.div
              key={`bg-char-${i}`}
              className="ancient-script-bg absolute"
              style={{
                left: `${char.x}%`,
                top: `${char.y}%`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${char.delay}s`,
                animationDuration: `${char.duration}s`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, isMobile ? 0.2 : 0.05, isMobile ? 0.2 : 0.05] }}
              transition={{ duration: 0.5, delay: i * 0.01 }}
            >
              {char.char}
            </motion.div>
          ))}
        </div>

        {/* Ancient Script Summoning */}
        {phase === 'script' && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Central summoning seal */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div 
                className="relative"
                style={{
                  width: isMobile ? `min(70vw, 320px)` : `clamp(200px, 40vw, 320px)`,
                  height: isMobile ? `min(70vw, 320px)` : `clamp(200px, 40vw, 320px)`,
                }}
              >
                <div 
                  className="absolute inset-0 rounded-full opacity-50"
                  style={{
                    border: `${isMobile ? '5px' : 'clamp(2px,0.4vw,4px)'} solid #00ff88`,
                    boxShadow: isMobile ? '0 0 50px rgba(0, 255, 136, 0.9)' : '0 0 40px rgba(0, 255, 136, 0.6)',
                  }}
                />
                <div 
                  className="absolute inset-[10%] rounded-full opacity-40"
                  style={{
                    border: `${isMobile ? '4px' : 'clamp(1px,0.2vw,2px)'} solid #ff0040`,
                    boxShadow: isMobile ? '0 0 40px rgba(255, 0, 64, 0.7)' : '0 0 30px rgba(255, 0, 64, 0.5)',
                  }}
                />
                <div 
                  className="absolute inset-[20%] border rounded-full opacity-30"
                  style={{
                    borderColor: '#ffff00',
                    borderWidth: isMobile ? '3px' : '2px',
                    boxShadow: isMobile ? '0 0 30px rgba(255, 255, 0, 0.6)' : '0 0 20px rgba(255, 255, 0, 0.4)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="ancient-script ancient-script-large">忍</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Summoning Portals */}
        {phase === 'summon' && (
          <>
            {/* Left Portal */}
            <motion.div
              className="absolute dimension-portal rounded-full"
              style={{
                left: isMobile ? '10%' : '20%',
                top: '50%',
                transform: 'translateY(-50%)',
                width: isMobile ? `min(45vw, 250px)` : `clamp(150px, 25vw, 256px)`,
                height: isMobile ? `min(45vw, 250px)` : `clamp(150px, 25vw, 256px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 1.5], opacity: [0, isMobile ? 1 : 0.8, isMobile ? 0.9 : 0.6] }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Right Portal */}
            <motion.div
              className="absolute dimension-portal rounded-full"
              style={{
                right: isMobile ? '10%' : '20%',
                top: '50%',
                transform: 'translateY(-50%)',
                width: isMobile ? `min(45vw, 250px)` : `clamp(150px, 25vw, 256px)`,
                height: isMobile ? `min(45vw, 250px)` : `clamp(150px, 25vw, 256px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 1.5], opacity: [0, isMobile ? 1 : 0.8, isMobile ? 0.9 : 0.6] }}
              transition={{ duration: 0.6 }}
            />
          </>
        )}

        {/* Dual Ninja Animation */}
        {(phase !== 'script' && phase !== 'reveal') && (
          <>
            {/* Energy Field Background */}
            {phase === 'charge' && (
              <motion.div className="absolute inset-0 pointer-events-none">
                {[...Array(isMobile ? 2 : 3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 energy-ring rounded-full"
                    style={{ 
                      width: isMobile ? `min(90vw, 450px)` : `clamp(300px, 60vw, 600px)`,
                      height: isMobile ? `min(90vw, 450px)` : `clamp(300px, 60vw, 600px)`,
                    }}
                    animate={{
                      scale: [1, 2.5],
                      opacity: [isMobile ? 1 : 0.8, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* LEFT NINJA */}
            <motion.div
              className="absolute"
              style={{
                width: ninjaSize,
                height: ninjaSize,
                left: '50%',
                top: '50%',
                marginLeft: `-${ninjaSize / 2}px`,
                marginTop: `-${ninjaSize / 2}px`,
                '--stroke-0': phase === 'charge' ? '#ff0040' : phase === 'clash' ? '#ffffff' : '#00ff88',
              } as React.CSSProperties}
              initial={{
                x: -width,
                y: 0,
                opacity: 0,
                scale: 0.3,
                rotate: -360,
              }}
              animate={
                phase === 'dualAppear' ? {
                  x: [-width, getResponsivePosition(-250), getResponsivePosition(isMobile ? -100 : -200)],
                  y: [0, getResponsivePosition(-50), 0],
                  opacity: [0, 1, 1],
                  scale: [0.3, 1.1, 1],
                  rotate: [-360, 0, 0],
                } : phase === 'standoff' ? {
                  x: [getResponsivePosition(isMobile ? -100 : -200), getResponsivePosition(isMobile ? -90 : -180), getResponsivePosition(isMobile ? -100 : -200)],
                  y: [0, getResponsivePosition(-10), 0],
                  scale: [1, 1.05, 1],
                } : phase === 'charge' ? {
                  x: [getResponsivePosition(isMobile ? -100 : -200), getResponsivePosition(isMobile ? -120 : -250)],
                  y: [0, getResponsivePosition(20)],
                  scale: [1, 1.2],
                  rotate: [0, -15],
                } : phase === 'clash' ? {
                  x: [getResponsivePosition(isMobile ? -120 : -250), 0],
                  y: [getResponsivePosition(20), 0],
                  scale: [1.2, isMobile ? 1.3 : 1.5],
                  rotate: [-15, 45],
                } : phase === 'slice' ? {
                  x: [0, getResponsivePosition(80)],
                  y: [0, getResponsivePosition(-30)],
                  scale: [isMobile ? 1.3 : 1.5, isMobile ? 1.5 : 1.8],
                  rotate: [45, 90],
                  opacity: [1, 0.8],
                } : {}
              }
              transition={
                phase === 'dualAppear' ? {
                  duration: 0.7,
                  ease: [0.34, 1.56, 0.64, 1],
                } : phase === 'standoff' ? {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                } : phase === 'charge' ? {
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96],
                } : phase === 'clash' ? {
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                } : {}
              }
            >
              <div className={`w-full h-full ${
                phase === 'charge' ? 'ninja-charging' :
                phase === 'clash' || phase === 'slice' ? 'ninja-clashing' :
                'ninja-ultra'
              }`}>
                <ShadowBladeVector />
              </div>
              
              {/* Energy particles */}
              {(phase === 'charge' || phase === 'clash') && (
                [...Array(particleCount)].map((_, i) => (
                  <motion.div
                    key={`left-particle-${i}`}
                    className="physics-particle bg-gradient-to-r from-red-500 to-orange-500"
                    style={{
                      width: isMobile ? '5px' : '4px',
                      height: isMobile ? '5px' : '4px',
                      left: '50%',
                      top: '50%',
                      boxShadow: '0 0 25px #ff0040',
                    }}
                    animate={{
                      x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * getResponsivePosition(300)],
                      y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * getResponsivePosition(300)],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: Math.random() * 0.3,
                    }}
                  />
                ))
              )}
            </motion.div>

            {/* RIGHT NINJA (Mirrored) */}
            <motion.div
              className="absolute"
              style={{
                width: ninjaSize,
                height: ninjaSize,
                left: '50%',
                top: '50%',
                marginLeft: `-${ninjaSize / 2}px`,
                marginTop: `-${ninjaSize / 2}px`,
                scaleX: -1,
                '--stroke-0': phase === 'charge' ? '#0088ff' : phase === 'clash' ? '#ffffff' : '#00ff88',
              } as React.CSSProperties}
              initial={{
                x: width,
                y: 0,
                opacity: 0,
                scale: 0.3,
                rotate: 360,
              }}
              animate={
                phase === 'dualAppear' ? {
                  x: [width, getResponsivePosition(250), getResponsivePosition(isMobile ? 100 : 200)],
                  y: [0, getResponsivePosition(-50), 0],
                  opacity: [0, 1, 1],
                  scale: [0.3, 1.1, 1],
                  rotate: [360, 0, 0],
                } : phase === 'standoff' ? {
                  x: [getResponsivePosition(isMobile ? 100 : 200), getResponsivePosition(isMobile ? 90 : 180), getResponsivePosition(isMobile ? 100 : 200)],
                  y: [0, getResponsivePosition(-10), 0],
                  scale: [1, 1.05, 1],
                } : phase === 'charge' ? {
                  x: [getResponsivePosition(isMobile ? 100 : 200), getResponsivePosition(isMobile ? 120 : 250)],
                  y: [0, getResponsivePosition(20)],
                  scale: [1, 1.2],
                  rotate: [0, 15],
                } : phase === 'clash' ? {
                  x: [getResponsivePosition(isMobile ? 120 : 250), 0],
                  y: [getResponsivePosition(20), 0],
                  scale: [1.2, isMobile ? 1.3 : 1.5],
                  rotate: [15, -45],
                } : phase === 'slice' ? {
                  x: [0, getResponsivePosition(-80)],
                  y: [0, getResponsivePosition(-30)],
                  scale: [isMobile ? 1.3 : 1.5, isMobile ? 1.5 : 1.8],
                  rotate: [-45, -90],
                  opacity: [1, 0.8],
                } : {}
              }
              transition={
                phase === 'dualAppear' ? {
                  duration: 0.7,
                  ease: [0.34, 1.56, 0.64, 1],
                } : phase === 'standoff' ? {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                } : phase === 'charge' ? {
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96],
                } : phase === 'clash' ? {
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                } : {}
              }
            >
              <div className={`w-full h-full ${
                phase === 'charge' ? 'ninja-charging' :
                phase === 'clash' || phase === 'slice' ? 'ninja-clashing' :
                'ninja-ultra'
              }`}>
                <ShadowBladeVector />
              </div>
              
              {/* Energy particles */}
              {(phase === 'charge' || phase === 'clash') && (
                [...Array(particleCount)].map((_, i) => (
                  <motion.div
                    key={`right-particle-${i}`}
                    className="physics-particle bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{
                      width: isMobile ? '5px' : '4px',
                      height: isMobile ? '5px' : '4px',
                      left: '50%',
                      top: '50%',
                      boxShadow: '0 0 25px #0088ff',
                    }}
                    animate={{
                      x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * getResponsivePosition(300)],
                      y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * getResponsivePosition(300)],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: Math.random() * 0.3,
                    }}
                  />
                ))
              )}
            </motion.div>

            {/* Lightning between ninjas during charge */}
            {phase === 'charge' && (
              <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
                {[...Array(isMobile ? 4 : 5)].map((_, i) => (
                  <motion.path
                    key={i}
                    d={`M ${width * (isMobile ? 0.3 : 0.3)} ${height * 0.5} 
                        Q ${width * 0.5} ${height * (0.4 + Math.random() * 0.2)} 
                        ${width * (isMobile ? 0.7 : 0.7)} ${height * 0.5}`}
                    stroke={i % 2 === 0 ? "#ff0040" : "#0088ff"}
                    strokeWidth={isMobile ? "4" : "2"}
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    style={{
                      filter: isMobile ? 'drop-shadow(0 0 20px currentColor)' : 'drop-shadow(0 0 10px currentColor)',
                    }}
                  />
                ))}
              </svg>
            )}

            {/* Clash Impact Point */}
            {phase === 'clash' && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 3], opacity: [1, 0] }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="bg-white rounded-full"
                  style={{
                    width: isMobile ? `min(50vw, 250px)` : `clamp(150px, 25vw, 256px)`,
                    height: isMobile ? `min(50vw, 250px)` : `clamp(150px, 25vw, 256px)`,
                    filter: `blur(${isMobile ? '40px' : '30px'}) brightness(${isMobile ? '1.8' : '1'})`,
                  }}
                />
              </motion.div>
            )}

            {/* Horizontal Slash */}
            {phase === 'slice' && (
              <>
                <motion.div
                  className="absolute horizontal-slash"
                  style={{
                    width: '150vw',
                    height: isMobile ? `8px` : `clamp(3px, 0.5vw, 6px)`,
                    left: '-25vw',
                    top: '50%',
                    transformOrigin: 'center',
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 1.5, 1],
                    opacity: [0, 1, 0.9],
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                
                {/* Secondary slashes for depth */}
                {[...Array(isMobile ? 3 : 3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(0,255,136,${isMobile ? '0.9' : '0.5'}), transparent)`,
                      width: '120vw',
                      height: isMobile ? '4px' : '2px',
                      left: '-10vw',
                      top: `${50 + (i - 1) * 5}%`,
                      boxShadow: isMobile ? '0 0 30px rgba(0, 255, 136, 0.9)' : '0 0 20px rgba(0, 255, 136, 0.6)',
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: 1,
                      opacity: [0, isMobile ? 0.9 : 0.5, 0],
                    }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </>
            )}
          </>
        )}

        {/* Screen Split Effect */}
        {phase === 'split' && (
          <>
            {/* Reality Tear Line */}
            <motion.div
              className="absolute reality-tear"
              style={{
                width: '120vw',
                height: isMobile ? `10px` : `clamp(4px, 0.8vw, 8px)`,
                left: '-10vw',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 100,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.8, 0.4] }}
              transition={{ duration: 0.5 }}
            />

            {/* Top Half */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-black"
              style={{
                height: '50.2%',
                transformOrigin: 'bottom center',
                border: `${isMobile ? '5px' : 'clamp(2px, 0.4vw, 4px)'} solid #00ff88`,
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                boxShadow: isMobile 
                  ? `0 0 80px rgba(0, 255, 136, 1)` 
                  : `0 0 clamp(40px, 8vw, 80px) rgba(0, 255, 136, 1)`,
              }}
              initial={{ y: 0 }}
              animate={{
                y: [0, -10, -30, -100, -height],
                rotate: [0, 0.5, 1, 2, 3],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.1, 0.3, 0.6, 1],
                ease: [0.43, 0, 0.23, 0.96],
              }}
            />

            {/* Bottom Half */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-black"
              style={{
                height: '50.2%',
                transformOrigin: 'top center',
                border: `${isMobile ? '5px' : 'clamp(2px, 0.4vw, 4px)'} solid #00ff88`,
                borderBottom: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                boxShadow: isMobile 
                  ? `0 0 80px rgba(0, 255, 136, 1)` 
                  : `0 0 clamp(40px, 8vw, 80px) rgba(0, 255, 136, 1)`,
              }}
              initial={{ y: 0 }}
              animate={{
                y: [0, 10, 30, 100, height],
                rotate: [0, -0.5, -1, -2, -3],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.1, 0.3, 0.6, 1],
                ease: [0.43, 0, 0.23, 0.96],
              }}
            />

            {/* Dimensional Rift Energy */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [0.5, 10],
                opacity: [1, 0],
              }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
            >
              <div 
                className="bg-gradient-radial from-white via-[#00ff88] to-transparent rounded-full"
                style={{
                  width: isMobile ? `min(40vw, 200px)` : `clamp(100px, 20vw, 192px)`,
                  height: isMobile ? `min(40vw, 200px)` : `clamp(100px, 20vw, 192px)`,
                  filter: `blur(${isMobile ? '35px' : '20px'}) brightness(${isMobile ? '1.8' : '1'})`,
                }}
              />
            </motion.div>

            {/* Physics-based debris with gravity */}
            {[...Array(debrisCount)].map((_, i) => {
              const angle = (Math.PI * 2 * i) / debrisCount;
              const velocity = getResponsivePosition(200 + Math.random() * 600);
              const size = isMobile ? 3 + Math.random() * 6 : 2 + Math.random() * 6;
              const color = ['#00ff88', '#ffffff', '#ff0040', '#0088ff'][Math.floor(Math.random() * 4)];
              
              return (
                <motion.div
                  key={i}
                  className="physics-particle"
                  style={{
                    width: size,
                    height: size,
                    left: '50%',
                    top: '50%',
                    background: color,
                    boxShadow: `0 0 ${size * (isMobile ? 6 : 3)}px ${color}`,
                  }}
                  animate={{
                    x: [0, Math.cos(angle) * velocity * 0.5, Math.cos(angle) * velocity],
                    y: [
                      0,
                      Math.sin(angle) * velocity * 0.5 - 100,
                      Math.sin(angle) * velocity + 300,
                    ],
                    opacity: [1, 1, 0],
                    scale: [1, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    times: [0, 0.4, 1],
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </>
        )}
      </motion.div>
    </>
  );
}