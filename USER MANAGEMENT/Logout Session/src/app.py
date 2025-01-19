from flask import Flask, jsonify, send_from_directory
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)

# Ruta para Swagger UI
SWAGGER_URL = '/api-docs'  
API_URL = '/swagger.yaml'  # Aquí usamos el archivo swagger.yaml directamente

# Configura Swagger UI para usar el archivo swagger.yaml
swagger_ui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL, config={'app_name': "Logout Service"})
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

# Ruta para servir el archivo swagger.yaml
@app.route(API_URL)
def swagger_yaml():
    # Sirve el archivo swagger.yaml desde el directorio actual
    return send_from_directory('.', 'swagger.yaml')

# Configurar CORS desde la variable de entorno
CORS(app, resources={r"/api/*": {"origins": os.getenv('FRONTEND_URL')}}, supports_credentials=True)

# Ruta para hacer logout
@app.route('/logout', methods=['POST'])
def logout():
    # Lógica para el logout
    return jsonify({"message": "Logout successful"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3003, debug=True)
