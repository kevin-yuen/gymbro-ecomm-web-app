import React from "react";
import { Link } from "react-router-dom";
import { ChevronDoubleRight } from "react-bootstrap-icons";

// components
import CardComponent from "../common/CardComponent";

export default function PromotionComponent({ promotionHeading }) {
  return (
    <div className="row pt-3">
      <h1 className="ps-4 fw-bolder pb-2 fs-3 custom-font-family-teko d-flex align-items-center">
        {promotionHeading}
        <Link className="ms-3 text-decoration-none custom-background-color-darkpurple custom-color-antiquewhite fs-6 border rounded-5 ps-3 pe-3 pt-1 pb-1">
          SEE MORE<ChevronDoubleRight size={15} color="#f8faf9" className="ms-2"/>
        </Link>
      </h1>
      <div className="col-xl-3 col-md-4 col-6 d-flex justify-content-center">
        <CardComponent
          productTitle={"Adapt Safari Tight Shorts"}
          productRating={"4.1"}
          department={"Women"}
          manufacturer={"GymShark"}
          productPrice={"US$44"}
          productOrigPrice={"US$100"}
        />
      </div>
      <div className="col-xl-3 col-md-4 col-6 d-flex justify-content-center">
        <CardComponent
          productTitle={"Adapt Safari Tight Shorts"}
          productRating={"4.1"}
          department={"Women"}
          manufacturer={"GymShark"}
          productPrice={"US$44"}
          productOrigPrice={"US$100"}
        />
      </div>
      <div className="col-xl-3 col-md-4 col-6 d-flex justify-content-center">
        <CardComponent
          productTitle={"Adapt Safari Tight Shorts"}
          productRating={"4.1"}
          department={"Women"}
          manufacturer={"GymShark"}
          productPrice={"US$44"}
          productOrigPrice={"US$100"}
        />
      </div>
      <div className="col-xl-3 col-md-4 col-6 d-flex justify-content-center">
        <CardComponent
          productTitle={"Adapt Safari Tight Shorts"}
          productRating={"4.1"}
          department={"Women"}
          manufacturer={"GymShark"}
          productPrice={"US$44"}
          productOrigPrice={"US$100"}
        />
      </div>
    </div>
  );
}
