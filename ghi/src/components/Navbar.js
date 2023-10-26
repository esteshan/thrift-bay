import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetTokenQuery, useLogoutMutation } from "../store/authApi";
import boat from "../assets/boat.png";
import { toast } from "react-toastify";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Nav = () => {
  const { data, isLoading } = useGetTokenQuery();
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <progress className="progress is-primary" max="100" />;
  }

  const handleLogout = () => {
    logoutUser();
    toast("Logout successful!");
    navigate("/");
  };

  return (
    <div
      className="items-center border-b-2 justify-between py-3 px-8 flex min-h-[4.06rem]"
      style={{ backgroundColor: "#114B5F" }}
    >
      <div className="flex items-center">
        <NavLink to="/">
          <img src={boat} alt="Logo" className="h-16 w-16" />
          <span className="ml-2 text-lg text-white font-semibold">
            thriftBay
          </span>
        </NavLink>
      </div>
      <nav className="flex h-8 ml-auto">
        <ul className="items-center justify-between flex list-disc -ml-1 gap-1 ml-auto">
          {data === null ? (
            <>
              <li
                className="items-center cursor-pointer justify-center flex min-h-[2.75rem]"
                style={{ minWidth: "2.75rem" }}
              >
                <NavLink
                  to="/signup"
                  className="text-white bg-neutral-800 items-center justify-center py-1 px-4 flex mx-1 border-2 border-neutral-800 border-solid rounded-sm"
                >
                  Sign up
                </NavLink>
              </li>
              <li
                className="items-center cursor-pointer justify-center flex min-h-[2.75rem]"
                style={{ minWidth: "2.75rem" }}
              >
                <NavLink
                  to="/login"
                  className="text-neutral-800 items-center justify-center flex min-h-[inherit] text-white"
                  style={{ minWidth: "inherit" }}
                >
                  Log in
                </NavLink>
              </li>
            </>
          ) : (
            <Menu as="li" className="relative">
              <Menu.Button className="text-white cursor-pointer">
                {data.user.username}
                <ChevronDownIcon className="h-4 w-4 ml-2" aria-hidden="true" />
              </Menu.Button>
              <Transition as={Fragment}>
                <Menu.Items className="absolute bg-white text-black right-0 mt-2 w-32 border rounded">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to={"/"}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2"
                        )}
                        onClick={handleLogout}
                      >
                        Log out
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to={`/users/${data.user.username}`}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2"
                        )}
                      >
                        Profile
                      </NavLink>
                    )}
                  </Menu.Item>
                  {/* Add more list items here for other dropdown options */}
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
