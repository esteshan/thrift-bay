import React, { useState } from "react";
import { useCreateProductMutation } from "../../store/newProductApi";
import { useGetTokenQuery } from "../../store/authApi";
import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../store/categoryApi";

function NewProduct() {
    const navigate = useNavigate();
    const { data: tokenData } = useGetTokenQuery();
    const { data: categoriesData } = useGetCategoryQuery();
    const user_id = tokenData?.user?.user_id;
    const [createProduct] = useCreateProductMutation();

    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        color: "",
        size: "",
        description: "",
        item_price: "",
        category: "",
        created_at: new Date().toISOString().split('T')[0],
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (user_id) {
            try {
                const productData = {
                    ...formData,
                    user_id: user_id,
                };
                await createProduct(productData).unwrap();
                navigate("/");
            } catch (error) {
                console.error("Listing Product Failed:", error);
            }
        }
    };

    const categories = categoriesData || [];


    return (
    <div className="leading-loose">
        <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
            <p className="text-gray-800 font-medium">Product Information</p>
            <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="name">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    placeholder="Product Name"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="picture_url">
                    Picture URL:
                </label>
                <input
                    type="text"
                    id="picture_url"
                    value={formData.picture_url}
                    onChange={(e) => setFormData({ ...formData, picture_url: e.target.value })}
                    required
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    placeholder="Picture URL"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="color">
                    Color:
                </label>
                <input
                    type="text"
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    required
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    placeholder="Product Color"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="size">
                    Size:
                </label>
                <input
                    type="text"
                    id="size"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    required
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    placeholder="Product Size"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="description">
                    Description:
                </label>
                <input
                    type="text"
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    placeholder="Product Description"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="item_price">
                    Item Price:
                </label>
                <input
                    type="number"
                    id="item_price"
                    value={formData.item_price}
                    onChange={(e) => setFormData({ ...formData, item_price: e.target.value })}
                    required
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    placeholder="Product Price"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="category">
                    Category:
                </label>
                <select
                    id="category"
                    name="category"
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option value="">Choose a category</option>
                    {categories.map((category) => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-4">
                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" onClick={handleFormSubmit}>
                    Create Product
                </button>
            </div>
        </form>
    </div>
);
}

export default NewProduct;
