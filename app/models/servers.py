import random
import string

from .db import db

class Server(db.Model):
    def generate_url(length = 12):
        return ''.join(random.choice(string.ascii_letters + string.digits) for x in range(length))

    __tablename__ = "servers"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    invite_url = db.Column(db.String(120), default=generate_url())
    server_image_id = db.Column(db.Integer, db.ForeignKey("images.id", ondelete="SET NULL"))
    public = db.Column(db.Boolean, nullable=False, default=True)

    owner = db.relationship("User", back_populates="owned_servers")
    server_image = db.relationship("Image", lazy="joined")
