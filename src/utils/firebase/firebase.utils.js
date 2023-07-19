import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

// -------------------------------------------------------------

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1eFUbTS3djG7kjN-LVbreGTtpdD3LBpU",

  authDomain: "clothes-e-commerce-2c952.firebaseapp.com",

  projectId: "clothes-e-commerce-2c952",

  storageBucket: "clothes-e-commerce-2c952.appspot.com",

  messagingSenderId: "198703519904",

  appId: "1:198703519904:web:97d947554a82c3f75351c5",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// --------------------------------------------------------------
//This set Google as auth provider
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const db = getFirestore()

//
//
// -------------------  SIGN UP METHODS (Email/Password). User doesn't exist yet. ------------------//

//This CREATES A NEW USER on Auth Firebase (not in BBDD!!!) after Sign Up wit Email/Password.
export const createUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await _createUserWithEmailAndPassword(auth, email, password)
}

//This ADDS THE NEW USER TO FIRESTORE (in BBDD) --> 1) after Sign Up with Email/Password or 2) after Sign In with Google, Facebook, GitHub etc. or after
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return
  const userDocRef = doc(db, "users", userAuth.uid)

  console.log("USER DOC REF", userDocRef)

  const userSnapShot = await getDoc(userDocRef)
  console.log("USER SNAP SHOT", userSnapShot)
  console.log(userSnapShot.exists())

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log(error, "ERROR CREATING THE USER")
    }
  }

  return userDocRef
}

//
//
// -------------------  SIGN IN METHODS (Email/Password and Google). User already exists  ------------------//

// This allows user to Sign In with his email/password. Previous Sign Up (Email/Password needed)
export const signInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await _signInWithEmailAndPassword(auth, email, password)
}

//This CREATES A NEW USER on Auth Firebase (not in BBDD!!!) and ADDS THE NEW USER TO FIRESTORE (in BBDD) when Signing In with Google.
// Previous sign up don't needed because Google assures that new user is who he claims to be.
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

//This method allows user to sign out from Firebasae
export const signOutUser = async () => {
  await signOut(auth)
}
