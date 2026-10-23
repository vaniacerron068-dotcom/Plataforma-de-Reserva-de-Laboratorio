
package servicio;

import dao.ReservaDAO;
import modelo.Reserva;
import java.sql.SQLException;
import java.time.LocalDate;

/**
 *
 * @author Giuss
 */

public class ReservaServicio {
    private final ReservaDAO reservaDAO;

    public ReservaServicio() {
        this.reservaDAO = new ReservaDAO();
    }

    public boolean crearReserva(Reserva reserva)
            throws SQLException {

        if (reserva == null) {
            throw new IllegalArgumentException(
                "Los datos de la reserva son obligatorios."
            );
        }

        if (reserva.getIdUsuario() <= 0
                || reserva.getIdEspacio() <= 0
                || reserva.getIdHorario() <= 0) {
            throw new IllegalArgumentException(
                "Selecciona un usuario, espacio y horario válidos."
            );
        }

        if (reserva.getFecha() == null) {
            throw new IllegalArgumentException(
                "Debes seleccionar una fecha."
            );
        }

        if (reserva.getFecha().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException(
                "No puedes reservar en una fecha pasada."
            );
        }

        String motivo = reserva.getMotivo();

        if (motivo == null || motivo.trim().isEmpty()) {
            throw new IllegalArgumentException(
                "Debes indicar el motivo de la reserva."
            );
        }

        reserva.setMotivo(motivo.trim());

        boolean creada = reservaDAO.crearReserva(reserva);

        if (!creada) {
            throw new IllegalArgumentException(
                "No se pudo realizar la reserva. "
                + "Verifica que el espacio y el horario "
                + "estén disponibles."
            );
        }

        return true;
    }
}