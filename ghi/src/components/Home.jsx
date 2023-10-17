import { useGetProductsQuery } from "../store/productsApi";

function Products() {
  const { data } = useGetProductsQuery();

  console.log(data); // Log the data to see its structure

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="columns is-centered">
      <div className="column is-narrow">
        <table className="table is-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.product_id}>
                <td>{product.name}</td>
                <td>{product.item_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
