import React from "react";

const ProductImageComponent = ({
  src,
  height,
  location = undefined,
  options = undefined,
}) => {
  return (
    <>
      <img src={src} className="card-img-top" height={height} />
    </>
  );
};

export default ProductImageComponent;
