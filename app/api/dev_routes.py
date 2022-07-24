from flask import Blueprint, jsonify
from app.models import db, User, FriendRequest, Image
from app.models.servers import Server

dev_routes = Blueprint("dev", __name__)


@dev_routes.route("/users")
def test_route():
    user = User.query.get(1)
    print(user.status.to_dict())
    return jsonify(user.friend_requests), 200


@dev_routes.route("/fr")
def friend_requests():
    results = FriendRequest.query.all()
    friend_requests = [fr.to_dict() for fr in results]
    return jsonify(friend_requests), 200


@dev_routes.route("/del")
def delete_user():
    user = User.query.get(1)
    db.session.delete(user)
    db.session.commit()
    return "Deleted"


@dev_routes.route("/del/image")
def delete_image():
    image = Image.query.get(1)
    db.session.delete(image)
    db.session.commit()
    return "Deleted"


@dev_routes.route("/friends")
def get_friends():
    user = User.query.get(1)
    return jsonify(user.friends), 200


@dev_routes.route("/servers")
def get_owned_servers():
    user = User.query.get(1)
    return jsonify([server.to_dict() for server in user.owned_servers]), 200


@dev_routes.route("/server/owner")
def get_server_owner():
    server = Server.query.get(1)
    return jsonify(server.to_dict())


@dev_routes.route("/user-servers")
def user_servers():
    user = User.query.get(1)
    return jsonify(user.joined_servers), 200


@dev_routes.route("/server-channels")
def server_channels():
    server = Server.query.get(3)
    return jsonify([channel.to_dict() for channel in server.channels]), 200
