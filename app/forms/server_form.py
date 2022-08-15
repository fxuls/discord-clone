from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Optional

class ServerForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(),])
    public = BooleanField("public", validators=[Optional()])
    server_image_url = StringField("server_image_url", validators=[Optional()])
