import base64
from app import db
from sqlalchemy import text
from flask import jsonify


def create_space(data):
    name = data.get('name')
    description = data.get('description')
    photo = data.get('photo')

    if photo:
        if isinstance(photo, str) and photo.startswith('data:image'):
            photo_binary = base64.b64decode(photo.split(',')[1])
        else:
            photo_binary = photo
    else:
        photo_binary = None

    try:
        query = text("CALL create_coworking_space(:photo, :name, :description)")
        
        db.session.execute(query, {
            'photo': photo_binary,
            'name': name,
            'description': description
        })

        db.session.commit()

        if photo_binary:
            photo_base64 = base64.b64encode(photo_binary).decode('utf-8')
        else:
            photo_base64 = None

        return {
            "message": "Space created successfully",
            "space": {"name": name, "description": description, "photo": photo_base64}
        }
    except Exception as e:
        db.session.rollback()
        return {
            "message": "Error creating space",
            "error": str(e)
        }
    

def update_space(space_id, data):
    name = data.get('name')
    description = data.get('description')
    photo = data.get('photo')

    if isinstance(photo, str) and photo.startswith('data:image'):
        photo_binary = base64.b64decode(photo.split(',')[1])
    else:
        photo_binary = photo.read() if photo else None 

    db.session.execute(
        "CALL update_space(:space_id, :name, :description, :photo)",
        {
            'space_id': space_id,
            'name': name,
            'description': description,
            'photo': photo_binary
        }
    )
    db.session.commit()

    return {
        "message": "Space updated successfully",
        "space": {"id": space_id, "name": name, "description": description, "photo": photo_binary} 
    }
