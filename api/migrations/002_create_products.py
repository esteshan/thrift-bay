steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE products (
            product_id UUID NOT NULL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            picture_url TEXT NOT NULL,
            color TEXT NOT NULL,
            description TEXT NOT NULL,
            item_price NUMERIC(7,2) NOT NULL,
            sold BOOLEAN DEFAULT FALSE,
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
            category_id UUID NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            created_at TIMESTAMPTZ
        );
        """,
        """
        DROP TABLE categories;
        """,
    ],
    [
        """
        CREATE TABLE sizes (
            size_id UUID NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            created_at TIMESTAMPTZ
        );
        """,
        """
        DROP TABLE size
        """,
    ],
    [
        """
        CREATE TABLE reviews (
            review_id UUID PRIMARY KEY NOT NULL,
            rating INTEGER CHECK (rating >= 1 AND rating <= 10),
            comment TEXT,
            created_at TIMESTAMPTZ
        )
        """,
        """
        DROP TABLE reviews;
        """,
    ],
]
