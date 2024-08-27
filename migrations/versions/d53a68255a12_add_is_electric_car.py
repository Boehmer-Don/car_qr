"""add is electric car

Revision ID: d53a68255a12
Revises: 63268b867b4f
Create Date: 2024-08-26 08:38:52.813393

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "d53a68255a12"
down_revision = "63268b867b4f"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    op.drop_table("apscheduler_jobs")
    with op.batch_alter_table("sale_reports", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                "is_electric_car", sa.Boolean(), nullable=False, server_default="0"
            )
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("sale_reports", schema=None) as batch_op:
        batch_op.drop_column("is_electric_car")

    # ### end Alembic commands ###