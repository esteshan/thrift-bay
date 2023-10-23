import React, { useState } from "react";
import { useCreateProductMutation } from "../../store/newProductApi";
import { useGetCategoryQuery } from "../../store/categoryApi";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../store/userProfileApi";
import { initializeUseSelector } from "react-redux/es/hooks/useSelector";
// from datetime import date;


function NewProduct() {
    const navigate = useNavigate();
    const [ name, setName ] = useState("")
    const [ picture_url, setPicture_url ] = useState("")
    const [ color, setColor ] = useState("")
    const [ size, setSize ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ item_price, setItem_price ] = useState("")
    const [ error, setError ] = useState("")
    const [ created_at, setCreated_at ] = useState("")
    const [ sold, setSold ] = useState("")
    const [ category, setCategory ] = useState("")
    const { data } = useGetCategoryQuery();
    const { user_product } = useGetUsersQuery();

    const [createProduct, result] = useCreateProductMutation();


    async function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!name) {
        setError("Name cannot be empty");
        return;
    }
    if (!picture_url) {
        setError("Picture url cannot be empty");
        return;
    }
    if (!color) {
        setError("Color cannot be empty");
        return;
    }
    if (!size) {
        setError("Size cannot be empty");
        return;
    }
    if (!description) {
        setError("description cannot be empty");
        return;
    }
    if (!item_price) {
        setError("item cannot be empty");
        return;
    }
    if (!data) {
        setError("please select a category");
        return;
    }

    // Trigger the mutation
    createProduct({name, picture_url ,color ,size ,description ,item_price ,category ,sold ,created_at ,user_product });
    console.log(user_product)
    }
    // }

    if (result.isSuccess) {
        navigate("/products");
    } else if (result.isError) {
        setError(result.error);
    }


    return (
        <>
            <h1>Sell a Product</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            id="name"
                            placeholder="Product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {/* <label htmlFor="Name">Product Name...</label> */}
                    </div>
                    <div>
                        <input
                            type="url"
                            id="picture_url"
                            placeholder="Picture Url"
                            value={picture_url}
                            onChange={(e) => setPicture_url(e.target.value)}
                        />
                        {/* <label htmlFor="Name">Picture Url...</label> */}
                    </div>
                    <div>
                        <input
                            type="text"
                            id="color"
                            placeholder="Product Color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                        {/* <label htmlFor="Name">First Name...</label> */}
                    </div>
                    <div>
                        <input
                            type="text"
                            id="size"
                            placeholder="Product Size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                        {/* <label htmlFor="Name">First Name...</label> */}
                    </div>
                    <div>
                        <textarea
                            type="text"
                            id="description"
                            placeholder="Product description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {/* <label htmlFor="Name">First Name...</label> */}
                    </div>
                    <div>
                        <input
                            type="number"
                            id="item_price"
                            placeholder="Product Price"
                            value={item_price}
                            onChange={(e) => setItem_price(e.target.value)}
                        />
                        {/* <label htmlFor="Name">First Name...</label> */}
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="sold"
                            checked={sold}
                            onChange={(e) => setSold(e.target.checked)}
                        />
                    </div>
                    <div>
                        <label htmlFor="created_at">Created At:</label>
                        <input
                            type="date"
                            id="created_at"
                            value={created_at}
                            onChange={(e) => setCreated_at(e.target.value)}
                        />
                    </div>
                    <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a Category...</option>
                        {/* {data isLoading && <p>Loading...</p>} */}
                        {data &&
                            data.map(category => (
                            <option
                                key={category.category_id}
                                value={category.category_id}
                            >
                                {category.name}
                            </option>
                            ))
                        }
                    </select>

                    {/* <select>
                        <option value="">Select a Category...</option>
                        {categories?.isLoading
                        ? <p>Loading...</p>
                            :categories?.data?.map((category) => {
                        return(
                            <option key={category.category_id} value={category.category_id}>{`Categories: ${category.name}`}</option>
                        )
                        })}
                    </select> */}
                        <button type="submit" disabled={result.isLoading}>Create Product</button>

                        {result.isLoading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                </form>
        </>
    );
}


export default NewProduct
