import React from 'react';
import { NavLink } from 'react-router-dom';
import boat from '../assets/boat.png';

const Nav = () => {
  return (
    <div className="items-center border-b-2 justify-between py-3 px-8 flex min-h-[4.06rem] border-zinc-300 border-solid">
      <div className="flex items-center">
        <NavLink to="/">
          <img src={boat} alt="Logo" className="h-16 w-16" />
          <span className="ml-2 text-lg font-semibold">thriftBay</span>
        </NavLink>
      </div>
      <nav className="flex h-8 ml-auto">
        <ul className="items-center justify-between flex list-disc -ml-1 gap-1 ml-auto">
          <li
            className="items-center cursor-pointer justify-center flex min-h-[2.75rem]"
            style={{ minWidth: "2.75rem" }}
          >
            <NavLink
              to="/likes"
              className="text-neutral-800 items-center justify-center flex min-h-[inherit]"
              style={{ minWidth: "inherit" }}
            >
              {/* SVG icon for Likes */}
            </NavLink>
          </li>
          <li
            className="items-center cursor-pointer justify-center flex min-h-[2.75rem]"
            style={{ minWidth: "2.75rem" }}
          >
            <NavLink
              to="/bag"
              className="text-neutral-800 items-center justify-center flex min-h-[inherit]"
              style={{ minWidth: "inherit" }}
            >
              {/* SVG icon for Bag */}
            </NavLink>
          </li>
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
              className="text-neutral-800 items-center justify-center flex min-h-[inherit]"
              style={{ minWidth: "inherit" }}
            >
              Log in
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
