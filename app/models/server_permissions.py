from .db import db


class ServerPermission(db.Model):
    __tablename__ = "server_permissions"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15), nullable=False, unique=True)
    permission = db.Column(db.Integer, nullable=False, unique=True)

    def to_dict(self):
        server_permission_dict = {
            "id": self.id,
            "name": self.name,
            "permission": self.permission,
        }

        return server_permission_dict
