/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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
  const [userRole, setUserRole] = useState(null);

  // Firebase Auth
  const auth = getAuth(app);

  /**
   *
   * Login and Signup functionality
   */
  const signIn = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

  const createAccount = (email, pass) =>
    createUserWithEmailAndPassword(auth, email, pass);

  const updateDisplayName = (name) =>
    updateProfile(auth.currentUser, { displayName: name });

  const providerSignIn = (provider) => signInWithPopup(auth, provider);

  /**
   *
   * Added @logout functionality
   */
  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // console.log(currentUser.uid);
          axios
            .get(
              `http://localhost:5000/users/single-user?email=${currentUser.email}`
            )
            .then((res) => {
              const role = res.data?.role;
              setUserRole(role);
              setUser(currentUser);
              setLoading(false);
              console.log(res);
            });
        } else {
          console.log("User isn't sign in");
          setLoading(false);
          setUserRole(null);
        }
      });
    return unsubscribe;
  }, []);

  const authInfo = {
    user,
    loading,
    userRole,
    createAccount,
    updateDisplayName,
    signIn,
    providerSignIn,
    logOut,
  };

  return <AuthContex.Provider value={authInfo}>{children}</AuthContex.Provider>;
};

export default AuthContexProvider;
