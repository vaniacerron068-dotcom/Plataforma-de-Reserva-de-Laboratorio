package dao;

import conexion.Conexion;
import modelo.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.mindrot.jbcrypt.BCrypt;

/**
 *
 * @author Giuss
 */

public class UsuarioDAO {

    public boolean registrar(Usuario usuario) throws SQLException {

        String sql = """
            INSERT INTO usuario
                (nombres, apellidos, correo, clave, rol, estado)
            VALUES (?, ?, ?, ?, 'ESTUDIANTE', 'ACTIVO')
            """;

        String claveHash = BCrypt.hashpw(
            usuario.getClave(),
            BCrypt.gensalt(12)
        );

        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(
                 sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, usuario.getNombres());
            ps.setString(2, usuario.getApellidos());
            ps.setString(3, usuario.getCorreo());
            ps.setString(4, claveHash);

            int filas = ps.executeUpdate();

            if (filas > 0) {
                try (ResultSet rs = ps.getGeneratedKeys()) {
                    if (rs.next()) {
                        usuario.setIdUsuario(rs.getLong(1));
                    }
                }
                return true;
            }

            return false;
        }
    }

    public boolean correoExiste(String correo) throws SQLException {

        String sql = """
            SELECT id_usuario
            FROM usuario
            WHERE correo = ?
            """;

        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, correo);

            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        }
    }

    public Usuario autenticar(
            String correo, String claveIngresada) throws SQLException {

        String sql = """
            SELECT id_usuario, nombres, apellidos, correo,
                   clave, rol, estado, fecha_registro
            FROM usuario
            WHERE correo = ?
              AND estado = 'ACTIVO'
            """;

        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, correo);

            try (ResultSet rs = ps.executeQuery()) {

                if (rs.next()) {
                    String hashGuardado = rs.getString("clave");

                    if (BCrypt.checkpw(claveIngresada, hashGuardado)) {
                        Usuario usuario = new Usuario();

                        usuario.setIdUsuario(
                            rs.getLong("id_usuario"));
                        usuario.setNombres(
                            rs.getString("nombres"));
                        usuario.setApellidos(
                            rs.getString("apellidos"));
                        usuario.setCorreo(
                            rs.getString("correo"));
                        usuario.setClave(null);
                        usuario.setRol(rs.getString("rol"));
                        usuario.setEstado(rs.getString("estado"));
                        usuario.setFechaRegistro(
                            rs.getTimestamp("fecha_registro"));

                        return usuario;
                    }
                }
            }
        }

        return null;
    }
}