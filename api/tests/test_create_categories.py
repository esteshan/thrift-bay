from main import app
from authenticator import authenticator
from queries.categories import CategoryRepository, CategoryOut
from fastapi.testclient import TestClient
from datetime import date
import uuid

client = TestClient(app)


def fake_user():
    return {
        "user_id": "cd4bc087-425d-4827-a2c3-a77aa838152d",
        "first_name": "testname",
        "last_name": "testlast",
        "email:": "test124@gmail.com",
        "username": "testuser",
        "password": "password123",
    }


class MockCategoryRepository(CategoryRepository):
    def create_category(self, category):
        category_uuid = uuid.uuid4()
        return CategoryOut(
            category_id=category_uuid,
            name=category.name,
            created_at=category.created_at,
        )


def test_create_category():
    app.dependency_overrides[CategoryRepository] = MockCategoryRepository
    app.dependency_overrides[
        authenticator.get_current_account_data] = fake_user

    test_date = date(2023, 10, 31)
    json = {"name": "string", "created_at": test_date.isoformat()}

    response = client.post("/categories", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    response_json = response.json()
    assert isinstance(
        uuid.UUID(response_json["category_id"]), uuid.UUID
    )
    assert response_json["name"] == "string"
    assert response_json["created_at"] == test_date.isoformat()
