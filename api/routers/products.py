from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.products import (
    Error,
    ProductsIn,
    ProductRepository,
    ProductsOut,
    PUpdate
)
from uuid import UUID


router = APIRouter()


@router.post("/products", response_model=Union[ProductsOut, Error])
def create_product(
    product: ProductsIn,
    response: Response,
    repo: ProductRepository = Depends(),
):
    return repo.create_product(product)


@router.get("/products", response_model=Union[List[ProductsOut], Error])
def get_all(
    repo: ProductRepository = Depends(),
):
    return repo.get_all()


@router.delete("/products/{product_id}", response_model=bool)
def delete_product(
    product_id: UUID,
    repo: ProductRepository = Depends(),
) -> bool:
    return repo.delete_product(product_id)


@router.put("/products/{product_id}", response_model=Union[ProductsOut, Error])
def update_product(
    product_id: UUID,
    product: PUpdate,
    repo: ProductRepository = Depends()
) -> Union[ProductsOut, Error]:
    return repo.update_product(product_id, product)


@router.get("/products/{product_id}", response_model=Union[ProductsOut, Error])
def get_product_by_id(
    product_id: UUID,
    repo: ProductRepository = Depends()
) -> Union[ProductsOut, Error]:
    return repo.get_product_by_id(product_id)
