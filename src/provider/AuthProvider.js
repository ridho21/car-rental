import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
const AuthProvider = (props) => {
  const auth = getAuth();
  // user null = loading
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(true);
        // console.log(u.email);
        // getUserData();
        if (u.email === "admin@gmail.com"){
          setUser('admin');
          setAdmin(true);
        }
      }
      else {
        setAdmin(false);
        setUser(false);
        // setUserData(null);
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        admin
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
