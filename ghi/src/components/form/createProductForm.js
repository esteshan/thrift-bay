import React from "react";
import { useCreateProductMutation } from "../../store/newProductApi";
import { useGetTokenQuery } from "../../store/authApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../store/categoryApi";

function NewProduct() {
    const navigate = useNavigate();
    const { data: user } = useGetTokenQuery();
    const { data: categories, isLoading, isError } = useGetCategoryQuery();
    const [createProduct, result] = useCreateProductMutation();
    const [name, setName] = useState("");
    const [picture_url, setPictureURL] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [description, setDescription] = useState("");
    const [item_price, setItemPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [user_id, setUserID] = useState(user ? user.user.user_id : "");
    const [error, setError] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [sold, setSold] = useState(false);

    useEffect(() => {
        if (user && user.user) {
        setUserID(user.user.user_id);
        }
    }, [user]);

  // Add this useEffect to handle redirection after successful product creation
    useEffect(() => {
        if (result.isSuccess) {
        navigate("/");
        }
        if (result.isError) {
        setError("An error occurred while creating the product");
        }
    }, [result, navigate]);


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }


    async function handleSubmit(e) {
        e.preventDefault();
        createProduct({
        name,
        picture_url,
        color,
        size,
        description,
        item_price,
        sold,
        category,
        user_id,
        created_at,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="picture_url">Picture URL:</label>
            <input
            type="text"
            id="picture_url"
            value={picture_url}
            onChange={(e) => setPictureURL(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="color">Color:</label>
            <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="size">Size:</label>
            <input
            type="text"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="item_price">Item Price:</label>
            <input
            type="number"
            id="item_price"
            value={item_price}
            onChange={(e) => setItemPrice(Number(e.target.value))}
            />
        </div>
        <div className="mb-3">
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
        <div>
            <label htmlFor="user_id">User ID:</label>
            <input id="user_id" value={user.user.username} readOnly={true} />
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
        <button type="submit" disabled={result.isLoading}>
            Create Product
        </button>

        {result.isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        </form>
    );
}
export default NewProduct;
