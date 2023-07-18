import { useState } from "react"
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
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
      const response = await signInWithEmailAndPassword(email, password)
      console.log(response)
      resetFormFields()
    } catch (error) {}
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  return (
    <div className="sign-up-container">
      <h2>Alreaday have an account?</h2>
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
          <Button onClick={signInWithGoogle} buttonType="google">
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
