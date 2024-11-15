import { createContext, useContext, useEffect, useState } from "react";
import { getUserLoginData, removeUserLoginData, saveUserLoginData } from "../helpers/LocalStorageHelper";

//create context
const AuthContext = createContext();

//create provider so that it can provide values to children

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getUserLoginData()?.token);
    const [user, setUser] = useState(getUserLoginData()?.user);

// OnLoad
//user and token change    
    useEffect(() => {
        // save user informations
        if(user && token) saveUserLoginData(token, user);
         else removeUserLoginData();
        
    }, [user, token]);
    // login kar rha hoga
    function login(token, user){
        setToken(token);
        setUser(user);
    }
    // logout ho rha hoga
    function logout() {
        setToken(null);
        setUser(user);
    }
    //user check kaar rha hoga
    function isLogin() {
        return token && user;
    }

    return (
    <AuthContext.Provider value={{
        token,
        user,
        login,
        logout,
        isLogin,
        user,
    }}>
        {children}
    </AuthContext.Provider>
    )
};

//how to use this context

export const useAuth = () => useContext(AuthContext);