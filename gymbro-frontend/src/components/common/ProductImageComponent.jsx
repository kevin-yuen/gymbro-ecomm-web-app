import React, { useState, useEffect } from "react";

// components
import ThumbnailsComponent from "../products/ThumbnailsComponent";

const ProductImageComponent = ({
  src,
  height,
  location = undefined,
  options = undefined,
}) => {
  console.log("Product Image Component re-renders");

  return (
    <>
      <img src={src} className="card-img-top" height={height} />
    </>
  );
};

export default ProductImageComponent;
