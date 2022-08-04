from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Server, ServerMember

server_routes = Blueprint("servers", __name__)

@server_routes.route("/joined")
@login_required
def get_joined_servers():
    """
    Get a list of all the server memberships the current user
    belongs to

    Each result includes the server_id and the permission_id of
    the users permission in the server.
    """
    return jsonify(current_user.joined_servers), 200


@server_routes.route("/<int:id>")
def get_server_by_id(id):
    """
    Get a server's details by its id
    """
    server = Server.query.get(id)

    if server:
        return jsonify(server.to_dict())
    return jsonify(None), 404


@server_routes.route("/<int:id>/memberships", methods=["POST"])
def join_server_by_id(id):
    """
    Attempt to join a server by its id

    If the server is private fail; private servers can only be
    joined by invite link.
    """
    server = Server.query.get(id)

    # if server does not exist
    if server is None:
        return jsonify({
            "message": "Server not found",
            "status_code": 404,
        }), 404

    # check if user is already a member

    membership = ServerMember.query.filter(ServerMember.user_id == current_user.id).filter(ServerMember.server_id == id).first()
    print(membership)
    if (membership is not None):
        # check if user is banned
        permission = membership.permission.name
        if permission == "banned":
            return jsonify({
                "message": "User is banned",
                "status_code": 401,
            }), 401

        # user is already a member error
        return jsonify({
            "message": "User is already a member",
            "status_code": 400,
        }), 400

    # create user membership
    new_membership = ServerMember(server_id=id, user_id=current_user.id)

    db.session.add(new_membership)
    db.session.commit()

    return new_membership.to_dict(), 201
