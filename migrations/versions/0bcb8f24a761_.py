"""empty message

Revision ID: 0bcb8f24a761
Revises: e81bf295f53e
Create Date: 2023-09-27 15:16:51.698572

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '0bcb8f24a761'
down_revision = 'e81bf295f53e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('apscheduler_jobs', schema=None) as batch_op:
        batch_op.drop_index('ix_apscheduler_jobs_next_run_time')

    op.drop_table('apscheduler_jobs')
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('extra_emails', sa.String(length=255), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('extra_emails')

    op.create_table('apscheduler_jobs',
    sa.Column('id', sa.VARCHAR(length=191), autoincrement=False, nullable=False),
    sa.Column('next_run_time', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True),
    sa.Column('job_state', postgresql.BYTEA(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='apscheduler_jobs_pkey')
    )
    with op.batch_alter_table('apscheduler_jobs', schema=None) as batch_op:
        batch_op.create_index('ix_apscheduler_jobs_next_run_time', ['next_run_time'], unique=False)

    # ### end Alembic commands ###