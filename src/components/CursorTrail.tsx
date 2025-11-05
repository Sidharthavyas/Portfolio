import { useEffect, useRef } from 'react';

interface Trail {
  x: number;
  y: number;
  life: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const trails: Trail[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      trails.push({
        x: mouseX,
        y: mouseY,
        life: 1,
      });

      // Limit trails
      if (trails.length > 20) {
        trails.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw trails
      trails.forEach((trail, index) => {
        trail.life -= 0.05;

        if (trail.life > 0) {
          const size = 8 * trail.life;
          const opacity = trail.life * 0.3;

          // Draw shuriken shape
          ctx.save();
          ctx.translate(trail.x, trail.y);
          ctx.rotate((Date.now() / 1000) * Math.PI);

          ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`;
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            const x1 = Math.cos(angle) * size;
            const y1 = Math.sin(angle) * size;
            const x2 = Math.cos(angle + Math.PI / 4) * (size / 2);
            const y2 = Math.sin(angle + Math.PI / 4) * (size / 2);
            ctx.moveTo(0, 0);
            ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.fill();

          // Glow
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
          gradient.addColorStop(0, `rgba(0, 255, 136, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(-size * 2, -size * 2, size * 4, size * 4);

          ctx.restore();
        }
      });

      // Clean up dead trails
      for (let i = trails.length - 1; i >= 0; i--) {
        if (trails[i].life <= 0) {
          trails.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
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
