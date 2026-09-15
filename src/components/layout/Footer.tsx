"use client";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const { colores, contacto, contact, nav, footer, nombre, logo } = siteConfig;

  const scrollTo = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    const lenis = (window as any).lenis;
    if (lenis && element) {
      lenis.scrollTo(element, { offset: -80, duration: 1.5 });
    } else {
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      id="contacto-footer"
      className="relative text-white overflow-hidden min-h-[420px] flex flex-col justify-end"
      style={{ backgroundColor: colores.fondoOscuro }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={footer.imagenFondo}
          alt="Textura Footer"
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 md:pt-28 pb-8 md:pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/15 pb-12 md:pb-16">
          <div className="lg:col-span-5 flex flex-col items-start">
            <button
              onClick={() => scrollTo("inicio")}
              className="relative w-44 md:w-52 h-12 md:h-14 mb-6 md:mb-8 hover:scale-105 transition-transform duration-500 origin-left"
              aria-label="Ir al inicio"
            >
              
                <h2 className="text-white font-bold text-xl tracking-[0.2em] uppercase">
                  {siteConfig.nombre}
                </h2>
             
            </button>
            <p className="text-white/70 font-medium leading-relaxed max-w-sm text-xs md:text-sm mb-6">
              {footer.descripcion}
            </p>
            <div className="space-y-2">
              <p
                className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: colores.acento }}
              >
                {contacto.email}
              </p>
            </div>
          </div>

          <nav className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 lg:pl-16">
            <div className="flex flex-col">
              <h3 className="text-[9px] md:text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-4 md:mb-6">
                Navegación
              </h3>
              <ul className="space-y-3 md:space-y-4">
                {nav.links.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="group flex items-center text-white/80 hover:text-white transition-colors text-[10px] md:text-xs font-bold uppercase tracking-widest"
                    >
                      {item.label}
                      <ArrowUpRight
                        className="w-3 h-3 ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                        style={{ color: colores.acento }}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="text-[9px] md:text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-4 md:mb-6">
                Contacto
              </h3>
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <a
                    href={`mailto:${contacto.email}`}
                    className="text-white/80 hover:text-white transition-colors text-[10px] md:text-xs font-bold uppercase tracking-widest"
                  >
                    Vía Email
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors text-[10px] md:text-xs font-bold uppercase tracking-widest"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] md:text-[10px] text-white/50 font-bold uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} {nombre}. Todos los derechos
            reservados.
          </p>
          <p className="text-[9px] md:text-[10px] text-white/50 font-bold uppercase tracking-widest flex items-center gap-1">
            Desarrollo por
            <a
              href="https://tomas-zarriello-portfolio-orpin.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors ml-1"
            >
              Tomás Zarriello
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
