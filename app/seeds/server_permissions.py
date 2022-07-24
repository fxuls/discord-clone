from app.models import db, ServerPermission

# add the default server permissions
def seed_server_permissions():
    banned = ServerPermission(permission=1, name="banned")
    member = ServerPermission(permission=2, name="member")
    moderator = ServerPermission(permission=3, name="moderator")
    admin = ServerPermission(permission=4, name="admin")

    db.session.add_all([banned, member, moderator, admin])
    db.session.commit()


# truncate server_permissions table
# remove data, reset primary key, cascade delete dependent entries
def undo_server_permissions():
    db.session.execute("TRUNCATE server_permissions RESTART IDENTITY CASCADE;")
    db.session.commit()
