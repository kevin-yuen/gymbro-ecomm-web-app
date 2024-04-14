import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

// components
import ProgressBarComponent from "../components/checkout/ProgressBarComponent";
import PriceSummaryComponent from "../components/checkout/PriceSummaryComponent";
import FooterComponent from "../components/common/FooterComponent";
import PrevStepComponent from "../components/checkout/PrevStepComponent";
import NextStepComponent from "../components/checkout/NextStepComponent";

// context
import { CheckoutContext } from "../context/CheckoutContextProvider";

export default function ShoppingBagLayout() {
  const checkoutContext = useContext(CheckoutContext);

  return (
    <>
      <div className="container mt-5">
        <div className="container d-flex justify-content-between align-items-center ps-5 pe-5">
          <ProgressBarComponent
            destination={"/bag"}
            stepNumber={1}
            stepName={"Your bag"}
            stepClicked={checkoutContext.handleShowHideRouteSteps}
          />
          <ProgressBarComponent
            destination={"information"}
            stepNumber={2}
            stepName={"Information"}
            stepClicked={checkoutContext.handleShowHideRouteSteps}
          />
          <ProgressBarComponent
            destination={"shipping"}
            stepNumber={3}
            stepName={"Shipping"}
            stepClicked={checkoutContext.handleShowHideRouteSteps}
          />
          <ProgressBarComponent
            destination={"payment"}
            stepNumber={4}
            stepName={"Payment"}
            stepClicked={checkoutContext.handleShowHideRouteSteps}
          />
          <ProgressBarComponent
            destination={"checkout-complete"}
            stepNumber={5}
            stepName={"Complete"}
            stepClicked={checkoutContext.handleShowHideRouteSteps}
          />
        </div>
      </div>

      <main className="ps-8 pe-8">
        <div className="row pt-3">
          <div className="col-7">
            <Outlet />

            <div className="position-relative mb-7">
              <div className="position-absolute start-0">
                {(checkoutContext.step.previous.prevDestination !== null ||
                checkoutContext.step.previous.prevStepName !== null) && checkoutContext.step.currentStep != "Complete" ? (
                  <PrevStepComponent
                    destination={checkoutContext.step.previous.prevDestination}
                    stepName={checkoutContext.step.previous.prevStepName}
                    handlePrevStep={checkoutContext.handleShowHideRouteSteps}
                  />
                ) : (
                  <></>
                )}
              </div>

              <div className="position-absolute end-0">
                {checkoutContext.step.next.nextDestination !== null ||
                checkoutContext.step.next.nextStepName !== null ? (
                  <NextStepComponent
                    destination={checkoutContext.step.next.nextDestination}
                    stepName={checkoutContext.step.next.nextStepName}
                    handleNextStep={checkoutContext.handleShowHideRouteSteps}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="col-5 mt-1">
            <PriceSummaryComponent currentStep={checkoutContext.step.currentStep} />
          </div>
        </div>
      </main>

      <FooterComponent />
    </>
  );
}
