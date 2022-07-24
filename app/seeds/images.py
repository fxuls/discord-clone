from app.models import db, Image

# add images seeds
def seed_images():
    images = [
        Image(url="/assets/absjcjwd.png"),
        Image(url="/assets/awjdadn.png"),
        Image(url="/assets/adw7a2ad.png"),
        Image(url="/assets/bnkze2dl.png"),
        Image(url="/assets/awjdnawjd.png"),
        Image(url="/assets/2jkanj8.png"),
        Image(url="/assets/najnd221.png"),
        Image(url="/assets/jnakwdn2.png"),
    ]

    db.session.add_all(images)
    db.session.commit()


# truncate images table
# remove data, reset primary key, cascade delete dependent
def undo_images():
    db.session.execute("TRUNCATE images RESTART IDENTITY CASCADE;")
    db.session.commit()
