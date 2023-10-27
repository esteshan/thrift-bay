from main import app
from queries.categories import CategoryRepository, CategoryOut
from fastapi.testclient import TestClient

client = TestClient(app)


class MockCategoryQueries:
    def get_all(self):
        categories = [
            CategoryOut(
                category_id="1e2426f2-1a3a-4143-8ff3-468f61cbbdb3",
                name="Super Cool Hoodies",
                created_at="2023-10-20",
            ),
            CategoryOut(
                category_id="27251baa-f7d6-42d1-89c1-0829ceee930a",
                name="Super Cool Pants",
                created_at="2023-10-21",
            ),
        ]
        return categories


def test_get_all():
    app.dependency_overrides[CategoryRepository] = MockCategoryQueries

    response = client.get("/categories")
    app.dependency_overrides.clear()

    assert response.status_code == 200
    response_data = response.json()
    categories = response_data

    assert len(categories) > 0

    for category in categories:
        assert "category_id" in category
        assert "name" in category
        assert "created_at" in category
