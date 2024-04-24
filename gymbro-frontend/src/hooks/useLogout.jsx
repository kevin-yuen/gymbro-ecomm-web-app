import {useContext} from "react";

// context
import { AuthContext } from "../context/AuthContextProvider";

export default function useLogout() {
    console.log("logging out...");

    const authContext = useContext(AuthContext);
    const { setAuthState } = authContext;

    const handleLogout = () =>
    setAuthState((prevAuthState) => ({
      ...prevAuthState,
      isAuthorized: false,
    }));

    return { handleLogout, authContext }
}