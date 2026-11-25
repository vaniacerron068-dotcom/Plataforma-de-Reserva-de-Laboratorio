# Propuesta de contrato de API — Plataforma de Reserva de Laboratorio

> **Estado actual:** el frontend es una **maqueta visual** con datos de ejemplo estáticos (`frontend/src/data/initialData.js`). No usa `localStorage`, no persiste nada y no llama a ninguna API: las acciones que dependen del backend (login, reservar, cancelar, gestionar espacios) solo muestran un aviso de "pendiente".
>
> Este documento es solo una **referencia** para la persona encargada del backend. Puede implementar estas rutas tal cual, adaptarlas o proponer otras. La conexión real del frontend se hará cuando esa parte esté lista.

---

## 1. Consideraciones generales

### Integración futura

Cuando el backend exista, se puede agregar una capa de servicios en `frontend/src/services/` y configurar la URL base con una variable como `VITE_API_URL` o un proxy de Vite. **Eso todavía no está implementado.**

### Reglas generales

| Aspecto | Regla |
|---|---|
| Formato | JSON UTF-8 (`Content-Type: application/json`) |
| Base | Todas las rutas de este documento se prefijan con `/api` |
| Nombres de campo | `camelCase` (recomendado) |
| Fechas | `YYYY-MM-DD` |
| Horas | `HH:mm:ss` (también se acepta `HH:mm`) |
| Éxito | `200 OK`, `201 Created` o `204 No Content` |
| Error | Código `4xx`/`5xx` con cuerpo `{ "mensaje": "Texto para el usuario" }` |
| Autenticación | `Authorization: Bearer <token>` en rutas protegidas |
| CORS | Permitir el origen del frontend (`http://localhost:5173` en desarrollo) |

Se recomienda que los errores incluyan un campo `mensaje` (o `message`, `error`, `detalle`) con texto apto para mostrar al usuario.

---

## 2. Autenticación

### `POST /api/auth/login`

```json
{
  "correo": "estudiante@universidad.edu.pe",
  "clave": "demo1234"
}
```

Respuesta `200`:

```json
{
  "token": "jwt-o-token-opaco",
  "usuario": {
    "idUsuario": 1,
    "nombres": "María",
    "apellidos": "Fernández",
    "correo": "estudiante@universidad.edu.pe",
    "rol": "ESTUDIANTE",
    "estado": "ACTIVO"
  }
}
```

- El token es opcional si el backend no implementa JWT, pero se recomienda.
- `rol` debe ser `ESTUDIANTE` o `ADMINISTRADOR`.
- Si las credenciales son incorrectas: `401` con `{ "mensaje": "Correo o contraseña incorrectos, o cuenta inactiva." }`.

### `POST /api/auth/registro`

```json
{
  "nombres": "María",
  "apellidos": "Fernández",
  "correo": "maria@universidad.edu.pe",
  "clave": "unaClaveSegura",
  "carrera": "Ingeniería de Sistemas"
}
```

Respuesta `201` con la misma forma que el login: `{ "token": "...", "usuario": { ... } }`.

El backend debe forzar `rol = "ESTUDIANTE"` y `estado = "ACTIVO"`, validar correo único y contraseña de al menos 8 caracteres.

### `POST /api/auth/logout` *(opcional)*

La integración del frontend puede llamarlo al cerrar sesión. Puede devolver `204`.

### Cuentas de demostración

Los botones **“Entrar como Estudiante”** y **“Entrar como Administrador”** hacen un login normal con estas cuentas:

| Rol | Correo por defecto | Clave por defecto |
|---|---|---|
| ESTUDIANTE | `estudiante@universidad.edu.pe` | `demo1234` |
| ADMINISTRADOR | `admin@universidad.edu.pe` | `demo1234` |

Estas cuentas pueden cargarse como datos semilla en la base de datos. La demo local del frontend ya incluye usuarios equivalentes.

Seed sugerido (cada backend define su esquema y su propio manejo de contraseñas):

