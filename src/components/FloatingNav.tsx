// components/FloatingNav.tsx
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Home, User, Code, Briefcase, Clock, Mail } from 'lucide-react';

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState(0);

  const navItems = [
    { icon: Home, label: 'Home', id: 'hero' },
    { icon: User, label: 'About', id: 'path' },
    { icon: Code, label: 'Skills', id: 'skills' },
    { icon: Briefcase, label: 'Projects', id: 'projects' },
    { icon: Clock, label: 'Journey', id: 'timeline' },
    { icon: Mail, label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(index);
          }
        }
      });
    };

    // Call once on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed right-12 top-1/2 -translate-y-1/2 z-[100]"
    >
      <div className="flex flex-col gap-4 bg-[#0f0f0f]/90 border-2 border-[#00ff88]/30 rounded-full px-4 py-4 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,136,0.2)]">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === index;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => {
                const element = document.getElementById(item.id);
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={item.label}
            >
              <div className={`px-4 py-3 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-[#00ff88] text-black shadow-[0_0_20px_rgba(0,255,136,0.6)]' 
                  : 'bg-transparent text-[#00ff88] hover:bg-[#00ff88]/20'
              }`}>
                <Icon size={20} strokeWidth={2.5} />
              </div>
              
              {/* Tooltip */}
              <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <div className="bg-[#00ff88] text-black px-4 py-2 rounded-lg text-sm font-bold shadow-[0_0_20px_rgba(0,255,136,0.4)]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.label}
                </div>
                {/* Arrow */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 -translate-x-1">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-[#00ff88]" />
                </div>
              </div>

              {/* Active indicator ring */}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 border-2 border-[#00ff88] rounded-full"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                />
              )}

              {/* Pulse effect for active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 border-2 border-[#00ff88] rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}