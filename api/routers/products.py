from fastapi import APIRouter, Depends, Response, Query
from authenticator import authenticator
from typing import List, Union
from queries.products import (
    Error,
    ProductsIn,
    ProductRepository,
    ProductsOut,
    CreateProductsOut,
    PUpdate,
)
from uuid import UUID


router = APIRouter()


@router.post("/products", response_model=Union[CreateProductsOut, Error])
def create_product(
    product: ProductsIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
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
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProductRepository = Depends(),
) -> bool:
    return repo.delete_product(product_id)


@router.put("/products/{product_id}", response_model=Union[ProductsOut, Error])
def update_product(
    product_id: UUID,
    product: PUpdate,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProductRepository = Depends(),
) -> Union[ProductsOut, Error]:
    return repo.update_product(product_id, product)


@router.get("/products/{product_id}", response_model=Union[ProductsOut, Error])
def get_product_by_id(
    product_id: UUID,
    repo: ProductRepository = Depends(),
) -> Union[ProductsOut, Error]:
    return repo.get_product_by_id(product_id)


@router.get("/search/", response_model=Union[List[ProductsOut], Error])
def search_products(
    q: str = Query("", alias="query"),
    repo: ProductRepository = Depends()
) -> Union[List[ProductsOut], Error]:
    if q == "":
        return repo.get_all()
    else:
        return repo.search(q)
