from datetime import datetime
from .db import db


class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    direct_message_chat_id = db.Column(db.Integer, db.ForeignKey("direct_message_chats.id"), nullable=False)
    text = db.Column(db.String(800))
    image_id = db.Column(db.Integer, db.ForeignKey("images.id"))
    sent_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    sender = db.relationship("User")
    direct_message_chat = db.relationship("DirectMessageChat", back_populates="messages")
    image = db.relationship("Image")

    def to_dict(self):
        direct_message_dict = {
            "id": self.id,
            "sender_id": self.sender_id,
            "direct_message_chat_id": self.direct_message_chat_id,
            "text": self.text,
            "sent_at": self.sent_at,
        }

        if self.image is not None: direct_message_dict["image_url"] = self.image.url

        return direct_message_dict
