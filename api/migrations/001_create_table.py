steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(25) NOT NULL,
            last_name VARCHAR(25) NOT NULL,
            username VARCHAR(25) NOT NULL,
            password_hash VARCHAR(128) NOT NULL,
            created_at TIMESTAMPTZ
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE products (
            product_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            item_price INTEGER NOT NULL,
            seller_id INTEGER REFERENCES users (user_id),
            created_at TIMESTAMPTZ
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE products;
        """,
    ],
]
