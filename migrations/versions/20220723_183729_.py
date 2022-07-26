"""empty message

Revision ID: 700fc51f6237
Revises: 706fdc30f425
Create Date: 2022-07-23 18:37:29.770122

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '700fc51f6237'
down_revision = '706fdc30f425'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('friends',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_one_id', sa.Integer(), nullable=False),
    sa.Column('user_two_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_one_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_two_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_one_id', 'user_two_id')
    )
    op.alter_column('users', 'status_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'status_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_table('friends')
    # ### end Alembic commands ###
