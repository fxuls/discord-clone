"""direct_messages

Revision ID: 2a71ab340bf5
Revises: 5f55a13601ad
Create Date: 2022-07-27 20:06:44.556961

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2a71ab340bf5'
down_revision = '5f55a13601ad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('direct_messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=True),
    sa.Column('direct_message_chat_id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=800), nullable=True),
    sa.Column('image_id', sa.Integer(), nullable=True),
    sa.Column('sent_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['direct_message_chat_id'], ['direct_message_chats.id'], ),
    sa.ForeignKeyConstraint(['image_id'], ['images.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('direct_messages')
    # ### end Alembic commands ###
