from pydantic import BaseModel
from typing import Optional, Union
from queries.pool import pool
from datetime import date
from uuid import UUID
import uuid
from queries.users import UserOut
from queries.products import CreateProductsOut


class Error(BaseModel):
    message: str


class RUpdate(BaseModel):
    rating: Optional[int]
    comment: Optional[str]
    user_id: Optional[UUID]
    product_id: Optional[UUID]
    created_at: Optional[date]


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
    user_id: UserOut
    product_id: CreateProductsOut
    created_at: date


class CreateReviewsOut(BaseModel):
    review_id: UUID
    rating: int
    comment: str
    user_id: UUID
    product_id: UUID
    created_at: date


class ReviewRepository:
    def create_review(
        self, review: ReviewsIn
    ) -> Union[CreateReviewsOut, Error]:
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
                    return CreateReviewsOut(
                        review_id=review_id,
                        rating=review.rating,
                        comment=review.comment,
                        user_id=review.user_id,
                        product_id=review.product_id,
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
                            r.product_id,
                            p.name AS product_name,
                            p.picture_url AS product_picture_url,
                            p.color AS product_color,
                            p.size AS product_size,
                            p.description AS product_description,
                            p.item_price AS product_item_price,
                            p.sold AS product_sold,
                            p.category AS product_category,
                            p.user_product AS product_user,
                            p.created_at AS product_created_at,
                            r.created_at
                        FROM reviews r
                        LEFT JOIN users u ON r.user_id = u.user_id
                        LEFT JOIN products p ON r.product_id = p.product_id
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
                            product_id = COALESCE(%s, product_id)
                        WHERE
                            review_id = %s
                        RETURNING review_id;
                    """,
                        [
                            review.rating,
                            review.comment,
                            review.user_id,
                            review.product_id,
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
            product_id=CreateProductsOut(
                product_id=record[8],
                name=record[9],
                picture_url=record[10],
                color=record[11],
                size=record[12],
                description=record[13],
                item_price=record[14],
                sold=record[15],
                category=record[16],
                user_product=record[17],
                created_at=record[18],
            ),
            created_at=record[19],
        )
