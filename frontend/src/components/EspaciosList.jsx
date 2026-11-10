import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Users, 
  Laptop, 
  BookOpen, 
  Search, 
  Filter, 
  MapPin, 
  CheckCircle, 
  Wrench, 
  ChevronRight, 
  Sparkles,
  CalendarPlus
} from 'lucide-react';

export default function EspaciosList({ 
  espacios, 
  sedes, 
  onSeleccionarEspacio 
}) {
  const [busqueda, setBusqueda] = useState('');
  const [sedeFiltro, setSedeFiltro] = useState('TODAS');
  const [tipoFiltro, setTipoFiltro] = useState('TODOS');
  const [estadoFiltro, setEstadoFiltro] = useState('TODOS');

  // Filtrado reactivo
  const espaciosFiltrados = useMemo(() => {
    return espacios.filter((e) => {
      const coincideBusqueda = 
        e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        (e.equipamiento || []).some(eq => eq.toLowerCase().includes(busqueda.toLowerCase()));

      const coincideSede = 
        sedeFiltro === 'TODAS' || String(e.idSede) === String(sedeFiltro);

      const coincideTipo = 
        tipoFiltro === 'TODOS' || e.tipo === tipoFiltro;

      const coincideEstado = 
        estadoFiltro === 'TODOS' || e.estado === estadoFiltro;

      return coincideBusqueda && coincideSede && coincideTipo && coincideEstado;
    });
  }, [espacios, busqueda, sedeFiltro, tipoFiltro, estadoFiltro]);

  const obtenerNombreSede = (idSede) => {
    const sede = sedes.find(s => s.idSede === idSede);
    return sede ? sede.nombre : 'Sede Principal';
  };

  return (
    <section className="espacios-section" id="catalogo-espacios">
      <div className="section-header-box">
        <div>
          <span className="section-eyebrow">CATÁLOGO DE INFRAESTRUCTURA</span>
          <h2 className="section-main-title">Laboratorios y Ambientes Académicos</h2>
          <p className="section-lead-text">
            Explora las características técnicas, capacidad y estado de disponibilidad en tiempo real.
          </p>
        </div>
      </div>

      {/* Controles de Filtros y Búsqueda */}
      <div className="filters-control-bar">
        {/* Input de Búsqueda */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por laboratorio, software, equipo o aula..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-field"
          />
          {busqueda && (
            <button className="btn-clear-search" onClick={() => setBusqueda('')}>✕</button>
          )}
        </div>

        {/* Select Sede */}
        <div className="filter-select-group">
          <MapPin size={16} className="select-icon" />
          <select 
            value={sedeFiltro} 
            onChange={(e) => setSedeFiltro(e.target.value)}
            className="filter-select"
          >
            <option value="TODAS">Todas las Sedes</option>
            {sedes.map(s => (
              <option key={s.idSede} value={s.idSede}>{s.nombre}</option>
            ))}
          </select>
        </div>

        {/* Select Tipo */}
        <div className="filter-select-group">
          <Filter size={16} className="select-icon" />
          <select 
            value={tipoFiltro} 
            onChange={(e) => setTipoFiltro(e.target.value)}
            className="filter-select"
          >
            <option value="TODOS">Todos los Tipos</option>
            <option value="LABORATORIO">Solo Laboratorios</option>
            <option value="AULA">Solo Aulas</option>
          </select>
        </div>

        {/* Select Estado */}
        <div className="filter-select-group">
          <select 
            value={estadoFiltro} 
            onChange={(e) => setEstadoFiltro(e.target.value)}
            className="filter-select"
          >
            <option value="TODOS">Cualquier Estado</option>
            <option value="DISPONIBLE">Disponibles</option>
            <option value="MANTENIMIENTO">En Mantenimiento</option>
          </select>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="results-counter">
        Mostrando <strong>{espaciosFiltrados.length}</strong> de {espacios.length} espacios registrados
      </div>

      {/* Grid de Tarjetas */}
      {espaciosFiltrados.length === 0 ? (
        <div className="empty-state-box">
          <Search size={48} className="empty-icon" />
          <h3>No se encontraron espacios con los filtros seleccionados</h3>
          <p>Prueba ajustando el término de búsqueda o cambiando los filtros de sede y tipo.</p>
          <button 
            className="btn-reset-filters" 
            onClick={() => {
              setBusqueda('');
              setSedeFiltro('TODAS');
              setTipoFiltro('TODOS');
              setEstadoFiltro('TODOS');
            }}
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="espacios-grid">
          {espaciosFiltrados.map((espacio) => {
            const estaDisponible = espacio.estado === 'DISPONIBLE';

            return (
              <article key={espacio.idEspacio} className={`espacio-card ${!estaDisponible ? 'card-disabled' : ''}`}>
                {/* Imagen del Espacio */}
                <div className="card-media-wrapper">
                  <img 
                    src={espacio.imagen || "https://images.unsplash.com/photo-1562774053-701939374585?w=800"} 
                    alt={espacio.nombre} 
                    className="card-media-img"
                    loading="lazy"
                  />
                  <div className="card-badges-overlay">
                    <span className="badge-tipo">
                      {espacio.tipo === 'LABORATORIO' ? <Laptop size={12} /> : <BookOpen size={12} />}
                      {espacio.tipo}
                    </span>
                    <span className={`badge-estado ${estaDisponible ? 'estado-disponible' : 'estado-mantenimiento'}`}>
                      {estaDisponible ? <CheckCircle size={12} /> : <Wrench size={12} />}
                      {espacio.estado}
                    </span>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="card-body">
                  <div className="card-header-info">
                    <div className="card-sede">
                      <MapPin size={13} />
                      <span>{obtenerNombreSede(espacio.idSede)}</span>
                    </div>
                    <div className="card-capacidad">
                      <Users size={14} />
                      <span>{espacio.capacidad} vacantes</span>
                    </div>
                  </div>

                  <h3 className="card-title">{espacio.nombre}</h3>
                  <p className="card-description">{espacio.descripcion}</p>

                  {/* Equipamiento / Tags */}
                  {espacio.equipamiento && espacio.equipamiento.length > 0 && (
                    <div className="card-tags-list">
                      {espacio.equipamiento.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="equip-tag">{tag}</span>
                      ))}
                      {espacio.equipamiento.length > 3 && (
                        <span className="equip-tag more-tag">+{espacio.equipamiento.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* Botón de Acción */}
                  <div className="card-footer-actions">
                    <button 
                      className={`btn-reserve-action ${estaDisponible ? 'btn-active' : 'btn-disabled'}`}
                      disabled={!estaDisponible}
                      onClick={() => onSeleccionarEspacio(espacio)}
                    >
                      <CalendarPlus size={16} />
                      <span>{estaDisponible ? 'Reservar Horario' : 'No Disponible'}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
