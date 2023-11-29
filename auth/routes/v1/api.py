from routes.v1.user.user import (
    public_router as auth_public_router,
    private_router as auth_private_router,
)
from routes.api import APIRouter

from routes.v1.generic.docs import public_router as docs_public_router

from routes.v1.mails.mails import (
    public_router as mail_public_router,
    private_router as mail_private_router,
)

class UserApi(APIRouter):
    public_router = auth_public_router
    private_router = auth_private_router

    @staticmethod
    def get_public_router():
        return auth_public_router

    @staticmethod
    def get_private_router():
        return auth_private_router


class DocsApi(APIRouter):
    public_router = docs_public_router

    @staticmethod
    def get_public_router():
        return docs_public_router

class MailApi(APIRouter):
    public_router = mail_public_router
    private_router = mail_private_router

    @staticmethod
    def get_public_router():
        return mail_public_router
    
    @staticmethod
    def get_private_router():
        return mail_private_router