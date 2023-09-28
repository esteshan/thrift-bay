import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import (
    UserQueries,
    UserOut,
    UserOutWithPass,
)


class UserAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        users: UserQueries,
    ):
        return users.get_user(username)

    def get_account_getter(
        self,
        users: UserQueries = Depends(),
    ):
        return users

    def get_hashed_password(self, user: UserOutWithPass):
        return user.password_hash

    def get_account_data_for_cookie(self, user: UserOut):
        return user.username, UserOut(**user.dict())


authenticator = UserAuthenticator(os.environ["SIGNING_KEY"])
