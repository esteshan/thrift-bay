import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailQuery } from "../store/detailApi";



function ProductDetail() {
    const { product_id } = useParams();
    const { data, isLoading } = useGetProductDetailQuery(product_id);

    if(isLoading) {
        return (<div>No Data Available</div>)
    }


    return (
        <div>
                <div>
                    <h1>Product</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Picture</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Sold</th>
                                <th>Category</th>
                                <th>Seller</th>
                                <th>Created on</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={data?.product_id}>
                                <td>{data?.name}</td>
                                <td>{data?.picture_url}</td>
                                <td>{data?.color}</td>
                                <td>{data?.size}</td>
                                <td>{data?.description}</td>
                                <td>{data?.item_price}</td>
                                <td>{data?.sold ? "Yes" : "No"}</td>
                                <td>{data?.category?.name}</td>
                                <td>{data?.user_product?.username}</td>
                                <td>{data?.created_at}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    );
}

export default ProductDetail;
