import React from "react";
import { Link } from "react-router-dom";

// components
import SignInFormComponent from "../../components/auth/SignInFormComponent";
import NeedHelpComponent from "../../components/auth/NeedHelpComponent";

export default function SignIn({formButton}) {
  return (
    <div className="border border-secondary-subtle border-1 border-top-0 border-bottom-0 border-start-0 border-end-0 rounded-2 text-start">
      <SignInFormComponent formButton={formButton}/>

      <div className="border border-secondary-subtle border-1 border-top-0 rounded-bottom text-start pb-3">
        <NeedHelpComponent />

        <div className="text-center mt-3">
          <p>---------- New to GymBro? ----------</p>

          <div className="mt-3">
            <Link to="/auth/register">
              <button className="custom-background-color-antiquewhite fw-medium fs-7 p-1 ps-3 pe-3 border border-light rounded-1">
                Create your GymBro account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
