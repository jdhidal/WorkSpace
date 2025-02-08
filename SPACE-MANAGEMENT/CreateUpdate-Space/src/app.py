from flask import Flask
from db_init import db
from dotenv import load_dotenv 
from flask_cors import CORS
import os


load_dotenv()

def create_app():
    app = Flask(__name__)

    CORS(app, origins="http://localhost:3000", supports_credentials=True) 


    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS', False)

    db.init_app(app)

    from routes.space_routes import space_bp
    app.register_blueprint(space_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=3004)
