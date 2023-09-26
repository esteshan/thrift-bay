steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id UUID PRIMARY KEY NOT NULL,
            first_name VARCHAR(25) NOT NULL,
            last_name VARCHAR(25) NOT NULL,
            username VARCHAR(25) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password_hash VARCHAR(128) NOT NULL,
            products UUID REFERENCES products(product_id)
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
            product_id UUID NOT NULL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            picture_url TEXT NOT NULL,
            description TEXT NOT NULL,
            item_price NUMERIC(7,2) NOT NULL,
            sold BOOLEAN DEFAULT FALSE,
            category INTEGER REFERENCES categories(category_id),
            user_id INTEGER REFERENCES users(user_id),
            created_at TIMESTAMPTZ
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE products;
        """,
    ],
    [
        """
        CREATE TABLE categories (
            category_id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            created_at TIMESTAMPTZ
        );
        """
    ],
    [
        """
        CREATE TABLE checkout (
            checkout_id UUID PRIMARY KEY NOT NULL,
            product UUID REFERENCES products(product_id)
            user UUID REFERENCES users(user_id)
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip_code VARCHAR(10)
        )
        """
    ],
]
