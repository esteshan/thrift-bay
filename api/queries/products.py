from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
from datetime import date
from uuid import UUID
import uuid
from queries.categories import CategoryOut
from queries.users import UserOut


class Error(BaseModel):
    message: str


class PUpdate(BaseModel):
    name: Optional[str]
    picture_url: Optional[str]
    color: Optional[str]
    size: Optional[str]
    description: Optional[str]
    item_price: Optional[int]
    sold: Optional[bool]
    category: Optional[UUID]
    user_product: Optional[UUID]
    created_at: Optional[date]


class ProductsIn(BaseModel):
    name: str
    picture_url: str
    color: str
    size: str
    description: Optional[str]
    item_price: int
    sold: bool = False
    category: UUID
    user_product: UUID
    created_at: date


class ProductsOut(BaseModel):
    product_id: UUID
    name: str
    picture_url: str
    color: str
    size: str
    description: str
    item_price: int
    sold: bool = False
    category: CategoryOut
    user_product: UserOut
    created_at: date


class CreateProductsOut(BaseModel):
    product_id: UUID
    name: str
    picture_url: str
    color: str
    size: str
    description: Optional[str]
    item_price: int
    sold: bool = False
    category: UUID
    user_product: UUID
    created_at: date


class ProductRepository:
    def get_all(self) -> Union[Error, List[ProductsOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT
                            p.product_id,
                            p.name,
                            p.picture_url,
                            p.color,
                            p.size,
                            p.description,
                            p.item_price,
                            p.sold,
                            p.category,
                            c.name AS category_name,
                            c.created_at AS category_created_at,
                            p.user_product,
                            u.first_name AS user_first_name,
                            u.last_name AS user_last_name,
                            u.username AS user_username,
                            u.email AS user_email,
                            p.created_at
                        FROM products p
                        LEFT JOIN categories c ON p.category = c.category_id
                        LEFT JOIN users u ON p.user_product = u.user_id
                        ORDER BY p.created_at;
                        """
                    )
                    return [
                        self.record_to_products_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return Error(message="Could not get all products"), 404

    def update_product(
        self, product_id: UUID, product: PUpdate
    ) -> Union[ProductsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE products
                        SET
                            name = COALESCE(%s, name),
                            picture_url = COALESCE(%s, picture_url),
                            color = COALESCE(%s, color),
                            size = COALESCE(%s, size),
                            description = COALESCE(%s, description),
                            item_price = COALESCE(%s, item_price),
                            sold = COALESCE(%s, sold),
                            category = COALESCE(%s, category),
                            user_product = COALESCE(%s, user_product)
                        WHERE
                            product_id = %s
                        RETURNING product_id;
                    """,
                        [
                            product.name,
                            product.picture_url,
                            product.color,
                            product.size,
                            product.description,
                            product.item_price,
                            product.sold,
                            product.category,
                            product.user_product,
                            product_id,
                        ],
                    )
                    updated_product_id = db.fetchone()[0]
                    updated_product = self.get_product_by_id(
                        updated_product_id
                    )
                    return updated_product
        except Exception as e:
            print(e)
            return Error(message="An error occurred updating the product"), 404

    def get_product_by_id(self, product_id: UUID) -> Union[ProductsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            p.product_id,
                            p.name,
                            p.picture_url,
                            p.color,
                            p.size,
                            p.description,
                            p.item_price,
                            p.sold,
                            p.category,
                            c.name AS category_name,
                            c.created_at AS category_created_at,
                            p.user_product,
                            u.first_name AS user_first_name,
                            u.last_name AS user_last_name,
                            u.username AS user_username,
                            u.email AS user_email,
                            p.created_at
                        FROM products p
                        LEFT JOIN users u ON p.user_product = u.user_id
                        LEFT JOIN categories c ON p.category = c.category_id
                        WHERE p.product_id = %s;
                    """,
                        [product_id],
                    )
                    record = db.fetchone()
                    if record:
                        return self.record_to_products_out(record)
                    else:
                        return Error(message="Product not found"), 404
        except Exception as e:
            return Error(message=f"error occurred fetching product: {e}"), 404

    def delete_product(self, product_id: UUID) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM products
                        WHERE product_id = %s
                        """,
                        [product_id],
                    )
                    return True
        except Exception as e:
            return (
                Error(message=f"An error occurred deleting the product: {e}"),
                404,
            )

    def create_product(
        self, product: ProductsIn
    ) -> Union[CreateProductsOut, Error]:
        try:
            product_id = uuid.uuid4()
            print(f"Generated product_id: {product_id}")
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO products
                            (product_id,
                            name,
                            picture_url,
                            color,
                            size,
                            description,
                            item_price,
                            sold,
                            category,
                            user_product,
                            created_at
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING product_id;
                        """,
                        [
                            product_id,
                            product.name,
                            product.picture_url,
                            product.color,
                            product.size,
                            product.description,
                            product.item_price,
                            product.sold,
                            product.category,
                            product.user_product,
                            product.created_at,
                        ],
                    )
                    product_id = result.fetchone()[0]
                    print(f"Inserted product_id: {product_id}")
                    return CreateProductsOut(
                        product_id=product_id,
                        name=product.name,
                        picture_url=product.picture_url,
                        color=product.color,
                        size=product.size,
                        description=product.description,
                        item_price=product.item_price,
                        sold=product.sold,
                        category=product.category,
                        user_product=product.user_product,
                        created_at=product.created_at,
                    )
        except Exception as e:
            print(e)
            return (
                Error(message="An error occurred while creating the product"),
                404,
            )

    def record_to_products_out(self, record):
        return ProductsOut(
            product_id=record[0],
            name=record[1],
            picture_url=record[2],
            color=record[3],
            size=record[4],
            description=record[5],
            item_price=record[6],
            sold=record[7],
            category=CategoryOut(
                category_id=record[8],
                name=record[9],
                created_at=record[10],
            ),
            user_product=UserOut(
                user_id=str(record[11]),
                first_name=record[12],
                last_name=record[13],
                username=record[14],
                email=record[15],
            ),
            created_at=record[16],
        )
