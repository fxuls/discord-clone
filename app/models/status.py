from .db import db

class Status(db.Model):
    __tablename__ = 'statuses'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(15), nullable=False, unique=True)

    def to_dict(self): {
        'id': self.id,
        'status': self.status,
    }
