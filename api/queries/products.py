from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
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
    sold: Optional[bool]
    category: Optional[UUID]
    user_product: Optional[UUID]


class ProductsOut(BaseModel):
    product_id: Optional[UUID]
    name: str
    picture_url: str
    color: str
    size: str
    description: Optional[str]
    item_price: int
    sold: Optional[bool]
    category: Optional[UUID]
    user_product: Optional[UUID]


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
                            user_product
                        FROM products
                        """
                    )
                    return [
                        self.record_to_products_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all products"}

    def create(self, product: ProductsIn) -> Union[ProductsOut, Error]:
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
                            user_product
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                        ]
                    )
                    product_id = result.fetchone()[0]
                    print(f"Inserted product_id: {product_id}")
                    return self.product_in_to_out(product_id, product)
        except Exception:
            return {"message": "An error occurred while creating the product"}

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
        )
