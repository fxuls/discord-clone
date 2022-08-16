import os
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, send, emit

from .models import db, User
from .api import api as api_routes
from .seeds import seed_commands
from .config import Config

app = Flask(__name__)
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://fxuls-discord-clone.herokuapp.com',
        'https://fxuls-discord-clone.herokuapp.com'
    ]
else:
    origins = "*"
socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)
# socketio = SocketIO(app, cors_allowed_origins="*")

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(api_routes)
db.init_app(app)
Migrate(app, db)
socketio.init_app(app)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    if path[0:6] == 'assets':
        return app.send_static_file(path[7:])
    return app.send_static_file('index.html')


@socketio.on("UPDATE_DIRECT_MESSAGE_CHAT")
def update_direct_message_chat(data):
    emit("UPDATE_DIRECT_MESSAGE_CHAT", data, broadcast=True)


@socketio.on("UPDATE_SERVER_MESSAGES")
def update_server_messages(data):
    emit("UPDATE_SERVER_MESSAGES", data, broadcast=True)


if __name__ == "__main__":
    socketio.run(app)
    # app.run(socketio.run(app))
