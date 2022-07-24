from app.models import db, Friend


# add friends seeds
def seed_friends():
    friends = [
        Friend(user_one_id=1, user_two_id=2),
        Friend(user_one_id=4, user_two_id=1),
        Friend(user_one_id=5, user_two_id=4),
    ]

    db.session.add_all(friends)
    db.session.commit()


# truncate friends table
# remove data, reset primary key, cascade delete dependent
def undo_friends():
    db.session.execute("TRUNCATE friends RESTART IDENTITY CASCADE;")
    db.session.commit()
