from fastapi import HTTPException
from pydantic import BaseModel
from typing import Union
from queries.pool import pool
from datetime import date
import uuid


class Error(BaseModel):
    message: str


class CategoryIn(BaseModel):
    name: str
    created_at: date


class CategoryOut(BaseModel):
    category_id: uuid.UUID
    name: str
    created_at: date


class CategoryRepository:
    def create_category(
        self, category: CategoryIn
    ) -> Union[CategoryOut, Error]:
        try:
            # Generate a new UUID
            category_uuid = uuid.uuid4()
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    # run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO categories
                            (category_id, name, created_at)
                        VALUES
                            (%s, %s, %s)
                        RETURNING category_id;
                        """,
                        [category_uuid, category.name, category.created_at],
                    )
                    id = result.fetchone()[0]
                    # return new data
                    return CategoryOut(
                        category_id=id,
                        name=category.name,
                        created_at=category.created_at,
                    )
        except Exception as e:
            # Raise an HTTPException with a 400 status code and error message
            raise HTTPException(
                status_code=400,
                detail=f"Could not create a category. Error: {str(e)}",
            )
