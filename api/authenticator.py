# Import required modules
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import (
    UserQueries,
    UserOut,
    UserOutWithPassword,
)

# Define UserAuthenticator class inheriting from the Authenticator class
class UserAuthenticator(Authenticator):
    # Asynchronous method to retrieve account data based on a username
    async def get_account_data(
        self,
        username: str,
        users: UserQueries,
    ):
        # Use the get_user method from UserQueries to fetch user data by username
        return users.get_user(username)

    # Method to get an instance of UserQueries
    def get_account_getter(
        self,
        users: UserQueries = Depends(),
    ):
        return users

    # Method to get the password_hash field from a UserOutWithPassword object
    def get_hashed_password(self, user: UserOutWithPassword):
        return user.password_hash

    # Method to extract data to be used in a cookie
    def get_account_data_for_cookie(self, user: UserOut):
        # Extract the username and other properties from the UserOut object
        return user.username, UserOut(**user.dict())

# Create an instance of UserAuthenticator and initialize it with a signing key from environment variables
authenticator = UserAuthenticator(os.environ["SIGNING_KEY"])
