
package dao;

import conexion.Conexion;
import modelo.Reserva;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Giuss
 */

public class ReservaDAO {
    public boolean crearReserva(Reserva reserva)
            throws SQLException {

        if (reserva.getFecha() == null
                || reserva.getFecha().isBefore(
                    java.time.LocalDate.now())) {
            return false;
        }

        String sqlEspacio = """
            SELECT estado
            FROM espacio
            WHERE id_espacio = ?
            FOR UPDATE
            """;

        String sqlHorario = """
            SELECT hora_inicio, hora_fin
            FROM horario
            WHERE id_horario = ?
              AND estado = 'ACTIVO'
            """;

        String sqlConflicto = """
            SELECT COUNT(*)
            FROM reserva r
            INNER JOIN horario h
                ON r.id_horario = h.id_horario
            WHERE r.id_espacio = ?
              AND r.fecha = ?
              AND r.estado <> 'CANCELADA'
              AND h.hora_inicio < ?
              AND h.hora_fin > ?
            """;

        String sqlInsertar = """
            INSERT INTO reserva
                (id_usuario, id_espacio, id_horario,
                 fecha, motivo, estado)
            VALUES (?, ?, ?, ?, ?, 'CONFIRMADA')
            """;

        try (Connection con = Conexion.conectar()) {

            con.setAutoCommit(false);

            try {
                // Bloquear temporalmente el espacio para
                // coordinar reservas simultáneas.
                try (PreparedStatement ps =
                        con.prepareStatement(sqlEspacio)) {

                    ps.setLong(1, reserva.getIdEspacio());

                    try (ResultSet rs = ps.executeQuery()) {
                        if (!rs.next()
                                || !"DISPONIBLE".equals(
                                    rs.getString("estado"))) {
                            con.rollback();
                            return false;
                        }
                    }
                }

                Time horaInicio;
                Time horaFin;

                // Verificar que el horario exista y esté activo.
                try (PreparedStatement ps =
                        con.prepareStatement(sqlHorario)) {

                    ps.setLong(1, reserva.getIdHorario());

                    try (ResultSet rs = ps.executeQuery()) {
                        if (!rs.next()) {
                            con.rollback();
                            return false;
                        }

                        horaInicio = rs.getTime("hora_inicio");
                        horaFin = rs.getTime("hora_fin");
                    }
                }

                // Detectar intervalos que se superponen.
                try (PreparedStatement ps =
                        con.prepareStatement(sqlConflicto)) {

                    ps.setLong(1, reserva.getIdEspacio());
                    ps.setDate(2, Date.valueOf(reserva.getFecha()));
                    ps.setTime(3, horaFin);
                    ps.setTime(4, horaInicio);

                    try (ResultSet rs = ps.executeQuery()) {
                        if (rs.next() && rs.getInt(1) > 0) {
                            con.rollback();
                            return false;
                        }
                    }
                }

                // Registrar la reserva si no hay conflicto.
                try (PreparedStatement ps =
                        con.prepareStatement(
                            sqlInsertar,
                            Statement.RETURN_GENERATED_KEYS)) {

                    ps.setLong(1, reserva.getIdUsuario());
                    ps.setLong(2, reserva.getIdEspacio());
                    ps.setLong(3, reserva.getIdHorario());
                    ps.setDate(4, Date.valueOf(reserva.getFecha()));
                    ps.setString(5, reserva.getMotivo());

                    if (ps.executeUpdate() == 0) {
                        con.rollback();
                        return false;
                    }

                    try (ResultSet rs = ps.getGeneratedKeys()) {
                        if (rs.next()) {
                            reserva.setIdReserva(rs.getLong(1));
                        }
                    }
                }

                con.commit();
                return true;

            } catch (SQLException e) {
                con.rollback();
                throw e;
            }
        }
    }

    public List<Reserva> listarPorUsuario(long idUsuario)
            throws SQLException {

        List<Reserva> reservas = new ArrayList<>();

        String sql = """
            SELECT id_reserva, id_usuario, id_espacio,
                   id_horario, fecha, motivo, estado,
                   fecha_registro
            FROM reserva
            WHERE id_usuario = ?
            ORDER BY fecha DESC, id_reserva DESC
            """;

        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setLong(1, idUsuario);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Reserva reserva = new Reserva();

                    reserva.setIdReserva(
                        rs.getLong("id_reserva"));
                    reserva.setIdUsuario(
                        rs.getLong("id_usuario"));
                    reserva.setIdEspacio(
                        rs.getLong("id_espacio"));
                    reserva.setIdHorario(
                        rs.getLong("id_horario"));
                    reserva.setFecha(
                        rs.getDate("fecha").toLocalDate());
                    reserva.setMotivo(
                        rs.getString("motivo"));
                    reserva.setEstado(
                        rs.getString("estado"));
                    reserva.setFechaRegistro(
                        rs.getTimestamp("fecha_registro"));

                    reservas.add(reserva);
                }
            }
        }

        return reservas;
    }

    public boolean cancelarReserva(
            long idReserva, long idUsuario) throws SQLException {

        String sql = """
            UPDATE reserva
            SET estado = 'CANCELADA'
            WHERE id_reserva = ?
              AND id_usuario = ?
              AND estado IN ('PENDIENTE', 'CONFIRMADA')
            """;

        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setLong(1, idReserva);
            ps.setLong(2, idUsuario);

            return ps.executeUpdate() > 0;
        }
    }
}
