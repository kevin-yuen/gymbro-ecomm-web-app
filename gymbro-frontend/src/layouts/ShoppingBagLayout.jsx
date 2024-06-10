import React, { useContext, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

// context
import { ShoppingBagContext } from "../context/ShoppingBagContextProvider";

// config
import CheckoutConfig from "../config/checkout.json";

const checkoutSteps = CheckoutConfig.checkout;

export default function ShoppingBagLayout({ children }) {
  const shoppingBagContext = useContext(ShoppingBagContext);

  const [enableNavigation, setEnableNavigation] = useState(false);

  useEffect(() => {
    setEnableNavigation(
      shoppingBagContext.shoppingBagItems.length >= 1 ? true : false
    );
  }, [shoppingBagContext.shoppingBagItems]);

  return (
    <>
      <div className="checkoutSteps-container container">
        <div className="container d-flex justify-content-between align-items-center ps-5 pe-5">
          {checkoutSteps.map((checkoutStep, i) => (
            <ul className="list-unstyled" key={i}>
              <div className="text-center" id={checkoutStep.name}>
                <li>
                  {enableNavigation ? (
                    <NavLink
                      end
                      to={
                        checkoutStep.name !== "Your Bag"
                          ? checkoutStep.routePath
                          : "/your-bag"
                      }
                      className="checkout-progress-link text-decoration-none"
                    >
                      <div className="d-flex justify-content-center">
                        <button className="checkout-step-button border-2 rounded-circle ps-4 pe-4 pt-3 pb-3 d-flex justify-content-center align-items-center fw-semibold">
                          {checkoutSteps.indexOf(checkoutStep) + 1}
                        </button>
                      </div>
                      <button className="mt-2 fs-9 fw-bold bg-white border-0">
                        {checkoutStep.name}
                      </button>
                    </NavLink>
                  ) : (
                    <>
                      <div className="d-flex justify-content-center">
                        <button
                          className="checkout-step-button border-2 rounded-circle ps-4 pe-4 pt-3 pb-3 d-flex justify-content-center align-items-center fw-semibold"
                          disabled
                        >
                          {checkoutSteps.indexOf(checkoutStep) + 1}
                        </button>
                      </div>
                      <button
                        className="mt-2 fs-9 fw-bold bg-white border-0"
                        disabled
                      >
                        {checkoutStep.name}
                      </button>
                    </>
                  )}
                </li>
              </div>
            </ul>
          ))}
        </div>
      </div>

      <main className="ps-8 pe-8">
        <div className="row pt-3">
          <div className="col-lg-7">
            <Outlet />
          </div>

          <div className="sb-separator">
            <hr />
          </div>

          <div className="col-lg-5 mt-1">{children}</div>
        </div>
      </main>
    </>
  );
}
