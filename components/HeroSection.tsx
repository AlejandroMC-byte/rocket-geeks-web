'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Phone, MapPin, Clock, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import empresaData from '@/data/empresa.json';

export default function HeroSection() {
  const shouldReduce = useReducedMotion();
  const waNumber     = empresaData.contacto.whatsapp.replace(/\D/g, '');

  const scrollToProducts = () => {
    document.getElementById('productos')?.scrollIntoView({
      behavior: shouldReduce ? 'auto' : 'smooth',
    });
  };

  // ── Blob animations (skipped when user prefers reduced motion) ──────────
  const blobOneAnim = shouldReduce ? {} : { scale: [1, 1.2, 1], x: [0, 50, 0],  y: [0, 30, 0]  };
  const blobTwoAnim = shouldReduce ? {} : { scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, -30, 0] };

  // ── Shared entrance helpers ─────────────────────────────────────────────
  const fadeUp    = shouldReduce ? { initial: false } : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };
  const fadeIn    = shouldReduce ? { initial: false } : { initial: { opacity: 0 },        animate: { opacity: 1 } };
  const scaleUp   = shouldReduce ? { initial: false } : { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 } };
  const tap       = shouldReduce ? {} : { scale: 0.95 };
  const hover     = shouldReduce ? {} : { scale: 1.05 };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
    >
      {/* ── Decorative background (hidden from AT) ──────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        {/* Blobs: reduced blur radius on mobile for GPU budget */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-2xl md:blur-3xl opacity-20"
          style={{ willChange: 'transform' }}
          animate={blobOneAnim}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-2xl md:blur-3xl opacity-20"
          style={{ willChange: 'transform' }}
          animate={blobTwoAnim}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div {...fadeUp} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-16 mb-8 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.12, rotate: 3 }}
              className="drop-shadow-[0_0_24px_rgba(255,255,255,0.25)]"
            >
              <Image
                src={empresaData.logo}
                alt={empresaData.nombre}
                width={100}
                height={100}
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight"
          >
            {empresaData.nombre}
          </h1>

          {/* Slogan */}
          <motion.p
            {...fadeIn}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto font-light"
          >
            {empresaData.slogan}
          </motion.p>

          {/* Descripción */}
          <motion.p
            {...fadeIn}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            {empresaData.descripcion}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contáctanos por WhatsApp (abre en nueva pestaña)"
              whileHover={hover}
              whileTap={tap}
              className="group flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-lg shadow-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <MessageCircle className="w-10 h-10" aria-hidden="true" />
              Contáctanos por WhatsApp
              <motion.span
                aria-hidden="true"
                className="inline-block"
                animate={shouldReduce ? {} : { x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>

            {/* Ver productos */}
            <motion.button
              type="button"
              onClick={scrollToProducts}
              whileHover={hover}
              whileTap={tap}
              className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-full font-semibold text-lg backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Ver productos
              <ArrowDown className="w-5 h-5" aria-hidden="true" />
            </motion.button>
          </motion.div>

          {/* Contact info bar */}
          <motion.ul
            {...fadeIn}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            aria-label="Información de contacto rápido"
            className="mt-16 flex flex-wrap justify-center gap-8 text-gray-400 list-none"
          >
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{empresaData.contacto.telefono}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{empresaData.contacto.direccion.split(',')[0]}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-5 h-5 shrink-0" aria-hidden="true" />
              {/* horario comes from empresa.json — no more hardcoded strings */}
              <span>{empresaData.contacto.horario.split(',')[0]}</span>
            </li>
          </motion.ul>

        </motion.div>
      </div>

      {/* ── Scroll indicator — decorative, hidden from AT ────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={shouldReduce ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            animate={shouldReduce ? {} : { y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
