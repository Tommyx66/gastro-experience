"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function IntroStatement() {
  const { colores, project } = siteConfig;

  return (
    <section
      // Aumentamos drásticamente el py (eje y) y quitamos el borde superior duro
      className="relative w-full py-32 md:py-56 flex flex-col justify-center px-6 md:px-12 z-20 overflow-hidden"
      style={{ backgroundColor: colores.fondoOscuro }}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center relative z-10">
        
        {/* Elemento estructural ortogonal con degradado en las puntas para no cortar en seco */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="hidden md:block col-span-1 h-full w-[2px] origin-top bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />

        <div className="col-span-1 md:col-span-10 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6 md:mb-10"
          >
            <div className="w-8 h-[2px]" style={{ backgroundColor: colores.acento }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
              {project.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-white/90 leading-relaxed md:leading-[1.3] text-pretty border-l-2 md:border-l-0 pl-6 md:pl-0 border-white/10"
          >
            {project.descripcion1}
          </motion.h2>
        </div>
      </div>

      {/* Degradado inferior que funde esta sección suavemente con el inicio del CinematicShowroom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none z-0" />
    </section>
  );
}