import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import "firebase/storage"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { 
  getFirestore, 
   collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc
 } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAQEALVTuZZOLqnfo9Xi_TMl_i7t5GFn3k",
  authDomain: "clone-fe6de.firebaseapp.com",
  projectId: "clone-fe6de",
  storageBucket: "clone-fe6de.appspot.com",
  messagingSenderId: "1007935507595",
  appId: "1:1007935507595:web:299fd7da8eaadc613f188e"
};


export const useFirebase = () => useContext(FirebaseContext);
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

/*
const fireexe = getFirestore(firebaseApp);
*/
export const database = {
  folders: collection(firestore,"folders"),
  files: (firestore, "files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  }
}

export const FirebaseProvider = (props) => {
 const [user, setUser] = useState(null);
console.log(user)
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        isLoggedIn,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
