"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export function CtaTransition() {
  const { colores, ctaTransition, contact } = siteConfig;
  const wpMsg = encodeURIComponent(contact.placeholderMensaje);
  const wpHref = `https://wa.me/${contact.whatsapp}?text=${wpMsg}`;

  return (
    <section className="relative w-full overflow-hidden flex flex-col justify-center min-h-[70vh] bg-[#0A0A0A]">
      {/* Fondo de imagen en blanco y negro con overlay oscuro */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/render/gallery_1.jpg" // Podés cambiarla por gallery_4.jpg si te gusta más
          alt="Background"
          fill
          className="object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 drop-shadow-2xl leading-[0.9]"
        >
          {ctaTransition.tituloLinea1} <br className="hidden md:block" /> {ctaTransition.tituloLinea2}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="font-light text-lg md:text-2xl text-white/90 max-w-2xl leading-relaxed mb-12 text-pretty drop-shadow-md"
        >
          {ctaTransition.descripcion}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "backOut" }}
          viewport={{ once: true }}
        >
          <a
            href={wpHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center py-5 px-10 md:py-6 md:px-16 text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 transform hover:-translate-y-1 rounded-full w-full sm:w-auto bg-[var(--bg)] text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] border border-white/10"
            style={
              {
                "--bg": colores.fondoOscuro,
                "--text": colores.blanco,
              } as React.CSSProperties
            }
          >
            {ctaTransition.botonEtiqueta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}