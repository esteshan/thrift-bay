import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from './store/store'
import { Provider } from 'react-redux'
import './index.css'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  'pk_test_51O73PNLf3QR5cDfNLzZwYq7srV077UdcNOq8kgTGgXbslgUVsXNex1hQcsJR5gm2jwdMSBUTzrxwl4MjFzOraUc800sVvrol4d'
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
    <Provider store={store}>
      <App />
    </Provider>
    </Elements>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
