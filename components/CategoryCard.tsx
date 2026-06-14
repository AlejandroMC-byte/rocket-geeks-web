'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import { Categoria } from '@/types';

interface CategoryCardProps {
  categoria: Categoria;
  index?: number;
  onClick?: () => void;
}

// Per-category design tokens
const ACCENTS: Record<string, {
  border: string;
  glow: string;
  iconRing: string;
  hoverText: string;
}> = {
  iphone:  { border: 'border-t-blue-500',    glow: 'from-blue-500/20 to-blue-600/5',    iconRing: 'bg-blue-500/15 ring-blue-500/25',    hoverText: 'group-hover:text-blue-400'    },
  mac:     { border: 'border-t-slate-300',   glow: 'from-slate-400/20 to-slate-500/5',  iconRing: 'bg-slate-400/15 ring-slate-400/25',  hoverText: 'group-hover:text-slate-200'   },
  ipad:    { border: 'border-t-violet-500',  glow: 'from-violet-500/20 to-violet-600/5',iconRing: 'bg-violet-500/15 ring-violet-500/25',hoverText: 'group-hover:text-violet-400'  },
  watch:   { border: 'border-t-emerald-500', glow: 'from-emerald-500/20 to-emerald-600/5',iconRing: 'bg-emerald-500/15 ring-emerald-500/25', hoverText: 'group-hover:text-emerald-400' },
};
const DEFAULT_ACCENT = ACCENTS.iphone;

export default function CategoryCard({ categoria, index = 0, onClick }: CategoryCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const accent = ACCENTS[categoria.id] ?? DEFAULT_ACCENT;

  const cardVariants: Variants = {
    hidden:   { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.45, delay: index * 0.09, ease: 'easeOut' } },
    hover:    { y: shouldReduceMotion ? 0 : -6, transition: { duration: 0.28, ease: 'easeInOut' } },
  };

  const iconVariants: Variants = {
    hover: {
      scale:  shouldReduceMotion ? 1 : 1.12,
      rotate: shouldReduceMotion ? 0 : [0, -7, 7, -3, 0],
      transition: { duration: 0.45, ease: 'easeInOut' },
    },
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
    hover:  { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.button
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileFocus="hover"
      onClick={onClick}
      className={[
        'group relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden',
        'rounded-3xl bg-gradient-to-b from-[#141414] to-[#0a0a0a]',
        'border border-white/5 border-t-2', accent.border,
        'p-8 text-center text-white shadow-xl',
        'outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950',
      ].join(' ')}
      aria-label={`Categoría: ${categoria.nombre}. ${categoria.descripcion}`}
    >
      {/* Accent glow on hover */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${accent.glow} via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Shine sweep */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">

        {/* Icon container */}
        <motion.div
          variants={iconVariants}
          aria-hidden="true"
          className={`grid h-16 w-16 place-items-center rounded-2xl text-4xl ring-1 select-none ${accent.iconRing}`}
        >
          {categoria.icono}
        </motion.div>

        {/* Text block */}
        <div className="flex flex-col items-center gap-1.5">
          {/* Eyebrow */}
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
            Apple
          </span>

          {/* Name */}
          <h3 className={`text-2xl font-semibold tracking-tight text-white transition-colors duration-300 ${accent.hoverText}`}>
            {categoria.nombre}
          </h3>

          {/* Description */}
          <p className="max-w-[200px] text-[13px] leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/70">
            {categoria.descripcion}
          </p>
        </div>

        {/* CTA pill */}
        <motion.span
          variants={ctaVariants}
          className="mt-1 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-[12px] font-medium tracking-wide text-white/60 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white/90"
        >
          Ver productos →
        </motion.span>
      </div>
    </motion.button>
  );
}