import React, { useContext } from "react";
import { Trash } from "react-bootstrap-icons";

// components
import QuantityDropdownComponent from "../../components/common/QuantityDropdownComponent";

// context
import { CheckoutContext } from "../../context/CheckoutContextProvider";

const ProductInBagComponent = ({ imgSrc }) => {
  const checkoutContext = useContext(CheckoutContext);

  return (
    <div className="card mb-3 border-0 border-bottom">
      <div className="row g-0">
        <div className="col-md-4 text-center">
          <img src={imgSrc} alt={imgSrc} height={200} />
        </div>
        <div className="col-md-8">
          <div className="card-body fs-7">
            <p className="card-text mb-0">Adapt Safari Seamless Legging</p>
            <p className="card-text mb-0">Body Fit</p>
            <p className="card-text">Force Green | S</p>
            <p className="card-text fw-semibold">US$55</p>

            {checkoutContext.step.currentStep !== "Complete" ? (
              <div className="mt-5 d-flex justify-content-between">
                <Trash size={20} />
                <QuantityDropdownComponent />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInBagComponent;
