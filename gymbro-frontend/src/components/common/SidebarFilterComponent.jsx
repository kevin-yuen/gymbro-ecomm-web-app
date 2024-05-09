import React from "react";

// config
import sideBarData from "../../config/sidebarData.json";

const handleGenerateCriteria = (section, setOfOptions) => {
  if (section.fieldName === "Sort By") {
    // display each option row by row
    return setOfOptions.map((option) => (
      <div className="row">
        <div className="col ps-4">
          <div
            className="collapse multi-collapse"
            id={section.fieldID.substring(1)} // remove # (e.g. #sortBy => sortBy)
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={section.fieldName}
                id={option}
              />
              <label className="form-check-label fs-7" htmlFor={option}>
                {option}
              </label>
            </div>
          </div>
        </div>
      </div>
    ));
  } else {
    // display each option col by col per row
    return (
      <div className="row">
        <div className="col ps-1 pe-1">
          {setOfOptions.map((option) => {
            if (setOfOptions.indexOf(option) % 2 === 0) {
              return (
                <div
                  className="collapse multi-collapse"
                  id={section.fieldID.substring(1)}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type={
                        section.fieldType === "radio" ? "radio" : "checkbox"
                      }
                      name={section.fieldName}
                      id={option}
                    />
                    <label className="form-check-label fs-7" htmlFor={option}>
                      {option}
                    </label>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="col ps-1 pe-1">
          {setOfOptions.map((option) => {
            if (setOfOptions.indexOf(option) % 2 !== 0) {
              return (
                <div
                  className="collapse multi-collapse"
                  id={section.fieldID.substring(1)}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type={
                        section.fieldType === "radio" ? "radio" : "checkbox"
                      }
                      name={section.fieldName}
                      id={option}
                    />
                    <label className="form-check-label fs-7" htmlFor={option}>
                      {option}
                    </label>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
};

export default function SidebarFilterComponent() {
  return (
    <div className="sidebar ps-2">
      <p className="fs-3 fw-bolder custom-font-family-teko border-bottom mb-0">
        FILTER & SORT
      </p>

      {sideBarData.Sidebar.map((section) => (
        <div className="ms-n2 border-bottom pt-2 pb-2">
          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn fs-6 fw-bolder"
              data-bs-toggle="collapse"
              href={section.fieldID}
              aria-expanded="false"
              aria-controls={section.fieldID.substring(1)} // remove # (e.g. #sortBy => sortBy)
            >
              {section.fieldName}
            </button>
          </div>

          {handleGenerateCriteria(section, section.options)}
        </div>
      ))}
    </div>
  );
}
