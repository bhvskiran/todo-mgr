import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebase";

export const AppContext = createContext();

const ApplicationContext = ({ children }) => {
  const [user, setUser] = useState();

  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppContext.Provider value={{ googleSignIn, user, logOut }}>
      {children}
    </AppContext.Provider>
  );
};

export default ApplicationContext;
