from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Server

server_routes = Blueprint("servers", __name__)

@server_routes.route("/joined")
@login_required
def get_joined_servers():
    """
    Get a list of all the server memberships the current user
    belongs to

    Each result includes the server_id and the permission_id of
    the users permission in the server
    """
    return jsonify(current_user.joined_servers), 200


@server_routes.route("/<int:id>")
def get_server_by_id(id):
    """
    Get a server's details by its id
    """
    server = Server.query.get(id)
    return server.to_dict()
