import { createContext, useContext, useState } from "react";

//create context
const AuthContext = createContext();

//create provider so that it can provide values to children

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    function login(token, user){
        setToken(token);
        setUser(user);
    }

    function logout() {
        setToken(null);
        setUser(user);
    }

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