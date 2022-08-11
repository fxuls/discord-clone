from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Server, ServerMember, Channel, ServerPermission
from app.forms.server_form import ServerForm

server_routes = Blueprint("servers", __name__)

SERVER_NOT_FOUND = {
    "message": "Server not found",
    "status_code": 404,
}

USER_IS_BANNED = {
    "message": "User is banned",
    "status_code": 401,
}

SERVER_IS_PRIVATE = {
    "message": "Server is private",
    "status_code": 401,
}

USER_ALREADY_MEMBER = {
    "message": "User is already a member",
    "status_code": 400,
}

USER_NOT_MEMBER = {
    "message": "User is not a member",
    "status_code": 400,
}


@server_routes.route("/", methods=["GET"])
def get_servers():
    """
    Get a list of all of all servers
    """
    servers = [server.to_dict() for server in Server.query.all()]
    return jsonify(servers), 200


@server_routes.route("/<int:id>", methods=["GET"])
def get_server_by_id(id):
    """
    Get a server's details by its id
    """
    server = Server.query.get(id)

    if server:
        return jsonify(server.to_dict())
    return jsonify(SERVER_NOT_FOUND), 404


@server_routes.route("/joined", methods=["GET"])
@login_required
def get_joined_servers():
    """
    Get a list of all the server memberships the current user
    belongs to

    Each result includes the server_id and the permission_id of
    the users permission in the server.
    """
    return jsonify(current_user.joined_servers), 200


@server_routes.route("/<int:id>/memberships", methods=["POST"])
@login_required
def join_server_by_id(id):
    """
    Attempt to join a server by its id

    If the server is private fail; private servers can only be
    joined by invite link.
    """
    server = Server.query.get(id)

    # if server does not exist
    if server is None:
        return jsonify(SERVER_NOT_FOUND), 404

    # check if user is already a member

    membership = ServerMember.query.filter(ServerMember.user_id == current_user.id).filter(ServerMember.server_id == id).first()
    if membership is not None:
        # check if user is banned
        permission = membership.permission.name
        if permission == "banned":
            return jsonify(USER_IS_BANNED), 401

        # user is already a member error
        return jsonify(USER_ALREADY_MEMBER), 400

    # check if server is public
    if not server.public:
        return jsonify(SERVER_IS_PRIVATE), 401

    # create user membership
    new_membership = ServerMember(server_id=id, user_id=current_user.id)

    db.session.add(new_membership)
    db.session.commit()

    return new_membership.to_dict(), 201


@server_routes.route("/join/<path:invite_url>", methods=["GET", "POST"])
@login_required
def join_server_by_url(invite_url):
    """
    Attempt to join a server from its invite url
    """
    server = Server.query.filter(Server.invite_url == invite_url).first()

    # if server does not exist
    if server is None:
        return jsonify(SERVER_NOT_FOUND), 404

    membership = ServerMember.query.filter(ServerMember.user_id == current_user.id).filter(ServerMember.server_id == server.id).first()
    if membership is not None:
        # check if user is banned
        permission = membership.permission.name
        if permission == "banned":
            return jsonify(USER_IS_BANNED), 401

        # user is already a member error
        return jsonify(USER_ALREADY_MEMBER), 400

    # create user membership
    new_membership = ServerMember(server_id=server.id, user_id=current_user.id)

    db.session.add(new_membership)
    db.session.commit()

    return new_membership.to_dict(), 201


@server_routes.route("/<int:id>/memberships", methods=["DELETE"])
@login_required
def leave_server(id):
    """
    Leave a server by its id
    """
    server = Server.query.get(id)

    # if server does not exist
    if server is None:
        return jsonify(SERVER_NOT_FOUND), 404

    # check user is member
    membership = ServerMember.query.filter(ServerMember.user_id == current_user.id).filter(ServerMember.server_id == id).first()
    if membership is None:
        return jsonify(USER_NOT_MEMBER), 400

    # if user is banned do not remove entry
    if membership.permission.name == "banned":
        return jsonify(USER_IS_BANNED), 401

    # delete membership and return success
    db.session.delete(membership)
    db.session.commit()

    return jsonify({
        "message": "Successfully left server",
        "status_code": 200,
    }), 200


@server_routes.route("/<int:id>/channels", methods=["GET"])
@login_required
def get_server_channels(id):
    """
    Gets a list of channels for the server with parameter id
    """
    server = Server.query.get(id)

    # if server does not exist
    if server is None:
        return jsonify(SERVER_NOT_FOUND), 404

    # if server is private check that user is a member
    if not server.public:
        user_permission = server.get_member_permission(current_user.id)
        if user_permission is None or user_permission["permission"]["name"] == "banned":
            return jsonify(SERVER_IS_PRIVATE), 401

    return jsonify([channel.to_dict() for channel in server.channels]), 200

# TODO fix
# @server_routes.route("/", methods=["POST"])
# @login_required
# def create_server():
#     """
#     Create a new server
#     """
#     form = ServerForm()
#     if form.validate_on_submit():
#         # create server
#         server = Server(
#             owner_id = current_user.id,
#             name = form.data["name"],
#             public = form.data["name"],
#         )

#         # create a default general channel
#         channel = Channel(server_id=server.id, name="general")

#         # create membership in channel for owner as admin
#         # permission_id = ServerPermission.query.filter(ServerPermission.name == "admin").one().id
#         # membership = ServerMember(user_id=current_user.id, server_id=server.id, permission_id=permission_id)

#         db.session.add_all([server, channel, membership])
#         db.session.commit()

#         return "Created", 201
#         return jsonify(server.to_dict()), 201
#     return "Bad", 200
#     # return jsonify(form.errors), 200
