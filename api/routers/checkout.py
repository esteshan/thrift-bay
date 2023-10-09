from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.checkout import (
    Error,
    CheckoutIn,
    CheckoutRepository,
    CheckoutOut,
)
from uuid import UUID


router = APIRouter()


@router.post("/checkout", response_model=Union[CheckoutOut, Error])
def create_checkout(
    checkout: CheckoutIn,
    response: Response,
    repo: CheckoutRepository = Depends(),
):
    return repo.create_checkout(checkout)


@router.get("/checkout", response_model=Union[List[CheckoutOut], Error])
def get_all(
    repo: CheckoutRepository = Depends(),
):
    return repo.get_all()


@router.get("/checkout/{checkout_id}", response_model=Union[CheckoutOut,
                                                            Error])
def get_checkout_by_id(
    checkout_id: UUID,
    repo: CheckoutRepository = Depends()
) -> Union[CheckoutOut, Error]:
    return repo.get_checkout_by_id(checkout_id)
