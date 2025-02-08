from flask import request, jsonify
from io import BytesIO
from services.space_service import create_space, update_space

def create_space_controller():
    if 'name' in request.form and 'description' in request.form:
        name = request.form['name']
        description = request.form['description']
        photo = request.files.get('photo')  

        if photo:
            photo_binary = photo.read()
        else:
            photo_binary = None

        data = {
            'name': name,
            'description': description,
            'photo': photo_binary
        }

        result = create_space(data)
        return jsonify(result), 201
    else:
        return jsonify({"error": "Request must contain name, description, and photo"}), 400


def update_space_controller(space_id):
    if request.is_json:
        data = request.get_json()
        result = update_space(space_id, data)
        return jsonify(result), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400
