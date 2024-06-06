import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

// components
import BrandComponent from "../../components/common/BrandComponent";

const CheckoutCompletion = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
      setTimeout(() => {
        navigate("/");
      }, 8000);
  });

  return (
    <>
      <div className="container auth-container text-center ps-sm-7 pe-sm-7 ps-xl-15 pe-xl-15">
        <h1 className="fs-2 custom-font-family-teko custom-color-darkpurple">
          <BrandComponent customWidth={10} customHeight={10} />
        </h1>

        <h1 className="form-label custom-font-family-teko custom-color-green fw-bolder">
          Your order has been placed!
        </h1>

        <p className="mt-1 fs-7">Your order has been successfully processed!</p>

        <p className="mt-1 fs-7">Thank you for shopping with us online</p>

        <div className="d-flex justify-content-center align-items-center">
          <p className="mb-0">Redirecting...</p>
          <div className="ms-2 spinner-border custom-color-darkpurple" role="status"></div>
        </div>
      </div>
    </>
  );
};

export default CheckoutCompletion;
