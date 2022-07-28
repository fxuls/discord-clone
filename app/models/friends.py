from .db import db

class Friend(db.Model):
    __tablename__ = "friends"
    __table_args__ = (db.UniqueConstraint("user_one_id", "user_two_id"),)

    id = db.Column(db.Integer, primary_key=True)
    user_one_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_two_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user_one = db.relationship("User", foreign_keys=[user_one_id], back_populates="friends_left")
    user_two = db.relationship("User", foreign_keys=[user_two_id], back_populates="friends_right")

    def to_dict(self):
        friend_dict = {
            "id": self.id,
            "user_one_id": self.user_one_id,
            "user_two_id": self.user_two_id,
        }

        return friend_dict
