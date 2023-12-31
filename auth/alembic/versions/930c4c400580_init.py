"""init

Revision ID: 930c4c400580
Revises: 
Create Date: 2023-10-29 23:32:41.372268

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '930c4c400580'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('codes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('code_title', sa.String(length=225), nullable=False),
    sa.Column('code_language', sa.String(length=225), nullable=False),
    sa.Column('code', sa.Text(), nullable=False),
    sa.Column('code_output', sa.Text(), nullable=False),
    sa.Column('code_input', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=225), nullable=False),
    sa.Column('hashed_password', sa.LargeBinary(), nullable=False),
    sa.Column('full_name', sa.String(length=225), nullable=False),
    sa.Column('year', sa.String(length=4), nullable=True),
    sa.Column('enrollment_number', sa.String(length=7), nullable=False),
    sa.Column('batch', sa.String(length=3), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('codes')
    # ### end Alembic commands ###
