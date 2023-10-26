import React, { useState } from "react";
import { useCreateCheckoutMutation } from "../../store/checkoutApi";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "../../store/authApi";

function Checkout() {
    const { product_id } = useParams();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip_code, setZipcode] = useState("");
    const navigate = useNavigate();
    const [createCheckout] = useCreateCheckoutMutation();
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [created_at] = useState(formattedDate);
    const { data: tokenData } = useGetTokenQuery();
    const user_id = tokenData?.user.user_id;
    const jwtToken = tokenData?.access_token;

    const updateSoldStatus = async () => {
        try {
        await fetch(`${process.env.REACT_APP_API_HOST}/products/${product_id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({ sold: true }),
        });
        } catch (error) {
        console.error("Error updating sold status:", error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (user_id) {
        const checkoutData = {
            address,
            city,
            state,
            zip_code,
            product_id,
            user_id,
            created_at,
        };
        try {
            await createCheckout(checkoutData).unwrap();
            updateSoldStatus(jwtToken);
            navigate(`/complete`);
        } catch (error) {
            console.error("Checkout Failed:", error);
        }
        }
    };

    return (
        <div className="leading-loose">
        <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
            <p className="text-gray-800 font-medium">Customer information</p>
            <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_address">
                Address
            </label>
            <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                type="text"
                name="cus_address"
                id="cus_address"
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                placeholder="Street"
                aria-label="Address"
            />
            </div>
            <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_city">
                City
            </label>
            <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                type="text"
                name="cus_city"
                id="cus_city"
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                placeholder="City"
                aria-label="City"
            />
            </div>
            <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_state">
                State
            </label>
            <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                type="text"
                name="cus_state"
                id="cus_state"
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                placeholder="State"
                aria-label="State"
            />
            </div>
            <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_zip">
                Zip
            </label>
            <input
                value={zip_code}
                onChange={(e) => setZipcode(e.target.value)}
                required
                type="text"
                name="cus_zip"
                id="cus_zip"
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                placeholder="Zip"
                aria-label="Zip"
            />
            </div>
            <div className="mt-4">
            <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" onClick={handleFormSubmit}>
                Checkout
            </button>
            </div>
        </form>
        </div>
    );
    }

    export default Checkout;
