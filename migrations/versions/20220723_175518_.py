"""empty message

Revision ID: 706fdc30f425
Revises: 
Create Date: 2022-07-23 17:55:18.727319

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '706fdc30f425'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('url')
    )
    op.create_table('statuses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=15), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('status')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.String(length=320), nullable=True),
    sa.Column('banner_color', sa.String(length=10), nullable=True),
    sa.Column('status_id', sa.Integer(), nullable=True),
    sa.Column('profile_image_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['profile_image_id'], ['images.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['status_id'], ['statuses.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('friend_requests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sending_user_id', sa.Integer(), nullable=False),
    sa.Column('receiving_user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['receiving_user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['sending_user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('sending_user_id', 'receiving_user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('friend_requests')
    op.drop_table('users')
    op.drop_table('statuses')
    op.drop_table('images')
    # ### end Alembic commands ###