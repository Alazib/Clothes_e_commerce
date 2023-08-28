import { useState } from "react"
import FormInput from "../form-input/form-input.component"
import "./sign-in-form.styles.scss"
import Button, { BUTTON_TYPES } from "../button/button.component"
import { useDispatch } from "react-redux"
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action"

const SignInForm = () => {
  const dispatch = useDispatch()
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

    dispatch(emailSignInStart(email, password))
    resetFormFields()
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
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
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPES.google}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