```sql
INSERT INTO usuario (nombres, apellidos, correo, clave, rol)
VALUES
  ('Estudiante', 'Demo', 'estudiante@universidad.edu.pe', 'demo1234', 'ESTUDIANTE'),
  ('Administrador', 'Demo', 'admin@universidad.edu.pe', 'demo1234', 'ADMINISTRADOR');
```

---

## 3. Catálogo

### `GET /api/sedes`

```json
[
  { "idSede": 1, "nombre": "Sede Principal", "direccion": "Av. Universitaria 1801", "estado": "ACTIVA" }
]
```

### `GET /api/horarios`

```json
[
  {
    "idHorario": 1,
    "horaInicio": "08:00:00",
    "horaFin": "10:00:00",
    "etiqueta": "08:00 - 10:00",
    "estado": "ACTIVO"
  }
]
```

`etiqueta` es opcional; si falta, la interfaz puede armarla con `horaInicio` y `horaFin`.

### `GET /api/espacios`

```json
[
  {
    "idEspacio": 1,
    "idSede": 1,
    "nombre": "Laboratorio 101",
    "tipo": "LABORATORIO",
    "capacidad": 30,
    "descripcion": "Laboratorio de cómputo",
    "estado": "DISPONIBLE",
    "equipamiento": ["PCs Core i7", "Proyector"]
  }
]
```

- `estado`: `DISPONIBLE`, `MANTENIMIENTO` o `INACTIVO`.
- `equipamiento` es opcional y no existe en el esquema SQL actual.

### `POST /api/espacios` *(solo administrador)*

```json
{
  "idSede": 1,
  "nombre": "Laboratorio 305",
  "tipo": "LABORATORIO",
  "capacidad": 25,
  "descripcion": "Laboratorio de redes",
  "equipamiento": ["Switches", "Routers"]
}
```

Respuesta `201` con el espacio creado (incluyendo `idEspacio`).

### `PATCH /api/espacios/{idEspacio}/estado` *(solo administrador)*

```json
{ "estado": "MANTENIMIENTO" }
```

Respuesta `200` con el espacio actualizado.

---

## 4. Reservas

### `GET /api/reservas`

Requiere sesión (`Authorization: Bearer <token>`). Se recomienda que el catálogo siga siendo público y que el frontend no llame a esta ruta sin sesión. Si responde `401`, debe descartarse la sesión local.

Devuelve las reservas visibles para el usuario del token:

- Estudiante: solo sus reservas.
- Administrador: todas.

Respuesta `200`:

```json
[
  {
    "idReserva": 15,
    "idUsuario": 3,
    "usuarioNombre": "María Fernández",
    "idEspacio": 1,
    "espacioNombre": "Laboratorio 101",
    "idSede": 1,
    "sedeNombre": "Sede Principal",
    "idHorario": 2,
    "horarioEtiqueta": "10:00 - 12:00",
    "fecha": "2026-11-25",
    "motivo": "Práctica de desarrollo de software",
    "estado": "CONFIRMADA",
    "codigoVerificacion": "LAB-2026-000015",
    "fechaRegistro": "2026-11-24T15:30:00"
  }
]
```

Campos que el backend **debe** devolver: `idReserva`, `idUsuario`, `idEspacio`, `idHorario`, `fecha`, `motivo`, `estado`.
Recomendados: `usuarioNombre` (necesario para el panel de administración), `espacioNombre`, `sedeNombre`, `horarioEtiqueta`, `codigoVerificacion` y `fechaRegistro`.

Si faltan campos descriptivos, la interfaz puede completarlos con el catálogo ya cargado. `usuarioNombre` no se puede derivar desde el frontend: si no llega, el comprobante y el panel administrativo lo mostrarán vacío.

`codigoVerificacion` es generado por el backend (el frontend solo lo muestra). Opciones:

1. Agregar la columna `codigo_verificacion VARCHAR(30) NOT NULL UNIQUE` y generarla en el servicio.
2. Derivarlo del `idReserva` (por ejemplo `LAB-AAAA-000015`) al momento de responder.

### `GET /api/reservas/disponibilidad?idEspacio=1&fecha=2026-11-25`

