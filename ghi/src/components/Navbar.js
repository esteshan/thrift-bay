import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useGetTokenQuery, useLogoutMutation } from "../store/authApi";
import boat from "../assets/boat.png";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";


const useProfileMenuItems = () => {
  const { data } = useGetTokenQuery();
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const handleProfile = () => {
    navigate(`/users/${data.user.username}`);
  }

  const handleProducts = () => {
    navigate("/products/new")
  }

  return [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      onClick: handleProfile,
    },
    {
        label: "Create Product",
        icon: PlusCircleIcon,
        onClick: handleProducts,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      onClick: handleLogout,
    },
  ];
};



function ProfileMenu() {
  const items = useProfileMenuItems();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {items.map(({ label, icon, onClick }, key) => {
         const isLastItem = key === items.length - 1;;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                onClick();
                closeMenu();
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}



export function ComplexNavbar() {
  const { data } = useGetTokenQuery();


return (
  <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
    <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
      <Typography
        as="a"
        href="/"
        className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
      >
        <img src={boat} alt="Logo" className="h-16 w-16" />
        thriftBay
      </Typography>
        <SearchBar />
      <div className="hidden lg:block">
      </div>
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
