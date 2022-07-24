from flask.cli import AppGroup
from .statuses import seed_statuses, undo_statuses
from .images import seed_images, undo_images
from .users import seed_users, undo_users
from .friend_requests import seed_friend_requests, undo_friend_requests
from .friends import seed_friends, undo_friends
from .servers import seed_servers, undo_servers

# creates a seed group to hold our commands
# so we can type `flask seed --help`
seed_commands = AppGroup('seed')


# create the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_statuses()
    seed_images()
    seed_users()
    seed_friend_requests()
    seed_friends()
    seed_servers()


# create the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_servers()
    undo_friends()
    undo_friend_requests()
    undo_users()
    undo_images()
    undo_statuses()
