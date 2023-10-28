import React, { useEffect } from "react";
import { Navbar, Button } from "@material-tailwind/react";
import { useGetTokenQuery } from "../store/authApi";
import boat from "../assets/boat.png";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProfileMenu from "./Profile";

const ComplexNavbar = () => {
  const { data, isLoading } = useGetTokenQuery();
  // Add this useEffect hook
  useEffect(() => {
    if (!isLoading && data) {
      // Fetch or set up other required data here
      console.log("Data is loaded", data);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <progress className="progress is-primary" max="100" />;
  }

return (
  <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
    <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
      <NavLink to="/">
        <img src={boat} alt="Logo" className="h-16 w-16" />
        thriftBay
      </NavLink>
      <SearchBar />
      <div className="hidden lg:block"></div>
      <ul>
        {data === null ? (
          <>
            <li>
              <NavLink to="/signup">
                <Button size="sm" variant="text">
                  <span>Sign up</span>
                </Button>
              </NavLink>
              <NavLink to="/login">
                <Button size="sm" variant="text">
                  <span>Login</span>
                </Button>
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <ProfileMenu />
          </li>
        )}
      </ul>
    </div>
  </Navbar>
);
};

export default ComplexNavbar;
