import React from "react";
import { Link } from "react-router-dom";

// components
import BrandComponent from "../components/common/BrandComponent";

export default function NotFound() {
    return (
        <div className="container-fluid text-center position-absolute top-20">
            <h1 className="fs-1 custom-font-family-teko custom-color-darkpurple">
            <BrandComponent customWidth={30} customHeight={30} />
            </h1>
            <p className="fw-bolder fs-14">OOPS! NOTHING'S HERE</p>
            <Link to="/"><button type="button" className="border border-light rounded-2 custom-color-antiquewhite custom-background-color-darkpurple fw-light fs-5 ps-5 pe-5 pt-2 pb-2">RETURN HOME</button></Link>
        </div>
    )
}