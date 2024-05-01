import React from "react";

// components
import CardComponent from "../common/CardComponent";

export default function PromotionComponent({
  discountItems,
}) {
  return (
    <div className="row pt-3">
      {discountItems?.map((item) => {
        return (
          <div className="col-xl-3 col-md-4 col-6 d-flex justify-content-center">
            <CardComponent discountItem={item} />
          </div>
        );
      })}
    </div>
  );
}
