import { useState } from "react"

import {
  signInWithGooglePopup,
  signInWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils"

import FormInput from "../form-input/form-input.component"
import "./sign-in-form.styles.scss"
import Button from "../button/button.component"

const SignInForm = () => {
  const defaultFormFields = {
    email: "",
    password: "",
  }
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(email, password)

      resetFormFields()
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("Incorrect Password")
      } else if (error.code === "auth/user-not-found") {
        alert("User doesn't exist")
      } else {
        console.log(error)
      }
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup()
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.log("Sign in with Google was cancelled")
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputProps={{
            type: "email",
            onChange: handleChange,
            name: "email",
            value: email,
            required: true,
          }}
        />

        <FormInput
          label="Password"
          inputProps={{
            type: "password",
            onChange: handleChange,
            name: "password",
            value: password,
            required: true,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
