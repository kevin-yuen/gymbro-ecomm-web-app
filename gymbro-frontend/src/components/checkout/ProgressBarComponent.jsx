import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const ProgressBarComponent = ({ destination, stepNumber, stepName, stepClicked }) => {
  const step = useRef(null);
  //const previousStep = null;

  const handleChangeStepColor = (step) => {
    // switch (step.current.id) {
    //   case "YOUR BAG":
    //     step.current.style.backgroundColor = "#E6E6E6";
    //     previousStep = step;
    //     break;
    //   case "INFORMATION":
    //     step.current.style.backgroundColor = "#E6E6E6";
    //     previousStep = step;
    //     break;
    //   default:
    //     break;
    // }
  };

  useEffect(() => {
    const stepName = step.current;

    if (stepName.id !== "YOUR BAG") {
      const stepNumButton = stepName.children[0].children[0].children[0]; // step number button
      const stepNumLabel = stepName.children[0].children[1]; // step number label

      stepNumButton.style.borderColor = "#E6E6E6";
      stepNumButton.disabled = false;
      stepNumLabel.style.color = "#E6E6E6";
      stepNumLabel.disabled = false;
    }
  }, []);

  return (
    <>
      <ul className="list-unstyled">
        <div className="text-center">
          <li ref={step} id={stepName}>
            <NavLink
              to={destination}
              className="text-decoration-none custom-color-black"
            >
              <div className="d-flex justify-content-center">
                <button className="checkout-progress-border border-3 d-flex justify-content-center align-items-center fw-semibold" onClick={() => stepClicked(step.current)}>
                  {stepNumber}
                </button>
              </div>
              <button className="mt-2 fs-9 fw-bold bg-white border-0" onClick={() => stepClicked(step.current)}>
                {stepName}
              </button>
            </NavLink>
          </li>
        </div>
      </ul>
    </>
  );
};

export default ProgressBarComponent;
