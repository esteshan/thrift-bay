import React, { useEffect, useState } from "react";
import { useCreateProductMutation } from "../../store/newProductApi";
import { useGetCategoryQuery } from "../../store/categoryApi";
import { useGetTokenQuery } from "../../store/authApi";
import Products from "../Products";


function NewProduct() {
    const { data: categories, isLoading, isError } = useGetCategoryQuery();
    const { data: user } = useGetTokenQuery();
    const [ name, setName ] = useState("")
    const [ picture_url, setPicture_url ] = useState("")
    const [ color, setColor ] = useState("")
    const [ size, setSize ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ item_price, setItem_price ] = useState(0)
    const [ error, setError ] = useState("")
    const [ created_at, setCreated_at ] = useState("")
    const [ sold ] = useState(false)
    const [ category, setCategory ] = useState("")
    // const [ user_id, setUserID ] = useState(user ? user.user.user_id :"");
    const [createProduct, result] = useCreateProductMutation();
    const user_id  = user?.user.user_id;


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    async function handleSubmit(e) {
    e.preventDefault();
    if (user_id){
        const createProductData = {
            name,
            picture_url,
            color,
            size,
            description,
            item_price,
            sold,
            category,
            user_id,
            created_at
        };
        try {
            await createProduct(createProductData).unwrap();
        } catch (error) {
            console.log("Create product failed:", error);
        }
    }

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
        if (!categories) {
            setError("please select a category");
            return;
        }
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
                    </div>
                    <div>
                        <input
                            type="text"
                            id="picture_url"
                            placeholder="Picture Url"
                            value={picture_url}
                            onChange={(e) => setPicture_url(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="color"
                            placeholder="Product Color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="size"
                            placeholder="Product Size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                    <div>
                        <textarea
                            type="text"
                            id="description"
                            placeholder="Product description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            id="item_price"
                            placeholder="Product Price"
                            value={item_price}
                            onChange={(e) => setItem_price(e.target.value)}
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
                    <div>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            id="category"
                            className="form-select"
                            >
                            <option value="">Choose a category</option>
                            {categories.map((category) => {
                                return (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.name}
                                </option>
                                );
                            })}
                        </select>
                    </div>
                    <button type="submit" disabled={result.isLoading}
                        onClick={Products}
                            >Create Product</button>

                        {result.isLoading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                </form>
        </>
    );
}


export default NewProduct
