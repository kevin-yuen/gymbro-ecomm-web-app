import React from "react";

const ProductImageComponent = ({src, height}) => {
    console.log("Product Image re-renders");

    return (
        <img
        src={src}
        className="card-img-top"
        height={height}
      />
    )
}

export default ProductImageComponent;