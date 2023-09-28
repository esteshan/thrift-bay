from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
from datetime import date
from uuid import UUID
import uuid


class Error(BaseModel):
    message: str


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
                            product_id,
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
                        FROM products
                        ORDER BY created_at;
                        """
                    )
                    return [
                        self.record_to_products_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all products"}

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
                        [product_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def create_product(self, product: ProductsIn) -> Union[ProductsOut, Error]:
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
                    return self.product_in_to_out(product_id, product)
        except Exception as e:
            print(e)
            return Error(
                message="An error occurred while creating the product"
            )

    def product_in_to_out(self, product_id: UUID, product: ProductsIn):
        old_data = product.dict()
        return ProductsOut(product_id=product_id, **old_data)

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
            category=record[8],
            user_product=record[9],
            created_at=record[10],
        )
