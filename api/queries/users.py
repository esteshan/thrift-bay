# Import necessary modules
import os
from typing import List
from psycopg_pool import ConnectionPool
from pydantic import BaseModel, Field
from uuid import UUID, uuid4


# Create a connection pool for PostgreSQL
pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

# Define the UserOut Pydantic model
class UserOut(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    username: str
    email: str

    # class Config:
    #     json_encoders = {
    #         UUID: str
    #     }

# Extend UserOut model to include hashed_password
class UserOutWithPassword(UserOut):
    password_hash: str

    # class Config(UserOut.Config):
    #     pass

# Define custom Exception for duplicate accounts
class DuplicateAccountError(ValueError):
    pass

# Define a Pydantic model for a list of UserOut
class UserListOut(BaseModel):
    users: List[UserOut]

# Define the UserIn Pydantic model for incoming data
class UserIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str

# Define UserQueries class for executing user-related SQL queries
class UserQueries:
    # Method to fetch all users
    def get_all_users(self) -> List[UserOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    # SQL query to fetch all users
                    """
                    SELECT user_id, first_name, last_name,
                        email, username, password_hash
                    FROM users
                    ORDER BY last_name, first_name
                    """
                )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(UserOut(**record))
                return results

    # Method to fetch a single user by username
    def get_user(self, username: str) -> UserOutWithPassword | None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    # SQL query to fetch user by username
                    """
                    SELECT user_id, first_name, last_name,
                        email, username, password_hash
                    FROM users
                    WHERE username = %s
                    """,
                    [username],
                )
                row = cur.fetchone()
                if row is None:
                    raise Exception("No user found")
                else:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return UserOutWithPassword(**record)

    # Method to create a new user
    def create_user(
        self, user: UserIn, password_hash: str
    ) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                new_uuid = uuid4()
                cur.execute(
                    # SQL query to insert a new user
                    """
                    INSERT INTO users
                    (user_id, username, password_hash, first_name, last_name, email)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING user_id;
                    """,
                    [
                        new_uuid,
                        user.username,
                        password_hash,
                        user.first_name,
                        user.last_name,
                        user.email,
                    ],
                )
                user_id = cur.fetchone()[0]
                return UserOutWithPassword(
                    user_id=user_id,
                    username=user.username,
                    password_hash=password_hash,
                    first_name=user.first_name,
                    last_name=user.last_name,
                    email=user.email,
                )

    # Method to delete a user by ID
    def delete_user(self, user_id) -> None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    # SQL query to delete user by ID
                    """
                    DELETE FROM users
                    WHERE user_id = %s
                    """,
                    [user_id],
                )
