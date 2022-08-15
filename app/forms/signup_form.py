from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from sqlalchemy import func
from app.models import User
from app.models.user import username_is_valid


def user_exists(form, field):
    # check if user exists
    email = field.data
    user = User.query.filter(func.lower(User.email) == email.lower()).first()
    if user:
        raise ValidationError("Email address is already in use")


def username_exists(form, field):
    # check if username is already in use
    username = field.data
    user = User.query.filter(func.lower(User.username) == username.lower()).first()
    if user:
        raise ValidationError("Username is taken")


def username_follows_format(form, field):
    # check if username follows correct format
    if not username_is_valid(field.data):
        raise ValidationError("Username is not formatted correctly")


class SignUpForm(FlaskForm):
    username = StringField(
        "username", validators=[DataRequired(), Length(min=3, max=40), username_follows_format, username_exists]
    )
    email = StringField("email", validators=[DataRequired(), Email(), Length(max=255), user_exists])
    password = StringField("password", validators=[DataRequired(), Length(min=8)])
