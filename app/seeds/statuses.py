from app.models import db, Status

# add the default statuses
def seed_statuses():
    unset = Status(status="unset")
    busy = Status(status="busy")
    idle = Status(status="idle")
    offline = Status(status="offline")

    db.session.add_all([unset, busy, idle, offline])
    db.session.commit()


# truncate statuses table
# remove data, reset primary key, cascade delete dependent entries
def undo_statuses():
    db.session.execute("TRUNCATE statuses RESTART IDENTITY CASCADE;")
    db.session.commit()
