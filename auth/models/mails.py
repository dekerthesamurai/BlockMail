from sqlalchemy import (
    LargeBinary,
    Column,
    String,
    Text,
    Integer,
    Boolean,
    UniqueConstraint,
    PrimaryKeyConstraint,
)

import jwt
import bcrypt

from dependencies.db_initializer import Base

import settings
from datetime import datetime, timedelta


class Mail(Base):
    """Models a user table"""

    __tablename__ = "mails"
    id = Column(Integer, nullable=False, primary_key=True)
    from_user_id = Column(Integer, nullable=False, unique=False)
    to_user_id = Column(Integer, nullable=False, unique=False)
    subject = Column(String(225), nullable=False)
    content = Column(String(225), nullable=False)


    PrimaryKeyConstraint("id", name="pk_code_id")

    

    
