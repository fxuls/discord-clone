from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Friend

user_routes = Blueprint('users', __name__)

USER_NOT_FOUND = {
    "message": "Server not found",
    "status_code": 404,
}

USERS_NOT_FRIENDS = {
    "message": "Users are not friends",
    "status_code": 400,
}


@user_routes.route("/")
@login_required
def users():
    users = [user.to_dict() for user in User.query.all()]
    return jsonify(users)


@user_routes.route("/<int:id>")
@login_required
def user(id):
    user = User.query.get(id)

    if user:
        return user.to_dict()
    return jsonify(USER_NOT_FOUND), 404


@user_routes.route("/friends")
@login_required
def get_friends():
    return jsonify(current_user.friends), 200


@user_routes.route("/friends/<int:id>", methods=["DELETE"])
@login_required
def remove_friend(id):
    """
    Remove a friend
    """
    # find the friend obj
    friendship = Friend.query.filter(Friend.user_one_id == current_user.id, Friend.user_two_id == id).first()
    if friendship is None:
        friendship = Friend.query.filter(Friend.user_one_id == id, Friend.user_two_id == current_user.id).first()

    if friendship is None:
        return jsonify(USERS_NOT_FRIENDS), 400

    db.session.delete(friendship)
    db.session.commit()

    return jsonify({
        "message": "Successfully unfriended user",
        "status": 200,
    }), 200


@user_routes.route("/friends/requests")
@login_required
def get_friend_requests():
    """
    Get a list of users incoming and outgoing friend requests
    """
    return jsonify(current_user.friend_requests), 200
