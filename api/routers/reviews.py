from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List
from queries.reviews import (
    Error,
    ReviewsIn,
    ReviewRepository,
    ReviewsOut,
    CreateReviewsOut,
    RUpdate,
)
from uuid import UUID


router = APIRouter()


@router.post("/reviews", response_model=Union[CreateReviewsOut, Error])
def create_review(
    review: ReviewsIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
):
    return repo.create_review(review)


@router.get("/reviews/{review_id}", response_model=Union[ReviewsOut, Error])
def get_review_by_id(
    review_id: UUID, repo: ReviewRepository = Depends()
) -> Union[ReviewsOut, Error]:
    return repo.get_review_by_id(review_id)


@router.put("/reviews/{review_id}", response_model=Union[ReviewsOut, Error])
def update_review(
    review_id: UUID,
    review: RUpdate,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
) -> Union[ReviewsOut, Error]:
    return repo.update_review(review_id, review)


@router.delete("/reviews/{review_id}", response_model=bool)
def delete_review(
    review_id: UUID,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
) -> bool:
    return repo.delete_review(review_id)


@router.get("/reviews", response_model=Union[List[ReviewsOut], Error])
def get_reviews(
    repo: ReviewRepository = Depends(),
):
    return repo.get_all()
