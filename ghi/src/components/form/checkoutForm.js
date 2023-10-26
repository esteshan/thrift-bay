import { useCreateCheckoutMutation } from "../../store/checkoutApi";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetTokenQuery } from '../../store/authApi';


function Checkout(){
    const { product_id } = useParams();
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [created_at] = useState(formattedDate);
    const [city, setCity] = useState("");
    const [zip_code, setZipcode] = useState("");
    const navigate = useNavigate();
    const [createCheckout] = useCreateCheckoutMutation();

    const { data: tokenData } = useGetTokenQuery();
    const user_id = tokenData?.user.user_id;
    const jwtToken = tokenData?.access_token


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
            navigate(`${process.env.PUBLIC_URL}/complete`);
        } catch (error) {
        console.error("Checkout Failed:", error);
    }
}
};

    return (
    <div className="row">
    <div className="offset-3 col-6">
    <div className="shadow p-4 mt-4">
    <h1>Checkout</h1>
    <form onSubmit={handleFormSubmit} id="checkout-form">
        <div className="form-floating mb-3">
        <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address..."
            required
            type="text"
            name="address"
            id="address"
            className="form-control"
        />
        </div>
        <div className="form-floating mb-3">
        <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City..."
            required
            type="text"
            name="city"
            id="city"
            className="form-control"
        />
        </div>
        <div className="form-floating mb-3">
        <input
            value={zip_code}
            onChange={(e) => setZipcode(e.target.value)}
            placeholder="Zipcode..."
            required
            type="text"
            name="zipcode"
            id="zipcode"
            className="form-control"
        />
        </div>
        <div className="form-floating mb-3">
        <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State..."
            required
            type="text"
            name="state"
            id="state"
            className="form-control"
        />
        </div>
        <button className="btn btn-primary">Checkout and Pay</button>
    </form>
    </div>
    </div>
    </div>
    );
}

export default Checkout;
