from .db import db


class FriendRequest(db.Model):
    __tablename__ = "friend_requests"
    __table_args__ = (db.UniqueConstraint("sending_user_id", "receiving_user_id"),)

    id = db.Column(db.Integer, primary_key=True)
    sending_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    receiving_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    sending_user = db.relationship("User", foreign_keys=[sending_user_id], back_populates="sent_friend_requests")
    receiving_user = db.relationship("User", foreign_keys=[receiving_user_id], back_populates="incoming_friend_requests")

    def to_dict(self):
        friend_request_dict = {
            "id": self.id,
            "sending_user_id": self.sending_user_id,
            "receiving_user_id": self.receiving_user_id,
        }

        return friend_request_dict
