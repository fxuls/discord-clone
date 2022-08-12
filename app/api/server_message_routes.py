from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.direct_message_routes import MESSAGE_NOT_EXIST
from app.api.server_routes import USER_IS_BANNED, USER_NOT_MEMBER
from app.models import db, ServerMessage, Server, ServerMember

server_message_routes = Blueprint("server-messages", __name__)

SERVER_NOT_EXIST = {
    "message": "Server does not exist",
    "status_code": 404,
}

CHANNEL_ID_REQUIRED = {
    "message": "channel_id is required",
    "status_code": 400,
}

CONTENT_MISSING = {
    "message": "Content missing",
    "status_code": 400,
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



@server_message_routes.route("/servers/<int:id>/messages", methods=["POST"])
@login_required
def post_message_to_server(id):
    """
    Sends a new message to a server channel
    """
    # check that server exists
    server = Server.query.get(id)
    if server is None:
        return jsonify(SERVER_NOT_EXIST), 404

    body = request.get_json()

    # if channel_id not provided
    if "channel_id" not in body:
        return jsonify(CHANNEL_ID_REQUIRED), 400

    # if message content is missing
    if "text" not in body and "image_id" not in body:
        return jsonify(CONTENT_MISSING), 400

    # check if user is a member of server
    membership = ServerMember.query.filter(ServerMember.server_id == id, ServerMember.user_id == current_user.id).first()
    if membership is None:
        return jsonify(USER_NOT_MEMBER)

    # check that user is not banned
    if membership.permission.name == "banned":
        return jsonify(USER_IS_BANNED), 401

    # create message
    message = ServerMessage(
        sender_id=current_user.id,
        server_id=id,
        channel_id=body["channel_id"],
        text=(body["text"] if "text" in body else None),
        image_id=(body["image_id"] if "image_id" in body else None),
    )

    # add the message to db and return it
    db.session.add(message)
    db.session.commit()

    return jsonify(message.to_dict()), 201


@server_message_routes.route("/messages/<int:message_id>")
@login_required
def delete_message(message_id):
    """
    Delete a server message by its id
    """
    message = ServerMessage.query.get(id)

    # check that message exists
    if message is None:
        return jsonify(MESSAGE_NOT_EXIST), 404

    membership = ServerMember.query.filter(ServerMember.server_id == server_id, ServerMember.user_id == current_user.id).first()

    # check if user is a member of this server
    if membership is None:
        return jsonify(USER_NOT_MEMBER), 400

    permission_level = membership.permission.permission

    # check if user is banned
    if permission_level == 1:
        return jsonify(USER_IS_BANNED), 401

    # check if has permission to delete the message
    if message.sender_id != current_user.id and permission_level < 3:
        return jsonify({
            "message": "No permission to delete this message",
            "status_code": 401,
        }), 401

    # delete the message
    db.session.delete(message)
    db.session.commit()

    return jsonify({
        "message": "Successfuly delete",
        "status_code": 200,
    }), 200
