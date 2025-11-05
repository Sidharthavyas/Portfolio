// components/StatsSection.tsx
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });

    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export function StatsSection() {
  const stats = [
    { label: 'Projects Completed', value: 4, suffix: '+', icon: '⚔️' },
    { label: 'Code Commits', value: 1000, suffix: '+', icon: '💻' },
    { label: 'Hours Coded', value: 500, suffix: '+', icon: '⏱️' },
    { label: 'Cups of Coffee', value: 999, suffix: '+', icon: '☕' },
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="bg-[#121212] border border-[#00ff88]/20 rounded-lg p-6 text-center hover:border-[#00ff88] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-[#00ff88] mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  <AnimatedCounter value={stat.value} />
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-[#c8c8c8] text-sm uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.label}
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-[#00ff88] rounded-lg blur-xl opacity-0 group-hover:opacity-20 transition-opacity -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}