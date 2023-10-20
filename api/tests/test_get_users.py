from main import app
from queries.users import UserQueries, UserOut
from fastapi.testclient import TestClient

client = TestClient(app)


class MockUserQueries:
    def get_all_users(self):
        users = [
            UserOut(
                user_id="2e2426f2-1a3a-4143-8ff3-468f61cbbdb3",
                first_name="John",
                last_name="Smith",
                username="JohnSmith",
                email="JohnSmith@example.com",
            ),
            UserOut(
                user_id="77251baa-f7d6-42d1-89c1-0829ceee930a",
                first_name="Josh",
                last_name="Doe",
                username="JoshDoe",
                email="JoshDoe@example.com",
            ),
        ]
        return users


def test_get_all_users():
    app.dependency_overrides[UserQueries] = MockUserQueries

    response = client.get("/users")
    app.dependency_overrides.clear()

    assert response.status_code == 200
    response_data = response.json()

    assert "users" in response_data
    users = response_data["users"]

    for user in users:
        assert "user_id" in user
        assert "first_name" in user
        assert "last_name" in user
        assert "username" in user
        assert "email" in user
