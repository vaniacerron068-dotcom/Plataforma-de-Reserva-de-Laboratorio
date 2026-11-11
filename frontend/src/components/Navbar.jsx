import React from 'react';
import { 
  Building2, 
  CalendarCheck, 
  LayoutDashboard, 
  User, 
  LogOut, 
  LogIn, 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function Navbar({ 
  vistaActual, 
  setVistaActual, 
  usuarioActual, 
  onAbrirAuth, 
  onCerrarSesion, 
  onCambiarRol 
}) {
  const esAdmin = usuarioActual?.rol === 'ADMINISTRADOR';

  return (
    <header className="edulab-header">
      <div className="edulab-header-container">
        {/* Brand / Logo */}
        <div className="edulab-brand" onClick={() => setVistaActual('espacios')}>
          <div className="brand-icon-box">
            <Building2 className="brand-icon" size={24} />
          </div>
          <div>
            <div className="brand-title">EduLab <span className="brand-badge">Reserva</span></div>
            <div className="brand-subtitle">Plataforma Académica de Laboratorios</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="edulab-nav">
          <button 
            className={`nav-btn ${vistaActual === 'espacios' ? 'active' : ''}`}
            onClick={() => setVistaActual('espacios')}
          >
            <Building2 size={18} />
            <span>Explorar Espacios</span>
          </button>

          {usuarioActual && (
            <button 
              className={`nav-btn ${vistaActual === 'mis-reservas' ? 'active' : ''}`}
              onClick={() => setVistaActual('mis-reservas')}
            >
              <CalendarCheck size={18} />
              <span>Mis Reservas</span>
            </button>
          )}

          {esAdmin && (
            <button 
              className={`nav-btn ${vistaActual === 'admin' ? 'active' : ''}`}
              onClick={() => setVistaActual('admin')}
            >
              <LayoutDashboard size={18} />
              <span>Panel de Administración</span>
            </button>
          )}
        </nav>

        {/* User Info / Quick Role Switcher */}
        <div className="edulab-user-actions">
          {usuarioActual ? (
            <div className="user-profile-badge">
              <div className="user-avatar">
                {esAdmin ? <ShieldCheck size={18} /> : <GraduationCap size={18} />}
              </div>
              <div className="user-info-text">
                <span className="user-name">{usuarioActual.nombres.split(' ')[0]} {usuarioActual.apellidos.split(' ')[0]}</span>
                <span className={`user-role-tag ${esAdmin ? 'role-admin' : 'role-student'}`}>
                  {esAdmin ? 'ADMIN' : 'ESTUDIANTE'}
                </span>
              </div>

              {/* Botón rápido para alternar roles en demo */}
              <button 
                className="btn-switch-role" 
                title={`Cambiar a ${esAdmin ? 'Estudiante' : 'Administrador'}`}
                onClick={() => onCambiarRol(esAdmin ? 'ESTUDIANTE' : 'ADMINISTRADOR')}
              >
                Cambiar a {esAdmin ? 'Estudiante' : 'Admin'}
              </button>

              <button 
                className="btn-icon-logout" 
                title="Cerrar sesión"
                onClick={onCerrarSesion}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="btn-login-header" onClick={onAbrirAuth}>
              <LogIn size={16} />
              <span>Iniciar Sesión</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
