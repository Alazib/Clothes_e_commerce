import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles.jsx"

export const BUTTON_TYPES = {
  base: "base",
  google: "googleSignInButton",
  inverted: "invertedButton",
}

const CUSTOM_BUTTONS = {
  [BUTTON_TYPES.base]: BaseButton,
  [BUTTON_TYPES.google]: GoogleSignInButton,
  [BUTTON_TYPES.inverted]: InvertedButton,
}

const getCustomButton = (buttonType) =>
  buttonType ? CUSTOM_BUTTONS[buttonType] : BaseButton

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getCustomButton(buttonType)

  return <CustomButton {...otherProps}>{children}</CustomButton>
}

export default Button
