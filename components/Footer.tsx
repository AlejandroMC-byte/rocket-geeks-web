'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import empresaData from '@/data/empresa.json';

export default function Footer() {
  // Using emoji icons for social media since branded icons were removed from lucide-react
  const socialIcons = {
    facebook: () => <span className="text-xl">📘</span>,
    instagram: () => <span className="text-xl">📷</span>,
    twitter: () => <span className="text-xl">🐦</span>,
    youtube: () => <span className="text-xl">▶️</span>,
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Columna 1: Sobre nosotros */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍎</span>
              <h3 className="text-xl font-bold text-white">{empresaData.nombre}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              {empresaData.slogan}
            </p>
            <div className="flex gap-4">
              {Object.entries(empresaData.redesSociales).map(([key, url]) => {
                const IconComponent = socialIcons[key as keyof typeof socialIcons];
                return (
                  <motion.a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <IconComponent />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-3">
              {['Inicio', 'Categorías', 'Productos', 'Nosotros', 'Contacto'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Categorías */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categorías</h4>
            <ul className="space-y-3">
              {['iPhone', 'Mac', 'iPad', 'Apple Watch'].map((categoria) => (
                <li key={categoria}>
                  <a
                    href="#productos"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {categoria}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <a
                    href={`tel:${empresaData.contacto.telefono}`}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {empresaData.contacto.telefono}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a
                    href={`mailto:${empresaData.contacto.email}`}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {empresaData.contacto.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Dirección</p>
                  <p className="text-white">{empresaData.contacto.direccion}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Horarios */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <p className="text-gray-400 mb-2">Horario de atención</p>
            <p className="text-white font-semibold">{empresaData.contacto.horario}</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {empresaData.nombre}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Diseñado con ❤️ para ofrecer la mejor experiencia Apple
          </p>
        </div>
      </div>
    </footer>
  );
}
