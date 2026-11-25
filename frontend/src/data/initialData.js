// Datos de ejemplo (solo demo visual, sin persistencia) para renderizar la interfaz

export const SEDES_INICIALES = [
  {
    idSede: 1,
    nombre: "Sede Principal - Campus Central",
    direccion: "Av. Universitaria 1801, San Miguel, Lima",
    telefono: "(01) 626-2000",
    estado: "ACTIVA"
  },
  {
    idSede: 2,
    nombre: "Sede Secundaria - Pabellón Tecnológico",
    direccion: "Av. Salaverry 2060, Jesús María, Lima",
    telefono: "(01) 480-1500",
    estado: "ACTIVA"
  }
];

export const HORARIOS_INICIALES = [
  { idHorario: 1, horaInicio: "08:00:00", horaFin: "10:00:00", etiqueta: "08:00 AM - 10:00 AM", turno: "Mañana", estado: "ACTIVO" },
  { idHorario: 2, horaInicio: "10:00:00", horaFin: "12:00:00", etiqueta: "10:00 AM - 12:00 PM", turno: "Mañana", estado: "ACTIVO" },
  { idHorario: 3, horaInicio: "12:00:00", horaFin: "14:00:00", etiqueta: "12:00 PM - 02:00 PM", turno: "Tarde", estado: "ACTIVO" },
  { idHorario: 4, horaInicio: "14:00:00", horaFin: "16:00:00", etiqueta: "02:00 PM - 04:00 PM", turno: "Tarde", estado: "ACTIVO" },
  { idHorario: 5, horaInicio: "16:00:00", horaFin: "18:00:00", etiqueta: "04:00 PM - 06:00 PM", turno: "Tarde", estado: "ACTIVO" },
  { idHorario: 6, horaInicio: "18:00:00", horaFin: "20:00:00", etiqueta: "06:00 PM - 08:00 PM", turno: "Noche", estado: "ACTIVO" }
];

export const ESPACIOS_INICIALES = [
  {
    idEspacio: 1,
    idSede: 1,
    nombre: "Laboratorio de Cómputo 101",
    tipo: "LABORATORIO",
    capacidad: 30,
    descripcion: "Equipado con 30 estaciones Core i7, 32GB RAM, GPU dedicada, proyector láser dual y software para desarrollo web e ingeniería.",
    equipamiento: ["30 PCs de alto rendimiento", "Proyector Láser 4K", "Pizarra interactiva", "Red Gigabit / Wi-Fi 6"],
    estado: "DISPONIBLE",
    imagen: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80"
  },
  {
    idEspacio: 2,
    idSede: 1,
    nombre: "Aula Multiusos 201",
    tipo: "AULA",
    capacidad: 40,
    descripcion: "Espacio moderno para clases magistrales, mesas modulares para trabajo en equipo, sistema de audio ambiental y climatización.",
    equipamiento: ["Mesas colaborativas", "Sistema de sonido integrado", "Climatización inteligente", "Pantalla táctil 75 pulgadas"],
    estado: "DISPONIBLE",
    imagen: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80"
  },
  {
    idEspacio: 3,
    idSede: 2,
    nombre: "Laboratorio de Redes y Telecom 202",
    tipo: "LABORATORIO",
    capacidad: 25,
    descripcion: "Equipamiento especializado con racks modulares Cisco, patch panels, analizadores de espectro y cableado estructurado.",
    equipamiento: ["Racks Cisco Catalyst", "Herramientas de crimpado", "Servidores Linux de prueba", "Analizadores de protocolo"],
    estado: "DISPONIBLE",
    imagen: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
  },
  {
    idEspacio: 4,
    idSede: 1,
    nombre: "Laboratorio de Robótica y Embebidos 105",
    tipo: "LABORATORIO",
    capacidad: 20,
    descripcion: "Mesas antiestáticas con estaciones de soldadura Weller, osciloscopios digitales Rigol, fuentes de poder regulables y kits IoT.",
    equipamiento: ["Estaciones de soldadura", "Osciloscopios Rigol", "Kits Arduino y ESP32", "Impresora 3D de resina"],
    estado: "DISPONIBLE",
    imagen: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
  },
  {
    idEspacio: 5,
    idSede: 2,
    nombre: "Laboratorio Multimedia y Diseño 303",
    tipo: "LABORATORIO",
    capacidad: 28,
    descripcion: "Estaciones Apple Mac Studio M2 Max con monitores calibrados para animación, renderizado 3D y edición de video 4K.",
    equipamiento: ["28 Mac Studio M2", "Tabletas gráficas Wacom", "Monitores BenQ Color-Accurate", "Suite Adobe Creative Cloud"],
    estado: "MANTENIMIENTO",
    imagen: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80"
  },
  {
    idEspacio: 6,
    idSede: 1,
    nombre: "Auditorio y Aula Magna 401",
    tipo: "AULA",
    capacidad: 85,
    descripcion: "Auditorio escalonado con micrófonos inalámbricos, cabina de control multimedia y streaming en directo para ponencias.",
    equipamiento: ["Micrófonos inalámbricos Shure", "Cabina de streaming", "Iluminación escénica LED", "Butacas ergonómicas con enchufe"],
    estado: "DISPONIBLE",
    imagen: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80"
  }
];

export const USUARIOS_INICIALES = [
  {
    idUsuario: 1,
    nombres: "Juan Carlos",
    apellidos: "Pérez Gómez",
    correo: "estudiante@universidad.edu.pe",
    clave: "estudiante123",
    rol: "ESTUDIANTE",
    codigoEstudiante: "2024-10582",
    carrera: "Ingeniería de Sistemas",
    estado: "ACTIVO"
  },
  {
    idUsuario: 2,
    nombres: "Dra. Elena",
    apellidos: "Ramos Salazar",
    correo: "admin@universidad.edu.pe",
    clave: "admin1234",
    rol: "ADMINISTRADOR",
    cargo: "Coordinadora de Laboratorios Académicos",
    estado: "ACTIVO"
  }
];

export const RESERVAS_INICIALES = [
  {
    idReserva: 101,
    idUsuario: 1,
    usuarioNombre: "Juan Carlos Pérez Gómez",
    idEspacio: 1,
    espacioNombre: "Laboratorio de Cómputo 101",
    idSede: 1,
    sedeNombre: "Sede Principal - Campus Central",
    idHorario: 2,
    horarioEtiqueta: "10:00 AM - 12:00 PM",
    fecha: "2026-11-12",
    motivo: "Desarrollo de proyecto final de Arquitectura de Software",
    estado: "CONFIRMADA",
    codigoVerificacion: "LAB-2026-8491",
    fechaRegistro: "2026-11-09T14:20:00"
  },
  {
    idReserva: 102,
    idUsuario: 1,
    usuarioNombre: "Juan Carlos Pérez Gómez",
    idEspacio: 3,
    espacioNombre: "Laboratorio de Redes y Telecom 202",
    idSede: 2,
    sedeNombre: "Sede Secundaria - Pabellón Tecnológico",
    idHorario: 4,
    horarioEtiqueta: "02:00 PM - 04:00 PM",
    fecha: "2026-11-15",
    motivo: "Práctica de configuración de VLANs y enrutamiento OSPF",
    estado: "PENDIENTE",
    codigoVerificacion: "LAB-2026-9134",
    fechaRegistro: "2026-11-09T16:45:00"
  }
];
