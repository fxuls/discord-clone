from flask.cli import AppGroup
from .statuses import seed_statuses, undo_statuses
from .images import seed_images, undo_images
from .users import seed_users, undo_users

# creates a seed group to hold our commands
# so we can type `flask seed --help`
seed_commands = AppGroup('seed')


# create the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_statuses()
    seed_images()
    seed_users()


# create the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_images()
    undo_statuses()
