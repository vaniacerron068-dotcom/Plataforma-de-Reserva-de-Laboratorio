# EduLab — Frontend (solo visual)

Interfaz de la plataforma de reserva de laboratorios y aulas universitarias. **Es una maqueta de diseño: no contiene lógica de backend.**

## Tecnologías

- React 19
- Vite
- Lucide React (iconografía)
- CSS con variables y glassmorphism

## Características visuales

1. **Catálogo de espacios**: búsqueda y filtros por sede, tipo y estado; fichas con capacidad y equipamiento.
2. **Formulario de reserva**: fecha, bloque horario y motivo. **No crea reservas**: al enviar muestra el aviso de que la creación está pendiente en el backend.
3. **Portal del estudiante**: listado de reservas de ejemplo, filtros por estado y comprobante con QR decorativo (marcado como demostración).
4. **Panel administrativo**: KPIs y tablas de espacios y reservas. Las acciones (crear espacio, cambiar estado, aprobar/cancelar) solo muestran avisos.
5. **Autenticación**: formularios de login y registro visuales. Los botones de rol y el selector del navbar son **vista previa**, sin autenticación real.

## Datos

Los datos de ejemplo viven en `src/data/initialData.js` y **no se persisten** (sin `localStorage` ni API). Los stubs de `src/services/storageService.js` indican qué debe implementar el backend.

## Ejecución

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint     # oxlint
npm run build    # dist/
```

## Estructura

```
src/
├── App.jsx                 # Vistas y modales (estado solo en memoria)
├── components/             # Navbar, catálogo, modales, dashboard, etc.
├── data/initialData.js     # Datos de ejemplo
└── services/storageService.js  # Stubs con TODOs para el backend
```
