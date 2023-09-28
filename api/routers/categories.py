from fastapi import APIRouter, Depends
from typing import Union, List
from queries.categories import (
    CategoryIn,
    CategoryRepository,
    CategoryOut,
    Error,
)


router = APIRouter()


@router.post("/categories", response_model=CategoryOut)
def create_category(
    category: CategoryIn,
    repo: CategoryRepository = Depends(),
):
    return repo.create_category(category)


@router.get("/categories", response_model=Union[List[CategoryOut], Error])
def get_categories(
    repo: CategoryRepository = Depends(),
):
    return repo.get_all()
