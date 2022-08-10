from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import DirectMessageChat

direct_message_routes = Blueprint("direct-messages", __name__)


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
        direct_messages[user_id] = [message.to_dict() for message in chat.messages]
    return jsonify(direct_messages), 200
