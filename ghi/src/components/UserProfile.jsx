import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "../store/userProfileApi";
import { useGetProductsQuery } from "../store/productsApi";
import { useGetReviewQuery } from "../store/reviewsApi";
import { Link } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams();

  const { data: userData, isLoading: isUserLoading } = useGetUsersQuery(username);
  const { data: productData, isLoading: isProductLoading } = useGetProductsQuery();
  const { data: reviewsData, isLoading: isReviewLoading } = useGetReviewQuery();

  const [showSold, setShowSold] = useState(false);
  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [selectedColor, setSelectedColor] = useState("All Colors");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    if (productData) {
      const uniqueSizes = [...new Set(productData.map((product) => product.size))];
      const uniqueColors = [...new Set(productData.map((product) => product.color))];
      const uniqueCategories = [...new Set(productData.map((product) => product.category.name))];
      setSizeOptions(["All Sizes", ...uniqueSizes]);
      setColorOptions(["All Colors", ...uniqueColors]);
      setCategoryOptions(["All Categories", ...uniqueCategories]);
    }
  }, [productData]);

  if (isUserLoading || isProductLoading || isReviewLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-100 p-4">Loading...</div>
      </div>
    );
  }

  const productsBelongingToUser = productData.filter(
    (product) => product.user_id.user_id === userData.user_id
  );

  const filteredProducts = productsBelongingToUser
    .filter((product) => (selectedSize === "All Sizes" ? true : product.size === selectedSize))
    .filter((product) => (selectedColor === "All Colors" ? true : product.color === selectedColor))
    .filter((product) => (selectedCategory === "All Categories" ? true : product.category.name === selectedCategory))
    .filter((product) => (showSold ? product.sold : true));

  const userReviews = reviewsData.filter((review) => review.user_id.user_id === userData.user_id);

  const handleSizeFilter = (size) => {
    setSelectedSize(size);
  };

  const handleColorFilter = (color) => {
    setSelectedColor(color);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  }

  return (
    <div className="relative flex flex-col items-start justify-start">
      <div style={{ marginLeft: "75px" }}>
        <div className="bg-blue-500 rounded-lg shadow-lg p-4 text-center text-white mt-12" style={{ backgroundColor: '#114B5F' }}>
          <h1 className="text-2xl font-bold mb-4">{userData?.username}'s Profile</h1>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 font-bold">Username</th>
                <th className="px-4 py-2 font-bold">First Name</th>
                <th className="px-4 py-2 font-bold">Last Name</th>
                <th className="px-4 py-2 font-bold">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr key={userData?.username}>
                <td className="border px-4 py-2">{userData?.username}</td>
                <td className="border px-4 py-2">{userData?.first_name}</td>
                <td className="border px-4 py-2">{userData?.last_name}</td>
                <td className="border px-4 py-2">{userData?.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-row items-center justify-start mt-8 ml-20 mr-auto">
        <div className="bg-green-300 rounded-lg shadow-lg p-4 text-center" style={{ backgroundColor: '#9BD1E5' }}>
          <h1 className="text-2xl font-bold">List of {userData?.username}'s Reviews</h1>
        </div>
      </div>

      <div className="flex flex-row items-center justify-start mt-4 ml-20 mr-auto">
        <button>
          <Link to={`/users/${userData?.username}/reviews`} className="text-xl text-blue-500 hover:underline">
            View Reviews
          </Link>
        </button>
        <button>
          <Link to={`/users/${userData?.username}/reviews/new`} className="text-xl text-blue-500 hover:underline ml-8">
            Add New Review for {userData?.username}
          </Link>
        </button>
      </div>

      {userReviews.length === 0 ? (
        <div className="flex flex-row items-center justify-start mt-4 ml-20 mr-auto">
          <p className="text-xl">{userData?.username} currently has no reviews</p>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-start mt-4 ml-20 mr-auto">
          {userReviews.slice(0, 3).map((review) => (
            <div
              key={review.review_id}
              className="rounded-lg shadow-xl p-8 text-center mr-8"
            >
              <p className="text-xl font-bold">
                {review.rating}
              </p>
              <p>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-row items-center justify-start mt-8 ml-20 mr-auto">
        <div className="text-center">
          <label style={{ display: "flex", flexDirection: "row" }}>
            <div className="mr-9">
              <input
                type="checkbox"
                checked={showSold}
                onChange={() => setShowSold(!showSold)}
                className="mr-2"
              />
              Show Sold Products
            </div>
          </label>
        </div>
        <div>
          <select
            value={selectedSize}
            onChange={(e) => handleSizeFilter(e.target.value)}
            className="ml-4 bg-blue-100 text-black p-2 rounded"
          >
            {sizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedColor}
            onChange={(e) => handleColorFilter(e.target.value)}
            className="ml-4 bg-yellow-100 text-black p-2 rounded"
          >
            {colorOptions.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="ml-4 bg-green-100 text-black p-2 rounded"
          >
            {categoryOptions.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-row items-center justify-start mt-8 ml-20 mr-auto">
        <div className="bg-green-300 rounded-lg shadow-lg p-4 text-center" style={{ backgroundColor: '#9BD1E5' }}>
          <h1 className="text-2xl font-bold">Products Listed</h1>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-row items-center justify-center mt-8 ml-20 mr-auto">
          <p
            className="text-2xl font-bold">No products listed by {userData?.username}.
          </p>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-start mt-8 ml-20 mr-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.product_id}
              className="rounded-lg shadow-xl p-8 text-center mr-8"
            >
              {product.sold && (
                <div className="sold-badge" style={{ marginTop: "-15px", fontWeight: "bold" }}>SOLD</div>
              )}
              <p
                className="mb-4 text-xl"
                style={{ textDecoration: product.sold ? 'line-through' : 'none', marginTop: "-10px", fontWeight: "bold" }}
              >
                <Link to={`/products/${product.product_id}`} className="text-blue-500 hover:underline" >
                  {product.name}
                </Link>
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={product.picture_url}
                  alt={product.name}
                  style={{ maxWidth: "250px" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
