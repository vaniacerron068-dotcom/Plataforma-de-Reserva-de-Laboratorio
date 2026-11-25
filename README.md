# Plataforma de Reserva de Laboratorio

Maqueta visual de la plataforma de reserva de laboratorios y aulas universitarias.

## 📁 Estructura del Proyecto

- **`frontend/`**: Aplicación web en React 19 + Vite (catálogo de espacios, portal del estudiante y panel administrativo).
- **`.github/workflows/`**: CI (lint + build del frontend) y CD (publicación del frontend en GitHub Pages).

> **Este repositorio no incluye backend.** El módulo Java, la base de datos y la API los desarrolla el equipo encargado del backend en su propio repositorio. Aquí solo vive la interfaz.

---

## 🚀 Inicio Rápido

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

---

## 🎨 Estado actual: solo visual

El proyecto es una **demostración de diseño sin lógica de negocio**:

- Los datos son estáticos y de ejemplo (`frontend/src/data/initialData.js`). **No hay persistencia ni `localStorage`.**
- **No hay llamadas a ninguna API**: ni `fetch`, ni `axios`, ni URL base configurada.
- `frontend/src/services/storageService.js` contiene únicamente **stubs** con `TODO` que documentan qué debe conectar el backend (login, espacios, reservas, etc.).
- Las acciones que dependen del backend **no se ejecutan**: crear una reserva, iniciar sesión, cancelar una reserva o registrar un espacio solo muestran el aviso de que están pendientes.
- El selector de rol del navbar y los botones de "Ver como Estudiante/Administrador" son **vista previa de la interfaz**, no autenticación real.
- El comprobante con QR es **decorativo** y está marcado como documento de demostración sin validez.

En **[`API_CONTRACT.md`](./API_CONTRACT.md)** hay una **propuesta** de contrato de API (rutas, payloads y respuestas) como referencia para el equipo de backend. Es solo una sugerencia: puede ajustarse o reemplazarse según lo que ellos definan.

---

## 🔄 Integración continua y despliegue

- **CI**: instala dependencias, ejecuta `oxlint` y construye el frontend.
- **CD**: en cada push a `main`, publica `frontend/dist` en GitHub Pages.
