from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(320))
    banner_color = db.Column(db.String(10))
    status_id = db.Column(db.Integer, db.ForeignKey("statuses.id"), default=1)
    profile_image_id = db.Column(db.Integer, db.ForeignKey("images.id"))

    status = db.relationship("Status", lazy="joined")
    profile_image = db.relationship("Image", lazy="joined")


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
            'id': self.id,
            'username': self.username,
            'bio': self.bio,
            'banner_color': self.banner_color,
        }

        if self.status is not None: user_dict['status'] = self.status.status
        if self.profile_image is not None: user_dict['profile_image_url'] = self.profile_image.url

        return user_dict
