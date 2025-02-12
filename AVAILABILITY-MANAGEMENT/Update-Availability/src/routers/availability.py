from flask import Blueprint, request, jsonify
from database import get_db_connection

availability_bp = Blueprint('availability', __name__)

@availability_bp.route("/reduce-capacity/<int:avail_id>", methods=["POST"])
def reduce_capacity(avail_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT update_max_capacity(%s);", (avail_id,))

        if cur.rowcount == 0:
            return jsonify({"error": "No se pudo reducir la capacidad (ya es 0 o no existe)."}), 400

        conn.commit()

        cur.close()
        conn.close()

        return jsonify({"message": "Capacidad reducida exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
