import {useContext} from "react";

// context
import { AuthContext } from "../context/AuthContextProvider";

export default function useLogout() {
    const authContext = useContext(AuthContext);
    const { setAuthState } = authContext;

    const handleLogout = () =>
    setAuthState((prevAuthState) => ({
      ...prevAuthState,
      isAuthorized: false,
    }));

    return { handleLogout, authContext }
}