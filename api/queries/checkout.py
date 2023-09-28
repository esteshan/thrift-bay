from pydantic import BaseModel
from typing import Union
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
    def create_checkout(self, checkout: CheckoutIn) -> Union[
            CheckoutOut,
            Error]:
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
                        ]
                    )
                    checkout_id = result.fetchone()[0]
                    return self.checkout_in_to_out(checkout_id, checkout)
        except Exception:
            return {"message": "An error occurred while processing receipt"}

    def checkout_in_to_out(self, checkout_id: UUID, checkout: CheckoutIn):
        old_data = checkout.dict()
        return CheckoutOut(checkout_id=checkout_id, **old_data)
