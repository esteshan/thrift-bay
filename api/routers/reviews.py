from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.reviews import (
    Error,
    ReviewsIn,
    ReviewRepository,
    ReviewsOut,
)


router = APIRouter()


@router.post("/reviews", response_model=Union[ReviewsOut, Error])
def create_review(
    review: ReviewsIn,
    response: Response,
    repo: ReviewRepository = Depends(),
):
    return repo.create_review(review)
