import React from "react";
import {
  Navbar,
  Button,
} from "@material-tailwind/react";
import { useGetTokenQuery} from "../store/authApi";
import boat from "../assets/boat.png";
import { NavLink } from "react-router-dom";
import ProfileMenu from "./Profile";
import SearchBar from "./bar";

const  ComplexNavbar =()=> {
  const { data } = useGetTokenQuery();

return (
  <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
    <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
      <NavLink to="/">
        <img src={boat} alt="Logo" className="h-10 w-10" />
        thriftBay
      </NavLink>
      <SearchBar />
      <div className="hidden lg:block"></div>
      {data === null ? (
        <>
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
        </>
      ) : (
        <ProfileMenu />
      )}
    </div>
  </Navbar>
);

}

export default ComplexNavbar;
