from app.models import db, DirectMessage


# add direct message seeds
def seed_direct_messages():
    messages = []

    u1_u2 = [
        DirectMessage(direct_message_chat_id=1, sender_id=1, text="Hey, want to play?", sent_at="2022-07-26 15:20:00"),
        DirectMessage(direct_message_chat_id=1, sender_id=2, text="I'm busy rn but we can in a bit ok", sent_at="2022-07-26 15:20:01"),
        DirectMessage(direct_message_chat_id=1, sender_id=1, text="Sure just lmk", sent_at="2022-07-26 15:22:32"),
    ]
    messages += u1_u2

    u1_u3 = [
        DirectMessage(direct_message_chat_id=2, sender_id=3, text="I saw that ranked game lol", sent_at="2022-07-23 05:55:55"),
        DirectMessage(direct_message_chat_id=2, sender_id=1, text="We aren't going to talk about it......", sent_at="2022-07-26 10:05:02"),
    ]
    messages += u1_u3

    u1_u4 = [
        DirectMessage(direct_message_chat_id=3, sender_id=4, text="Hey! Saw you in the pet photo server and wanted to see if you could send me the pics of your dog directly", sent_at="2022-07-26 02:33:00"),
        DirectMessage(direct_message_chat_id=3, sender_id=1, text="Here you go :) She is super cute", image_id=8, sent_at="2022-07-26 02:40:00"),
        DirectMessage(direct_message_chat_id=3, sender_id=4, text="Soooo cute", sent_at="2022-07-26 05:00:32"),
    ]
    messages += u1_u4

    db.session.add_all(messages)
    db.session.commit()


# truncate direct_messages table
# remove data, reset primary key, cascade delete dependent
def undo_direct_messages():
    db.session.execute("TRUNCATE direct_messages RESTART IDENTITY CASCADE;")
    db.session.commit()
