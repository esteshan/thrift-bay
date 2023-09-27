from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.products import (
    Error,
    ProductsIn,
    ProductRepository,
    ProductsOut,
)


router = APIRouter()


@router.post("/products", response_model=Union[ProductsOut, Error])
def create_product(
    product: ProductsIn,
    response: Response,
    repo: ProductRepository = Depends(),
):
    return repo.create(product)


@router.get("/products", response_model=Union[List[ProductsOut], Error])
def get_all(
    repo: ProductRepository = Depends(),
):
    return repo.get_all()
