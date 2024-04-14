import React from "react";
import { Search } from "react-bootstrap-icons";

export default function SearchComponent() {
  return (
    <>
      <Search className="position-relative start-10" size={25} />
      <input
        type="text"
        className="input-search me-2 pt-2 pb-2 ps-5 pe-4 custom-background-color-lightpurple rounded-2"
        placeholder="Search GymBro"
      />
    </>
  );
}
