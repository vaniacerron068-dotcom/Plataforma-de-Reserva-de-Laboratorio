import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { authService } from '../services/storageService';

export default function AuthModal({ isOpen, onClose, onAuthExitosa }) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [carrera, setCarrera] = useState('Ingeniería de Sistemas');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      if (esRegistro) {
        const usuario = authService.registrar({
          nombres,
          apellidos,
          correo,
          clave,
          carrera
        });
        onAuthExitosa(usuario);
        onClose();
      } else {
        const usuario = authService.iniciarSesion(correo, clave);
        onAuthExitosa(usuario);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Error en la autenticación.');
    }
  };

  const handleDemoLogin = (rol) => {
    setError('');
    const u = authService.cambiarRolRapido(rol);
    if (u) {
      onAuthExitosa(u);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop-blur" onClick={onClose}>
      <div className="modal-window-container modal-auth" onClick={e => e.stopPropagation()}>
        <div className="auth-header-banner">
          <div className="auth-brand-badge">
            <Building2 size={24} />
          </div>
          <h3 className="auth-title">
            {esRegistro ? 'Registro de Estudiante' : 'Acceso a la Plataforma'}
          </h3>
          <p className="auth-subtitle">
            {esRegistro 
              ? 'Crea tu cuenta institucional para reservar laboratorios y aulas.' 
              : 'Ingresa con tu correo institucional y contraseña.'}
          </p>
          <button className="btn-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="modal-error-box">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Acceso Rápido Demo */}
        <div className="demo-shortcuts-box">
          <span className="demo-label">Accesos rápidos de demostración:</span>
          <div className="demo-buttons-row">
            <button 
              type="button" 
              className="btn-demo-role"
              onClick={() => handleDemoLogin('ESTUDIANTE')}
            >
              <GraduationCap size={15} />
              <span>Entrar como Estudiante</span>
            </button>
            <button 
              type="button" 
              className="btn-demo-role btn-demo-admin"
              onClick={() => handleDemoLogin('ADMINISTRADOR')}
            >
              <ShieldCheck size={15} />
              <span>Entrar como Administrador</span>
            </button>
          </div>
        </div>

        <div className="auth-divider">
          <span>o ingresa tus credenciales</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-body">
          {esRegistro && (
            <>
              <div className="form-row-dual">
                <div className="form-group-field">
                  <label className="field-label">Nombres:</label>
                  <input 
                    type="text" 
                    placeholder="ej. María"
                    value={nombres}
                    onChange={e => setNombres(e.target.value)}
                    required
                    className="field-input"
                  />
                </div>
                <div className="form-group-field">
                  <label className="field-label">Apellidos:</label>
                  <input 
                    type="text" 
                    placeholder="ej. Fernández"
                    value={apellidos}
                    onChange={e => setApellidos(e.target.value)}
                    required
                    className="field-input"
                  />
                </div>
              </div>

              <div className="form-group-field">
                <label className="field-label">Carrera / Especialidad:</label>
                <select 
                  value={carrera} 
                  onChange={e => setCarrera(e.target.value)}
                  className="filter-select"
                >
                  <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                  <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
                  <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                  <option value="Diseño Digital y Animación">Diseño Digital y Animación</option>
                  <option value="Ciencias de la Computación">Ciencias de la Computación</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group-field">
            <label className="field-label">Correo Institucional:</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input 
                type="email" 
                placeholder="usuario@universidad.edu.pe"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                required
                className="field-input input-padded"
              />
            </div>
          </div>

          <div className="form-group-field">
            <label className="field-label">Contraseña (mínimo 8 caracteres):</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={clave}
                onChange={e => setClave(e.target.value)}
                required
                minLength={8}
                className="field-input input-padded"
              />
            </div>
          </div>

          <button type="submit" className="btn-auth-submit">
            {esRegistro ? 'Completar Registro' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="auth-footer-toggle">
          {esRegistro ? (
            <span>
              ¿Ya tienes una cuenta?{' '}
              <button 
                type="button" 
                className="link-toggle"
                onClick={() => { setEsRegistro(false); setError(''); }}
              >
                Inicia sesión aquí
              </button>
            </span>
          ) : (
            <span>
              ¿Eres nuevo estudiante?{' '}
              <button 
                type="button" 
                className="link-toggle"
                onClick={() => { setEsRegistro(true); setError(''); }}
              >
                Regístrate gratis
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
