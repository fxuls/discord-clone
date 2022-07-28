from app.models import db, DirectMessageChat


# add direct message chats seeds
def seed_direct_message_chats():
    chats = [
        DirectMessageChat(user_one_id=1, user_two_id=2),
        DirectMessageChat(user_one_id=3, user_two_id=1),
        DirectMessageChat(user_one_id=1, user_two_id=4),
        DirectMessageChat(user_one_id=2, user_two_id=3),
        DirectMessageChat(user_one_id=2, user_two_id=5),
        DirectMessageChat(user_one_id=3, user_two_id=4),
    ]

    db.session.add_all(chats)
    db.session.commit()


# truncate direct_message_chats table
# remove data, reset primary key, cascade delete dependent
def undo_direct_message_chats():
    db.session.execute("TRUNCATE direct_message_chats RESTART IDENTITY CASCADE;")
    db.session.commit()
