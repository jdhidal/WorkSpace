from flask import Blueprint, request, jsonify
from db import get_db_connection

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/users/<email>", methods=["GET"])
def get_user_by_email(email):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        
        try:
            cursor.callproc("GetUserByEmail", [email])
            user = None
            for result in cursor.stored_results():
                user = result.fetchone()

            if user:
                return jsonify(user)
            else:
                return jsonify({"error": "User undifined"}), 404
        except Exception as e:
            return jsonify({"error": f"Error run consult: {str(e)}"}), 500
        finally:
            cursor.close()
            conn.close()
    return jsonify({"error": "Error conection databases"}), 500
