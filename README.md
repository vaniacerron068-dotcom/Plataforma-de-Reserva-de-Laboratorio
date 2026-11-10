# Plataforma de Reserva de Laboratorio

Sistema integral para la gestión y reserva de laboratorios de cómputo y aulas universitarias.

## 📁 Estructura del Proyecto

- **`frontend/`**: Aplicación web desarrollada en React 19 + Vite con interfaz responsiva, catálogo interactivo de espacios, panel de estudiante (comprobantes QR) y dashboard administrativo.
- **`PlataformaReservas/`**: Módulo backend en Java 17 con Maven y conexión JDBC a base de datos relacional.
- **`reservas_academicas.sql`**: Script de base de datos MySQL con las tablas de usuarios, sedes, espacios, horarios y reservas.

---

## 🚀 Inicio Rápido con el Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.
