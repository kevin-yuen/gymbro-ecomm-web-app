import React from "react";

// images
import image1 from "../../assets/testing/image1.jpeg";
import image2 from "../../assets/testing/image2.jpeg";
import image3 from "../../assets/testing/image3.jpeg";
import image4 from "../../assets/testing/image4.jpeg";

// component
import ProductImageComponent from "../products/ProductImageComponent.jsx";

export default function ProductImageGroupComponent() {
  return (
    <>
      <div className="row text-center">
        <div className="col">
          <ProductImageComponent productImg={image1} />
        </div>
      </div>
      <div className="row text-center pt-1">
        <div className="col">
          <p className="fs-8">Click to enlarge the image.</p>
        </div>
      </div>
      <div className="row pt-1">
        <div className="col">
          <div className="d-flex justify-content-center justify-content-around">
            <img src={image1} height={85} />
            <img src={image2} height={85} />
            <img src={image3} height={85} />
            <img src={image4} height={85} />
          </div>
        </div>
      </div>
    </>
  );
}
