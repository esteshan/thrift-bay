from main import app
from authenticator import authenticator
from queries.products import ProductRepository, CreateProductsOut
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


def fake_category():
    return {
        "category_id": "1452b491-c914-42e7-b14b-1996678cae4e",
        "name": "test",
        "created_at": "2023-10-19",
    }


class MockProductRepository(ProductRepository):
    def create_product(self, product):
        product_uuid = uuid.uuid4()
        return CreateProductsOut(
            product_id=product_uuid,
            name=product.name,
            picture_url=product.picture_url,
            color=product.color,
            size=product.size,
            description=product.description,
            item_price=product.item_price,
            sold=product.sold,
            category=product.category,
            user_id=product.user_id,
            created_at=product.created_at,
        )


def test_create_product():
    app.dependency_overrides[ProductRepository] = MockProductRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_user

    test_date = date(2023, 10, 31)
    json = {
        "name": "string",
        "picture_url": "test_picture",
        "color": "string",
        "size": "string",
        "description": "string",
        "item_price": 0,
        "sold": False,
        "category": "1452b491-c914-42e7-b14b-1996678cae4e",
        "user_id": "cd4bc087-425d-4827-a2c3-a77aa838152d",
        "created_at": test_date.isoformat(),
    }

    response = client.post("/products", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    response_json = response.json()
    assert isinstance(
        uuid.UUID(response_json["product_id"]), uuid.UUID
    )
    assert response_json["name"] == "string"
    assert response_json["picture_url"] == "test_picture"
    assert response_json["color"] == "string"
    assert response_json["size"] == "string"
    assert response_json["description"] == "string"
    assert response_json["item_price"] == 0
    assert response_json["sold"] == bool(False)
    assert response_json["category"] == "1452b491-c914-42e7-b14b-1996678cae4e"
    assert response_json["user_id"] == "cd4bc087-425d-4827-a2c3-a77aa838152d"
    assert response_json["created_at"] == test_date.isoformat()
