"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isForceHidden, setIsForceHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { colores } = siteConfig;

  // Observer para detectar si el showroom está activo (force-hide)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Seteamos la variable local basada en el atributo del body
      setIsForceHidden(document.body.dataset.showroom === "active");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-showroom"] });
    return () => observer.disconnect();
  }, []);

  // Lógica de Scroll (corregida para force-hide)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (isOpen) return; // No esconder si el menú mobile está abierto

      // 1. Lógica para Ocultar (Scrolling Down)
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true);
      } 
      
      // 2. Lógica para Mostrar (Scrolling Up) - ESTA ES LA CORRECCIÓN
      // Solo permitimos mostrar el navbar (hidden: false) si NO estamos
      // en la zona force-hide del Showroom.
      else if (!isForceHidden) {
        setHidden(false);
      }

      // Si currentScrollY < lastScrollY Y isForceHidden es TRUE,
      // el estado "hidden" permanecerá TRUE porque no se ejecuta ninguna condición.

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen, isForceHidden]); // Agregamos isForceHidden como dependencia

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id.replace("#", ""));
      if (element) {
        const isMobile = window.innerWidth < 768;
        const navbarHeight = isMobile ? (scrolled ? 80 : 100) : scrolled ? 100 : 120;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - navbarHeight, behavior: "smooth" });
      }
    }, 200);
  };

  // Simplificamos la lógica de visibilidad final
  const isNavbarHidden = hidden || isForceHidden;

  return (
    <>
      <header className={`fixed top-0 w-full z-50 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isNavbarHidden ? "-translate-y-full" : "translate-y-0"}`}>
        <div className={`transition-all duration-500 ${scrolled || isOpen ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
          <div className={`max-w-[1700px] mx-auto px-6 md:px-12 flex items-center justify-between w-full transition-all duration-500 ${scrolled || isOpen ? "h-20 md:h-24" : "h-28 md:h-32"}`}>
            
            <div className="cursor-pointer z-50 flex-shrink-0 flex items-center" onClick={() => scrollTo("inicio")}>
<button 
              onClick={() => scrollTo("inicio")} 
              className="relative flex items-center gap-3 cursor-pointer group text-left"
            >
              <Image 
                src="/logo.png" 
                alt="Estudio Kessler" 
                width={160} 
                height={50} 
className="w-full max-w-[900px] h-auto object-contain opacity-90 drop-shadow-2xl mix-blend-screen"                priority
              />
            </button>            </div>

            <div className="hidden md:flex items-center gap-10">
              {siteConfig.nav.links.map((link) => (
                <button 
                  key={link.label} 
                  onClick={() => scrollTo(link.href)} 
                  className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors text-white/60 hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => scrollTo("contacto")} 
                style={{ color: colores.fondoOscuro, backgroundColor: colores.acento }} 
                className="px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:bg-white"
              >
                {siteConfig.nav.cta}
              </button>
            </div>

            <button 
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"} 
              className="md:hidden text-white z-[60] p-2 -mr-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            exit={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col px-8 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6 mt-36">
              {siteConfig.nav.links.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + 0.1 * i, duration: 0.5 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-4xl font-black uppercase text-white text-left tracking-tighter flex items-center justify-between py-2 border-b border-white/5"
                >
                  {link.label}
                  <span style={{ color: colores.acento }}>.</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}