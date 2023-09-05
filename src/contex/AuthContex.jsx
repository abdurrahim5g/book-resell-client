/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config";
export const AuthContex = createContext();

const AuthContexProvider = ({ children }) => {
  /**
   *
   * Setup States
   */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase Auth
  const auth = getAuth(app);

  /**
   *
   * Login and Signup functionality
   */
  const signIn = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

  const providerSignIn = (provider) => signInWithPopup(auth, provider);

  useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          console.log(currentUser.uid);
          setUser(currentUser);
          setLoading(false);
        } else {
          console.log("User isn't sign in");
        }
      });
    return unsubscribe;
  }, []);

  const authInfo = { user, loading, signIn, providerSignIn };

  return <AuthContex.Provider value={authInfo}>{children}</AuthContex.Provider>;
};

export default AuthContexProvider;
