import {
  SEDES_INICIALES,
  HORARIOS_INICIALES,
  ESPACIOS_INICIALES,
  USUARIOS_INICIALES,
  RESERVAS_INICIALES
} from '../data/initialData';

const KEYS = {
  SEDES: 'edulab_sedes',
  HORARIOS: 'edulab_horarios',
  ESPACIOS: 'edulab_espacios',
  USUARIOS: 'edulab_usuarios',
  RESERVAS: 'edulab_reservas',
  SESION_ACTIVA: 'edulab_sesion_activa'
};

function getItem(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Error al leer de localStorage:', e);
    return defaultValue;
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error al guardar en localStorage:', e);
  }
}

// Inicializar almacenamiento si está vacío
export function inicializarStorage() {
  if (!localStorage.getItem(KEYS.SEDES)) setItem(KEYS.SEDES, SEDES_INICIALES);
  if (!localStorage.getItem(KEYS.HORARIOS)) setItem(KEYS.HORARIOS, HORARIOS_INICIALES);
  if (!localStorage.getItem(KEYS.ESPACIOS)) setItem(KEYS.ESPACIOS, ESPACIOS_INICIALES);
  if (!localStorage.getItem(KEYS.USUARIOS)) setItem(KEYS.USUARIOS, USUARIOS_INICIALES);
  if (!localStorage.getItem(KEYS.RESERVAS)) setItem(KEYS.RESERVAS, RESERVAS_INICIALES);
  
  // Si no hay sesión, iniciar por defecto como el estudiante de prueba
  if (!localStorage.getItem(KEYS.SESION_ACTIVA)) {
    setItem(KEYS.SESION_ACTIVA, USUARIOS_INICIALES[0]);
  }
}

// --- Métodos de Autenticación (Espejo de AutenticacionServicio.java) ---
export const authService = {
  obtenerSesionActiva() {
    return getItem(KEYS.SESION_ACTIVA, USUARIOS_INICIALES[0]);
  },

  iniciarSesion(correo, clave) {
    const usuarios = getItem(KEYS.USUARIOS, USUARIOS_INICIALES);
    const correoLimpio = (correo || '').trim().toLowerCase();
    
    if (!correoLimpio || !clave) {
      throw new Error('Ingresa tu correo y contraseña.');
    }

    const usuario = usuarios.find(
      u => u.correo.toLowerCase() === correoLimpio && u.clave === clave && u.estado === 'ACTIVO'
    );

    if (!usuario) {
      throw new Error('Correo o contraseña incorrectos, o cuenta inactiva.');
    }

    setItem(KEYS.SESION_ACTIVA, usuario);
    return usuario;
  },

  registrar({ nombres, apellidos, correo, clave, carrera, codigoEstudiante }) {
    const usuarios = getItem(KEYS.USUARIOS, USUARIOS_INICIALES);
    const correoLimpio = (correo || '').trim().toLowerCase();

    if (!nombres?.trim() || !apellidos?.trim() || !correoLimpio || !clave?.trim()) {
      throw new Error('Completa todos los campos obligatorios.');
    }

    if (!/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(correoLimpio)) {
      throw new Error('Ingresa un correo electrónico válido.');
    }

    if (clave.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }

    if (usuarios.some(u => u.correo.toLowerCase() === correoLimpio)) {
      throw new Error('Este correo ya se encuentra registrado.');
    }

    const nuevoUsuario = {
      idUsuario: Date.now(),
      nombres: nombres.trim(),
      apellidos: apellidos.trim(),
      correo: correoLimpio,
      clave: clave,
      rol: 'ESTUDIANTE',
      carrera: carrera || 'Ingeniería',
      codigoEstudiante: codigoEstudiante || `2026-${Math.floor(10000 + Math.random() * 90000)}`,
      estado: 'ACTIVO'
    };

    usuarios.push(nuevoUsuario);
    setItem(KEYS.USUARIOS, usuarios);
    setItem(KEYS.SESION_ACTIVA, nuevoUsuario);
    return nuevoUsuario;
  },

  cerrarSesion() {
    localStorage.removeItem(KEYS.SESION_ACTIVA);
  },

  cambiarRolRapido(rol) {
    const usuarios = getItem(KEYS.USUARIOS, USUARIOS_INICIALES);
    const target = usuarios.find(u => u.rol === rol);
    if (target) {
      setItem(KEYS.SESION_ACTIVA, target);
      return target;
    }
    return null;
  }
};

