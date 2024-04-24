import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const initialAuthState = {
    name: null,
    email: null,
    isAuthorized: false,
  };
  const [authState, setAuthState] = useState(initialAuthState);

  // useEffect(() => console.log(authState), [authState])

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
