import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
    const [product, setProduct] = useState([])
    const { product_id } = useParams();

    const getData = async () => {
        const response = await fetch(`http://localhost:8000/products/${product_id}`)

        if (response.ok) {
            const data = await response.json();
            setProduct(data)
            console.log(product)
        }
    }
    useEffect(()=>{
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product_id])

    return (
        <div>
            {product && (
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
                            <tr key={product.product_id}>
                                <td>{product.name}</td>
                                <td>{product.picture_url}</td>
                                <td>{product.color}</td>
                                <td>{product.size}</td>
                                <td>{product.description}</td>
                                <td>{product.item_price}</td>
                                <td>{product.sold ? "Yes" : "No"}</td>
                                <td>{product.category && product.category.name}</td>
                                <td>{product.user_product && product.user_product.username}</td>
                                <td>{product.created_at}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

    export default ProductDetail;
