import React, { useState } from "react";

const useHandleCurrentAuthStatus = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleCurrentAuthStatus = () => {
    const authUser = JSON.parse(localStorage.getItem("authorizedUser"));

    setIsUserLoggedIn(authUser === null ? false : {userid: authUser.userid, name: authUser.name, isLoggedIn: authUser.isLoggedIn});
  }
    

  return {isUserLoggedIn, handleCurrentAuthStatus}
};

export default useHandleCurrentAuthStatus;
