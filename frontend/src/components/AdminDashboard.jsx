import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  CalendarCheck, 
  Wrench, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Search, 
  Filter, 
  SlidersHorizontal,
  Laptop,
  Clock,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

// =============================================================================
// AdminDashboard.jsx — SOLO VISUAL (sin lógica de backend)
// =============================================================================
// El panel de administración se renderiza completo visualmente.
// Las acciones (cambiar estado, crear espacio, gestionar reservas) solo
// muestran mensajes indicando que el backend debe implementar la funcionalidad.
// =============================================================================

export default function AdminDashboard({ 
  espacios, 
  reservas, 
  sedes, 
  onActualizarDatos 
}) {
  const [tabAdmin, setTabAdmin] = useState('espacios');
  const [busquedaReserva, setBusquedaReserva] = useState('');
  const [filtroEstadoReserva, setFiltroEstadoReserva] = useState('TODAS');
  const [modalNuevoEspacio, setModalNuevoEspacio] = useState(false);
  
  // Form nuevo espacio (solo visual)
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoIdSede, setNuevoIdSede] = useState('1');
  const [nuevoTipo, setNuevoTipo] = useState('LABORATORIO');
  const [nuevaCapacidad, setNuevaCapacidad] = useState('30');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevoEquipamiento, setNuevoEquipamiento] = useState('PCs Core i7, Proyector Láser, Pizarra Smart, Conexión Wi-Fi');
  const [mensajeAdmin, setMensajeAdmin] = useState(null);

  // KPIs (calculados desde datos de demo)
  const totalEspacios = espacios.length;
  const espaciosDisponibles = espacios.filter(e => e.estado === 'DISPONIBLE').length;
  const espaciosMantenimiento = espacios.filter(e => e.estado === 'MANTENIMIENTO').length;
  const totalReservas = reservas.length;
  const reservasConfirmadas = reservas.filter(r => r.estado === 'CONFIRMADA').length;

  // Acciones visuales (sin lógica real)
  const handleToggleEstadoEspacio = (espacio) => {
    setMensajeAdmin(`Acción pendiente de backend: cambiar estado de "${espacio.nombre}".`);
    setTimeout(() => setMensajeAdmin(null), 3500);
  };

  const handleCrearEspacio = (e) => {
    e.preventDefault();
    setModalNuevoEspacio(false);
    setNuevoNombre('');
    setNuevaDescripcion('');
    setMensajeAdmin('Acción pendiente de backend: registrar nuevo espacio.');
    setTimeout(() => setMensajeAdmin(null), 3500);
  };

  const handleCambiarEstadoReserva = (idReserva, nuevoEstado) => {
    setMensajeAdmin(`Acción pendiente de backend: cambiar reserva a estado ${nuevoEstado}.`);
    setTimeout(() => setMensajeAdmin(null), 3500);
  };

  // Filtrado visual de reservas
  const reservasFiltradas = reservas.filter(r => {
    const matchBusqueda = 
      (r.usuarioNombre || '').toLowerCase().includes(busquedaReserva.toLowerCase()) ||
      (r.espacioNombre || '').toLowerCase().includes(busquedaReserva.toLowerCase()) ||
      (r.codigoVerificacion || '').toLowerCase().includes(busquedaReserva.toLowerCase());

    const matchEstado = filtroEstadoReserva === 'TODAS' || r.estado === filtroEstadoReserva;

    return matchBusqueda && matchEstado;
  });

  return (
    <div className="admin-dashboard-container">
      {/* Header Admin */}
      <div className="admin-header-row">
        <div>
          <span className="section-eyebrow">DIRECCIÓN DE LABORATORIOS</span>
          <h2 className="section-main-title">Panel de Control y Gestión Académica</h2>
          <p className="section-lead-text">
            Supervisa el estado de la infraestructura, activa mantenimientos y gestiona las solicitudes de reserva.
          </p>
        </div>

        <button 
          className="btn-nuevo-espacio"
          onClick={() => setModalNuevoEspacio(true)}
        >
          <Plus size={18} />
          <span>Registrar Nuevo Espacio</span>
        </button>
      </div>

      {/* Alerta de notificación */}
      {mensajeAdmin && (
        <div className="feedback-alert alert-success">
          <CheckCircle2 size={18} />
          <span>{mensajeAdmin}</span>
        </div>
      )}

      {/* Tarjetas KPI */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-icon icon-blue">
            <Building2 size={22} />
          </div>
          <div>
            <div className="admin-kpi-num">{totalEspacios}</div>
            <div className="admin-kpi-desc">Total de Espacios Registrados</div>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-icon icon-emerald">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div className="admin-kpi-num">{espaciosDisponibles}</div>
            <div className="admin-kpi-desc">Espacios Activos / Disponibles</div>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-icon icon-amber">
            <Wrench size={22} />
          </div>
          <div>
            <div className="admin-kpi-num">{espaciosMantenimiento}</div>
            <div className="admin-kpi-desc">En Mantenimiento Técnico</div>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-icon icon-purple">
            <CalendarCheck size={22} />
          </div>
          <div>
            <div className="admin-kpi-num">{reservasConfirmadas} / {totalReservas}</div>
            <div className="admin-kpi-desc">Reservas Confirmadas</div>
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="admin-tabs-bar">
        <button 
          className={`admin-tab-btn ${tabAdmin === 'espacios' ? 'active' : ''}`}
          onClick={() => setTabAdmin('espacios')}
        >
          <Building2 size={16} />
          <span>Gestión de Espacios y Laboratorios ({espacios.length})</span>
        </button>

        <button 
          className={`admin-tab-btn ${tabAdmin === 'reservas' ? 'active' : ''}`}
          onClick={() => setTabAdmin('reservas')}
        >
          <CalendarCheck size={16} />
          <span>Supervisión de Todas las Reservas ({reservas.length})</span>
        </button>
      </div>

      {/* TAB 1: GESTIÓN DE ESPACIOS */}
      {tabAdmin === 'espacios' && (
        <div className="admin-table-box">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Espacio / Laboratorio</th>
                <th>Sede</th>
                <th>Tipo</th>
                <th>Capacidad</th>
                <th>Estado Actual</th>
                <th>Acción de Mantenimiento</th>
              </tr>
            </thead>
            <tbody>
              {espacios.map((espacio) => {
                const sede = sedes.find(s => s.idSede === espacio.idSede);
                const disponible = espacio.estado === 'DISPONIBLE';

                return (
                  <tr key={espacio.idEspacio}>
                    <td>
                      <div className="table-space-cell">
                        <div className="table-space-name">{espacio.nombre}</div>
                        <div className="table-space-sub">{espacio.descripcion.slice(0, 75)}...</div>
                      </div>
                    </td>
                    <td>{sede?.nombre.split('-')[0] || 'Sede Principal'}</td>
                    <td>
                      <span className="table-tag-tipo">{espacio.tipo}</span>
                    </td>
                    <td>{espacio.capacidad} alumnos</td>
                    <td>
                      <span className={`table-status-badge ${disponible ? 'badge-ok' : 'badge-warn'}`}>
                        {espacio.estado}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={`btn-toggle-status ${disponible ? 'btn-warn' : 'btn-ok'}`}
                        onClick={() => handleToggleEstadoEspacio(espacio)}
                        title={disponible ? 'Poner en mantenimiento' : 'Habilitar para reservas'}
                      >
                        {disponible ? (
                          <>
                            <Wrench size={14} />
                            <span>Mantenimiento</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={14} />
                            <span>Habilitar</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: SUPERVISIÓN DE RESERVAS */}
      {tabAdmin === 'reservas' && (
        <div className="admin-reservas-panel">
          {/* Barra de Filtros */}
          <div className="admin-reservas-filter-row">
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input 
                type="text"
                placeholder="Buscar por estudiante, código o espacio..."
                value={busquedaReserva}
                onChange={(e) => setBusquedaReserva(e.target.value)}
                className="search-field"
              />
            </div>

            <div className="filter-select-group">
              <select 
                value={filtroEstadoReserva} 
                onChange={(e) => setFiltroEstadoReserva(e.target.value)}
                className="filter-select"
              >
                <option value="TODAS">Todos los Estados</option>
                <option value="CONFIRMADA">Confirmadas</option>
                <option value="PENDIENTE">Pendientes</option>
                <option value="CANCELADA">Canceladas</option>
              </select>
            </div>
          </div>

          <div className="admin-table-box">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Estudiante</th>
                  <th>Espacio Asignado</th>
                  <th>Fecha y Horario</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                  <th>Gestión</th>
                </tr>
              </thead>
              <tbody>
                {reservasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                      No se encontraron reservas con los criterios aplicados.
                    </td>
                  </tr>
                ) : (
                  reservasFiltradas.map((r) => (
                    <tr key={r.idReserva}>
                      <td><strong>{r.codigoVerificacion}</strong></td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{r.usuarioNombre}</div>
                      </td>
                      <td>{r.espacioNombre}</td>
                      <td>
                        <div>{r.fecha}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{r.horarioEtiqueta}</div>
                      </td>
                      <td style={{ maxWidth: '200px' }}>
                        <div style={{ fontSize: '12px' }}>{r.motivo}</div>
                      </td>
                      <td>
                        <span className={`table-status-badge badge-${r.estado.toLowerCase()}`}>
                          {r.estado}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions-cell">
                          {r.estado !== 'CONFIRMADA' && (
                            <button 
                              className="btn-action-small btn-confirm"
                              onClick={() => handleCambiarEstadoReserva(r.idReserva, 'CONFIRMADA')}
                              title="Aprobar y Confirmar"
                            >
                              Aprobar
                            </button>
                          )}
                          {r.estado !== 'CANCELADA' && (
                            <button 
                              className="btn-action-small btn-cancel"
                              onClick={() => handleCambiarEstadoReserva(r.idReserva, 'CANCELADA')}
                              title="Cancelar Reserva"
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Registrar Nuevo Espacio */}
      {modalNuevoEspacio && (
        <div className="modal-backdrop-blur" onClick={() => setModalNuevoEspacio(false)}>
          <div className="modal-window-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header-banner">
              <div>
                <div className="modal-eyebrow">ADMINISTRACIÓN DE INFRAESTRUCTURA</div>
                <h3 className="modal-title">Registrar Nuevo Laboratorio o Aula</h3>
              </div>
              <button className="btn-modal-close" onClick={() => setModalNuevoEspacio(false)}>✕</button>
            </div>

            <form onSubmit={handleCrearEspacio} className="modal-form-body">
              <div className="form-group-field">
                <label className="field-label">Nombre del Espacio:</label>
                <input 
                  type="text" 
                  placeholder="ej. Laboratorio de Inteligencia Artificial 304"
                  value={nuevoNombre}
                  onChange={e => setNuevoNombre(e.target.value)}
                  required
                  className="field-input"
                />
              </div>

              <div className="form-row-dual">
                <div className="form-group-field">
                  <label className="field-label">Sede Universitaria:</label>
                  <select 
                    value={nuevoIdSede}
                    onChange={e => setNuevoIdSede(e.target.value)}
                    className="filter-select"
                  >
                    {sedes.map(s => (
                      <option key={s.idSede} value={s.idSede}>{s.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group-field">
                  <label className="field-label">Tipo de Espacio:</label>
                  <select 
                    value={nuevoTipo}
                    onChange={e => setNuevoTipo(e.target.value)}
                    className="filter-select"
                  >
                    <option value="LABORATORIO">LABORATORIO</option>
                    <option value="AULA">AULA</option>
                  </select>
                </div>
              </div>

              <div className="form-group-field">
                <label className="field-label">Capacidad de Alumnos:</label>
                <input 
                  type="number" 
                  min="5"
                  max="120"
                  value={nuevaCapacidad}
                  onChange={e => setNuevaCapacidad(e.target.value)}
                  required
                  className="field-input"
                />
              </div>

              <div className="form-group-field">
                <label className="field-label">Descripción de Características:</label>
                <textarea 
                  rows={2}
                  placeholder="Descripción técnica y fines académicos del ambiente..."
                  value={nuevaDescripcion}
                  onChange={e => setNuevaDescripcion(e.target.value)}
                  required
                  className="field-textarea"
                />
              </div>

              <div className="form-group-field">
                <label className="field-label">Equipamiento Incluido (separado por comas):</label>
                <input 
                  type="text"
                  value={nuevoEquipamiento}
                  onChange={e => setNuevoEquipamiento(e.target.value)}
                  className="field-input"
                />
              </div>

              <div className="modal-actions-bar">
                <button type="button" className="btn-modal-cancel" onClick={() => setModalNuevoEspacio(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-confirm">
                  Guardar Espacio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
