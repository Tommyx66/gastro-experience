"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, MessageSquare } from "lucide-react";

export function Contact() {
  // CAMBIAMOS subbrand POR name
  const { contact, contacto, colores, name } = siteConfig;
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <section 
      id="contacto" 
      className="relative w-full bg-[#F9F9F7] text-[#0A0A0A] py-28 md:py-44 z-30 overflow-hidden border-t border-black/5"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px]" style={{ backgroundColor: colores.acento }} />
            <span className="font-mono text-[10px] md:text-xs text-black/50 tracking-[0.4em] uppercase">
              [ {name} • {contact.eyebrow} ]
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-[5.5rem] font-light uppercase tracking-tighter text-black leading-[0.95]">
            {contact.titulo}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          
          {/* INFORMACIÓN DE CONTACTO */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full border-l-2 pl-6 md:pl-8" style={{ borderColor: colores.acento }}>
            <div className="flex flex-col gap-12">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 block mb-2">
                  Oficina Principal
                </span>
                <p className="text-xl md:text-2xl font-light text-black/90">
                  {contact.etiquetaDireccion}
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 block mb-2">
                  Correo Electrónico
                </span>
                <a 
                  href={`mailto:${contacto.email}`} 
                  className="text-xl md:text-2xl font-light text-black hover:opacity-70 transition-opacity inline-flex items-center gap-2 group"
                >
                  {contacto.email}
                  <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: colores.acento }} />
                </a>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 block mb-2">
                  Atención Telefónica / WhatsApp
                </span>
                <a 
                  href={`https://wa.me/${contact.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xl md:text-2xl font-light text-black hover:opacity-70 transition-opacity inline-flex items-center gap-2 group"
                >
                  {contacto.whatsappDisplay}
                  <MessageSquare size={18} style={{ color: colores.acento }} />
                </a>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-black/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-black/40 block">
                Residence One // ARQ | ART
              </span>
            </div>
          </div>

          {/* FORMULARIO EDITORIAL */}
          <div className="lg:col-span-7 bg-white border border-black/10 p-8 md:p-16 relative shadow-sm">
            <div className="mb-10">
              <h3 className="text-2xl md:text-3xl font-light uppercase tracking-tight text-black mb-2">
                {contact.formTitulo}
              </h3>
              <p className="text-black/60 font-light text-sm md:text-base">
                {contact.formSubtitulo}
              </p>
            </div>

            {enviado ? (
              <div className="py-16 flex flex-col items-center justify-center text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-black font-bold text-xl" 
                  style={{ backgroundColor: colores.acento }}
                >
                  ✓
                </div>
                <h4 className="text-2xl font-light uppercase text-black mb-2">Mensaje Enviado</h4>
                <p className="text-black/60 text-sm max-w-sm">
                  Gracias por escribirnos. Nos pondremos en contacto a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-black/60">
                      Nombre / Empresa
                    </label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Ej. Juan Pérez" 
                      className="bg-[#F9F9F7] border border-black/10 px-4 py-4 text-black text-sm focus:outline-none focus:border-black transition-colors rounded-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-black/60">
                      Correo Electrónico
                    </label>
                    <input 
                      required 
                      type="email" 
                      placeholder="correo@ejemplo.com" 
                      className="bg-[#F9F9F7] border border-black/10 px-4 py-4 text-black text-sm focus:outline-none focus:border-black transition-colors rounded-none" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-black/60">
                    {contact.labelMensaje}
                  </label>
                  <textarea 
                    required 
                    rows={4} 
                    placeholder={contact.placeholderMensaje} 
                    className="bg-[#F9F9F7] border border-black/10 p-4 text-black text-sm focus:outline-none focus:border-black transition-colors rounded-none resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="mt-4 w-full py-5 px-8 font-mono text-xs uppercase tracking-[0.2em] text-black font-bold transition-all hover:opacity-90 flex items-center justify-center gap-3 cursor-pointer shadow-md rounded-none" 
                  style={{ backgroundColor: colores.acento }}
                >
                  {contact.botonEnviar} <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}