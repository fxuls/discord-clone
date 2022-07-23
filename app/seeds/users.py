from app.models import db, User


# add users seed
def seed_users():
    demo = User(
        username="demo#1234",
        password="password",
        bio="I love this website! Feel free to message me :)",
        banner_color="#6f27b8",
        profile_image_id=1,
    )

    super = User(
        username="SuperUser#1112",
        password="password",
        bio="I enjoy playing games! I mostly will be playing games if I'm online",
        banner_color="#2eb827",
        profile_image_id=2,
    )

    bobbie = User(
        username="Bobbie#9291",
        password="password",
        banner_color="#de667a",
        profile_image_id=3,
        status_id=4,
    )

    lazy = User(
        username="LazyUser#0000",
        password="password",
    )

    db.session.add_all([demo, super, bobbie, lazy])
    db.session.commit()


# truncate statuses table
# remove data, reset primary key, cascade delete dependent entries
def undo_users():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()
