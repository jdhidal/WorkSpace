from flask import jsonify, request, make_response


def clear_token_cookie(response):
    response.set_cookie(
        'token', 
        '', 
        expires=0, 
        path='/', 
        httponly=True, 
        samesite='Lax',  # Cambiar a Lax para desarrollo
        secure=False      # Asegúrate de usar True en producción (HTTPS)
    )


def logout_user():
    # clean token and response
    response = make_response(jsonify({"message": "Logout successful"}))
    clear_token_cookie(response)
    return response