// --- Métodos de Espacios y Sedes ---
export const espaciosService = {
  obtenerSedes() {
    return getItem(KEYS.SEDES, SEDES_INICIALES);
  },

  obtenerHorarios() {
    return getItem(KEYS.HORARIOS, HORARIOS_INICIALES);
  },

  obtenerEspacios() {
    return getItem(KEYS.ESPACIOS, ESPACIOS_INICIALES);
  },

  cambiarEstadoEspacio(idEspacio, nuevoEstado) {
    const espacios = getItem(KEYS.ESPACIOS, ESPACIOS_INICIALES);
    const actualizados = espacios.map(e => e.idEspacio === idEspacio ? { ...e, estado: nuevoEstado } : e);
    setItem(KEYS.ESPACIOS, actualizados);
    return actualizados;
  },

  crearEspacio(nuevoEspacio) {
    const espacios = getItem(KEYS.ESPACIOS, ESPACIOS_INICIALES);
    const espacioGuardado = {
      ...nuevoEspacio,
      idEspacio: Date.now(),
      capacidad: Number(nuevoEspacio.capacidad) || 20,
      estado: 'DISPONIBLE',
      equipamiento: nuevoEspacio.equipamiento || ['Proyector', 'Red Wi-Fi']
    };
    espacios.unshift(espacioGuardado);
    setItem(KEYS.ESPACIOS, espacios);
    return espacios;
  }
};

// --- Métodos de Reservas (Espejo de ReservaServicio.java y ReservaDAO.java) ---
export const reservasService = {
  obtenerTodas() {
    return getItem(KEYS.RESERVAS, RESERVAS_INICIALES);
  },

  obtenerPorUsuario(idUsuario) {
    const reservas = getItem(KEYS.RESERVAS, RESERVAS_INICIALES);
    return reservas.filter(r => r.idUsuario === idUsuario);
  },

  // Valida conflicto de horario en el mismo espacio y fecha (como sqlConflicto en ReservaDAO)
  verificarDisponibilidad(idEspacio, idHorario, fecha) {
    const reservas = getItem(KEYS.RESERVAS, RESERVAS_INICIALES);
    const conflicto = reservas.some(r => 
      r.idEspacio === idEspacio &&
      r.idHorario === idHorario &&
      r.fecha === fecha &&
      r.estado !== 'CANCELADA'
    );
    return !conflicto;
  },

  crearReserva({ idUsuario, usuarioNombre, idEspacio, idHorario, fecha, motivo }) {
    if (!idUsuario || !idEspacio || !idHorario) {
      throw new Error('Selecciona un usuario, espacio y horario válidos.');
    }

    if (!fecha) {
      throw new Error('Debes seleccionar una fecha.');
    }

    const fechaSeleccionada = new Date(fecha + 'T00:00:00');
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      throw new Error('No puedes reservar en una fecha pasada.');
    }

    if (!motivo || !motivo.trim()) {
      throw new Error('Debes indicar el motivo de la reserva académica.');
    }

    // Verificar estado del espacio
    const espacios = getItem(KEYS.ESPACIOS, ESPACIOS_INICIALES);
    const espacio = espacios.find(e => e.idEspacio === idEspacio);
    if (!espacio || espacio.estado !== 'DISPONIBLE') {
      throw new Error('El espacio no se encuentra disponible para reservas.');
    }

    // Verificar conflicto de horario
    if (!this.verificarDisponibilidad(idEspacio, idHorario, fecha)) {
      throw new Error('No se pudo realizar la reserva. El espacio y horario ya se encuentran ocupados para esta fecha.');
    }

    const horarios = getItem(KEYS.HORARIOS, HORARIOS_INICIALES);
    const horario = horarios.find(h => h.idHorario === idHorario);

    const sedes = getItem(KEYS.SEDES, SEDES_INICIALES);
    const sede = sedes.find(s => s.idSede === espacio.idSede);

    const codigoVerificacion = `LAB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const nuevaReserva = {
      idReserva: Date.now(),
      idUsuario,
      usuarioNombre,
      idEspacio,
      espacioNombre: espacio.nombre,
      idSede: espacio.idSede,
      sedeNombre: sede ? sede.nombre : 'Sede Principal',
      idHorario,
      horarioEtiqueta: horario ? horario.etiqueta : 'Horario asignado',
      fecha,
      motivo: motivo.trim(),
      estado: 'CONFIRMADA',
      codigoVerificacion,
      fechaRegistro: new Date().toISOString()
    };

    const reservas = getItem(KEYS.RESERVAS, RESERVAS_INICIALES);
    reservas.unshift(nuevaReserva);
    setItem(KEYS.RESERVAS, reservas);

    return nuevaReserva;
  },

  cancelarReserva(idReserva, idUsuario, esAdmin = false) {
    const reservas = getItem(KEYS.RESERVAS, RESERVAS_INICIALES);
    const reserva = reservas.find(r => r.idReserva === idReserva);

    if (!reserva) {
      throw new Error('Reserva no encontrada.');
    }

    if (!esAdmin && reserva.idUsuario !== idUsuario) {
      throw new Error('No tienes permisos para cancelar esta reserva.');
    }

    const actualizadas = reservas.map(r => 
      r.idReserva === idReserva ? { ...r, estado: 'CANCELADA' } : r
    );
    setItem(KEYS.RESERVAS, actualizadas);
    return actualizadas;
  },

  actualizarEstado(idReserva, nuevoEstado) {
    const reservas = getItem(KEYS.RESERVAS, RESERVAS_INICIALES);
    const actualizadas = reservas.map(r => 
      r.idReserva === idReserva ? { ...r, estado: nuevoEstado } : r
    );
    setItem(KEYS.RESERVAS, actualizadas);
    return actualizadas;
  }
};
