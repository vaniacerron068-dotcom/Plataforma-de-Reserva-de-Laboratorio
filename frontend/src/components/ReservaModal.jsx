import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

// =============================================================================
// ReservaModal.jsx — SOLO VISUAL (sin lógica de backend)
// =============================================================================
// El formulario se renderiza completo visualmente con todos sus pasos.
// Al confirmar, genera una reserva de demo visual (sin persistencia).
// La lógica real de creación de reservas la implementará el backend.
// =============================================================================

export default function ReservaModal({ 
  espacio, 
  sedes, 
  horarios, 
  usuarioActual, 
  isOpen, 
  onClose, 
  onReservaExitosa 
}) {
  const [fecha, setFecha] = useState('');
  const [idHorario, setIdHorario] = useState('');
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializar fecha por defecto
  useEffect(() => {
    if (isOpen) {
      const hoy = new Date();
      const anio = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      const dia = String(hoy.getDate()).padStart(2, '0');
      setFecha(`${anio}-${mes}-${dia}`);
      setIdHorario('');
      setMotivo('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen || !espacio) return null;

  const sede = sedes.find(s => s.idSede === espacio.idSede);

  // Todos los horarios se muestran como disponibles (visual only)
  const disponibilidadHorarios = horarios.map((h) => ({
    ...h,
    disponible: true  // Sin verificación real — el backend lo implementará
  }));

  const sugerenciasMotivo = [
    "Práctica libre de desarrollo de software",
    "Taller de robótica y microcontroladores",
    "Sustentación de tesis y proyecto de grado",
    "Simulación y configuración de redes",
    "Estudio y trabajo colaborativo grupal"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones visuales básicas (solo UI, sin lógica de negocio)
    if (!fecha) {
      setError('Selecciona una fecha válida.');
      return;
    }
    if (!idHorario) {
      setError('Selecciona un bloque de horario disponible.');
      return;
    }
    if (!motivo.trim()) {
      setError('Debes ingresar el motivo académico de la reserva.');
      return;
    }

    // Generar reserva de demo visual (sin persistencia)
    setLoading(true);
    const horario = horarios.find(h => h.idHorario === Number(idHorario));
    const codigoVerificacion = `LAB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const reservaDemo = {
      idReserva: Date.now(),
      idUsuario: usuarioActual?.idUsuario,
      usuarioNombre: `${usuarioActual?.nombres} ${usuarioActual?.apellidos}`,
      idEspacio: espacio.idEspacio,
      espacioNombre: espacio.nombre,
      idSede: espacio.idSede,
      sedeNombre: sede ? sede.nombre : 'Sede Principal',
      idHorario: Number(idHorario),
      horarioEtiqueta: horario ? horario.etiqueta : 'Horario asignado',
      fecha,
      motivo: motivo.trim(),
      estado: 'CONFIRMADA',
      codigoVerificacion,
      fechaRegistro: new Date().toISOString()
    };

    // Simular un breve delay visual
    setTimeout(() => {
      setLoading(false);
      onReservaExitosa(reservaDemo);
    }, 400);
  };

  const fechaMinima = new Date().toISOString().split('T')[0];

  return (
    <div className="modal-backdrop-blur" onClick={onClose}>
      <div className="modal-window-container" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del Modal */}
        <div className="modal-header-banner">
          <div>
            <div className="modal-eyebrow">FORMULARIO OFICIAL DE RESERVA</div>
            <h3 className="modal-title">{espacio.nombre}</h3>
            <div className="modal-subtitle-details">
              <span><MapPin size={13} /> {sede?.nombre || 'Sede Principal'}</span>
              <span>&bull;</span>
              <span><Users size={13} /> Capacidad: {espacio.capacidad} estudiantes</span>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="modal-error-box">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="modal-form-body">
          {/* Paso 1: Selección de Fecha */}
          <div className="form-group-field">
            <label className="field-label">
              <Calendar size={16} />
              <span>1. Fecha de la Reserva Académica:</span>
            </label>
            <input 
              type="date" 
              min={fechaMinima}
              value={fecha} 
              onChange={(e) => {
                setFecha(e.target.value);
                setIdHorario('');
              }}
              required 
              className="field-input-date"
            />
          </div>

          {/* Paso 2: Bloque de Horarios */}
          <div className="form-group-field">
            <label className="field-label">
              <Clock size={16} />
              <span>2. Selecciona un Bloque Horario Disponible:</span>
            </label>
            
            <div className="time-slots-grid">
              {disponibilidadHorarios.map((h) => {
                const seleccionado = Number(idHorario) === h.idHorario;
                return (
                  <button
                    key={h.idHorario}
                    type="button"
                    disabled={!h.disponible}
                    onClick={() => setIdHorario(h.idHorario)}
                    className={`time-slot-btn ${seleccionado ? 'slot-selected' : ''} ${!h.disponible ? 'slot-occupied' : ''}`}
                  >
                    <div className="slot-label">{h.etiqueta}</div>
                    <div className="slot-badge">
                      {h.disponible ? (
                        <span className="badge-free">Disponible</span>
                      ) : (
                        <span className="badge-busy">Ocupado</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Paso 3: Motivo de la Reserva */}
          <div className="form-group-field">
            <label className="field-label">
              <FileText size={16} />
              <span>3. Motivo o Actividad Académica:</span>
            </label>
            <textarea 
              rows={3}
              placeholder="Indica el curso, proyecto o actividad que se desarrollará en el espacio..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
              className="field-textarea"
            />

            {/* Sugerencias Rápidas */}
            <div className="quick-suggestions-box">
              <span className="suggestions-title">Sugerencias frecuentes:</span>
              <div className="suggestions-tags">
                {sugerenciasMotivo.map((sug, i) => (
                  <button 
                    key={i} 
                    type="button" 
                    className="sug-pill"
                    onClick={() => setMotivo(sug)}
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resumen del Usuario */}
          <div className="user-confirmation-box">
            <div className="confirmation-avatar">
              <Users size={16} />
            </div>
            <div>
              <div className="conf-label">Reserva a nombre de:</div>
              <div className="conf-user">{usuarioActual?.nombres} {usuarioActual?.apellidos} ({usuarioActual?.correo})</div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="modal-actions-bar">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-modal-confirm"
              disabled={loading || !idHorario || !fecha || !motivo.trim()}
            >
              {loading ? 'Procesando...' : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Confirmar Reserva Inmediata</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
