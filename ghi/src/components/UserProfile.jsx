import React from "react";
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "../store/userProfileApi";
import { useGetProductsQuery } from "../store/productsApi";

function UserProfile() {
  const { username } = useParams();

  const { data: userData, isLoading: isUserLoading } = useGetUsersQuery(username);
  const { data: productData, isLoading: isProductLoading } = useGetProductsQuery();
  console.log("asds", userData);
  console.log("fgdsa", productData);

  if (isUserLoading || isProductLoading) {
    return <div>No Data Available</div>;
  }

  const productsBelongingToUser = productData.filter(
    (product) => product.user_product.user_id === userData.user_id
  );
  console.log("Products belonging to user", productsBelongingToUser);

  return (
    <div>
      <div>
        <h1>{userData?.username}</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr key={userData?.username}>
              <td>{userData?.username}</td>
              <td>{userData?.first_name}</td>
              <td>{userData?.last_name}</td>
              <td>{userData?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {productsBelongingToUser.length > 0 && (
        <div>
          <div>
            <h1>Products Listed</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {productsBelongingToUser.map((product) => (
                  <tr key={product.product_id}>
                    <td>{product.name}</td>
                    <td>{product.picture_url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
