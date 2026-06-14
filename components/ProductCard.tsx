'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Producto } from '@/types';
import empresaData from '@/data/empresa.json';

interface ProductCardProps {
  producto: Producto;
  index?: number;
}

export default function ProductCard({ producto, index = 0 }: ProductCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const waNumber  = empresaData.contacto.whatsapp.replace(/\D/g, '');
  const waMessage = encodeURIComponent(
    producto.mensajeWhatsapp ?? `Hola, me interesa el ${producto.nombre} a $${producto.precio.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  const descuento = producto.precioAnterior
    ? Math.round(((producto.precioAnterior - producto.precio) / producto.precioAnterior) * 100)
    : 0;

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-[90vw] max-w-2xl aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                fill
                className="object-contain"
                sizes="90vw"
              />
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {producto.nuevo && (
          <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
            Nuevo
          </span>
        )}
        {descuento > 0 && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
            -{descuento}%
          </span>
        )}
      </div>

      {/* Imagen del producto */}
      <div
        className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Información del producto */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {producto.nombre}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {producto.descripcion}
        </p>

        {/* Especificaciones destacadas */}
        {producto.especificaciones && (
          <div className="mb-4 space-y-1">
            {Object.entries(producto.especificaciones).slice(0, 2).map(([key, value]) => (
              <div key={key} className="flex items-center text-xs text-gray-500">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="capitalize">{key}:</span>
                <span className="ml-1 font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Precio */}
        <div className="flex items-end gap-2 mb-4">
          <div className="text-3xl font-bold text-gray-900">
            ${producto.precio.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          {producto.precioAnterior && (
            <div className="text-lg text-gray-400 line-through mb-1">
              ${producto.precioAnterior.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          )}
        </div>

        {/* Botón de WhatsApp */}
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg"
        >
          Consultar por WhatsApp
        </motion.a>
      </div>

      {/* Efecto de brillo al hacer hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine pointer-events-none"></div>
    </motion.div>
    </>
  );
}
