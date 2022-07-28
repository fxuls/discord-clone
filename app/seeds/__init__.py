from flask.cli import AppGroup
from .statuses import seed_statuses, undo_statuses
from .images import seed_images, undo_images
from .users import seed_users, undo_users
from .friend_requests import seed_friend_requests, undo_friend_requests
from .friends import seed_friends, undo_friends
from .servers import seed_servers, undo_servers
from .server_permissions import seed_server_permissions, undo_server_permissions
from .server_members import seed_server_members, undo_server_members
from .channels import seed_channels, undo_channels
from .server_messages import seed_server_messages, undo_server_messages
from .direct_message_chats import seed_direct_message_chats, undo_direct_message_chats
from .direct_messages import seed_direct_messages, undo_direct_messages

# creates a seed group to hold our commands
# so we can type `flask seed --help`
seed_commands = AppGroup("seed")


# create the `flask seed all` command
@seed_commands.command("all")
def seed():
    seed_statuses()
    seed_images()
    seed_users()
    seed_friend_requests()
    seed_friends()
    seed_servers()
    seed_server_permissions()
    seed_server_members()
    seed_channels()
    seed_server_messages()
    seed_direct_message_chats()
    seed_direct_messages()


# create the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_direct_messages()
    undo_direct_message_chats()
    undo_server_messages()
    undo_channels()
    undo_server_members()
    undo_server_permissions()
    undo_servers()
    undo_friends()
    undo_friend_requests()
    undo_users()
    undo_images()
    undo_statuses()
