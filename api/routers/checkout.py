from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List
from queries.checkout import (
    Error,
    CheckoutIn,
    CheckoutRepository,
    CheckoutOut,
    CreateCheckoutOut,
)
from uuid import UUID


router = APIRouter()


@router.post("/checkout", response_model=Union[CreateCheckoutOut, Error])
def create_checkout(
    checkout: CheckoutIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CheckoutRepository = Depends(),
):
    return repo.create_checkout(checkout)


@router.get("/checkout", response_model=Union[List[CheckoutOut], Error])
def get_all(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CheckoutRepository = Depends(),
):
    return repo.get_all()


@router.get(
    "/checkout/{checkout_id}", response_model=Union[CheckoutOut, Error]
)
def get_checkout_by_id(
    checkout_id: UUID,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CheckoutRepository = Depends(),
) -> Union[CheckoutOut, Error]:
    return repo.get_checkout_by_id(checkout_id)
