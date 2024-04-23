import React from "react";

const AuthErrorComponent = ({ authErrEncountered }) => {
  return (
    <>
      {authErrEncountered ? (
        <div className="border rounded-1 custom-background-color-red custom-color-antiquewhite fs-7 mb-2 pt-1 pb-1 ps-3">
            {authErrEncountered}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(AuthErrorComponent);
