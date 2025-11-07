// components/FloatingNav.tsx
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { Home, User, Code, Briefcase, Clock, Mail } from 'lucide-react';

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems = [
    { icon: Home, label: 'Home', id: 'hero' },
    { icon: User, label: 'About', id: 'path' },
    { icon: Code, label: 'Skills', id: 'skills' },
    { icon: Briefcase, label: 'Projects', id: 'projects' },
    { icon: Clock, label: 'Journey', id: 'timeline' },
    { icon: Mail, label: 'Contact', id: 'contact' },
  ];

  // Use requestAnimationFrame for smoother scroll detection
  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3; // More responsive trigger point

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop - 100; // Offset for earlier detection
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(index);
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    // Initial check
    handleScroll();
    
    // Throttled scroll handler for better performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [handleScroll]);

  const handleNavClick = (id: string, index: number) => {
    // Set active immediately for instant feedback
    setActiveSection(index);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        delay: 0.3, 
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-[100]"
    >
      <div className="relative flex flex-col gap-3 bg-[#0f0f0f]/95 border-2 border-[#00ff88]/40 rounded-full px-3 py-3 backdrop-blur-lg shadow-[0_0_40px_rgba(0,255,136,0.3)]">
        
        {/* Active background slider */}
        <motion.div
          className="absolute inset-y-3 inset-x-3 bg-[#00ff88]/10 rounded-full pointer-events-none"
          animate={{
            y: activeSection * 56, // Adjust based on button size + gap
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
          style={{
            height: 44, // Height of one button
            width: 'calc(100% - 24px)',
          }}
        />

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === index;
          const isHovered = hoveredIndex === index;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                scale: {
                  type: "spring",
                  stiffness: 400,
                  damping: 15
                }
              }}
            >
              <motion.div 
                className={`relative px-3 py-2.5 rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#00ff88] text-black' 
                    : 'bg-transparent text-[#00ff88] hover:bg-[#00ff88]/15'
                }`}
                animate={{
                  boxShadow: isActive 
                    ? '0 0 25px rgba(0, 255, 136, 0.7)' 
                    : '0 0 0px rgba(0, 255, 136, 0)'
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 3 : 2.5}
                  className="transition-all duration-200"
                />
              </motion.div>
              
              {/* Improved Tooltip with AnimatePresence */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.8 }}
                    transition={{
                      duration: 0.15,
                      ease: "easeOut"
                    }}
                    className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap"
                  >
                    <motion.div 
                      className="relative bg-[#00ff88] text-black px-4 py-2 rounded-lg text-sm font-bold"
                      style={{ 
                        fontFamily: "'Space Grotesk', sans-serif",
                        boxShadow: '0 4px 20px rgba(0, 255, 136, 0.5)',
                      }}
                      initial={{ filter: 'blur(4px)' }}
                      animate={{ filter: 'blur(0px)' }}
                      transition={{ duration: 0.1 }}
                    >
                      {item.label}
                      
                      {/* Arrow with better positioning */}
                      <div className="absolute left-[calc(100%-1px)] top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-[#00ff88]" />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active indicator dot */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00ff88] rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Smooth pulse effect for active state */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0px rgba(0, 255, 136, 0.4)',
                      '0 0 0 8px rgba(0, 255, 136, 0)',
                    ]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              )}
            </motion.button>
          );
        })}

        {/* Glow effect for the whole nav */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>

      {/* Mobile-friendly tap hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="md:hidden absolute -bottom-16 left-1/2 -translate-x-1/2 text-[#00ff88] text-xs opacity-50"
      >
        
      </motion.div>
    </motion.nav>
  );
}