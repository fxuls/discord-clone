from .db import db

class Channel(db.Model):
    __tablename__ = "channels"
    __table_args__ = (db.UniqueConstraint("server_id", "name"),)

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=False)
    name = db.Column(db.String(40), nullable=False)

    server = db.relationship("Server", back_populates="channels")
    messages = db.relationship("ServerMessage", back_populates="channel", cascade="all, delete-orphan")

    def to_dict(self):
        channel_dict = {
            "id": self.id,
            "server_id": self.server_id,
            "name": self.name,
        }

        return channel_dict
