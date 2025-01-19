from flask import jsonify, request, make_response
from service import clear_token_cookie

def logout_user():
    # clean token and response
    response = make_response(jsonify({"message": "Logout successful"}))
    clear_token_cookie(response)
    return response
