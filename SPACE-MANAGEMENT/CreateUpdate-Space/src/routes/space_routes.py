from flask import Blueprint
from controllers.space_controller import create_space_controller, update_space_controller
 

space_bp = Blueprint('space', __name__, url_prefix='/api/space')


space_bp.route('/', methods=['POST'])(create_space_controller)


space_bp.route('/<int:space_id>', methods=['PUT'])(update_space_controller)
