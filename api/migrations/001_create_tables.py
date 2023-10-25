steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id UUID PRIMARY KEY NOT NULL,
            first_name VARCHAR(25) NOT NULL,
            last_name VARCHAR(25) NOT NULL,
            username VARCHAR(25) NOT NULL UNIQUE,
            email VARCHAR(50) NOT NULL UNIQUE,
            password_hash VARCHAR(128) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
    [
        """
        CREATE TABLE categories (
            category_id UUID NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            created_at TIMESTAMP
        );
        """,
        """
        DROP TABLE categories;
        """,
    ],
    [
        """
        CREATE TABLE products (
            product_id UUID NOT NULL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            picture_url TEXT NOT NULL,
            color TEXT NOT NULL,
            size TEXT NOT NULL,
            description TEXT NOT NULL,
            item_price NUMERIC(7,2) NOT NULL,
            sold BOOLEAN DEFAULT FALSE,
            category UUID REFERENCES categories(category_id),
            user_id UUID REFERENCES users(user_id),
            created_at TIMESTAMP
        );
        """,
        """
        DROP TABLE products;
        """,
    ],
    [
        """
        CREATE TABLE checkout (
            checkout_id UUID PRIMARY KEY NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip_code VARCHAR(10) NOT NULL,
            user_id UUID REFERENCES users(user_id),
            product_id UUID REFERENCES products(product_id),
            created_at TIMESTAMP
        );
        """,
        """
        DROP TABLE checkout;
        """,
    ],
    [
        """
        CREATE TABLE reviews (
            review_id UUID PRIMARY KEY NOT NULL,
            rating INTEGER,
            comment TEXT,
            user_id UUID REFERENCES users(user_id),
            created_at TIMESTAMP
        );
        """,
        """
        DROP TABLE reviews;
        """,
    ],
]
