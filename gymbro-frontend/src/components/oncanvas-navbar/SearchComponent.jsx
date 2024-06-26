import React from "react";
import { Search } from "react-bootstrap-icons";

export default function SearchComponent() {
  return (
    <div className="input-group mb-3 align-items-center me-3">
      <div className="input-group-prepend position-absolute start-5 z-2">
        <Search size={15} />
      </div>
      <input
        type="text"
        className="form-control rounded fs-7 custom-background-color-lightpurple z-1 ps-5 pe-2"
        placeholder="Search GymBro"
        aria-label=""
        aria-describedby="basic-addon1"
      />
    </div>
  );
}
