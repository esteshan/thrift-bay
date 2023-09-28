from fastapi import APIRouter, Depends
from queries.categories import (
    CategoryIn,
    CategoryRepository,
    CategoryOut,
)


router = APIRouter()


@router.post("/categories", response_model=CategoryOut)
def create_category(
    category: CategoryIn,
    repo: CategoryRepository = Depends(),
):
    return repo.create_category(category)
