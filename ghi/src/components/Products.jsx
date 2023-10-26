import { useGetProductsQuery } from "../store/productsApi";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Products() {
  const { data } = useGetProductsQuery();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [selectedColor, setSelectedColor] = useState("All Colors");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    if (data) {
      const uniqueSizes = [...new Set(data.map((product) => product.size))];
      const uniqueColors = [...new Set(data.map((product) => product.color))];
      const uniqueCategories = [...new Set(data.map((product) => product.category.name))];
      setSizeOptions(["All Sizes", ...uniqueSizes]);
      setColorOptions(["All Colors", ...uniqueColors]);
      setCategoryOptions(["All Categories", ...uniqueCategories]);
    }
  }, [data]);

  if (!data) {
    return <div>No data available</div>;
  }

  function handleDetail(product_id) {
    navigate(`/products/${product_id}`);
  }

  function handleSizeFilter(size) {
    setSelectedSize(size);
  }

  function handleColorFilter(color) {
    setSelectedColor(color);
  }

  function handleCategoryFilter(category) {
    setSelectedCategory(category);
  }

  const filteredData = data
    .filter((product) => (selectedSize === "All Sizes" ? true : product.size === selectedSize))
    .filter((product) => (selectedColor === "All Colors" ? true : product.color === selectedColor))
    .filter((product) => (selectedCategory === "All Categories" ? true : product.category.name === selectedCategory));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-row items-center justify-start">
          <div>
            <select
              value={selectedSize}
              onChange={(e) => handleSizeFilter(e.target.value)}
              className="bg-blue-100 text-black p-2 rounded"
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
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredData.map((product) => (
            <div key={product.product_id} className="group relative" onClick={() => handleDetail(product.product_id)}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.picture_url}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.item_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
