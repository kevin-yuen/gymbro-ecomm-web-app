import React from "react";

// config
import sideBarData from "../../config/sidebarData.json";

export default function SidebarFilterComponent() {
  return (
    <div className="sidebar ps-2">
      <p className="fs-3 fw-bolder custom-font-family-teko border-bottom mb-0">
        FILTER & SORT
      </p>

      {sideBarData.Sidebar.map((sideBarCriteria) => (
        <div className="ms-n2 border-bottom pt-2 pb-2">
          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn fs-6 fw-bolder"
              data-bs-toggle="collapse"
              href={sideBarCriteria.fieldID}
              aria-expanded="false"
              aria-controls={sideBarCriteria.fieldID.substring(1)}
            >
              {sideBarCriteria.fieldName}
            </button>
          </div>

          {sideBarCriteria.options.map((option) => (
            <div className="row">
              <div className="col ps-4">
                <div className="collapse multi-collapse" id={sideBarCriteria.fieldID.substring(1)}>
                  <div className="form-check">
                    <input
                      class="form-check-input"
                      type={sideBarCriteria.fieldType === "radio" ? "radio" : "checkbox"}
                      name={sideBarCriteria.fieldName}
                      id={option}
                    />
                    <label class="form-check-label fs-7" htmlFor={option}>
                      {option}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

