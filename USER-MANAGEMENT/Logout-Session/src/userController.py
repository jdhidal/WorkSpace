from flask import jsonify, request, make_response


def clear_token_cookie(response):
    response.set_cookie(
        'token', 
        '', 
        expires=0, 
        path='/', 
        httponly=True, 
        samesite='Lax', 
        secure=False 
    )


def logout_user():
    # clean token and response
    response = make_response(jsonify({"message": "Logout successful"}))
    clear_token_cookie(response)
    return response
