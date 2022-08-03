from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Server

server_routes = Blueprint("servers", __name__)

@server_routes.route("/joined")
@login_required
def get_joined_servers():
    print(current_user.joined_servers)
    return jsonify(current_user.joined_servers), 200
