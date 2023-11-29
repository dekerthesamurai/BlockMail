from routes.v1.api import DocsApi, UserApi
from routes.v1.api import MailApi
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

from dependencies.app_initializer import app

app.include_router(
    UserApi.get_public_router(),
    prefix="/a/auth",
)

app.include_router(
    UserApi.get_private_router(),
    prefix="/a/auth",
)

app.include_router(
    DocsApi.get_public_router(),
    prefix="/a",
)

app.include_router(
    MailApi.get_public_router(),
    prefix="/a/mail",
)

app.include_router(
    MailApi.get_private_router(),
    prefix="/a/mail",
)