import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/motion/Reveal';
import { SignatureInteraction } from '../components/effects/SignatureInteraction';
import { LuCircle } from 'react-icons/lu';

// --- Styles & Assets ---
// Using arbitrary values in Tailwind to match CSS variables exactly
const colors = {
  bgPaper: '#F2F0EB',
  bgRail: '#121110',
  textDark: '#121110',
  textLight: '#F2F0EB',
  accent: '#C14918',
  warmStone: '#D6D2C4',
};

const fonts = {
  display: '"Tenor Sans", sans-serif',
  mono: '"Space Mono", monospace',
};

export default function Index() {
  const [activeSection, setActiveSection] = useState('intro');

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'menu', 'atmosphere', 'visit'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ 
      backgroundColor: colors.bgPaper, 
      color: colors.textDark, 
      fontFamily: fonts.mono 
    }}>
      {/* Font Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Tenor+Sans&display=swap');
        
        ::selection {
          background: ${colors.accent};
          color: ${colors.textLight};
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">
        
        {/* RAIL SIDEBAR */}
        <nav className="sticky top-0 h-auto lg:h-screen z-50 flex flex-row lg:flex-col justify-between p-6 lg:p-10 border-r border-white/10" 
             style={{ backgroundColor: colors.bgRail, color: colors.textLight }}>
          
          <div className="flex items-center lg:block justify-between w-full lg:w-auto">
            <div className="rail-header">
              <h1 className="text-[1.8rem] lg:text-[2.5rem] uppercase tracking-[-0.05em] leading-[0.9] mb-2" 
                  style={{ fontFamily: fonts.display }}>
                Kissa<br className="hidden lg:block" />Yoru
              </h1>
              <span className="text-xs uppercase tracking-[0.1em] block mt-2 lg:mt-4" 
                    style={{ color: colors.accent }}>
                Shibuya District
              </span>
            </div>
            {/* Mobile Menu Placeholder if needed, but design keeps it simple */}
          </div>

          <div className="hidden lg:flex flex-col gap-6 rail-nav">
            <ul className="flex flex-col gap-6 list-none">
              {[ 
                { id: 'intro', label: 'Philosophy' },
                { id: 'menu', label: 'Roasts & Brews' },
                { id: 'atmosphere', label: 'Atmosphere' },
                { id: 'visit', label: 'Visit' }
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => scrollTo(link.id)}
                    className={`text-sm uppercase transition-all duration-300 relative pl-0 hover:pl-[5px] hover:text-[#F2F0EB] ${
                      activeSection === link.id ? 'text-[#F2F0EB] pl-[5px]' : 'text-[#F2F0EB]/60'
                    }`}
                  >
                    {/* Active Dot Indicator */}
                    <span className={`absolute left-[-15px] top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full transition-opacity duration-300 ${
                      activeSection === link.id ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                    }`} style={{ backgroundColor: colors.accent }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block text-[0.7rem] opacity-50 leading-relaxed">
            <div className="flex items-center gap-2 mb-4 opacity-100" style={{ color: colors.textLight }}>
              <motion.div 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#2ECC71]"
              />
              <span>Open Now</span>
            </div>
            <p>Currently playing:<br />Ryo Fukui – Scenery (1976)</p>
            <br />
            <p>35.6580° N, 139.7016° E</p>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="w-full">
          
          {/* HERO */}
          <header id="intro" className="relative h-[90vh] flex items-end p-8 lg:p-16 overflow-hidden" 
                  style={{ backgroundColor: colors.textDark }}>
            <div className="absolute inset-0 opacity-60">
              <SignatureInteraction type="parallax" speed={0.4} className="h-[120%] w-full -mt-[10%]">
                <img 
                  src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop" 
                  alt="Pour over coffee detail dark" 
                  className="w-full h-full object-cover"
                />
              </SignatureInteraction>
            </div>
            
            <div className="relative z-10 max-w-[800px]" style={{ color: colors.textLight }}>
              <Reveal>
                <span className="text-[0.8rem] uppercase tracking-[0.2em] mb-6 block" 
                      style={{ color: colors.accent }}>
                  Hi-Fi Audio & Coffee
                </span>
                <h2 className="text-[3rem] md:text-[5rem] leading-[0.9] m-0" 
                    style={{ fontFamily: fonts.display }}>
                  Silence,<br />Sound &<br />Beans.
                </h2>
              </Reveal>
            </div>
          </header>

          {/* PHILOSOPHY */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-6 lg:p-16 lg:py-24 border-b border-[#121110]/10"
                   style={{ backgroundColor: colors.warmStone }}>
            <Reveal>
              <div className="flex flex-col justify-center h-full">
                <p className="text-[1.25rem] leading-[1.6] mb-8" style={{ fontFamily: fonts.display }}>
                  We believe in the ritual of delay. In a city that never stops, Yoru is a pause button. Inspired by the Kissaten culture of the Showa era, we combine precision hand-drip coffee with vintage JBL Paragon speakers.
                </p>
                <p className="text-[1.25rem] leading-[1.6] mb-8" style={{ fontFamily: fonts.display }}>
                  No Wi-Fi. No rushing. Just the warmth of the tube amp and the depth of the roast.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-[0.85rem] pt-4 border-t border-[#121110]">
                  <div>
                    <strong>Audio</strong><br />McIntosh 275 Tube Amp
                  </div>
                  <div>
                    <strong>Beans</strong><br />Single Origin, Light Roast
                  </div>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className="relative h-[400px] lg:h-[120%] lg:-mt-[10%]">
                <img 
                  src="https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?q=80&w=1600&auto=format&fit=crop" 
                  alt="Minimalist coffee shop interior wood" 
                  className="w-full h-full object-cover block"
                />
              </div>
            </Reveal>
          </section>

          {/* MENU */}
          <section id="menu" className="p-6 lg:p-16 lg:py-24 border-b border-[#121110]/10">
            <Reveal>
              <h3 className="text-[3rem] mb-12" style={{ fontFamily: fonts.display, color: colors.textDark }}>
                Selected Roasts
              </h3>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[2px] border border-[#121110]/10 bg-[#121110]/10">
                {[ 
                  {
                    tag: 'Ethiopia / Washed',
                    name: 'Yirgacheffe G1',
                    price: '¥900',
                    desc: 'Jasmine, Bergamot, and a delicate tea-like finish. Served in ceramic.'
                  },
                  {
                    tag: 'Kenya / Natural',
                    name: 'Nyeri AA',
                    price: '¥950',
                    desc: 'Bright acidity with notes of blackcurrant and tomato jam. Punchy and vibrant.'
                  },
                  {
                    tag: 'Guatemala / Honey',
                    name: 'Antigua Sweet',
                    price: '¥850',
                    desc: 'Chocolate body with a lingering caramel sweetness. The comfort cup.'
                  },
                  {
                    tag: 'House Blend',
                    name: 'Night Jazz',
                    price: '¥800',
                    desc: 'Darker roast designed for the evening. Smoky, spicy, and smooth.'
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-[#F2F0EB] p-8 flex flex-col justify-between h-full transition-colors duration-300 hover:bg-white cursor-default">
                    <div>
                      <div className="text-[0.7rem] uppercase mb-2" style={{ color: colors.accent }}>
                        {item.tag}
                      </div>
                      <div className="flex justify-between items-start mb-6 text-[1.25rem]" style={{ fontFamily: fonts.display }}>
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                      </div>
                      <p className="text-[0.85rem] opacity-70 leading-[1.5]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ATMOSPHERE */}
          <section id="atmosphere" className="p-6 lg:p-16 lg:py-24 border-b border-[#121110]/10 pb-40">
            <Reveal>
              <h3 className="text-[3rem] mb-12" style={{ fontFamily: fonts.display, color: colors.textDark }}>
                The Space
              </h3>
            </Reveal>
            
            <div className="grid grid-cols-12 grid-rows-[auto] lg:grid-rows-[600px] items-center gap-y-8 lg:gap-y-0">
              <div className="col-span-12 lg:col-span-7 row-start-1 z-10 relative">
                <Reveal delay={0.2}>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1587&auto=format&fit=crop" 
                      alt="Vinyl record playing" 
                      className="w-full h-auto block"
                    />
                    <div className="absolute top-8 -right-4 z-20 px-4 py-2 text-[0.7rem] uppercase text-white"
                         style={{ backgroundColor: colors.accent }}>
                      Analog Only
                    </div>
                  </div>
                </Reveal>
              </div>
              
              <div className="col-span-12 lg:col-span-6 lg:col-start-6 row-start-2 lg:row-start-1 z-20 lg:pt-[150px]">
                <Reveal delay={0.4}>
                  <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" 
                    alt="Pouring coffee slow motion" 
                    className="w-full h-auto block shadow-xl"
                  />
                </Reveal>
              </div>
            </div>
          </section>

          {/* VISIT */}
          <section id="visit" className="flex flex-col items-center text-center p-6 lg:p-16 lg:py-24"
                   style={{ backgroundColor: colors.textDark, color: colors.textLight }}>
            <Reveal>
              <h2 className="text-[4rem] mb-8" style={{ fontFamily: fonts.display }}>
                Find Us
              </h2>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left w-full max-w-[600px] pt-8 border-t border-white/20">
                <div>
                  <span className="block text-[0.75rem] uppercase mb-2" style={{ color: colors.accent }}>
                    Location
                  </span>
                  <p className="text-[1rem] leading-[1.6]">
                    12-4 Udagawacho<br />Shibuya City, Tokyo<br />150-0042
                  </p>
                </div>
                <div>
                  <span className="block text-[0.75rem] uppercase mb-2" style={{ color: colors.accent }}>
                    Hours
                  </span>
                  <p className="text-[1rem] leading-[1.6]">
                    Mon - Thu: 10:00 - 20:00<br />Fri - Sun: 10:00 - 23:00
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

        </main>
      </div>
    </div>
  );
}
