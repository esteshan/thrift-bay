import os
from typing import List
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
import uuid


# Create a connection pool for PostgreSQL
pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class UserOut(BaseModel):
    user_id: str
    first_name: str
    last_name: str
    username: str
    email: str


class UserOutWithPass(UserOut):
    password_hash: str


class DuplicateAccountError(ValueError):
    pass


class UserListOut(BaseModel):
    users: List[UserOut]


class UserIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str


class UserQueries:
    def get_all_users(self) -> List[UserOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
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
                    record["user_id"] = str(record["user_id"])
                    results.append(UserOut(**record))
                return results

    def get_user(self, username: str) -> UserOutWithPass | None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
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
                    record["user_id"] = str(record["user_id"])
                    return UserOutWithPass(**record)

    def create_user(self, user: UserIn, password_hash: str) -> UserOutWithPass:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                new_uuid = uuid.uuid4()
                cur.execute(
                    """
                    INSERT INTO users (user_id, username, password_hash,
                    first_name, last_name, email)
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
                return UserOutWithPass(
                    user_id=str(user_id),
                    username=user.username,
                    password_hash=password_hash,
                    first_name=user.first_name,
                    last_name=user.last_name,
                    email=user.email,
                )

    def delete_user(self, user_id) -> None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM users
                    WHERE user_id = %s
                    """,
                    [user_id],
                )
