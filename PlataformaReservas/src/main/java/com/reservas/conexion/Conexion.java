
package com.reservas.conexion;


/**
 *
 * @author Giuss
 */

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {

    private static final String URL =
            "jdbc:mysql://localhost:3306/reservas_academicas"
            + "?serverTimezone=America/Lima"
            + "&useSSL=false";

    private static final String USUARIO = "root";
    private static final String CLAVE = "jojo_yisus$97";

    public static Connection conectar() throws SQLException {
        return DriverManager.getConnection(
                URL,
                USUARIO,
                CLAVE
        );
    }
}
