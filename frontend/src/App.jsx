import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroStats from './components/HeroStats';
import EspaciosList from './components/EspaciosList';
import ReservaModal from './components/ReservaModal';
import MisReservas from './components/MisReservas';
import AdminDashboard from './components/AdminDashboard';
import ComprobanteModal from './components/ComprobanteModal';
import AuthModal from './components/AuthModal';
import {
  SEDES_INICIALES,
  HORARIOS_INICIALES,
  ESPACIOS_INICIALES,
  USUARIOS_INICIALES,
  RESERVAS_INICIALES
} from './data/initialData';
import { CheckCircle2, AlertCircle, Building2, ShieldCheck } from 'lucide-react';

// =============================================================================
// App.jsx — SOLO VISUAL (sin lógica de backend)
// =============================================================================
// Toda la lógica de negocio (localStorage, validaciones, CRUD) fue removida.
// Los datos se cargan directamente de initialData.js como demo visual estática.
// El compañero de backend implementará las rutas y servicios reales.
// =============================================================================

export default function App() {
  // --- Estado visual de la aplicación (datos demo, sin persistencia) ---
  const [vistaActual, setVistaActual] = useState('espacios');
  const [usuarioActual, setUsuarioActual] = useState(USUARIOS_INICIALES[0]); // Demo: inicia con estudiante

  // Datos de demostración (estáticos, solo para visualización)
  const [espacios] = useState(ESPACIOS_INICIALES);
  const [sedes] = useState(SEDES_INICIALES);
  const [horarios] = useState(HORARIOS_INICIALES);
  const [reservas] = useState(RESERVAS_INICIALES);

  // Estados de modales
  const [espacioParaReservar, setEspacioParaReservar] = useState(null);
  const [reservaModalOpen, setReservaModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [comprobanteModalOpen, setComprobanteModalOpen] = useState(false);
  const [reservaParaComprobante, setReservaParaComprobante] = useState(null);

  // Notificación toast
  const [toast, setToast] = useState(null);

  const mostrarToast = (mensaje, tipo = 'exito') => {
    setToast({ mensaje, tipo });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // --- Handlers visuales (sin lógica de backend) ---

  const handleSeleccionarEspacio = (espacio) => {
    if (!usuarioActual) {
      setAuthModalOpen(true);
      mostrarToast('Por favor, inicia sesión para continuar con tu reserva.', 'info');
      return;
    }
    setEspacioParaReservar(espacio);
    setReservaModalOpen(true);
  };

  // Cambiar rol de usuario (solo visual para demo)
  const handleCambiarRol = (nuevoRol) => {
    const usuarioCambiado = USUARIOS_INICIALES.find(u => u.rol === nuevoRol);
    if (usuarioCambiado) {
      setUsuarioActual(usuarioCambiado);
      mostrarToast(`Vista cambiada a perfil: ${nuevoRol}`, 'exito');
      if (nuevoRol === 'ADMINISTRADOR') {
        setVistaActual('admin');
      } else if (vistaActual === 'admin') {
        setVistaActual('espacios');
      }
    }
  };

  // Cierre de sesión (solo visual)
  const handleCerrarSesion = () => {
    setUsuarioActual(null);
    if (vistaActual === 'admin' || vistaActual === 'mis-reservas') {
      setVistaActual('espacios');
    }
    mostrarToast('Has cerrado sesión (demo visual).', 'info');
  };

  // Ver comprobante digital
  const handleVerComprobante = (reserva) => {
    setReservaParaComprobante(reserva);
    setComprobanteModalOpen(true);
  };

  return (
    <div className="edulab-app-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`edulab-toast ${toast.tipo === 'exito' ? 'toast-success' : 'toast-info'}`}>
          {toast.tipo === 'exito' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{toast.mensaje}</span>
          <button className="btn-close-toast" onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* Navbar Superior */}
      <Navbar
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        usuarioActual={usuarioActual}
        onAbrirAuth={() => setAuthModalOpen(true)}
        onCerrarSesion={handleCerrarSesion}
        onCambiarRol={handleCambiarRol}
      />

      {/* Contenido Dinámico Principal */}
      <main className="edulab-main-content">
        {vistaActual === 'espacios' && (
          <>
            <HeroStats 
              espacios={espacios}
              reservas={reservas}
              sedes={sedes}
              onExplorarClick={() => {
                const el = document.getElementById('catalogo-espacios');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <EspaciosList
              espacios={espacios}
              sedes={sedes}
              onSeleccionarEspacio={handleSeleccionarEspacio}
            />
          </>
        )}

        {vistaActual === 'mis-reservas' && (
          <MisReservas
            reservas={reservas}
            usuarioActual={usuarioActual}
            onVerComprobante={handleVerComprobante}
            onActualizarLista={() => mostrarToast('Actualización pendiente de backend.', 'info')}
            onIrExplorar={() => setVistaActual('espacios')}
          />
        )}

        {vistaActual === 'admin' && (
          <AdminDashboard
            espacios={espacios}
            reservas={reservas}
            sedes={sedes}
            onActualizarDatos={() => mostrarToast('Actualización pendiente de backend.', 'info')}
          />
        )}
      </main>

      {/* Footer Institucional */}
      <footer className="edulab-footer">
        <div className="footer-container">
          <div className="footer-brand-section">
            <div className="footer-brand-title">
              <Building2 size={22} className="footer-brand-icon" />
              <span>EduLab &bull; Sistema de Reserva de Laboratorios</span>
            </div>
            <p className="footer-desc">
              Plataforma académica diseñada para optimizar el acceso equitativo y coordinado a los recursos tecnológicos y laboratorios especializados de la universidad.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Navegación</h4>
              <ul>
                <li><button onClick={() => setVistaActual('espacios')}>Catálogo de Espacios</button></li>
                {usuarioActual && (
                  <li><button onClick={() => setVistaActual('mis-reservas')}>Mis Reservas</button></li>
                )}
                {usuarioActual?.rol === 'ADMINISTRADOR' && (
                  <li><button onClick={() => setVistaActual('admin')}>Panel de Control</button></li>
                )}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Sedes Vinculadas</h4>
              <ul>
                {sedes.map(s => (
                  <li key={s.idSede}>{s.nombre} - {s.direccion}</li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Seguridad y Validación</h4>
              <ul>
                <li><ShieldCheck size={14} style={{ display: 'inline', marginRight: '6px' }} />Control de colisiones en tiempo real</li>
                <li>Pases digitales con validación QR</li>
                <li>Gestión de estados y mantenimiento</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-bottom-container">
            <span>&copy; {new Date().getFullYear()} Plataforma de Reserva de Laboratorio &middot; Todos los derechos reservados.</span>
            <span>Desarrollado con React 19 + Vite</span>
          </div>
        </div>
      </footer>

      {/* Modal de Reserva */}
      <ReservaModal
        espacio={espacioParaReservar}
        sedes={sedes}
        horarios={horarios}
        usuarioActual={usuarioActual}
        isOpen={reservaModalOpen}
        onClose={() => setReservaModalOpen(false)}
      />

      {/* Modal de Comprobante / Pase Digital */}
      <ComprobanteModal
        reserva={reservaParaComprobante}
        isOpen={comprobanteModalOpen}
        onClose={() => setComprobanteModalOpen(false)}
      />

      {/* Modal de Autenticación */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthExitosa={(usuario) => {
          setUsuarioActual(usuario);
          mostrarToast(`Bienvenido(a), ${usuario.nombres}!`, 'exito');
        }}
      />
    </div>
  );
}
