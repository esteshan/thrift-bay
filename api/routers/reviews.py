from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.reviews import (
    Error,
    ReviewsIn,
    ReviewRepository,
    ReviewsOut,
)
from uuid import UUID


router = APIRouter()


@router.post("/reviews", response_model=Union[ReviewsOut, Error])
def create_review(
    review: ReviewsIn,
    response: Response,
    repo: ReviewRepository = Depends(),
):
    return repo.create_review(review)


@router.get("/reviews/{review_id}", response_model=Union[ReviewsOut, Error])
def get_review_by_id(
    review_id: UUID,
    repo: ReviewRepository = Depends()
) -> Union[ReviewsOut, Error]:
    return repo.get_review_by_id(review_id)
