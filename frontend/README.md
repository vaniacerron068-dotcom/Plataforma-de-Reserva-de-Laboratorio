# EduLab - Sistema de Reserva de Laboratorios y Aulas

Plataforma frontend moderna, interactiva y responsiva para la gestión académica y reserva de laboratorios de cómputo, aulas especializadas y talleres universitarios.

---

## 🚀 Tecnologías Utilizadas

- **React 19**
- **Vite**
- **Lucide React** (Iconografía moderna)
- **CSS Modular con Variables & Glassmorphism**
- **LocalStorage Storage Engine** (Simulación fiel del modelo de datos `reservas_academicas.sql` y reglas de negocio de `ReservaServicio.java` y `AutenticacionServicio.java`).

---

## ✨ Características Principales

1. **Catálogo Interactivo de Espacios**:
   - Búsqueda en tiempo real por texto (nombre, equipamiento, descripción).
   - Filtros reactivos por Sede (Campus Central, San Isidro, etc.), Tipo (Laboratorio, Aula) y Estado (Disponible, En Mantenimiento).
   - Fichas informativas con capacidad de aforo, equipamiento tecnológico e insignias de estado.

2. **Módulo de Reservas con Detección de Conflictos**:
   - Calendario selector de fecha con validación de fechas pasadas.
   - Bloques horarios disponibles con detección de colisiones en tiempo real.
   - Sugerencias rápidas de motivos académicos (talleres, prácticas libres, tesis).

3. **Portal del Estudiante ("Mis Reservas")**:
   - Listado de reservas activas, canceladas e históricas.
   - Posibilidad de cancelar reservas y liberar el espacio inmediatamente.
   - **Pase Digital Imprimible**: Comprobante oficial con código QR y código de verificación alfanumérico.

4. **Panel de Control Administrativo (Admin Dashboard)**:
   - Métricas y KPIs globales (espacios operativos, aforo simultáneo, reservas activas).
   - Alternancia rápida del estado de un laboratorio (Disponible ⟷ Mantenimiento).
   - Registro de nuevos espacios y aulas especializadas.
   - Maestro de reservas con filtrado por estado y opciones de aprobación / rechazo.

5. **Sistema de Autenticación & Demo Switcher**:
   - Inicio de sesión y registro de estudiantes con validación de correo y contraseña (mínimo 8 caracteres).
   - Selector rápido de roles en el Navbar para alternar al instante entre **Estudiante** y **Administrador**.

---

## 🛠️ Instrucciones de Instalación y Ejecución

```bash
# 1. Navegar a la carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

El aplicativo estará disponible en `http://localhost:5173`.

---

## 👥 Cuentas de Prueba Incluidas

- **Estudiante**:
  - Correo: `estudiante@universidad.edu.pe`
  - Contraseña: `Password123!`
  - Rol: `ESTUDIANTE`

- **Administrador**:
  - Correo: `admin@universidad.edu.pe`
  - Contraseña: `AdminPassword123!`
  - Rol: `ADMINISTRADOR`
