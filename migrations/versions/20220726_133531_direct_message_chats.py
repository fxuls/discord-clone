"""direct_message_chats

Revision ID: 5f55a13601ad
Revises: 65204d234002
Create Date: 2022-07-26 13:35:31.083907

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5f55a13601ad'
down_revision = '65204d234002'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('direct_message_chats',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_one_id', sa.Integer(), nullable=False),
    sa.Column('user_two_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_one_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_two_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_one_id', 'user_two_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('direct_message_chats')
    # ### end Alembic commands ###
