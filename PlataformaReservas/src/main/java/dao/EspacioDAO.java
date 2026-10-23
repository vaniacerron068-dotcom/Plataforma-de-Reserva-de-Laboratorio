
package dao;

import conexion.Conexion;
import modelo.Espacio;
import modelo.Sede;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Giuss
 */

public class EspacioDAO {
    public List<Sede> listarSedesActivas() throws SQLException {

        List<Sede> sedes = new ArrayList<>();

        String sql = """
            SELECT id_sede, nombre, direccion, estado
            FROM sede
            WHERE estado = 'ACTIVA'
            ORDER BY nombre
            """;

        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Sede sede = new Sede();

                sede.setIdSede(rs.getLong("id_sede"));
                sede.setNombre(rs.getString("nombre"));
                sede.setDireccion(rs.getString("direccion"));
                sede.setEstado(rs.getString("estado"));

                sedes.add(sede);
            }
        }

        return sedes;
    }

    public List<Espacio> listarDisponiblesPorSede(
            long idSede) throws SQLException {

        List<Espacio> espacios = new ArrayList<>();

        String sql = """
            SELECT id_espacio, id_sede, nombre, tipo,
                   capacidad, descripcion, estado
            FROM espacio
            WHERE id_sede = ?
              AND estado = 'DISPONIBLE'
            ORDER BY nombre
            """;

        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setLong(1, idSede);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Espacio espacio = new Espacio();

                    espacio.setIdEspacio(
                        rs.getLong("id_espacio"));
                    espacio.setIdSede(
                        rs.getLong("id_sede"));
                    espacio.setNombre(
                        rs.getString("nombre"));
                    espacio.setTipo(
                        rs.getString("tipo"));
                    espacio.setCapacidad(
                        rs.getInt("capacidad"));
                    espacio.setDescripcion(
                        rs.getString("descripcion"));
                    espacio.setEstado(
                        rs.getString("estado"));

                    espacios.add(espacio);
                }
            }
        }

        return espacios;
    }

    public List<Espacio> listarTodos() throws SQLException {

        List<Espacio> espacios = new ArrayList<>();

        String sql = """
            SELECT id_espacio, id_sede, nombre, tipo,
                   capacidad, descripcion, estado
            FROM espacio
            ORDER BY id_sede, nombre
            """;

        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Espacio espacio = new Espacio();

                espacio.setIdEspacio(
                    rs.getLong("id_espacio"));
                espacio.setIdSede(
                    rs.getLong("id_sede"));
                espacio.setNombre(
                    rs.getString("nombre"));
                espacio.setTipo(
                    rs.getString("tipo"));
                espacio.setCapacidad(
                    rs.getInt("capacidad"));
                espacio.setDescripcion(
                    rs.getString("descripcion"));
                espacio.setEstado(
                    rs.getString("estado"));

                espacios.add(espacio);
            }
        }

        return espacios;
    }
}
