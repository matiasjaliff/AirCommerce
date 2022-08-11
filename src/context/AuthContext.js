import { useState, createContext } from "react";
import { useEffect } from "react";


//estado inicial para el contexto
const authContextInitialState = {
  user: null,
  isAuthenticated: false,
  toggleAuth: () => null,
};

export const AuthContext = createContext(authContextInitialState);

// componente provider
const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState({
    user: null,
    isAuthenticated: false,
  });

  const toggleAuth = (user) =>
    setLoggedIn({
      user: user,
      isAuthenticated: !loggedIn.isAuthenticated,
    });

    useEffect(() => {
      const userStorage = JSON.parse(localStorage.getItem("user"));
      userStorage
        ? setLoggedIn({ user: userStorage.name, isAuthenticated: true })
        : setLoggedIn({ user: null, isAuthenticated: false });
    }, []);

  return (
    <AuthContext.Provider value={{ ...loggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
