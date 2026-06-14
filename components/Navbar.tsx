'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Search, Menu, X, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import empresaData from '@/data/empresa.json';

interface NavbarProps {
  nombre?: string;
  whatsapp?: string;
  logoUrl?: string;
}

const NAV_LINKS = [
  { label: 'iPhone', href: '#iphones' },
  { label: 'Mac',    href: '#macs'    },
  { label: 'iPad',   href: '#ipads'   },
  { label: 'Watch',  href: '#watches' },
  { label: 'Nosotros', href: '#nosotros' },
] as const;

export default function Navbar({ nombre, whatsapp, logoUrl }: NavbarProps) {
  const storeName  = nombre   ?? empresaData.nombre;
  const waNumber   = (whatsapp ?? empresaData.contacto.whatsapp).replace(/\D/g, '');
  const logoSrc    = logoUrl; // only show image when explicitly provided via prop

  const [isScrolled,     setIsScrolled]     = useState(false);
  const [isOpen,         setIsOpen]         = useState(false);
  const [activeSection,  setActiveSection]  = useState('');
  const [logoError,      setLogoError]      = useState(false);

  // Scroll → switch between solid and blurred background
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver → highlight active nav section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ href }) => {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close drawer when resizing to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const waMessage    = encodeURIComponent(empresaData.contacto.mensajeWhatsapp ?? '');
  const waUrl        = `https://wa.me/${waNumber}${waMessage ? `?text=${waMessage}` : ''}`;
  const showLogo     = Boolean(logoSrc) && !logoError;

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-[#000]'
      }`}
    >
      {/* ── Main bar (52 px) ─────────────────────────────────── */}
      <div className="max-w-[980px] mx-auto px-4 h-[52px] flex items-center justify-between gap-4">

        {/* LEFT — logo + store name */}
        <a
          href="#"
          aria-label={storeName}
          className="flex items-center gap-2 shrink-0"
        >
          {showLogo ? (
            <Image
              src={logoSrc!}
              alt={storeName}
              width={22}
              height={22}
              className="object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <Apple className="w-[22px] h-[22px] text-white" />
          )}
          <span className="text-sm font-semibold text-white tracking-tight leading-none">
            {storeName}
          </span>
        </a>

        {/* CENTER — desktop navigation links */}
        <div className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const id       = href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={href}
                role="listitem"
                className={`text-xs font-medium transition-colors duration-150 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* RIGHT — search + WhatsApp + hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            aria-label="Buscar"
            className="text-white/70 hover:text-white transition-colors"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contáctanos por WhatsApp"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold rounded-full transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Contáctanos
          </a>

          <button
            aria-label="Abrir menú"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
            className="md:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-black border-t border-white/10 w-full"
          >
            <div className="px-6 pt-4 pb-8 flex flex-col">
              {/* Close button */}
              <button
                aria-label="Cerrar menú"
                className="self-end text-white/50 hover:text-white mb-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Nav links */}
              {NAV_LINKS.map(({ label, href }) => {
                const id       = href.slice(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={id}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`py-3.5 text-base font-medium border-b border-white/5 transition-colors ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {label}
                  </a>
                );
              })}

              {/* WhatsApp CTA */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Contáctanos por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
