import React from "react";

const Payment = () => (
  <section>
    <form action="http://localhost:8000/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
    </form>
  </section>
);

export default Payment;
