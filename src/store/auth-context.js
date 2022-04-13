import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
  
    const remainingDuration = adjExpirationTime - currentTime;
  
    return remainingDuration;
  };

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    //.----local storage is synchronous, so use useEffect
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const loginHandler = (token, expTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        const remainingTime = calculateRemainingTime(expTime);
        setTimeout(logoutHandler, remainingTime);
    }
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token')
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;