from pydantic import BaseModel
from typing import Union, List
from datetime import date
from queries.pool import pool
from uuid import UUID
import uuid


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
    user_id: UUID
    product_id: UUID
    created_at: date


class CheckoutRepository:
    def create_checkout(
        self, checkout: CheckoutIn
    ) -> Union[CheckoutOut, Error]:
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
                    return self.checkout_in_to_out(checkout_id, checkout)
        except Exception:
            return {"message": "An error occurred while processing receipt"}

    def get_checkout_by_id(self, checkout_id: UUID) -> Union[CheckoutOut,
                                                             Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute("""
                        SELECT
                            checkout_id,
                            address,
                            city,
                            state,
                            zip_code,
                            user_id,
                            product_id,
                            created_at
                        FROM checkout
                        WHERE checkout_id = %s
                    """, [checkout_id])
                    record = db.fetchone()
                    if record:
                        return self.record_to_checkout_out(record)
                    else:
                        return Error(message="Receipt not found")
        except Exception as e:
            return Error(message=f"error occurred fetching receipt: {e}")

    def checkout_in_to_out(self, checkout_id: UUID, checkout: CheckoutIn):
        old_data = checkout.dict()
        return CheckoutOut(checkout_id=checkout_id, **old_data)

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
                            checkout_id,
                            address,
                            city,
                            state,
                            zip_code,
                            user_id,
                            product_id,
                            created_at
                        FROM checkout
                        ORDER BY created_at;
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
            user_id=record[5],
            product_id=record[6],
            created_at=record[7],
        )
