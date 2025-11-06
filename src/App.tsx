// App.tsx
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ParticleEffect } from './components/ParticleEffect';
import { FogEffect } from './components/FogEffect';
import { CursorTrail } from './components/CursorTrail';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingNav } from './components/FloatingNav';
import { KanjiAccents } from './components/KanjiAccents';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroSection } from './components/HeroSection';
import { PathSection } from './components/PathSection';
import { NinjaShowcase } from './components/NinjaShowcase';
import { SkillsSection } from './components/SkillsSection';
import { StatsSection } from './components/StatsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { ContactSection } from './components/ContactSection';
import { NinjaBladeArc } from './components/NinjaBladeArc';
import { KonamiCode } from './components/KonamiCode';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [showBladeArc, setShowBladeArc] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Don't set up scroll listener during loading
    if (isLoading) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.floor(scrollY / windowHeight);

      if (newSection !== currentSection && Math.abs(scrollY - lastScrollY.current) > 100) {
        setShowBladeArc(true);
        setTimeout(() => setShowBladeArc(false), 600);
        setCurrentSection(newSection);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, isLoading]);

  return (
    <>
      {/* Loading Screen - Always on top */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen 
            key="loading-screen" 
            onComplete={() => {
              setIsLoading(false);
            }} 
          />
        )}
      </AnimatePresence>

      {/* Main Content - Only render after loading */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0a0a0a] min-h-screen overflow-x-hidden"
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* Ambient effects */}
            <FogEffect />
            <ParticleEffect />
            <CursorTrail />
            <ScrollProgress />
            <FloatingNav />
            <KanjiAccents />
            <KonamiCode />

            {/* Section transition blade arc */}
            <NinjaBladeArc trigger={showBladeArc} />

            {/* Main content */}
            <main className="relative z-10">
              <div id="hero">
                <HeroSection />
              </div>
              
              <div id="path">
                <PathSection />
              </div>
              
              <section id="showcase" className="min-h-screen flex items-center justify-center relative py-20 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e50914] rounded-full blur-[200px]" />
                </div>
                <div className="relative z-10 w-full max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-left space-y-6">
                      <h2 className="text-[#e50914] tracking-widest uppercase text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Shadow Blade
                      </h2>
                      <h3 className="text-[#e6ffe6] text-4xl md:text-5xl" style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>
                        Deadly Calm Focus
                      </h3>
                      <p className="text-[#d4d4d4] opacity-90 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                        An anime-style warrior captured mid-strike, embodying the principles of stealth, mastery, and silent aggression. 
                        Every movement calculated, every strike precise—the way of the code ninja.
                      </p>
                      <div className="flex gap-4 flex-wrap">
                        <span 
                          className="px-4 py-2 bg-[#e50914] bg-opacity-90 border border-[#e50914] text-[#ffffff] rounded-full text-sm font-semibold transition-all duration-300 hover:bg-opacity-100 hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:scale-105 cursor-default" 
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Precision
                        </span>
                        <span 
                          className="px-4 py-2 bg-[#e50914] bg-opacity-90 border border-[#e50914] text-[#ffffff] rounded-full text-sm font-semibold transition-all duration-300 hover:bg-opacity-100 hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:scale-105 cursor-default" 
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Focus
                        </span>
                        <span 
                          className="px-4 py-2 bg-[#e50914] bg-opacity-90 border border-[#e50914] text-[#ffffff] rounded-full text-sm font-semibold transition-all duration-300 hover:bg-opacity-100 hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:scale-105 cursor-default" 
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Mastery
                        </span>
                      </div>
                    </div>
                    <div className="relative h-[500px] md:h-[600px]">
                      <NinjaShowcase />
                    </div>
                  </div>
                </div>
              </section>

              <SkillsSection />
              <StatsSection />
              
              <div id="projects">
                <ProjectsSection />
              </div>
              
              <div id="timeline">
                <TimelineSection />
              </div>
              
              <div id="contact">
                <ContactSection />
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}