from app.models import db, FriendRequest

# add friend_requests seeds
def seed_friend_requests():
    friend_requests = [
        FriendRequest(sending_user_id=1, receiving_user_id=5),
        FriendRequest(sending_user_id=2, receiving_user_id=3),
        FriendRequest(sending_user_id=3, receiving_user_id=1),
        FriendRequest(sending_user_id=2, receiving_user_id=1),
    ]

    db.session.add_all(friend_requests)
    db.session.commit()


# truncate friend_requests table
# remove data, reset primary key, cascade delete dependent
def undo_friend_requests():
    db.session.execute("TRUNCATE friend_requests RESTART IDENTITY CASCADE;")
    db.session.commit()
