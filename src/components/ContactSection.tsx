import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import ShadowBladeVector from '../imports/ShadowBladeVector1';

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/Sidharthavyas',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sidhartha-vyas/',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:vsidhartha71@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    href: 'tel:+919029562156',
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative py-20 px-6">
      {/* Final glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00ff88] rounded-full blur-[200px]" />
      </div>

      {/* Ninja Accent - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={isInView ? { opacity: 0.1, x: 0, scale: 1 } : { opacity: 0, x: 100, scale: 0.8 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute right-0 bottom-20 w-[350px] h-[350px] md:w-[450px] md:h-[450px] pointer-events-none hidden md:block"
        style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.2))' }}
      >
        <div
          className="w-full h-full"
          style={{
            '--stroke-0': '#00ff88',
            transform: 'scaleX(-1)',
          } as React.CSSProperties}
        >
          <ShadowBladeVector />
        </div>
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h2 className="text-[#00ff88] tracking-widest uppercase text-sm mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The Calling
          </h2>
          <h3 className="text-[#e6ffe6] text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>
            Let's build something<br />extraordinary.
          </h3>
          <p className="text-[#d4d4d4] opacity-90 text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
            Every great creation starts with a single message.
          </p>
        </motion.div>

        {/* Orbiting social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, rotate: -180 }}
                animate={
                  isInView
                    ? { scale: 1, rotate: 0 }
                    : { scale: 0, rotate: -180 }
                }
                transition={{
                  duration: 0.6,
                  delay: index * 0.1 + 0.5,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.2, y: -5 }}
                className="group relative"
              >
                <motion.div
                  className="absolute inset-0 bg-[#00ff88] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
                <div className="relative w-16 h-16 flex items-center justify-center bg-[#121212] border-2 border-[#1e1e1e] rounded-full group-hover:border-[#00ff88] transition-colors duration-300">
                  <Icon className="text-[#00ff88]" size={24} />
                </div>
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#d4d4d4] text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {link.label}
                </p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="mailto:vsidhartha71@gmail.com"
            className="inline-block group relative"
          >
            <motion.div
              className="absolute inset-0 bg-[#00ff88] blur-xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <div className="relative bg-[#00ff88] text-[#0a0a0a] px-8 py-4 rounded-full group-hover:bg-[#0a0a0a] group-hover:text-[#00ff88] group-hover:border group-hover:border-[#00ff88] group-hover:shadow-[0_0_15px_#00ff88] transition-all duration-300 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              <span className="flex items-center gap-2">
                <Mail size={20} />
                Send Message
              </span>
            </div>
          </a>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 pt-8 border-t border-[#1e1e1e]"
        >
          <p className="text-[#9aa0a6] text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Sidhartha Vyas · Mumbai, India
          </p>
          <p className="text-[#00ff88] opacity-80 text-xs italic" style={{ fontFamily: "'Inter', sans-serif" }}>
            "Stillness in Motion"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
