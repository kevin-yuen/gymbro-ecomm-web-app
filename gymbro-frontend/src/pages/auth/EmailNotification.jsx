import React, { useState, useEffect } from "react";
import { Check2Circle } from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EmailNotification({
  autoRedirect,
  userSpecificRedirect,
  header,
  text,
  alttext1,
  alttext2,
  url,
  labelurl,
}) {
  const location = useLocation();
  const id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const [userId, setUserId] = useState(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoRedirect) {
      setTimeout(() => {
        navigate(url);
      }, 8000);
    }
  });

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Check2Circle size={55} color="#3EC40C" />
        <h3 className="ps-3 custom-color-lightgreen fw-bolder">{header}</h3>
      </div>

      <p className="mt-3 fs-7">
        {text}&nbsp;
        {location.state === null ? (
          <></>
        ) : (
          <span className="fw-bolder">{location.state + ".\n"}</span>
        )}
        {alttext1}&nbsp;
        <Link to={userSpecificRedirect ? url + `/${userId}` : url}>
          {labelurl}
        </Link>
        {/* loading spinner */}
        {autoRedirect ? (
          <div
            className="spinner-border spinner-border-sm custom-color-darkpurple ps-2"
            role="status"
            size={7}
          ></div>
        ) : (
          <></>
        )}
        <br />
        <br />
        {alttext2}.
      </p>
    </>
  );
}
