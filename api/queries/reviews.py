from pydantic import BaseModel
from typing import Union
from queries.pool import pool
from datetime import date
from uuid import UUID
import uuid


class Error(BaseModel):
    message: str


class ReviewsIn(BaseModel):
    rating: int
    comment: str
    user_id: UUID
    product_id: UUID
    created_at: date


class ReviewsOut(BaseModel):
    review_id: UUID
    rating: int
    comment: str
    user_id: UUID
    product_id: UUID
    created_at: date


class ReviewRepository:
    def create_review(self, review: ReviewsIn) -> Union[ReviewsOut, Error]:
        try:
            review_id = uuid.uuid4()
            print(f"Generated review_id: {review_id}")
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO reviews
                            (review_id,
                            rating,
                            comment,
                            user_id,
                            product_id,
                            created_at
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING review_id;
                        """,
                        [
                            review_id,
                            review.rating,
                            review.comment,
                            review.user_id,
                            review.product_id,
                            review.created_at,
                        ],
                    )
                    review_id = result.fetchone()[0]
                    print(f"Inserted review_id: {review_id}")
                    return self.review_in_to_out(review_id, review)
        except Exception as e:
            print(e)
            return Error(message="An error occurred while creating a review")

    def get_review_by_id(self, review_id: UUID) -> Union[ReviewsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            review_id,
                            rating,
                            comment,
                            user_id,
                            product_id,
                            created_at
                        FROM reviews
                        WHERE review_id = %s
                    """,
                        [review_id],
                    )
                    record = db.fetchone()
                    if record:
                        return self.record_to_reviews_out(record)
                    else:
                        return Error(message="Review not found")
        except Exception as e:
            return Error(message=f"error occurred fetching review: {e}")

    def delete_review(self, review_id: UUID) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM reviews
                        WHERE review_id = %s
                        """,
                        [review_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def review_in_to_out(self, review_id: UUID, review: ReviewsIn):
        old_data = review.dict()
        return ReviewsOut(review_id=review_id, **old_data)

    def record_to_reviews_out(self, record):
        return ReviewsOut(
            review_id=record[0],
            rating=record[1],
            comment=record[2],
            user_id=record[3],
            product_id=record[4],
            created_at=record[5],
        )
