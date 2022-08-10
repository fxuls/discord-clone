from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, DirectMessageChat

direct_message_routes = Blueprint("direct-messages", __name__)

USER_NOT_MEMBER = {
    "message": "User is not a member of this chat",
    "status_code": 401,
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
            "userId": user_id,
            "messages": [message.to_dict() for message in chat.messages]
        }
    return jsonify(direct_messages), 200


@direct_message_routes.route("/<int:id>")
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
