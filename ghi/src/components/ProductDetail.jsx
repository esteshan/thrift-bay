import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailQuery } from "../store/detailApi";



function ProductDetail() {
    const { product_id } = useParams();
    const { data, isLoading } = useGetProductDetailQuery(product_id);

    if (isLoading) {
        return <div>No Data Available</div>;
    }

    function handleCheckout() {
    if (data) {
        const product_id = data.product_id;
        window.location.href = `${process.env.PUBLIC_URL}/checkout/${product_id}`;
    }
}


    return (
    <div className="bg-white">
    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
    <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data?.name}</h2>
        <p className="mt-4 text-gray-500">{data?.description}</p>

        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
        <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Color</dt>
            <dd className="mt-2 text-sm text-gray-500">{data?.color}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Size</dt>
            <dd className="mt-2 text-sm text-gray-500">{data?.size}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Price</dt>
            <dd className="mt-2 text-sm text-gray-500">${data?.item_price}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Sold</dt>
            <dd className="mt-2 text-sm text-gray-500">{data?.sold ? "Yes" : "No"}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Seller</dt>
            <dd className="mt-2 text-lg text-gray-500">{data?.user_id.username}</dd>
        </div>
        </dl>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
        <img
        src={data?.picture_url}
        alt={data?.name}
        className="rounded-lg bg-gray-100 w-full h-auto"
        />
    </div>
    <button onClick={handleCheckout} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
        Checkout
    </button>
    </div>
</div>
);
}

export default ProductDetail;
