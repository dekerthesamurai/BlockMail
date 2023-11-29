from . import get_private_router, get_public_router

from typing import Dict

from fastapi import HTTPException, Depends, Body, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from domain.usecase import (
    mails as mails_usecase,
    validation as validation_usecase,
    profile as profile_usecase,
)
from dependencies.db_initializer import get_db, oauth2_scheme

from schemas.mails import (
    MailExternalSchema,
    MailInternalSchema
)

public_router = get_public_router()
private_router = get_private_router()

@private_router.post("/sendmail", response_model={})
def sendMail(
    mail: MailExternalSchema = Body(...),
    session: Session = Depends(get_db),
    token: str = Depends(validation_usecase.TokenValidation.is_token_invalid),

    ):
    try:
        user = profile_usecase.getSignedInUserDetail(
            token=token, session=session
        )

        to_user = profile_usecase.get_user_by_email(session=session, email=mail.to_user)

        mailObject = MailInternalSchema(
            subject=mail.subject,
            content=mail.content,
            from_user_id=user.id,
            to_user_id=to_user.id,
        )
        # execute code here by sending it to another service.
        
        # code.code_output = response.json()['output']

        mail = mails_usecase.create_mail(
            session=session,
            mail=mailObject,
        )
        return mail
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@private_router.get("/listmail", response_model={})
def list_code(
    session: Session = Depends(get_db),
    token: str = Depends(validation_usecase.TokenValidation.is_token_invalid),
    ):
    try:
        user = profile_usecase.getSignedInUserDetail(
            token=token, session=session
        )
        mails = mails_usecase.get_all_mails_by_user_id(
            session=session,
            user_id=user.id,
        )
        for mail in mails:
            from_user = profile_usecase.get_user_by_id(
                session=session,
                id=mail.from_user_id,
            )
            # to_user = profile_usecase.get_user_by_id(
            #     session=session,
            #     id=mail.to_user_id,
            # )
            # mail.from_user.hashed_password = ""
            # mail.to_user.hashed_password = ""
            mail.read = "false"
            mail.tag = "inbox"
            mail.message = mail.content
            mail.time = "2015-07-03 21:48:27"
            mail.address = from_user.email
            mail.from_name = from_user.full_name
        return mails
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))