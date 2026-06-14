'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';

// Importar datos
import empresaData from '@/data/empresa.json';
import categoriasData from '@/data/categorias.json';
import productosData from '@/data/productos.json';

export default function Home() {
  const productosDestacados = productosData.filter((p) => p.destacado);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section id="inicio">
        <HeroSection />
      </section>

      {/* Categorías Section */}
      <section id="categorias" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Explora nuestras categorías
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre la mejor selección de productos Apple para cada necesidad
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-stretch">
            {categoriasData.map((categoria, index) => (
              <div key={categoria.id} className="w-full max-w-sm sm:max-w-none">
                <CategoryCard categoria={categoria} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados Section */}
      <section id="productos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Productos destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los mejores dispositivos Apple con los precios más competitivos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosDestacados.map((producto, index) => (
              <ProductCard key={producto.id} producto={producto} index={index} />
            ))}
          </div>

          {/* Ver todos los productos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href={`https://wa.me/${empresaData.contacto.whatsapp}?text=Hola, quiero ver todos los productos disponibles`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold text-lg transition-colors shadow-lg"
            >
              Ver todos los productos
              <span className="text-xl">→</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Sobre Nosotros Section */}
      <section id="nosotros" className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6">
                {empresaData.sobreNosotros.titulo}
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {empresaData.sobreNosotros.descripcion}
              </p>
              <p className="text-lg text-blue-400 mb-8 italic">
                "{empresaData.sobreNosotros.mision}"
              </p>

              {/* Valores */}
              <div className="grid grid-cols-2 gap-4">
                {empresaData.sobreNosotros.valores.map((valor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{valor}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Imagen/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-1">
                <div className="w-full h-full bg-gray-900 rounded-3xl flex items-center justify-center">
                  <span className="text-9xl">🍎</span>
                </div>
              </div>
              {/* Decoración */}
              <motion.div
                className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              ¡Estamos para ayudarte!
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Contáctanos y resolveremos todas tus dudas sobre nuestros productos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Tarjeta WhatsApp */}
            <motion.a
              href={`https://wa.me/${empresaData.contacto.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-green-500 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <MessageCircle className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-green-100 mb-2">Chatea con nosotros</p>
              <p className="font-semibold">{empresaData.contacto.whatsapp}</p>
            </motion.a>

            {/* Tarjeta Teléfono */}
            <motion.a
              href={`tel:${empresaData.contacto.telefono}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-blue-500 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <Phone className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Teléfono</h3>
              <p className="text-blue-100 mb-2">Llámanos ahora</p>
              <p className="font-semibold">{empresaData.contacto.telefono}</p>
            </motion.a>

            {/* Tarjeta Email */}
            <motion.a
              href={`mailto:${empresaData.contacto.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-purple-500 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <Mail className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-purple-100 mb-2">Escríbenos</p>
              <p className="font-semibold text-sm">{empresaData.contacto.email}</p>
            </motion.a>

            {/* Tarjeta Ubicación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <MapPin className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Visítanos</h3>
              <p className="text-gray-300 mb-2 text-sm">{empresaData.contacto.direccion}</p>
            </motion.div>
          </div>

          {/* Horarios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
          >
            <Clock className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Horario de Atención</h3>
            <p className="text-xl text-gray-600">{empresaData.contacto.horario}</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
