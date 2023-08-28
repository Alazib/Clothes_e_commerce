import { useState } from "react"
import FormInput from "../form-input/form-input.component"
import "./sign-up-form.styles.scss"
import Button from "../button/button.component"
import { signUpStart } from "../../store/user/user.action"
import { useDispatch } from "react-redux"

const SignUpForm = () => {
  const dispatch = useDispatch()
  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    //We have to pass the displayName (from the form field) as a parameter to create the user doc because in the email/password auth Firebase
    //don't give back the user name.
    dispatch(signUpStart(email, password, displayName))
    resetFormFields()
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputProps={{
            type: "text",
            onChange: handleChange,
            name: "displayName",
            value: displayName,
            required: true,
          }}
        />

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

        <FormInput
          label="Confirm Password"
          inputProps={{
            type: "password",
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
            required: true,
          }}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
