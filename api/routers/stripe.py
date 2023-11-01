from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
import stripe
import os


router = APIRouter()
stripe.api_key = os.environ["STRIPE_PRIVATE_KEY"]
url = os.environ["PUBLIC_URL"]


@router.post("/create-checkout-session")
async def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            line_items=[
                {
                    "price": "price_1O7NyfLf3QR5cDfNEIc2E02J",
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url=f"{url}/complete",
            cancel_url=f"{url}?canceled=true",
        )

        return RedirectResponse(url=session.url, status_code=303)

    except Exception as e:
        return HTTPException(status_code=400, detail=str(e))
