import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDoubleLeft } from "react-bootstrap-icons";

const PrevStepComponent = ({ destination, stepName, handlePrevStep }) => {
  const prevStep = useRef();

  return (
    <Link
      id={stepName}
      ref={prevStep}
      to={destination}
      className="d-flex justify-content-end mt-3 mb-3 text-decoration-none"
    >
      <button
        className="rounded-5 ps-4 pe-4 pt-2 pb-2 border-0 custom-font-family-teko fw-bold custom-color-antiquewhite custom-background-color-darkpurple"
        onClick={() => handlePrevStep(prevStep.current)}
      >
        <ChevronDoubleLeft size={16} color="#f8faf9" className="me-2" />
        Return to {stepName}
      </button>
    </Link>
  );
};

export default PrevStepComponent;
