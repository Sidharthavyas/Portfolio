import { useEffect, useRef } from 'react';

interface FogParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  phase: number; // For wave motion
  pulseSpeed: number;
}

const FOG_CONFIG = {
  count: 20,
  minSize: 250,
  maxSize: 400,
  minSpeed: 0.08,
  maxSpeed: 0.25,
  minOpacity: 0.015,
  maxOpacity: 0.04,
  scrollMultiplier: 0.3,
  waveAmplitude: 30,
  waveSpeed: 0.0005,
};

export function FogEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fogParticlesRef = useRef<FogParticle[]>([]);
  const scrollSpeedRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let resizeTimeout: NodeJS.Timeout;
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeFog();
      }, 100);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fogParticles = fogParticlesRef.current;

    const createFogParticle = (): FogParticle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (FOG_CONFIG.maxSize - FOG_CONFIG.minSize) + FOG_CONFIG.minSize,
      speedY: Math.random() * (FOG_CONFIG.maxSpeed - FOG_CONFIG.minSpeed) + FOG_CONFIG.minSpeed,
      speedX: (Math.random() - 0.5) * 0.2, // Slight horizontal drift
      opacity: Math.random() * (FOG_CONFIG.maxOpacity - FOG_CONFIG.minOpacity) + FOG_CONFIG.minOpacity,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.001 + 0.0005,
    });

    const initializeFog = () => {
      fogParticles.length = 0;
      for (let i = 0; i < FOG_CONFIG.count; i++) {
        fogParticles.push(createFogParticle());
      }
    };

    initializeFog();

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      scrollSpeedRef.current = Math.min(delta * 0.1, 5);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Decay scroll speed
      scrollSpeedRef.current *= 0.92;

      fogParticles.forEach((fog) => {
        // Update position with wave motion
        fog.phase += fog.pulseSpeed;
        const waveOffset = Math.sin(fog.phase) * FOG_CONFIG.waveAmplitude;
        
        fog.y += fog.speedY + scrollSpeedRef.current * FOG_CONFIG.scrollMultiplier;
        fog.x += fog.speedX + Math.cos(fog.phase) * 0.5;

        // Wrap around screen
        if (fog.y > canvas.height + fog.size) {
          fog.y = -fog.size;
          fog.x = Math.random() * canvas.width;
        }
        if (fog.x > canvas.width + fog.size) {
          fog.x = -fog.size;
        } else if (fog.x < -fog.size) {
          fog.x = canvas.width + fog.size;
        }

        // Pulsing opacity
        const pulsingOpacity = fog.opacity * (0.8 + Math.sin(timestamp * fog.pulseSpeed * 2) * 0.2);

        // Multi-layered gradient for depth
        const gradient = ctx.createRadialGradient(
          fog.x + waveOffset,
          fog.y,
          0,
          fog.x + waveOffset,
          fog.y,
          fog.size
        );
        
        gradient.addColorStop(0, `rgba(0, 255, 136, ${pulsingOpacity * 1.2})`);
        gradient.addColorStop(0.3, `rgba(0, 255, 136, ${pulsingOpacity * 0.6})`);
        gradient.addColorStop(0.6, `rgba(0, 255, 136, ${pulsingOpacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          fog.x + waveOffset - fog.size,
          fog.y - fog.size,
          fog.size * 2,
          fog.size * 2
        );

        // Additional subtle glow layer
        const glowGradient = ctx.createRadialGradient(
          fog.x + waveOffset,
          fog.y,
          fog.size * 0.5,
          fog.x + waveOffset,
          fog.y,
          fog.size * 1.5
        );
        glowGradient.addColorStop(0, `rgba(0, 255, 136, ${pulsingOpacity * 0.1})`);
        glowGradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.fillRect(
          fog.x + waveOffset - fog.size * 1.5,
          fog.y - fog.size * 1.5,
          fog.size * 3,
          fog.size * 3
        );
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
    />
  );
}