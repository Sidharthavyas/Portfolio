// components/HeroSection.tsx (cleaned up version)
import { motion } from 'motion/react';
import { useState } from 'react';
import ShadowBladeVector from '../imports/ShadowBladeVector1';
import { TypewriterText } from './TypewriterText';

export function HeroSection() {
  const [titleComplete, setTitleComplete] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Simple ambient glow - no animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ff88] rounded-full blur-[150px]" />
      </div>

      {/* Ninja Illustration - Background */}
      <motion.div
        initial={{ opacity: 0, x: -100, rotate: -5 }}
        animate={{ opacity: 0.15, x: 0, rotate: 0 }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 30px rgba(0, 255, 136, 0.3))' }}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full"
          style={{
            '--stroke-0': '#00ff88',
          } as React.CSSProperties}
        >
          <ShadowBladeVector />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="inline-block relative">
            {/* Subtle static glow behind text */}
            <div className="absolute inset-0 bg-[#00ff88] blur-xl opacity-20" />
            
            {/* Main title with FAST typewriter - no distracting effects */}
            <h1 
              className="relative text-[#e6ffe6] tracking-[0.2em] text-3xl md:text-6xl lg:text-7xl font-bold" 
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              <TypewriterText
                text="THE SILENT BUILDER"
                delay={150}
                speed={3}
                accelerate={true}
                burst={true}
                className="text-[#e6ffe6] tracking-[0.2em]"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
                onComplete={() => {
                  setTitleComplete(true);
                }}
              />
            </h1>
          </div>
        </motion.div>

        {/* Content that appears after title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Quote - simple fade in */}
          <motion.p 
            className="text-[#d4d4d4] text-xl opacity-90 max-w-2xl mx-auto italic" 
            style={{ fontFamily: "'Inter', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={titleComplete ? { opacity: 0.9 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            "I build with silence, focus, and purpose."
          </motion.p>

          {/* Name and details */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={titleComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p 
              className="text-[#00ff88] text-2xl md:text-3xl font-bold" 
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              <TypewriterText
                text="Sidhartha Vyas"
                delay={titleComplete ? 100 : 99999}
                speed={5}
                accelerate={true}
                burst={true}
                className="text-[#00ff88]"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              />
            </p>
            
            <motion.p 
              className="text-[#f0f0f0] opacity-90" 
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={titleComplete ? { opacity: 0.9 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              Software Engineer · Builder · Creator
            </motion.p>
            
            <motion.p 
              className="text-[#9aa0a6] text-sm"
              initial={{ opacity: 0 }}
              animate={titleComplete ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.7 }}
            >
              Mumbai, India
            </motion.p>
          </motion.div>

          {/* Call to action buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={titleComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, ease: 'easeOut' }}
          >
            <motion.button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-[#00ff88] text-black font-bold rounded-full uppercase tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,136,0.6)] hover:scale-105"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>

            <motion.button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 border-2 border-[#00ff88] text-[#00ff88] font-bold rounded-full uppercase tracking-wide transition-all duration-300 hover:bg-[#00ff88]/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:scale-105"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-[#00ff88] rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              className="w-1 h-2 bg-[#00ff88] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        {/* Simple floating code symbols */}
        {['<', '>', '{', '}', '/', '\\'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00ff88] opacity-10 text-4xl font-mono pointer-events-none select-none"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>
    </section>
  );
}