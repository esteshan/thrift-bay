// PaymentUtils.js
const submitToCreateCheckoutSession = () => {
  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute(
    "action",
    `${process.env.REACT_APP_API_HOST}/create-checkout-session`
  );
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export default submitToCreateCheckoutSession;
