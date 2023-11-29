from sqlalchemy.orm import Session
from models.mails import Mail
from schemas.mails import MailInternalSchema

def get_mail_by_id(session: Session, id: int):
   return session.query(Mail).filter(Mail.id == id).first()

def get_all_mails_by_user_id(session: Session, user_id: int):
   return session.query(Mail).filter(Mail.to_user_id == user_id).all()

def get_all_mails_by_user_id_to_user_id(session: Session, user_id: int, to_user_id: int):
   return session.query(Mail).filter(Mail.from_user_id == user_id, Mail.to_user_id == to_user_id).all()

def create_mail(session: Session, mail: MailInternalSchema):
   db_mail = Mail(**mail.dict())
   session.add(db_mail)
   session.commit()
   session.refresh(db_mail)
   return db_mail

def update_mail_by_id(session: Session, id: int, mail: MailInternalSchema):
   try:
       db_mail = get_mail_by_id(session, id)
       db_mail.subject = mail.subject
       db_mail.content = mail.content
       session.add(db_mail)
       session.commit()
       session.refresh(db_mail)
       return db_mail
   except:
       return None

def delete_mail(session: Session, mail: Mail):
   try:
       session.delete(mail)
       session.commit()
       return True
   except Exception as e:
       print(e)
       return False
   
def delete_mail_by_id(session: Session, id: int):
   try:
       session.query(Mail).filter(Mail.id == id).delete()
       session.commit()
       return True
   except Exception as e:
       print(e)
       return False
   
def delete_all_mails_by_user_id(session: Session, user_id: int):
   try:
       session.query(Mail).filter(Mail.from_user_id == user_id).delete()
       session.commit()
       return True
   except Exception as e:
       print(e)
       return False
   
def delete_all_mails(session: Session):
   try:
       session.query(Mail).delete()
       session.commit()
       return True
   except Exception as e:
       print(e)
       return False
