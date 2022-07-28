from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(120), nullable=False, unique=True)

    def to_dict(self): {
        'id': self.id,
        'url': self.url,
    }
