from app.models import db, User


# add users seed
def seed_users():
    users = [
        User(
            username="demo#1234",
            password="password",
            bio="I love this website! Feel free to message me :)",
            banner_color="#6f27b8",
            profile_image_id=1,
        ),
        User(
            username="SuperUser#1112",
            password="password",
            bio="I enjoy playing games! I mostly will be playing games if I'm online",
            banner_color="#2eb827",
            profile_image_id=2,
        ),
        User(
            username="Bobbie#9291",
            password="password",
            banner_color="#de667a",
            profile_image_id=3,
            status_id=4,
        ),
        User(
            username="LazyUser#0000",
            password="password",
        ),
        User(
            username="TonyDino#2102",
            password="password",
            bio="Hey guys!",
        ),
    ]

    db.session.add_all(users)
    db.session.commit()


# truncate statuses table
# remove data, reset primary key, cascade delete dependent entries
def undo_users():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()
