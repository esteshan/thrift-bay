steps = [
    [
        # Up SQL statement
        """
        ALTER TABLE users
        ADD CONSTRAINT user_products
        FOREIGN KEY (user_id)
        REFERENCES products(product_id)
        """,
        # Down SQL statement
        """
        ALTER TABLE users
        DROP CONSTRAINT user_products
        """,
    ],
    [
        # Up SQL statement
        """
        ALTER TABLE products
        ADD CONSTRAINT seller
        FOREIGN KEY (product_id)
        REFERENCES users(user_id)
        """,
        # "Down" SQL statement
        """
        ALTER TABLE products
        DROP CONSTRAINT seller
        """,
    ],
    [
        """
        ALTER TABLE products
        ADD CONSTRAINT category
        FOREIGN KEY (product_id)
        REFERENCES categories(category_id)
        """,
        """
        ALTER TABLE products
        DROP CONSTRAINT category
        """,
    ],
    [
        """
        ALTER TABLE products
        ADD CONSTRAINT size
        FOREIGN KEY (product_id)
        REFERENCES sizes(size_id)
        """,
        """
        ALTER TABLE products
        DROP CONSTRAINT size
        """,
    ],
    [
        """
        ALTER TABLE checkout
        ADD CONSTRAINT buyer
        FOREIGN KEY (checkout_id)
        REFERENCES users(user_id)
        """,
        """
        ALTER TABLE checkout
        DROP CONSTRAINT buyer
        """,
    ],
    [
        """
        ALTER TABLE checkout
        ADD CONSTRAINT product
        FOREIGN KEY (checkout_id)
        REFERENCES products(product_id)
        """,
        """
        ALTER TABLE checkout
        DROP CONSTRAINT product
        """,
    ],
    [
        """
        ALTER TABLE reviews
        ADD CONSTRAINT user_review
        FOREIGN KEY (review_id)
        REFERENCES users(user_id)
        """,
        """
        ALTER TABLE reviews
        DROP CONSTRAINT user
        """,
    ],
    [
        """
        ALTER TABLE reviews
        ADD CONSTRAINT product
        FOREIGN KEY (review_id)
        REFERENCES products(product_id)
        """,
        """
        ALTER TABLE reviews
        DROP CONSTRAINT product
        """,
    ],
]
