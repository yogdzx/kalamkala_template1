"use client";

import { motion } from "framer-motion";

interface HeroProps {
  brideNickname: string;
  groomNickname: string;
  ayatText?: string;
  ayatSource?: string;
}

export default function Hero({ 
  brideNickname, 
  groomNickname,
  ayatText = "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ",
  ayatSource = "QS. Ar-Rum: 21"
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-primary/10">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      
      <motion.div 
        className="z-10 flex flex-col items-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="text-sm tracking-widest uppercase mb-4 text-primary-dark">The Wedding Of</span>
        
        <h1 className="text-6xl md:text-8xl font-serif text-primary-dark mb-8">
          {groomNickname} & {brideNickname}
        </h1>
        
        <div className="w-24 h-[1px] bg-primary mb-8" />
        
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="text-xl md:text-2xl font-serif text-foreground/80 leading-relaxed font-arabic" dir="rtl">
            {ayatText}
          </p>
          <p className="text-sm font-sans text-foreground/60 tracking-wider">
            {ayatSource}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator & button */}
      <motion.button 
        onClick={() => {
          document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs tracking-widest uppercase text-primary-dark/80 font-semibold">Buka Undangan</span>
        <div className="w-[1px] h-12 bg-primary-dark/50" />
      </motion.button>
    </section>
  );
}
