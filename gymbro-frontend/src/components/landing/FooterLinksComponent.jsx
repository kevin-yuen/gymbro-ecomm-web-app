import React from "react";
import { Link } from "react-router-dom";

export default function FooterLinksComponent({ destination, linkName }) {
  return (
    <> 
        {
          <li className="pb-1">
            <Link
              className="footer-links text-decoration-none custom-color-black"
              to={destination}
            >
              {linkName}
            </Link>
          </li>
        }
    </>
  );
}
