import React from "react";

const ProductDescComponent = ({ prodDesc, prodSpec, prodFitAndCare }) => {
  console.log("Product Desc Component re-renders");

  return (
    <div className="accordion" id="productDescSpec">
    <div className="accordion-item border-0 border-bottom">
      <h2 className="accordion-header">
        <button className="accordion-button custom-font-family-inconsolata fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#description" aria-expanded="true" aria-controls="description">
          DESCRIPTION
        </button>
      </h2>
      <div id="description" className="accordion-collapse collapse show" data-bs-parent="#productDescSpec">
        <div className="accordion-body">
          <p className="text-center fs-7 fw-bold">
            {prodDesc[0]}
          </p>

          <p className="fs-7">
            {prodDesc[1]}
          </p>

          <ul>
            {prodDesc.map(element => {
              if (prodDesc.indexOf(element) > 1) {
                return (
                  <li className="fs-7">{element}</li>
                )
              }
            })}
          </ul>
        </div>
      </div>
    </div>

    <div className="accordion-item border-0 border-bottom">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed custom-font-family-inconsolata fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#spec" aria-expanded="false" aria-controls="spec">
          SPECIFICATION
        </button>
      </h2>
      <div id="spec" className="accordion-collapse collapse" data-bs-parent="#productDescSpec">
        <div className="accordion-body">
          <ul>
            {prodSpec.map(element => <li className="fs-7">{element}</li>)}
          </ul>
        </div>
      </div>
    </div>

    <div className="accordion-item border-0">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed custom-font-family-inconsolata fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#fitAndCare" aria-expanded="false" aria-controls="fitAndCare">
          FIT AND CARE
        </button>
      </h2>
      <div id="fitAndCare" className="accordion-collapse collapse" data-bs-parent="#productDescSpec">
        <div className="accordion-body">
        <ul>
            {prodFitAndCare.map(element => <li className="fs-7">{element}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
};

export default React.memo(ProductDescComponent);
