from pydantic import BaseModel
from typing import Union, List
from datetime import date
from queries.pool import pool
from uuid import UUID
import uuid
from queries.users import UserOut
from queries.products import CreateProductsOut


class Error(BaseModel):
    message: str


class CheckoutIn(BaseModel):
    address: str
    city: str
    state: str
    zip_code: str
    user_id: UUID
    product_id: UUID
    created_at: date


class CheckoutOut(BaseModel):
    checkout_id: UUID
    address: str
    city: str
    state: str
    zip_code: str
    user_id: UserOut
    product_id: CreateProductsOut
    created_at: date


class CreateCheckoutOut(BaseModel):
    checkout_id: UUID
    address: str
    city: str
    state: str
    zip_code: str
    user_id: UUID
    product_id: UUID
    created_at: date


class CheckoutRepository:
    def create_checkout(
        self, checkout: CheckoutIn
    ) -> Union[CreateCheckoutOut, Error]:
        try:
            checkout_id = uuid.uuid4()
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO checkout
                            (checkout_id,
                            address,
                            city,
                            state,
                            zip_code,
                            user_id,
                            product_id,
                            created_at
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING checkout_id;
                        """,
                        [
                            checkout_id,
                            checkout.address,
                            checkout.city,
                            checkout.state,
                            checkout.zip_code,
                            checkout.user_id,
                            checkout.product_id,
                            checkout.created_at,
                        ],
                    )
                    checkout_id = result.fetchone()[0]
                    return CreateCheckoutOut(
                        checkout_id=checkout_id,
                        address=checkout.address,
                        city=checkout.city,
                        state=checkout.state,
                        zip_code=checkout.zip_code,
                        user_id=checkout.user_id,
                        product_id=checkout.product_id,
                        created_at=checkout.created_at,
                    )
        except Exception:
            return {"message": "An error occurred while processing receipt"}

    def get_checkout_by_id(
        self, checkout_id: UUID
    ) -> Union[CheckoutOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            ch.checkout_id,
                            ch.address,
                            ch.city,
                            ch.state,
                            ch.zip_code,
                            ch.user_id,
                            u.first_name AS user_first_name,
                            u.last_name AS user_last_name,
                            u.username AS user_username,
                            u.email AS user_email,
                            ch.product_id,
                            p.name AS product_name,
                            p.picture_url AS product_picture_url,
                            p.color AS product_color,
                            p.size AS product_size,
                            p.description AS product_description,
                            p.item_price AS product_item_price,
                            p.sold AS product_sold,
                            p.category AS product_category,
                            p.user_id AS product_user,
                            p.created_at AS product_created_at,
                            ch.created_at
                        FROM checkout ch
                        LEFT JOIN users u ON ch.user_id = u.user_id
                        LEFT JOIN products p ON ch.product_id = p.product_id
                        WHERE ch.checkout_id = %s
                    """,
                        [checkout_id],
                    )
                    record = db.fetchone()
                    if record:
                        return self.record_to_checkout_out(record)
                    else:
                        return Error(message="Receipt not found")
        except Exception as e:
            return Error(message=f"error occurred fetching receipt: {e}")

    def get_all(self) -> Union[Error, List[CheckoutOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT
                            ch.checkout_id,
                            ch.address,
                            ch.city,
                            ch.state,
                            ch.zip_code,
                            ch.user_id,
                            u.first_name AS user_first_name,
                            u.last_name AS user_last_name,
                            u.username AS user_username,
                            u.email AS user_email,
                            ch.product_id,
                            p.name AS product_name,
                            p.picture_url AS product_picture_url,
                            p.color AS product_color,
                            p.size AS product_size,
                            p.description AS product_description,
                            p.item_price AS product_item_price,
                            p.sold AS product_sold,
                            p.category AS product_category,
                            p.user_id AS product_user,
                            p.created_at AS product_created_at,
                            ch.created_at
                        FROM checkout ch
                        LEFT JOIN users u ON ch.user_id = u.user_id
                        LEFT JOIN products p ON ch.product_id = p.product_id
                        ORDER BY ch.created_at;
                        """
                    )
                    return [
                        self.record_to_checkout_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all products"}

    def record_to_checkout_out(self, record):
        return CheckoutOut(
            checkout_id=record[0],
            address=record[1],
            city=record[2],
            state=record[3],
            zip_code=record[4],
            user_id=UserOut(
                user_id=str(record[5]),
                first_name=record[6],
                last_name=record[7],
                username=record[8],
                email=record[9],
            ),
            product_id=CreateProductsOut(
                product_id=record[10],
                name=record[11],
                picture_url=record[12],
                color=record[13],
                size=record[14],
                description=record[15],
                item_price=record[16],
                sold=record[17],
                category=record[18],
                user_id=record[19],
                created_at=record[20],
            ),
            created_at=record[21],
        )
