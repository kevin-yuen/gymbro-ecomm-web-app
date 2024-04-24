import React from "react";
import { Search } from "react-bootstrap-icons";

export default function SearchComponent() {
  console.log("Search Component re-renders...");
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
    // <div className="input-group">
    //   {/* <Search className="position-relative start-10" size={25} /> */}
    //   <div className="input-group-append">
    //     <button
    //       className="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3"
    //       type="button"
    //     >
    //       <Search size={25} />
    //     </button>
    //   </div>
    //   <input
    //     type="text"
    //     className="form-control"
    //     // className="input-search me-2 pt-2 pb-2 ps-5 pe-4 custom-background-color-lightpurple rounded-2"
    //     placeholder="Search GymBro"
    //   />
    // </div>
  );
}
