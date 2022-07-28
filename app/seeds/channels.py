from app.models import db, Channel

# add channels seeds
def seed_channels():
    channels = [
        Channel(server_id=1, name="general"),
        Channel(server_id=1, name="board-game-discussion"),
        Channel(server_id=1, name="meeting-times"),
        Channel(server_id=2, name="general"),
        Channel(server_id=2, name="study-guides"),
        Channel(server_id=3, name="general"),
        Channel(server_id=3, name="movie-recommendations"),
        Channel(server_id=4, name="general"),
        Channel(server_id=4, name="dog-pictures"),
        Channel(server_id=4, name="cat-pictures"),
    ]

    db.session.add_all(channels)
    db.session.commit()


# truncate channels table
# remove data, reset primary key, cascade delete dependent
def undo_channels():
    db.session.execute("TRUNCATE channels RESTART IDENTITY CASCADE;")
    db.session.commit()
