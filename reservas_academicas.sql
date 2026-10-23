DROP DATABASE IF EXISTS reservas_academicas;
CREATE DATABASE reservas_academicas
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE reservas_academicas;

-- 1. Usuarios del sistema
CREATE TABLE usuario (
    id_usuario BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    clave VARCHAR(255) NOT NULL,
    rol ENUM('ESTUDIANTE', 'ADMINISTRADOR')
        NOT NULL DEFAULT 'ESTUDIANTE',
    estado ENUM('ACTIVO', 'INACTIVO')
        NOT NULL DEFAULT 'ACTIVO',
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Sedes de la institución
CREATE TABLE sede (
    id_sede BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    direccion VARCHAR(200),
    estado ENUM('ACTIVA', 'INACTIVA')
        NOT NULL DEFAULT 'ACTIVA'
);

-- 3. Laboratorios y espacios académicos
CREATE TABLE espacio (
    id_espacio BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_sede BIGINT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('LABORATORIO', 'AULA', 'OTRO')
        NOT NULL DEFAULT 'LABORATORIO',
    capacidad INT NOT NULL DEFAULT 1,
    descripcion VARCHAR(255),
    estado ENUM('DISPONIBLE', 'MANTENIMIENTO', 'INACTIVO')
        NOT NULL DEFAULT 'DISPONIBLE',

    CONSTRAINT fk_espacio_sede
        FOREIGN KEY (id_sede)
        REFERENCES sede(id_sede),

    CONSTRAINT uq_espacio_sede
        UNIQUE (id_sede, nombre),

    CONSTRAINT chk_espacio_capacidad
        CHECK (capacidad > 0)
);

-- 4. Intervalos horarios disponibles para reservar
CREATE TABLE horario (
    id_horario BIGINT PRIMARY KEY AUTO_INCREMENT,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado ENUM('ACTIVO', 'INACTIVO')
        NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT chk_horario_valido
        CHECK (hora_fin > hora_inicio),

    CONSTRAINT uq_horario
        UNIQUE (hora_inicio, hora_fin)
);

-- 5. Reservas realizadas por los usuarios
CREATE TABLE reserva (
    id_reserva BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_usuario BIGINT NOT NULL,
    id_espacio BIGINT NOT NULL,
    id_horario BIGINT NOT NULL,
    fecha DATE NOT NULL,
    motivo VARCHAR(255),
    estado ENUM('PENDIENTE', 'CONFIRMADA', 'CANCELADA')
        NOT NULL DEFAULT 'CONFIRMADA',
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reserva_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario),

    CONSTRAINT fk_reserva_espacio
        FOREIGN KEY (id_espacio)
        REFERENCES espacio(id_espacio),

    CONSTRAINT fk_reserva_horario
        FOREIGN KEY (id_horario)
        REFERENCES horario(id_horario),

    INDEX idx_reserva_espacio_fecha (id_espacio, fecha),
    INDEX idx_reserva_usuario (id_usuario),
    INDEX idx_reserva_horario (id_horario)
);


-- ================ INSERTS INTO  ======================

INSERT INTO sede (nombre, direccion)
VALUES
    ('Sede Principal', 'Dirección de prueba'),
    ('Sede Secundaria', 'Dirección de prueba');

INSERT INTO espacio (
    id_sede, nombre, tipo, capacidad, descripcion
)
VALUES
    (1, 'Laboratorio 101', 'LABORATORIO', 30,
     'Laboratorio de cómputo'),
    (1, 'Aula 201', 'AULA', 40,
     'Espacio para clases'),
    (2, 'Laboratorio 202', 'LABORATORIO', 25,
     'Laboratorio de práctica');

INSERT INTO horario (hora_inicio, hora_fin)
VALUES
    ('08:00:00', '10:00:00'),
    ('10:00:00', '12:00:00'),
    ('14:00:00', '16:00:00');

