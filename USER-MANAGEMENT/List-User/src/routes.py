from flask import Blueprint, request, jsonify
from db import get_db_connection

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/users/<email>", methods=["GET"])
def get_user_by_email(email):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        
        try:
            # Llamada al procedimiento almacenado
            cursor.callproc("GetUserByEmail", [email])

            # Obtenemos el resultado del procedimiento
            user = None
            for result in cursor.stored_results():
                user = result.fetchone()  # Esperamos solo un usuario

            if user:
                return jsonify(user)
            else:
                return jsonify({"error": "Usuario no encontrado"}), 404
        except Exception as e:
            return jsonify({"error": f"Error al ejecutar la consulta: {str(e)}"}), 500
        finally:
            # Asegurarnos de cerrar el cursor y la conexión
            cursor.close()
            conn.close()
    return jsonify({"error": "Error en la conexión a la base de datos"}), 500
