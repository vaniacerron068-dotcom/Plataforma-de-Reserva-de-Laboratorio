
package modelo;

/**
 *
 * @author Giuss
 */

public class Sede {
    private long idSede;
    private String nombre;
    private String direccion;
    private String estado;

    public Sede() {
    }

    public Sede(String nombre, String direccion) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.estado = "ACTIVA";
    }

    public long getIdSede() {
        return idSede;
    }

    public void setIdSede(long idSede) {
        this.idSede = idSede;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return nombre;
    }
}
