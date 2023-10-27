import React, { useState } from "react";
import { Input } from "@material-tailwind/react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Input
      type="text"
      color="gray"
      size="lg"
      outline={undefined}
      placeholder="Search"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
