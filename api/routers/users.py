from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from uuid import UUID

from queries.users import (
    UserQueries,
    UserListOut,
    UserOut,
    UserIn,
    DuplicateAccountError,
)


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.get("/users/{username}", response_model=UserOut)
def get_user(
    username: str,
    queries: UserQueries = Depends(),
):
    record = queries.get_user(username)
    if record is None:
        raise HTTPException(
            status_code=404,
            detail=f"Could not get a specific user with username {username}",
        )
    else:
        return record


@router.get("/users", response_model=UserListOut)
def get_users(queries: UserQueries = Depends()):
    return {"users": queries.get_all_users()}


@router.post("/users", response_model=UserToken | HttpError)
async def create_user(
    user: UserIn,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(user.password)
    try:
        user_out = queries.create_user(user, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a user with those credentials",
        )

    user_out_dict = user_out.dict()
    user_out_dict["user_id"] = str(user_out_dict["user_id"])

    form = UserForm(username=user.username, password=user.password)

    token = await authenticator.login(response, request, form, queries)

    return UserToken(user=user_out_dict, **token.dict())


@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id: UUID,
    queries: UserQueries = Depends(),
):
    queries.delete_user(user_id)
    return True
