from app.models import db, ServerMessage


# add server message seeds
def seed_server_messages():
    server_messages = []

    s1_general = [
        ServerMessage(server_id=1, channel_id=1, sender_id=1, text="Hello world!", sent_at="2022-07-24 15:20:00"),
        ServerMessage(server_id=1, channel_id=1, sender_id=2, text="Hey guys, what's up?", sent_at="2022-07-25 20:01:00"),
        ServerMessage(server_id=1, channel_id=1, sender_id=3, text="Nothing much! Listening to music right now.", sent_at="2022-07-25 20:29:25"),
    ]
    server_messages += s1_general

    s1_board_game_discussion = [
        ServerMessage(server_id=1, channel_id=2, sender_id=2, text="So what games do you guys play?", sent_at="2022-07-25 08:15:00"),
        ServerMessage(server_id=1, channel_id=2, sender_id=1, text="I love D&D and monopoly.", sent_at="2022-07-25 10:55:00"),
        ServerMessage(server_id=1, channel_id=2, sender_id=2, text="I am a very good Monopoly player", sent_at="2022-07-25 11:04:00"),
        ServerMessage(server_id=1, channel_id=2, sender_id=1, text="looks like I finally have some competition then :)", sent_at="2022-07-25 11:09:00"),
    ]
    server_messages += s1_board_game_discussion

    s1_meeting_times = [
        ServerMessage(server_id=1, channel_id=3, sender_id=1, text="Hey everyone, We will be holding our weekly game night on Sunday's at 4pm EST.", sent_at="2022-07-25 20:29:00"),
    ]
    server_messages += s1_meeting_times

    s2_general = [
        ServerMessage(server_id=2, channel_id=4, sender_id=1, text="Who is ready for the midterm?", sent_at="2022-07-25 20:29:00"),
        ServerMessage(server_id=2, channel_id=4, sender_id=4, text="Not me!", sent_at="2022-07-25 20:29:00"),
        ServerMessage(server_id=2, channel_id=4, sender_id=3, text="Me either hahaha", sent_at="2022-07-25 20:29:00"),
    ]
    server_messages += s2_general

    s2_study_guides = [
        ServerMessage(server_id=2, channel_id=5, sender_id=4, text="Can someone send the study guide for the midterm?", sent_at="2022-07-25 20:29:00"),
        ServerMessage(server_id=2, channel_id=5, sender_id=1, text="I got it right here", image_id=9, sent_at="2022-07-25 20:29:00"),
        ServerMessage(server_id=2, channel_id=5, sender_id=1, image_id=10, sent_at="2022-07-25 20:29:00"),
    ]
    server_messages += s2_study_guides

    # leave this channel empty to test empty channels
    s3_general = []
    server_messages += s3_general

    s3_movie_recommendations = [
        ServerMessage(server_id=3, channel_id=7, sender_id=2, text="You guys should really try Ex Machina. It's super good", image_id=11, sent_at="2022-07-22 14:00:00"),
        ServerMessage(server_id=3, channel_id=7, sender_id=1, text="I have heard that is good. I'm current rewatching Lord of the Rings", sent_at="2022-07-22 18:33:54"),
        ServerMessage(server_id=3, channel_id=7, sender_id=1, text="I'm a hugeeeeee LOTR fan <3", sent_at="2022-07-22 19:12:04"),
    ]
    server_messages += s3_movie_recommendations

    s4_general = [
        ServerMessage(server_id=4, channel_id=8, sender_id=3, text="Let's see some pet pictures! Send them in the channels", image_id=11, sent_at="2022-07-22 18:41:15"),
        ServerMessage(server_id=4, channel_id=8, sender_id=4, text="Rodger that captain", sent_at="2022-07-22 18:50:10"),
        ServerMessage(server_id=4, channel_id=8, sender_id=4, text="Let me see if I can get Rodger to sit still for a photo...", sent_at="2022-07-22 19:33:44"),
    ]
    server_messages += s4_general

    s4_dog_pictures = [
        ServerMessage(server_id=4, channel_id=9, sender_id=5, image_id=12, sent_at="2022-07-22 21:30:00"),
        ServerMessage(server_id=4, channel_id=9, sender_id=3, image_id=13, sent_at="2022-07-22 21:30:00"),
    ]
    server_messages += s4_dog_pictures

    s4_cat_pictures = [
        ServerMessage(server_id=4, channel_id=10, sender_id=4, image_id=14, sent_at="2022-07-22 08:00:00"),
    ]
    server_messages += s4_cat_pictures

    db.session.add_all(server_messages)
    db.session.commit()


# truncate server_messages table
# remove data, reset primary key, cascade delete dependent
def undo_server_messages():
    db.session.execute("TRUNCATE server_messages RESTART IDENTITY CASCADE;")
    db.session.commit()
