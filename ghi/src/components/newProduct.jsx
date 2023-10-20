import React, { useState } from "react";
import { useCreateProductMutation } from "../store/newProductApi";
import { useGetCategoriesQuery } from "../store/categoriesApi";

function NewProduct() {
    const [ name, setName ] = useState("")
    const [ picture_url, setPicture_url ] = useState("")
    const [ color, setColor ] = useState("")
    const [ size, setSize ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ item_price, setItem_price ] = useState("")
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const { data: categories } = useGetCategoriesQuery();

    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        color: "",
        size: "",
        description: "",
        item_price: "",
        // sold: false,
        category:[],
    });

    // const handleSubmit = async (productData) =>{
    //     await createProduct(productData).unwrap();
    // }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    return (
        <>
            <h1>Sell a Product</h1>
                <form onSubmit={handleChange}>
                    <div>
                        <input
                            type="text"
                            id="name"
                            placeholder="Product name"
                            value={name}
                            onChange={handleChange}
                        />
                        <label htmlFor="Name">Product Name...</label>
                    </div>
                    <div>
                        <input
                            name="picture_ulr"
                            placeholder="Product name"
                            value={picture_url}
                            onChange={handleChange}
                        />
                        <label htmlFor="Name">Picture Url...</label>
                    </div>
                    <div>
                        <input
                            name="color"
                            placeholder="Product Color"
                            value={color}
                            onChange={handleChange}
                        />
                        <label htmlFor="Name">First Name...</label>
                    </div>
                    <div>
                        <input
                            name="size"
                            placeholder="Product Size"
                            value={size}
                            onChange={handleChange}
                        />
                        <label htmlFor="Name">First Name...</label>
                    </div>

                        <button type="submit">Create Product</button>
                </form>
        </>
    );
}


export default NewProduct
