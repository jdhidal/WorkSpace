from flask import Flask, jsonify, send_from_directory
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
from dotenv import load_dotenv
from userController import logout_user  
import os


load_dotenv()
app = Flask(__name__)

SWAGGER_URL = '/api-docs'
API_URL = '/swagger.yaml'

swagger_ui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL, config={'app_name': "Logout Service"})
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

@app.route(API_URL)
def swagger_yaml():
    return send_from_directory('.', 'swagger.yaml')

CORS(app, resources={r"/logout": {"origins": "http://44.218.54.250:3000"}}, supports_credentials=True)

# Endpoint of logout
@app.route('/logout', methods=['POST'])
def logout():
    return logout_user()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3003, debug=True)
