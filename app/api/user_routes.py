from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)

USER_NOT_FOUND = {
    "message": "Server not found",
    "status_code": 404,
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
