from app.models import db, ServerMember


# add server member seeds
def seed_server_members():
    server_members = [
        ServerMember(server_id=1, user_id=1, permission_id=4),
        ServerMember(server_id=1, user_id=3, permission_id=3),
        ServerMember(server_id=1, user_id=2),

        ServerMember(server_id=2, user_id=1, permission_id=4),
        ServerMember(server_id=2, user_id=4),

        ServerMember(server_id=3, user_id=2, permission_id=4),
        ServerMember(server_id=3, user_id=3, permission_id=1),
        ServerMember(server_id=3, user_id=1),

        ServerMember(server_id=4, user_id=3, permission_id=4),
        ServerMember(server_id=4, user_id=4, permission_id=3),
        ServerMember(server_id=4, user_id=5),
    ]

    db.session.add_all(server_members)
    db.session.commit()


# truncate server_members table
# remove data, reset primary key, cascade delete dependent
def undo_server_members():
    db.session.execute("TRUNCATE server_members RESTART IDENTITY CASCADE;")
    db.session.commit()
