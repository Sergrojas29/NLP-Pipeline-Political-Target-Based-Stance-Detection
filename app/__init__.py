from flask import Flask



from flask_cors import CORS
from config import config


from app.routes.main import main



def create_app(config_name = 'default'):
    app = Flask(__name__)
    CORS(app)
    
    # REGISTER BLUEPRINTS 
    app.register_blueprint(main)

    
    app.config.from_object(config[config_name])

    
    
    return app