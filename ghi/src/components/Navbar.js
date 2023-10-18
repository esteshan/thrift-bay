import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="items-center border-b-2 justify-between py-3 px-8 flex min-h-[4.06rem] border-zinc-300 border-solid">
      {/* ... your code ... */}
      <section className="bottom-[13.75rem] left-[2.00rem] absolute right-[189.75rem] top-[-6.25rem]">
        {/* ... skipped for brevity ... */}
      </section>
      <a
        href="https://www.depop.com/"
        className="text-blue-700 cursor-pointer underline"
      >
        {/* ... skipped SVG for brevity ... */}
      </a>
      <div>
        <div className="flex-col flex ml-6">
          <form
            style={{ maxWidth: "44.00rem" }}
            className="relative flex w-[calc(42vw)] m-auto"
          >
            {/* ... skipped for brevity ... */}
          </form>
        </div>
      </div>
      <nav className="flex h-8">
        <ul className="items-center justify-between flex list-disc -ml-1 gap-1">
          {/* ... skipped list items for brevity ... */}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
