// =============================================================================
// storageService.js — SOLO VISUAL (sin lógica de backend)
// =============================================================================
// Este archivo exporta funciones placeholder sin lógica real.
// Toda la lógica de backend (autenticación, CRUD, localStorage) ha sido
// removida para que el compañero encargado del backend la implemente
// con sus propias rutas y servicios.
//
// Los componentes usan datos de demostración importados desde initialData.js
// directamente a través de App.jsx (via props).
// =============================================================================

// --- Stubs de Autenticación ---
// Tu compañero de backend debe reemplazar estas funciones con llamadas
// a la API real (fetch/axios hacia sus rutas).
export const authService = {
  /** Placeholder: retorna null (sin sesión activa) */
  obtenerSesionActiva() {
    return null;
  },

  /** Placeholder: simula login — no hace nada real */
  async iniciarSesion(correo, clave) {
    // TODO: Reemplazar con fetch POST a /api/auth/login
    console.warn('[storageService] iniciarSesion() es un placeholder. Implementar con backend.');
    throw new Error('Funcionalidad de login pendiente de implementación en el backend.');
  },

  /** Placeholder: simula registro — no hace nada real */
  async registrar(datosUsuario) {
    // TODO: Reemplazar con fetch POST a /api/auth/registro
    console.warn('[storageService] registrar() es un placeholder. Implementar con backend.');
    throw new Error('Funcionalidad de registro pendiente de implementación en el backend.');
  },

  /** Placeholder: simula cerrar sesión */
  cerrarSesion() {
    // TODO: Reemplazar con fetch POST a /api/auth/logout
    console.warn('[storageService] cerrarSesion() es un placeholder. Implementar con backend.');
  },

  /** Placeholder: cambio de rol rápido para demo visual */
  cambiarRolRapido(rol) {
    // TODO: Reemplazar con lógica real de backend
    console.warn('[storageService] cambiarRolRapido() es un placeholder. Implementar con backend.');
    return null;
  }
};

// --- Stubs de Espacios y Sedes ---
export const espaciosService = {
  /** Placeholder: retorna array vacío */
  obtenerSedes() {
    // TODO: Reemplazar con fetch GET a /api/sedes
    return [];
  },

  /** Placeholder: retorna array vacío */
  obtenerHorarios() {
    // TODO: Reemplazar con fetch GET a /api/horarios
    return [];
  },

  /** Placeholder: retorna array vacío */
  obtenerEspacios() {
    // TODO: Reemplazar con fetch GET a /api/espacios
    return [];
  },

  /** Placeholder: cambiar estado de espacio */
  async cambiarEstadoEspacio(idEspacio, nuevoEstado) {
    // TODO: Reemplazar con fetch PUT a /api/espacios/:id/estado
    console.warn('[storageService] cambiarEstadoEspacio() es un placeholder. Implementar con backend.');
  },

  /** Placeholder: crear espacio */
  async crearEspacio(nuevoEspacio) {
    // TODO: Reemplazar con fetch POST a /api/espacios
    console.warn('[storageService] crearEspacio() es un placeholder. Implementar con backend.');
  }
};

// --- Stubs de Reservas ---
export const reservasService = {
  /** Placeholder: retorna array vacío */
  obtenerTodas() {
    // TODO: Reemplazar con fetch GET a /api/reservas
    return [];
  },

  /** Placeholder: retorna array vacío */
  obtenerPorUsuario(idUsuario) {
    // TODO: Reemplazar con fetch GET a /api/reservas?usuario=:id
    return [];
  },

  /** Placeholder: siempre retorna disponible */
  verificarDisponibilidad(idEspacio, idHorario, fecha) {
    // TODO: Reemplazar con fetch GET a /api/reservas/disponibilidad
    return true;
  },

  /** Placeholder: simula creación de reserva */
  async crearReserva(datosReserva) {
    // TODO: Reemplazar con fetch POST a /api/reservas
    console.warn('[storageService] crearReserva() es un placeholder. Implementar con backend.');
    throw new Error('Funcionalidad de reserva pendiente de implementación en el backend.');
  },

  /** Placeholder: simula cancelación de reserva */
  async cancelarReserva(idReserva, idUsuario, esAdmin = false) {
    // TODO: Reemplazar con fetch PUT a /api/reservas/:id/cancelar
    console.warn('[storageService] cancelarReserva() es un placeholder. Implementar con backend.');
    throw new Error('Funcionalidad de cancelación pendiente de implementación en el backend.');
  },

  /** Placeholder: simula actualización de estado */
  async actualizarEstado(idReserva, nuevoEstado) {
    // TODO: Reemplazar con fetch PUT a /api/reservas/:id/estado
    console.warn('[storageService] actualizarEstado() es un placeholder. Implementar con backend.');
    throw new Error('Funcionalidad de actualización pendiente de implementación en el backend.');
  }
};

// --- Inicialización: ya no se necesita ---
export function inicializarStorage() {
  // No-op: el backend se encargará de la inicialización de datos.
  console.info('[storageService] inicializarStorage() deshabilitado. Los datos provienen del backend.');
}
