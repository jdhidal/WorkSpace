def clear_token_cookie(response):
    response.delete_cookie('token', path='/', httponly=True, secure=True, samesite='None')