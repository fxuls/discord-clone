from app.models import db, Image

# add images seeds
def seed_images():
    images = [
        Image(url="/assets/zerotwo.jpeg"),
        Image(url="/assets/masterchief.png"),
        Image(url="/assets/cat.jpeg"),
        Image(url="/assets/bnkze2dl.png"),
        Image(url="/assets/the-board-game-group.jpeg"),
        Image(url="/assets/science.jpeg"),
        Image(url="/assets/popcorn.jpeg"),
        Image(url="/assets/molly.jpeg"),
        Image(url="/assets/study-guide-1.png"),
        Image(url="/assets/study-guide-2.png"),
        Image(url="/assets/ex-machina.png"),
        Image(url="/assets/dog-picture1.png"),
        Image(url="/assets/dog-picture2.png"),
        Image(url="/assets/cat-picture1.png"),
    ]

    db.session.add_all(images)
    db.session.commit()


# truncate images table
# remove data, reset primary key, cascade delete dependent
def undo_images():
    db.session.execute("TRUNCATE images RESTART IDENTITY CASCADE;")
    db.session.commit()
