import re

from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(320))
    banner_color = db.Column(db.String(10))
    status_id = db.Column(
        db.Integer, db.ForeignKey("statuses.id"), default=1, nullable=False
    )
    profile_image_id = db.Column(
        db.Integer, db.ForeignKey("images.id", ondelete="SET NULL"), nullable=True
    )

    status = db.relationship("Status", lazy="joined")
    profile_image = db.relationship("Image", lazy="joined")
    owned_servers = db.relationship("Server", cascade="all, delete-orphan")
    server_memberships = db.relationship("ServerMember", cascade="all, delete-orphan")
    sent_server_messages = db.relationship("ServerMessage", cascade="all, delete-orphan")

    sent_friend_requests = db.relationship(
        "FriendRequest",
        foreign_keys="FriendRequest.sending_user_id",
        cascade="all, delete-orphan",
    )
    incoming_friend_requests = db.relationship(
        "FriendRequest",
        foreign_keys="FriendRequest.receiving_user_id",
        cascade="all, delete-orphan",
    )

    friends_left = db.relationship(
        "Friend",
        foreign_keys="Friend.user_one_id",
        cascade="all, delete-orphan",
    )
    friends_right = db.relationship(
        "Friend",
        foreign_keys="Friend.user_two_id",
        cascade="all, delete-orphan",
    )

    direct_chats_left = db.relationship("DirectMessageChat", foreign_keys="DirectMessageChat.user_one_id", cascade="all, delete-orphan")
    direct_chats_right = db.relationship("DirectMessageChat", foreign_keys="DirectMessageChat.user_two_id", cascade="all, delete-orphan")

    @property
    def direct_message_chats(self):
        chats = []

        chats += [{
            "id": chat.id,
            "partner_id": chat.user_two_id,
        } for chat in self.direct_chats_left]
        chats += [{
            "id": chat.id,
            "partner_id": chat.user_one_id,
        } for chat in self.direct_chats_right]

        return chats

    @property
    def joined_servers(self):
        joined_servers = []
        for i in range(len(self.server_memberships)):
            membership = self.server_memberships[i].to_dict()
            joined_servers.append({
                "server_id": membership["server_id"],
                "permission": membership["permission"],
            })
        return joined_servers

    @property
    def friends(self):
        friends = []
        friends += [friend.user_two.to_dict() for friend in self.friends_left]
        friends += [friend.user_one.to_dict() for friend in self.friends_right]

        return friends

    @property
    def friend_requests(self):
        friend_requests = {
            "sent": [],
            "incoming": [],
        }

        for i in range(0, len(self.sent_friend_requests)):
            friend_requests["sent"].append(
                {
                    "id": self.sent_friend_requests[i].id,
                    "user_id": self.sent_friend_requests[i].receiving_user_id,
                }
            )

        for i in range(0, len(self.incoming_friend_requests)):
            friend_requests["incoming"].append(
                {
                    "id": self.incoming_friend_requests[i].id,
                    "user_id": self.incoming_friend_requests[i].sending_user_id,
                }
            )

        return friend_requests

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        user_dict = {
            "id": self.id,
            "username": self.username,
            "bio": self.bio,
            "banner_color": self.banner_color,
        }

        if self.status is not None:
            user_dict["status"] = self.status.status
        if self.profile_image is not None:
            user_dict["profile_image_url"] = self.profile_image.url

        return user_dict


def username_is_valid(username):
    return re.match('^.{3,40}#[0-9]{4}$', username)
