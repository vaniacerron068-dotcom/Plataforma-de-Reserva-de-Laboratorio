
package modelo;

import java.sql.Timestamp;
import java.time.LocalDate;

/**
 *
 * @author Giuss
 */

public class Reserva {

    private long idReserva;
    private long idUsuario;
    private long idEspacio;
    private long idHorario;
    private LocalDate fecha;
    private String motivo;
    private String estado;
    private Timestamp fechaRegistro;

    public Reserva() {
    }

    public Reserva(long idUsuario, long idEspacio,
                   long idHorario, LocalDate fecha,
                   String motivo) {
        this.idUsuario = idUsuario;
        this.idEspacio = idEspacio;
        this.idHorario = idHorario;
        this.fecha = fecha;
        this.motivo = motivo;
        this.estado = "CONFIRMADA";
    }

    public long getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(long idReserva) {
        this.idReserva = idReserva;
    }

    public long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public long getIdEspacio() {
        return idEspacio;
    }

    public void setIdEspacio(long idEspacio) {
        this.idEspacio = idEspacio;
    }

    public long getIdHorario() {
        return idHorario;
    }

    public void setIdHorario(long idHorario) {
        this.idHorario = idHorario;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Timestamp getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Timestamp fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}
