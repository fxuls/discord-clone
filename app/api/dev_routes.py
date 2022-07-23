from flask import Blueprint

dev_routes = Blueprint('dev', __name__)

@dev_routes.route('/')
def test_route():
    return "Hi"
