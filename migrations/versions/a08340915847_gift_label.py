"""gift_label

Revision ID: a08340915847
Revises: 23a6d4f25c28
Create Date: 2023-08-30 09:19:03.060021

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a08340915847'
down_revision = '23a6d4f25c28'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('labels', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gift', sa.String(length=128), nullable=True))

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('gift')
        batch_op.drop_column('gift_enabled')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gift_enabled', sa.BOOLEAN(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('gift', sa.VARCHAR(length=128), autoincrement=False, nullable=True))

    with op.batch_alter_table('labels', schema=None) as batch_op:
        batch_op.drop_column('gift')

    # ### end Alembic commands ###