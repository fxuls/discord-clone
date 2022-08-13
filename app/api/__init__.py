from flask import Blueprint

api = Blueprint('api', __name__)

from .user_routes import user_routes
from .auth_routes import auth_routes
from .dev_routes import dev_routes
from .server_routes import server_routes
from .direct_message_routes import direct_message_routes
from .server_message_routes import server_message_routes

api.register_blueprint(user_routes, url_prefix='/api/users')
api.register_blueprint(auth_routes, url_prefix='/api/auth')
api.register_blueprint(dev_routes, url_prefix='/api/dev')
api.register_blueprint(server_routes, url_prefix='/api/servers')
api.register_blueprint(direct_message_routes, url_prefix='/api/direct-messages')
api.register_blueprint(server_message_routes, url_prefix='/api/server-messages')
