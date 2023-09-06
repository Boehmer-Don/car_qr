"""floats

Revision ID: febd88f578fc
Revises: 8954181a06e2
Create Date: 2023-09-06 18:54:57.240426

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'febd88f578fc'
down_revision = '8954181a06e2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('labels', schema=None) as batch_op:
        batch_op.alter_column('mileage',
               existing_type=sa.INTEGER(),
               type_=sa.Float(),
               existing_nullable=False)
        batch_op.alter_column('price',
               existing_type=sa.INTEGER(),
               type_=sa.Float(),
               existing_nullable=False)
        batch_op.alter_column('price_sold',
               existing_type=sa.INTEGER(),
               type_=sa.Float(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('labels', schema=None) as batch_op:
        batch_op.alter_column('price_sold',
               existing_type=sa.Float(),
               type_=sa.INTEGER(),
               existing_nullable=True)
        batch_op.alter_column('price',
               existing_type=sa.Float(),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('mileage',
               existing_type=sa.Float(),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###
