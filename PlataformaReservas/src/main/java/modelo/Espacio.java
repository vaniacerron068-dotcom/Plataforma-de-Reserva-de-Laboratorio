
package modelo;

/**
 *
 * @author Giuss
 */

public class Espacio {
    private long idEspacio;
    private long idSede;
    private String nombre;
    private String tipo;
    private int capacidad;
    private String descripcion;
    private String estado;

    public Espacio() {
    }

    public Espacio(long idSede, String nombre, String tipo,
                   int capacidad, String descripcion) {
        this.idSede = idSede;
        this.nombre = nombre;
        this.tipo = tipo;
        this.capacidad = capacidad;
        this.descripcion = descripcion;
        this.estado = "DISPONIBLE";
    }

    public long getIdEspacio() {
        return idEspacio;
    }

    public void setIdEspacio(long idEspacio) {
        this.idEspacio = idEspacio;
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

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(int capacidad) {
        this.capacidad = capacidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return nombre + " (" + tipo + ")";
    }
}
