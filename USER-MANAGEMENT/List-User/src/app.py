from flask import Flask
from flask_cors import CORS
from routes import user_routes

app = Flask(__name__)

CORS(app, resources={r"/users/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

app.register_blueprint(user_routes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3014, debug=True)
