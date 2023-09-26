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
            created_at TIMESTAMPTZ
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user;
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
            created_at TIMESTAMPTZ
        );
        """,
        """
        DROP TABLE checkout;
        """,
    ],
]
