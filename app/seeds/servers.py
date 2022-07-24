from app.models import db, Server

# add servers seed
def seed_servers():
    servers = [
        Server(
            owner_id=1,
            name="Board Gamers",
            server_image_id=5,
        ),
        Server(
            owner_id=1,
            name="Bio Study Group",
            server_image_id=6,
            public=False,
        ),
        Server(
            owner_id=2,
            name="Movie watchers",
            server_image_id=7,
        ),
        Server(
            owner_id=3,
            name="Pet photos central",
            server_image_id=8,
            public=False,
        ),
    ]

    db.session.add_all(servers)
    db.session.commit()


# truncate servers table
# remove data, reset primary key, cascade delete dependent entries
def undo_servers():
    db.session.execute("TRUNCATE servers RESTART IDENTITY CASCADE;")
    db.session.commit()
