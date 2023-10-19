import React,{ useState, useEffect } from "react";
import React, { useParams } from "react-router-dom";

function NewCheckoutForm() {
    const [ checkouts, setCheckouts ] = useState("");
    const [ checkout, setCheckout ] = useState([]);
    const [ product, setProduct ] = useState([]);
    const { product_id } = useParams();

    const getData = async () => {
        const response = await fetch(`http://localhost:8000/products/${product_id}`)

        if (response.ok) {
            const data = await response.json();
            setProduct(data)
            console.log(product)
        }
    }


    handelSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.product = `/queries/products/${product_id}/`



        const newCheckoutUrl = "http://localhost:8000/checkout"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers:{
                "content-type": "application/json",
            },
        };

        const response = await fetch(newCheckoutUrl, fetchConfig);
        if (response.ok){
            const newCheckout = await response.json();
            console.log(newCheckout);

            set
        }

    }





    useEffect(()=>{
        getData();
    }, [product_id])
}


export default NewCheckoutForm;
