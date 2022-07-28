from datetime import datetime
from .db import db


class ServerMessage(db.Model):
    __tablename__ = "server_messages"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(
        db.Integer, db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    text = db.Column(db.String(800))
    image_id = db.Column(db.Integer, db.ForeignKey("images.id"))
    sent_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow
    )

    server = db.relationship("Server", back_populates="messages")
    channel = db.relationship("Channel", back_populates="messages")
    sender = db.relationship("User", back_populates="sent_server_messages")
    image = db.relationship("Image")

    def to_dict(self):
        server_message_dict = {
            "id": self.id,
            "server_id": self.server_id,
            "channel": self.channel.to_dict(),
            "text": self.text,
            "sent_at": self.sent_at,
            "sender": self.sender.to_dict() if self.sender else None,
        }

        if self.image is not None: server_message_dict["image_url"] = self.image.url

        return server_message_dict
