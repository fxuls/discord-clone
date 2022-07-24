from .db import db


class ServerPermission(db.Model):
    __tablename__ = "server_permissions"

    id = db.Column(db.Integer, primary_key=True)
    server_permission = db.Column(db.String(15), nullable=False, unique=True)

    def to_dict(self):
        server_permission_dict = {
            "id": self.id,
            "server_permission": self.server_permission,
        }

        return server_permission_dict
