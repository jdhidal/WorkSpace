from flask import Flask, jsonify
from flask_cors import CORS
from routers.availability import availability_bp

app = Flask(__name__)

CORS(app, resources={r"/reduce-capacity/*": {"origins": "http://44.218.54.250:3000"}}, supports_credentials=True)

app.register_blueprint(availability_bp)

@app.route("/")
def root():
    return jsonify({"message": "API de Disponibilidad en ejecución"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3011)
