export interface Empresa {
  nombre: string;
  slogan: string;
  descripcion: string;
  logo: string;
  colores: {
    primario: string;
    secundario: string;
    acento: string;
    fondo: string;
    texto: string;
    textoClaro: string;
  };
  contacto: {
    telefono: string;
    whatsapp: string;
    mensajeWhatsapp?: string;
    email: string;
    direccion: string;
    horario: string;
  };
  redesSociales: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  sobreNosotros: {
    titulo: string;
    descripcion: string;
    mision: string;
    valores: string[];
  };
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  imagen: string;
  destacado: boolean;
}

export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  precioAnterior?: number;
  descripcion: string;
  imagen: string;
  imagenes?: string[];
  especificaciones?: Record<string, string>;
  mensajeWhatsapp?: string;
  destacado: boolean;
  nuevo: boolean;
  disponible: boolean;
}
