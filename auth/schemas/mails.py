from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class MailExternalSchema(BaseModel):
    to_user: str
    subject: str
    content: str
    from_user: Optional[str]

class MailInternalSchema(BaseModel):
    from_user_id: int
    to_user_id: int
    subject: str
    content: str

    class Config:
        orm_mode = True

