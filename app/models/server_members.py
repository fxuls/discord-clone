from .db import db


class ServerMember(db.Model):
    __tablename__ = "server_members"
    __table_args__ = (db.UniqueConstraint("user_id", "server_id"),)


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=False)
    permission_id = db.Column(
        db.Integer, db.ForeignKey("server_permissions.id"), nullable=False, default=2
    )  # default to member

    user = db.relationship("User", back_populates="server_memberships")
    server = db.relationship("Server", back_populates="members")
    permission = db.relationship("ServerPermission")

    def to_dict(self):
        server_member_dict = {
            "id": self.id,
            "user": self.user.to_dict(),
            "server_id": self.server_id,
            "permission": self.permission.to_dict()
        }

        return server_member_dict
