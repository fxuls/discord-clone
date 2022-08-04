import random
import string

from .db import db


def generate_url(length=12):
    return "".join(
        random.choice(string.ascii_letters + string.digits) for x in range(length)
    )


class Server(db.Model):
    __tablename__ = "servers"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    invite_url = db.Column(db.String(120), default=lambda: generate_url())
    server_image_id = db.Column(
        db.Integer, db.ForeignKey("images.id", ondelete="SET NULL")
    )
    public = db.Column(db.Boolean, nullable=False, default=True)

    owner = db.relationship("User", back_populates="owned_servers")
    server_image = db.relationship("Image", lazy="joined")

    members = db.relationship("ServerMember", cascade="all, delete-orphan")
    channels = db.relationship("Channel", cascade="all, delete-orphan")
    messages = db.relationship("ServerMessage", cascade="all, delete-orphan")

    def get_member_permission(self, user_id):
        for member in self.members:
            values = member.to_dict()
            if (values["user_id"] == user_id):
                return {
                    "user_id": values["user_id"],
                    "permission": {
                        "name": values["permission"]["name"],
                        "permission": values["permission"]["permission"],
                    },
                }
        return None

    def to_dict(self):
        server_dict = {
            "id": self.id,
            "name": self.name,
            "owner_id": self.owner_id,
            "public": self.public,
            "member_count": len(self.members),
        }

        if self.invite_url is not None:
            server_dict["invite_url"] = self.invite_url
        if self.server_image is not None:
            server_dict["server_image_url"] = self.server_image.url

        return server_dict
