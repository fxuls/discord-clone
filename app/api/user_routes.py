from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Friend, FriendRequest

user_routes = Blueprint("users", __name__)

USER_NOT_FOUND = {
    "message": "User not found",
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
    """
    Get current user's friends
    """
    return jsonify(current_user.friends), 200


@user_routes.route("/friends", methods=["POST"])
@login_required
def add_friend():
    """
    Create a friend request to a user or accept one if it
    already exists
    """
    body = request.get_json()

    # if username supplied look up user by username
    if "username" in body:
        user = User.query.filter(User.username == body["username"]).first()

        if user is None:
            return jsonify(USER_NOT_FOUND), 404

        id = user.id

    if "userId" in body:
        id = body["userId"]

    # check if users are already friends
    left_friendship = Friend.query.filter(Friend.user_one_id == current_user.id, Friend.user_two_id == id).first()
    right_friendship = Friend.query.filter(Friend.user_one_id == id, Friend.user_two_id == current_user.id).first()
    if left_friendship or right_friendship:
        return jsonify({
            "message": "Already friends",
            "status_code": 400,
        }), 400

    # check if friend request has already been sent
    sent_fr_req = FriendRequest.query.filter(FriendRequest.sending_user_id == current_user.id, FriendRequest.receiving_user_id == id).first()
    if sent_fr_req:
        return jsonify({
            "message": "Friend request already sent",
            "status_code": 400,
        }), 400

    # check if there is an existing friend request
    fr_req = FriendRequest.query.filter(FriendRequest.sending_user_id == id, FriendRequest.receiving_user_id == current_user.id).first()

    if fr_req is not None:
        # create friendship
        friendship = Friend(user_one_id=current_user.id, user_two_id=id)

        db.session.add(friendship)
        db.session.delete(fr_req)
        db.session.commit()

        return jsonify({
            "message": "Friend request accepted",
            "status_code": 201,
        }), 201

    # create friend request
    new_fr_req = FriendRequest(sending_user_id=current_user.id, receiving_user_id=id)

    db.session.add(new_fr_req)
    db.session.commit()

    return jsonify({
        "message": "Friend request sent",
        "status_code": 201,
    }), 201


@user_routes.route("/friends")


@user_routes.route("/<int:id>/friends", methods=["DELETE"])
@login_required
def remove_friend(id):
    """
    Remove a friend or cancel a pending friend request
    """
    # find the friend obj
    friendship = Friend.query.filter(Friend.user_one_id == current_user.id, Friend.user_two_id == id).first()
    if friendship is None:
        friendship = Friend.query.filter(Friend.user_one_id == id, Friend.user_two_id == current_user.id).first()

    if friendship is None:
        # check if there is an existing request
        fr_req = FriendRequest.query.filter(FriendRequest.sending_user_id == current_user.id, FriendRequest.receiving_user_id == id).first()
        if fr_req is None:
            fr_req = FriendRequest.query.filter(FriendRequest.sending_user_id == id, FriendRequest.receiving_user_id == current_user.id).first()

        if fr_req:
            # remove the friend request
            db.session.delete(fr_req)
            db.session.commit()

            return jsonify({
                "message": "Successfully deleted friend request",
                "status_code": 200,
            }), 200

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
