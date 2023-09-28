from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.checkout import (
    Error,
    CheckoutIn,
    CheckoutRepository,
    CheckoutOut,
)


router = APIRouter()


@router.post("/checkout", response_model=Union[CheckoutOut, Error])
def create_checkout(
    checkout: CheckoutIn,
    response: Response,
    repo: CheckoutRepository = Depends(),
):
    return repo.create_checkout(checkout)