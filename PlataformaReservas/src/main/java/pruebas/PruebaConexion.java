
package pruebas;

import conexion.Conexion;
import java.sql.Connection;
import java.sql.SQLException;

/**
 *
 * @author Giuss
 */
public class PruebaConexion {
    public static void main(String[] args) {
        try (Connection conexion = Conexion.conectar()) {

            if (conexion != null && !conexion.isClosed()) {
                System.out.println(
                    "Conexion exitosa con MySQL!"
                );
            }

        } catch (SQLException e) {
            System.err.println(
                "No se pudo conectar con MySQL."
            );
            System.err.println(
                "Detalle: " + e.getMessage()
            );
        }
    }
}
