import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"

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

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
