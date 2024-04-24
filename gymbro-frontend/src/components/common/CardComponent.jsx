import React, { useContext } from "react";
import { StarFill, BagPlusFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// context
import { AuthContext } from "../../context/AuthContextProvider";

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
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  return (
    <div className="position-relative">
      <Link to="/aboutProduct" className="text-decoration-none">
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

      {authState.isAuthorized ? (
        <div className="position-absolute top-90 start-90">
          <BagPlusFill size={20} color="#3E0957" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
