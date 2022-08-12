from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.server_routes import USER_IS_BANNED
from app.models import db, ServerMessage, Server

server_message_routes = Blueprint("server-messages", __name__)

SERVER_NOT_EXIST = {
    "message": "Server does not exist",
    "status_code": 404,
}

USER_IS_BANNED = {
    "message": "User is banned",
    "status_code": 401,
}


@server_message_routes.route("/servers/<int:id>/messages", methods=["GET"])
@login_required
def get_server_messages(id):
    """
    Get all of the messages in server specified by id
    """
    # check that server exists
    server = Server.query.get(id)
    if server is None:
        return jsonify(SERVER_NOT_EXIST), 404

    # check that user is not banned
    user_permission = server.get_member_permission(current_user.id)
    if user_permission["permission"]["name"] == "banned":
        return jsonify(USER_IS_BANNED), 401

    return jsonify([message.to_dict() for message in server.messages]), 200
