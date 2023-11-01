from fastapi import HTTPException
from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool
from datetime import date
from uuid import UUID
import uuid
from queries.users import UserOut


class Error(BaseModel):
    message: str


class RUpdate(BaseModel):
    rating: Optional[int]
    comment: Optional[str]
    user_id: Optional[UUID]
    created_at: Optional[date]


class ReviewsIn(BaseModel):
    rating: int
    comment: str
    user_id: UUID
    created_at: date


class ReviewsOut(BaseModel):
    review_id: UUID
    rating: int
    comment: str
    user_id: UserOut
    created_at: date


class CreateReviewsOut(BaseModel):
    review_id: UUID
    rating: int
    comment: str
    user_id: UUID
    created_at: date


class ReviewRepository:
    def get_all(self) -> Union[Error, List[ReviewsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            r.review_id,
                            r.rating,
                            r.comment,
                            r.user_id,
                            u.first_name AS user_first_name,
                            u.last_name AS user_last_name,
                            u.username AS user_username,
                            u.email AS user_email,
                            r.created_at
                        FROM reviews r
                        LEFT JOIN users u ON r.user_id = u.user_id
                        ORDER BY r.created_at;
                        """
                    )
                    return [
                        self.record_to_reviews_out(record)
                        for record in result
                    ]
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Could not list reviews. Error: {str(e)}",
            )

    def create_review(
        self, review: ReviewsIn
    ) -> Union[CreateReviewsOut, Error]:
        try:
            review_id = uuid.uuid4()
            print(f"Generated review_id: {review_id}")
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO reviews
                            (review_id,
                            rating,
                            comment,
                            user_id,
                            created_at
                            )
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING review_id;
                        """,
                        [
                            review_id,
                            review.rating,
                            review.comment,
                            review.user_id,
                            review.created_at,
                        ],
                    )
                    review_id = result.fetchone()[0]
                    print(f"Inserted review_id: {review_id}")
                    return CreateReviewsOut(
                        review_id=review_id,
                        rating=review.rating,
                        comment=review.comment,
                        user_id=review.user_id,
                        created_at=review.created_at,
                    )
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
                            r.review_id,
                            r.rating,
                            r.comment,
                            r.user_id,
                            u.first_name AS user_first_name,
                            u.last_name AS user_last_name,
                            u.username AS user_username,
                            u.email AS user_email,
                            r.created_at
                        FROM reviews r
                        LEFT JOIN users u ON r.user_id = u.user_id
                        WHERE r.review_id = %s
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

    def update_review(
        self, review_id: UUID, review: RUpdate
    ) -> Union[ReviewsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE reviews
                        SET
                            rating = COALESCE(%s, rating),
                            comment = COALESCE(%s, comment),
                            user_id = COALESCE(%s, user_id),
                        WHERE
                            review_id = %s
                        RETURNING review_id;
                    """,
                        [
                            review.rating,
                            review.comment,
                            review.user_id,
                            review_id,
                        ],
                    )
                    updated_review_id = db.fetchone()[0]
                    updated_review = self.get_review_by_id(updated_review_id)
                    return updated_review
        except Exception as e:
            print(e)
            return Error(message="An error occurred updating the review")

    def delete_review(self, review_id: UUID) -> bool:
        try:
            with pool.connection() as conn:
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

    def record_to_reviews_out(self, record):
        return ReviewsOut(
            review_id=record[0],
            rating=record[1],
            comment=record[2],
            user_id=UserOut(
                user_id=str(record[3]),
                first_name=record[4],
                last_name=record[5],
                username=record[6],
                email=record[7],
            ),
            created_at=record[8],
        )
