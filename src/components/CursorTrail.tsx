import { useEffect, useRef } from 'react';

interface Trail {
  x: number;
  y: number;
  life: number;
  rotation: number; // Add individual rotation for each shuriken
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const trailsRef = useRef<Trail[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      trailsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        rotation: Math.random() * Math.PI * 2, // Random initial rotation
      });

      // Limit trails
      if (trailsRef.current.length > 20) {
        trailsRef.current.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw trails
      trailsRef.current.forEach((trail) => {
        trail.life -= 0.05;
        trail.rotation += 0.1; // Rotate each shuriken individually

        if (trail.life > 0) {
          const size = 8 * trail.life;
          const opacity = trail.life * 0.3;

          // Draw glow first (behind the shuriken)
          ctx.save();
          ctx.translate(trail.x, trail.y);
          
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
          gradient.addColorStop(0, `rgba(0, 255, 136, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
          
          ctx.beginPath();
          ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.restore();

          // Draw shuriken shape
          ctx.save();
          ctx.translate(trail.x, trail.y);
          ctx.rotate(trail.rotation);

          ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`;
          ctx.beginPath();
          
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            const x1 = Math.cos(angle) * size;
            const y1 = Math.sin(angle) * size;
            const x2 = Math.cos(angle + Math.PI / 4) * (size / 2);
            const y2 = Math.sin(angle + Math.PI / 4) * (size / 2);
            
            if (i === 0) {
              ctx.moveTo(x1, y1);
            }
            ctx.lineTo(0, 0);
            ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });

      // Clean up dead trails
      trailsRef.current = trailsRef.current.filter(trail => trail.life > 0);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}