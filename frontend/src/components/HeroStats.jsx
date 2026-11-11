import React from 'react';
import { 
  Building2, 
  Laptop, 
  CalendarCheck, 
  Users, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Search 
} from 'lucide-react';

export default function HeroStats({ espacios, reservas, sedes, onExplorarClick }) {
  const espaciosDisponibles = espacios.filter(e => e.estado === 'DISPONIBLE').length;
  const reservasConfirmadas = reservas.filter(r => r.estado === 'CONFIRMADA').length;
  const aforoTotal = espacios.reduce((acc, curr) => acc + (curr.capacidad || 0), 0);

  return (
    <div className="hero-stats-banner">
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Sistema Integrado de Sedes &middot; Periodo Académico 2026</span>
        </div>
        <h1 className="hero-title">
          Reserva de Laboratorios y Aulas Especializadas
        </h1>
        <p className="hero-description">
          Coordina tus prácticas, talleres de computación, desarrollo y sustentaciones en espacios equipados con hardware de última generación y conectividad de alta velocidad.
        </p>

        {/* Quick Search / Action */}
        <div className="hero-actions">
          <button className="btn-hero-primary" onClick={onExplorarClick}>
            <Search size={18} />
            <span>Consultar Disponibilidad de Espacios</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="stats-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-box bg-emerald">
            <CheckCircle2 size={24} />
          </div>
          <div className="kpi-data">
            <div className="kpi-value">{espaciosDisponibles} / {espacios.length}</div>
            <div className="kpi-label">Espacios Disponibles</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box bg-blue">
            <CalendarCheck size={24} />
          </div>
          <div className="kpi-data">
            <div className="kpi-value">{reservasConfirmadas}</div>
            <div className="kpi-label">Reservas Confirmadas</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box bg-purple">
            <Building2 size={24} />
          </div>
          <div className="kpi-data">
            <div className="kpi-value">{sedes.length} Sedes</div>
            <div className="kpi-label">Campus Operativos</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box bg-amber">
            <Users size={24} />
          </div>
          <div className="kpi-data">
            <div className="kpi-value">{aforoTotal} puestos</div>
            <div className="kpi-label">Capacidad Simultánea</div>
          </div>
        </div>
      </div>
    </div>
  );
}
