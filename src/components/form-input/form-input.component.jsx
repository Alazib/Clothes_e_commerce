import "./form-input.styles.scss"

const FormInput = ({ label, inputProps }) => {
  console.log(Boolean(inputProps.value.length))
  return (
    <div className="form">
      <input className="form-input" {...inputProps} />
      <label
        className={`${
          inputProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    </div>
  )
}

export default FormInput
