import React from "react";
import { StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import leggingsImg from "../../assets/leggings-test.jpeg";

const styles = {
  width: "18rem",
};

export default function CardComponent({
  productTitle,
  productRating,
  department,
  manufacturer,
  productPrice,
  productOrigPrice,
}) {
  return (
    <Link to="/about-product" className="text-decoration-none">
      <div className="card border-0" style={styles}>
        <img src={leggingsImg} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title fs-7 fw-bolder">{productTitle}</h5>
            <div>
              <StarFill size={15} color="#000000" />
              <span>&nbsp;{productRating}</span>
            </div>
          </div>
          <p className="card-text fs-8">
            {department}
            <br />
            {manufacturer}
            <br />
            {productPrice}&nbsp;
            <span className="text-decoration-line-through text-danger">
              {productOrigPrice}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
