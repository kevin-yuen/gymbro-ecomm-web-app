import React from "react";

const AboutProductContentWrapperComponent = ({
  children,
  productImageComponent,
  aboutProductDetailsComponent,
  colorPickerComponent,
  sizePickerComponent,
  productDescComponent,
  productReviewsComponent
}) => {
  console.log("About Product Content Wrapper Component re-renders");

  return (
    <>
      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <div className="row text-center">
              <div className="col">{productImageComponent}</div>
            </div>

            <div className="row text-center pt-1">
              <div className="col">
                <p className="fs-8">Click to enlarge the image.</p>
              </div>
            </div>

            <div className="row pt-1">
              <div className="col">
                <div className="d-flex justify-content-center justify-content-around">
                  {children}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="border rounded-3 mt-3 pt-2 pe-2">
              {aboutProductDetailsComponent}

              <div className="mt-4 ps-2">{colorPickerComponent}</div>

              <div className="mt-4 ps-2">{sizePickerComponent}</div>

              <div className="mt-4 ps-2">{productDescComponent}</div>
            </div>
          </div>
        </div>

        <div className="row">
          {productReviewsComponent}
        </div>
      </div>
    </>
  );
};

export default AboutProductContentWrapperComponent;
