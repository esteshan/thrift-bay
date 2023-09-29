# Import necessary libraries and modules
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

# Import custom queries and models
from queries.users import (
    UserQueries,
    UserListOut,
    UserOut,
    UserIn,
    DuplicateAccountError,
)


# Define Pydantic model for UserForm
class UserForm(BaseModel):
    username: str
    password: str


# Define Pydantic model for UserToken, which extends the Token class
class UserToken(Token):
    user: UserOut


# Define Pydantic model for HttpError
class HttpError(BaseModel):
    detail: str


# Create an API router
router = APIRouter()


# Define route to get access token using HTTP-only cookies
@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    # If user exists and cookie is found, return token details
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


# Define route to get a user by username
@router.get("/users/{username}", response_model=UserOut)
def get_user(
    username: str,
    queries: UserQueries = Depends(),
):
    # Fetch user details
    record = queries.get_user(username)
    # If no record found, raise HTTPException with 404
    if record is None:
        raise HTTPException(
            status_code=404,
            detail=f"Could not get a specific user with username {username}",
        )
    else:
        return record


# Define route to get all users
@router.get("/users", response_model=UserListOut)
def get_users(queries: UserQueries = Depends()):
    return {"users": queries.get_all_users()}


# Define route to create a user
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

    # Convert UUID to string here
    user_out_dict = user_out.dict()
    user_out_dict["user_id"] = str(user_out_dict["user_id"])

    form = UserForm(username=user.username, password=user.password)

    # Pass the updated user_out_dict or update your authenticator.login to use
    token = await authenticator.login(response, request, form, queries)

    # Return the token as part of the UserToken response model
    return UserToken(user=user_out_dict, **token.dict())


# Define route to delete a user
@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id: UUID,
    queries: UserQueries = Depends(),
):
    # Delete user using the queries class method
    queries.delete_user(user_id)
    return True
