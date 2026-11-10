import React, { useState } from 'react';
import { 
  CalendarCheck, 
  MapPin, 
  Clock, 
  FileText, 
  QrCode, 
  XCircle, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  Filter,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { reservasService } from '../services/storageService';

export default function MisReservas({ 
  reservas, 
  usuarioActual, 
  onVerComprobante, 
  onActualizarLista,
  onIrExplorar 
}) {
  const [filtroEstado, setFiltroEstado] = useState('TODAS');
  const [idReservaParaCancelar, setIdReservaParaCancelar] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Filtrar reservas que pertenecen al usuario
  const misReservas = reservas.filter(r => r.idUsuario === usuarioActual?.idUsuario);

  const reservasFiltradas = misReservas.filter(r => {
    if (filtroEstado === 'TODAS') return true;
    return r.estado === filtroEstado;
  });

  const handleConfirmarCancelacion = (idReserva) => {
    try {
      reservasService.cancelarReserva(idReserva, usuarioActual.idUsuario);
      onActualizarLista();
      setIdReservaParaCancelar(null);
      setFeedback({ tipo: 'exito', mensaje: 'La reserva ha sido cancelada exitosamente y el espacio fue liberado.' });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err) {
      setFeedback({ tipo: 'error', mensaje: err.message || 'Error al cancelar la reserva.' });
    }
  };

  return (
    <div className="mis-reservas-section">
      <div className="reservas-header-box">
        <div>
          <span className="section-eyebrow">PORTAL DEL ESTUDIANTE</span>
          <h2 className="section-main-title">Mis Solicitudes y Reservas de Laboratorio</h2>
          <p className="section-lead-text">
            Gestiona tus turnos asignados, descarga tus pases con código QR y consulta el historial.
          </p>
        </div>

        <button className="btn-nueva-reserva" onClick={onIrExplorar}>
          <span>+ Nueva Reserva</span>
        </button>
      </div>

      {/* Alerta Feedback */}
      {feedback && (
        <div className={`feedback-alert ${feedback.tipo === 'exito' ? 'alert-success' : 'alert-error'}`}>
          {feedback.tipo === 'exito' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{feedback.mensaje}</span>
        </div>
      )}

      {/* Barra de Filtro de Estado */}
      <div className="reservas-filter-bar">
        <div className="filter-pill-group">
          {['TODAS', 'CONFIRMADA', 'PENDIENTE', 'CANCELADA'].map((estado) => {
            const count = estado === 'TODAS' 
              ? misReservas.length 
              : misReservas.filter(r => r.estado === estado).length;

            return (
              <button
                key={estado}
                className={`filter-pill-btn ${filtroEstado === estado ? 'active' : ''}`}
                onClick={() => setFiltroEstado(estado)}
              >
                <span>{estado === 'TODAS' ? 'Todas las Reservas' : estado}</span>
                <span className="pill-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de Reservas */}
      {reservasFiltradas.length === 0 ? (
        <div className="empty-reservas-state">
          <CalendarCheck size={56} className="empty-cal-icon" />
          <h3>No tienes reservas en este estado</h3>
          <p>
            {misReservas.length === 0 
              ? 'Aún no has realizado ninguna reserva de laboratorio. ¡Explora los espacios disponibles y agenda tu primer turno!'
              : 'No hay registros que coincidan con el filtro seleccionado.'}
          </p>
          <button className="btn-hero-primary" onClick={onIrExplorar}>
            Explorar Espacios Disponibles
          </button>
        </div>
      ) : (
        <div className="reservas-cards-stack">
          {reservasFiltradas.map((reserva) => {
            const esCancelable = reserva.estado === 'CONFIRMADA' || reserva.estado === 'PENDIENTE';

            return (
              <div key={reserva.idReserva} className={`reserva-card-item estado-${reserva.estado.toLowerCase()}`}>
                <div className="reserva-card-main">
                  {/* Status Badge & Code */}
                  <div className="reserva-top-row">
                    <span className={`status-pill pill-${reserva.estado.toLowerCase()}`}>
                      {reserva.estado === 'CONFIRMADA' && <CheckCircle2 size={12} />}
                      {reserva.estado === 'PENDIENTE' && <Clock size={12} />}
                      {reserva.estado === 'CANCELADA' && <XCircle size={12} />}
                      {reserva.estado}
                    </span>
                    <span className="reserva-code-badge">
                      Código: <strong>{reserva.codigoVerificacion}</strong>
                    </span>
                  </div>

                  <h3 className="reserva-espacio-title">{reserva.espacioNombre}</h3>

                  {/* Metadata Grid */}
                  <div className="reserva-meta-grid">
                    <div className="meta-item">
                      <MapPin size={14} className="meta-icon" />
                      <span>{reserva.sedeNombre}</span>
                    </div>

                    <div className="meta-item">
                      <CalendarCheck size={14} className="meta-icon" />
                      <span>Fecha: <strong>{reserva.fecha}</strong></span>
                    </div>

                    <div className="meta-item">
                      <Clock size={14} className="meta-icon" />
                      <span>Horario: <strong>{reserva.horarioEtiqueta}</strong></span>
                    </div>
                  </div>

                  {/* Motivo */}
                  <div className="reserva-motivo-box">
                    <FileText size={14} className="motivo-icon" />
                    <span><strong>Motivo:</strong> {reserva.motivo}</span>
                  </div>
                </div>

                {/* Acciones de la Tarjeta */}
                <div className="reserva-card-side-actions">
                  <button 
                    className="btn-ver-comprobante"
                    onClick={() => onVerComprobante(reserva)}
                  >
                    <QrCode size={16} />
                    <span>Ver Pase / QR</span>
                  </button>

                  {esCancelable && (
                    <button 
                      className="btn-cancelar-reserva"
                      onClick={() => setIdReservaParaCancelar(reserva.idReserva)}
                    >
                      <XCircle size={16} />
                      <span>Cancelar Turno</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Confirmación de Cancelación */}
      {idReservaParaCancelar && (
        <div className="modal-backdrop-blur" onClick={() => setIdReservaParaCancelar(null)}>
          <div className="modal-window-container modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header-banner banner-danger">
              <h3 className="modal-title">¿Deseas cancelar esta reserva?</h3>
            </div>
            <div className="modal-body-padded">
              <p>
                Al cancelar, el bloque de horario quedará disponible de inmediato para otros compañeros y estudiantes.
              </p>
              <div className="modal-actions-bar">
                <button 
                  className="btn-modal-cancel" 
                  onClick={() => setIdReservaParaCancelar(null)}
                >
                  Regresar
                </button>
                <button 
                  className="btn-modal-danger"
                  onClick={() => handleConfirmarCancelacion(idReservaParaCancelar)}
                >
                  Sí, Cancelar Reserva
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
