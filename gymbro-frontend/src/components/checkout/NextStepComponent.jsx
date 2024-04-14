import React, {useRef} from "react";
import { Link } from "react-router-dom";
import { ChevronDoubleRight } from "react-bootstrap-icons";

const NextStepComponent = ({ destination, stepName, handleNextStep }) => {
  const nextStep = useRef();
  
  return (
    <Link
      id={stepName}
      ref={nextStep}
      to={destination}
      className="d-flex justify-content-end mt-3 mb-3 text-decoration-none"
    >
      <button className="rounded-5 ps-4 pe-4 pt-2 pb-2 border-0 custom-font-family-teko fw-bold custom-color-antiquewhite custom-background-color-darkpurple" onClick={() => handleNextStep(nextStep.current)}>
        Proceed to {stepName}
        <ChevronDoubleRight size={16} color="#f8faf9" className="ms-2" />
      </button>
    </Link>
  );
};

export default NextStepComponent;
