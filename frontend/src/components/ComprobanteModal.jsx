import React from 'react';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  FileText, 
  ShieldCheck, 
  Building2,
  Sparkles
} from 'lucide-react';

export default function ComprobanteModal({ reserva, isOpen, onClose }) {
  if (!isOpen || !reserva) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop-blur" onClick={onClose}>
      <div className="modal-window-container modal-ticket" onClick={e => e.stopPropagation()}>
        {/* Cabecera del Pase */}
        <div className="ticket-top-bar">
          <div className="ticket-header-brand">
            <Building2 size={20} className="brand-icon" />
            <div>
              <div className="ticket-brand-name">EduLab &bull; Sistema Académico</div>
              <div className="ticket-brand-sub">Comprobante Oficial de Reserva</div>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo del Ticket Imprimible */}
        <div className="ticket-printable-body">
          {/* Status Header */}
          <div className="ticket-status-row">
            <div className="ticket-badge-ok">
              <CheckCircle2 size={16} />
              <span>RESERVA CONFIRMADA</span>
            </div>
            <div className="ticket-code-label">
              Código de Verificación: <strong>{reserva.codigoVerificacion}</strong>
            </div>
          </div>

          <h3 className="ticket-lab-title">{reserva.espacioNombre}</h3>

          {/* Grid de Datos Clave */}
          <div className="ticket-info-grid">
            <div className="ticket-info-box">
              <span className="info-title"><MapPin size={13} /> Sede Universitaria</span>
              <span className="info-val">{reserva.sedeNombre}</span>
            </div>

            <div className="ticket-info-box">
              <span className="info-title"><Calendar size={13} /> Fecha Programada</span>
              <span className="info-val">{reserva.fecha}</span>
            </div>

            <div className="ticket-info-box">
              <span className="info-title"><Clock size={13} /> Bloque Horario</span>
              <span className="info-val">{reserva.horarioEtiqueta}</span>
            </div>

            <div className="ticket-info-box">
              <span className="info-title"><User size={13} /> Estudiante Solicitante</span>
              <span className="info-val">{reserva.usuarioNombre}</span>
            </div>
          </div>

          {/* Motivo */}
          <div className="ticket-motivo-box">
            <span className="info-title"><FileText size={13} /> Actividad Académica</span>
            <p className="motivo-text">{reserva.motivo}</p>
          </div>

          {/* QR Code Simulado en SVG */}
          <div className="ticket-qr-container">
            <div className="qr-box">
              <svg viewBox="0 0 100 100" width="100" height="100" className="qr-svg">
                {/* Patrón de QR estilizado */}
                <rect x="5" y="5" width="25" height="25" fill="#0F172A" />
                <rect x="10" y="10" width="15" height="15" fill="#FFFFFF" />
                <rect x="13" y="13" width="9" height="9" fill="#0F172A" />

                <rect x="70" y="5" width="25" height="25" fill="#0F172A" />
                <rect x="75" y="10" width="15" height="15" fill="#FFFFFF" />
                <rect x="78" y="13" width="9" height="9" fill="#0F172A" />

                <rect x="5" y="70" width="25" height="25" fill="#0F172A" />
                <rect x="10" y="75" width="15" height="15" fill="#FFFFFF" />
                <rect x="13" y="78" width="9" height="9" fill="#0F172A" />

                {/* Puntos y bits */}
                <rect x="40" y="10" width="8" height="8" fill="#0F172A" />
                <rect x="55" y="15" width="8" height="8" fill="#0F172A" />
                <rect x="40" y="30" width="8" height="8" fill="#0F172A" />
                <rect x="52" y="35" width="12" height="6" fill="#0F172A" />
                <rect x="20" y="45" width="10" height="10" fill="#0F172A" />
                <rect x="35" y="45" width="6" height="14" fill="#0F172A" />
                <rect x="50" y="50" width="10" height="10" fill="#0F172A" />
                <rect x="70" y="45" width="10" height="8" fill="#0F172A" />
                <rect x="85" y="50" width="8" height="8" fill="#0F172A" />
                <rect x="40" y="70" width="12" height="8" fill="#0F172A" />
                <rect x="60" y="75" width="8" height="15" fill="#0F172A" />
                <rect x="75" y="80" width="15" height="10" fill="#0F172A" />
              </svg>
            </div>
            <div className="qr-instructions">
              <span className="qr-title">Pase de Acceso Inmediato</span>
              <p className="qr-desc">
                Presenta este código al ingresar al laboratorio ante el docente o personal de vigilancia.
              </p>
            </div>
          </div>

          <div className="ticket-footer-note">
            <ShieldCheck size={14} />
            <span>Documento emitido electrónicamente por la Plataforma Universitaria EduLab.</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="ticket-actions-bar">
          <button className="btn-modal-cancel" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn-modal-print" onClick={handlePrint}>
            <Printer size={16} />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
