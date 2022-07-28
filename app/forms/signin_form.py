from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from sqlalchemy import func


def user_exists(form, field):
    # Checking if user with provided email exists
    email = field.data
    user = User.query.filter(func.lower(User.email) == email.lower()).first()
    if not user:
        raise ValidationError("Email not found")


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data["email"]
    user = User.query.filter(func.lower(User.email) == email.lower()).first()
    if not user:
        raise ValidationError("User does not exist")
    if not user.check_password(password):
        raise ValidationError("Password is incorrect")


class SignInForm(FlaskForm):
    email = StringField("email", validators=[DataRequired(), Email(), user_exists])
    password = StringField("password", validators=[DataRequired(), password_matches])