Devuelve los bloques horarios ya ocupados para ese espacio y fecha:

```json
{ "ocupados": [2, 3] }
```

También se acepta un arreglo directo `[2, 3]` o una lista de reservas con `idHorario`.

Debe excluir las reservas con estado `CANCELADA`. La interfaz puede usar esta ruta para deshabilitar horarios; si responde `404` o `405`, puede calcular la disponibilidad a partir de `GET /api/reservas`.

### `POST /api/reservas`

```json
{
  "idUsuario": 3,
  "idEspacio": 1,
  "idHorario": 2,
  "fecha": "2026-11-25",
  "motivo": "Práctica de desarrollo de software"
}
```

Respuesta `201` con la reserva creada. El backend debe:

- Validar usuario, espacio y horario existentes.
- Rechazar fechas pasadas.
- Rechazar espacios que no estén `DISPONIBLE`.
- Rechazar el conflicto espacio + fecha + horario (ignorando reservas `CANCELADA`).
- Asignar `estado = "CONFIRMADA"` (o `PENDIENTE`, según la regla de negocio).
- Generar `codigoVerificacion` si se decide persistirlo.

Errores esperados (`409` o `400`) con mensajes como:

- `"No se pudo realizar la reserva. El espacio y horario ya se encuentran ocupados para esta fecha."`
- `"El espacio no se encuentra disponible para reservas."`
- `"No puedes reservar en una fecha pasada."`

### `PATCH /api/reservas/{idReserva}/cancelar`

Sin cuerpo. El backend valida que la reserva pertenezca al usuario del token (o que sea administrador) y cambia `estado` a `CANCELADA`.

Respuesta `200` con la reserva actualizada (o `204`).

### `PATCH /api/reservas/{idReserva}/estado` *(solo administrador)*

```json
{ "estado": "CONFIRMADA" }
```

Valores permitidos: `PENDIENTE`, `CONFIRMADA`, `CANCELADA`. Respuesta `200` con la reserva actualizada.

### `GET /api/reservas?usuario={idUsuario}` *(opcional)*

Ruta opcional. Si se implementa, debe devolver el mismo formato que `GET /api/reservas`.

---

## 5. Correspondencia sugerida

El backend vive en su propio repositorio; esta tabla solo sirve para alinear nombres entre API, entidades y tablas.

| Concepto | Entidad sugerida | Tabla sugerida |
|---|---|---|
| Usuario | `Usuario` | `usuario` |
| Sede | `Sede` | `sede` |
| Espacio | `Espacio` | `espacio` |
| Horario | `Horario` | `horario` |
| Reserva | `Reserva` | `reserva` |
| Login/registro | servicio de autenticación | `usuario` |
| Reservas | servicio de reservas | `reserva` |

Este repositorio no incluye backend ni esquema de base de datos: solo el frontend visual.

### Recomendaciones para serializar

- Con Jackson, los getters ya generan `camelCase` (`getIdEspacio()` → `idEspacio`).
- Para `LocalDate`/`LocalTime`, registrar `jackson-datatype-jsr310` o formatear manualmente:
  - `LocalDate` → `"2026-11-25"`
  - `LocalTime` → `"10:00:00"`
- No devolver `clave` en las respuestas de usuario.
- Centralizar los errores en un handler que responda `{ "mensaje": "..." }`.

---

## 6. Checklist mínimo para el backend

- [ ] `POST /api/auth/login` y `POST /api/auth/registro`
- [ ] `GET /api/sedes`, `GET /api/horarios`, `GET /api/espacios`
- [ ] `GET /api/reservas`
- [ ] `POST /api/reservas` con validación de conflictos
- [ ] `PATCH /api/reservas/{id}/cancelar`
- [ ] `GET /api/reservas/disponibilidad`
- [ ] `PATCH /api/espacios/{id}/estado` y `POST /api/espacios`
- [ ] CORS habilitado para `http://localhost:5173`
- [ ] Cuentas de demostración cargadas en la base de datos

Con esos endpoints se puede conectar el frontend completo: catálogo, login, reserva, comprobante, cancelación y panel administrativo.
