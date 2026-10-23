/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package servicio;

import dao.UsuarioDAO;
import modelo.Usuario;
import java.sql.SQLException;

/**
 *
 * @author Giuss
 */

public class AutenticacionServicio {
    private final UsuarioDAO usuarioDAO;

    public AutenticacionServicio() {
        this.usuarioDAO = new UsuarioDAO();
    }

    public void registrar(Usuario usuario) throws SQLException {
        if (usuario == null) {
            throw new IllegalArgumentException(
                "Los datos del usuario son obligatorios."
            );
        }

        String nombres = limpiar(usuario.getNombres());
        String apellidos = limpiar(usuario.getApellidos());
        String correo = limpiar(usuario.getCorreo()).toLowerCase();
        String clave = usuario.getClave();

        if (nombres.isEmpty() || apellidos.isEmpty()
                || correo.isEmpty() || clave == null
                || clave.trim().isEmpty()) {
            throw new IllegalArgumentException(
                "Completa todos los campos."
            );
        }

        if (!correo.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            throw new IllegalArgumentException(
                "Ingresa un correo electrónico válido."
            );
        }

        if (clave.length() < 8) {
            throw new IllegalArgumentException(
                "La contraseña debe tener al menos 8 caracteres."
            );
        }

        if (usuarioDAO.correoExiste(correo)) {
            throw new IllegalArgumentException(
                "Este correo ya se encuentra registrado."
            );
        }

        usuario.setNombres(nombres);
        usuario.setApellidos(apellidos);
        usuario.setCorreo(correo);

        // El DAO también fuerza el rol ESTUDIANTE al registrar.
        usuario.setRol("ESTUDIANTE");
        usuario.setEstado("ACTIVO");

        usuarioDAO.registrar(usuario);
    }

    public Usuario iniciarSesion(
            String correo, String clave) throws SQLException {

        correo = limpiar(correo).toLowerCase();

        if (correo.isEmpty() || clave == null || clave.isEmpty()) {
            throw new IllegalArgumentException(
                "Ingresa tu correo y contraseña."
            );
        }

        Usuario usuario = usuarioDAO.autenticar(correo, clave);

        if (usuario == null) {
            throw new IllegalArgumentException(
                "Correo o contraseña incorrectos, o cuenta inactiva."
            );
        }
        return usuario;
    }

    private String limpiar(String texto) {
        return texto == null ? "" : texto.trim();
    }
}
