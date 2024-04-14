import React, {createContext, useReducer} from "react";

export const AuthContext = createContext();

const initialUserState = {
    email: null,
    password: null,
    isLoggedIn: false
}

const handleSignInReducer = (state, action) => {
    switch (action.type) {
        case "ON_CHANGE_EMAIL":
            return {...state, email: action.payload};
        case "ON_CHANGE_PASSWORD":
            return {...state, password: action.payload};
        case "ON_CLICK_LOG_IN":
            return {...state, isLoggedIn: state.password !== null ? true : false};
        default:
            return state;
    }
}

const [user, dispatch] = useReducer(handleSignInReducer, initialUserState);

export default function AuthContextProvider({children}) {
    return (
        <AuthContext.Provider value={{user, dispatch, handleSignInReducer}}>
            {children}
        </AuthContext.Provider>
    )
}