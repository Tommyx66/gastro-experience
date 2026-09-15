"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Hero() {
  const { hero, colores } = siteConfig;

  return (
    <section 
      id="inicio" 
      className="relative min-h-[100svh] flex flex-col justify-center pt-28 md:pt-[160px] pb-16 px-4 sm:px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: colores.fondoOscuro }}
    >
      <div className="absolute inset-0 z-0">
        <Image 
          src={siteConfig.hero.heroSrc} 
          alt="Architecture Hero background" 
          fill 
          priority 
          sizes="100vw"
          className="object-cover opacity-60 mix-blend-luminosity" 
        />
        <div className="absolute inset-0 opacity-90" style={{ background: `radial-gradient(circle at center, transparent 0%, ${colores.fondoOscuro} 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${colores.fondoOscuro}, transparent)` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center md:text-left flex flex-col items-center md:items-start">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase block mb-4 md:mb-6 drop-shadow-md text-center md:text-left" style={{ color: colores.acento }}>
            {hero.eyebrow}
          </span>

          {/* FIX: clamp() y whitespace-nowrap evitan el salto de línea forzado */}
          <h1 className="text-[clamp(2.5rem,8vw,8rem)] font-black tracking-tighter text-white uppercase leading-[0.9] md:leading-[0.85] mb-6 md:mb-8 drop-shadow-2xl text-center md:text-left whitespace-nowrap">
            {hero.tituloPrefix} <br className="hidden sm:block" />
            <span style={{ color: colores.acento }}>{hero.tituloAccent}</span>
          </h1>

          <p className="text-sm md:text-lg text-white/70 max-w-lg mb-10 leading-relaxed font-light drop-shadow-md mx-auto md:mx-0 text-center md:text-left">
            {hero.subtitulo}
          </p>

          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contacto" 
            className="inline-flex w-full sm:w-auto justify-center text-center text-[#0A0A0A] px-8 md:px-10 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-white"
            style={{ backgroundColor: colores.acento }}
          >
            {siteConfig.nav.cta}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}