from flask import jsonify, request, make_response
from service import clear_token_cookie

def logout_user():
    # Limpiar la cookie 'token'
    response = make_response(jsonify({"message": "Logout successful"}))
    clear_token_cookie(response)
    return response
