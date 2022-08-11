from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, DirectMessageChat, DirectMessage

direct_message_routes = Blueprint("direct-messages", __name__)

USER_NOT_MEMBER = {
    "message": "User is not a member of this chat",
    "status_code": 401,
}

MESSAGE_NOT_EXIST = {
    "message": "Message does not exist",
    "status_code": 404,
}

CHAT_NOT_EXIST = {
    "message": "Chat does not exist",
    "status_code": 404,
}


@direct_message_routes.route("")
@login_required
def get_direct_messages():
    """
    Get all the current user's direct message chats and their
    messages
    """
    direct_messages = {}
    direct_message_chats = current_user.direct_message_chats
    for i in range(0, len(direct_message_chats)):
        user_id = direct_message_chats[i]["partner_id"]
        chat_id = direct_message_chats[i]["id"]
        chat = DirectMessageChat.query.get(chat_id)
        direct_messages[chat_id] = {
            "id": chat_id,
            "userId": user_id,
            "messages": [message.to_dict() for message in chat.messages]
        }
    return jsonify(direct_messages), 200


@direct_message_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_direct_message_chat(id):
    """
    Delete a direct message conversation by its id
    """
    chat = DirectMessageChat.query.get(id)

    # check that chat exists and user is a member of the chat
    if chat is None or current_user.id not in (chat.user_one_id, chat.user_two_id):
        return jsonify(USER_NOT_MEMBER), 401

    # delete chat
    db.session.delete(chat)
    db.session.commit()

    return jsonify({
        "message": "Chat deleted",
        "status_code": 200,
    }), 200



@direct_message_routes.route("/messages/<int:id>", methods=["DELETE"])
@login_required
def delete_message(id):
    """
    Delete a direct message by its id
    """
    message = DirectMessage.query.get(id)

    # check message exists
    if message is None:
        return jsonify(MESSAGE_NOT_EXIST), 404

    # check that current user is sender of message
    if current_user.id != message.sender_id:
        return jsonify({
            "message": "Message does not belong to user",
            "status_code": 401,
        }), 401

    # delete message
    db.session.delete(message)
    db.session.commit()

    return jsonify({
        "message": "Successfully deleted",
        "status_code": 200,
    }), 200


@direct_message_routes.route("/messages", methods=["POST"])
@login_required
def post_new_message():
    """
    Sends a new message to a chat
    """
    body = request.get_json()

    # if recipient_id not provided
    if "recipient_id" not in body:
        return jsonify({
            "message": "recipient_id is required",
            "status_code": 400,
        }), 400

    # if message content is missing
    if "text" not in body and "image_id" not in body:
        return jsonify({
            "message": "Content missing",
            "status_code": 400,
        }), 400

    # find the chat
    chat = DirectMessageChat.query.filter(DirectMessageChat.user_one_id == current_user.id, DirectMessageChat.user_two_id == body["recipient_id"]).first()
    if chat is None:
        chat = DirectMessageChat.query.filter(DirectMessageChat.user_one_id == body["recipient_id"], DirectMessageChat.user_two_id == current_user.id).first()

    if chat is None:
        return jsonify(CHAT_NOT_EXIST), 404

    # check that current user is a member of chat
    if current_user.id not in (chat.user_one_id, chat.user_two_id):
        return jsonify(USER_NOT_MEMBER), 401

    # create the message
    message = DirectMessage(
        sender_id=current_user.id,
        direct_message_chat_id=chat.id,
        text=(body["text"] if "text" in body else None),
        image_id=(body["image_id"] if "image_id" in body else None),
    )

    # add the message to db and return it
    db.session.add(message)
    db.session.commit()

    return jsonify(message.to_dict())
