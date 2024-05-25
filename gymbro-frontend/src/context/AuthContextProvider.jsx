import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const initialAuthState = {
    userid: null,
    name: null,
    email: null,
    isAuthorized: false,
  };
  const [authState, setAuthState] = useState(initialAuthState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
