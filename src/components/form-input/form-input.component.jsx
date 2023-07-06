import "./form-input.styles.scss"

const FormInput = ({ label, ...inputPros }) => {
  return (
    <div className="form">
      <input className="form-input" {...inputPros} />
      <label
        className={`${inputPros.value.length ? "shrink" : ""} form-input-label`}
      >
        {label}
      </label>
    </div>
  )
}

export default FormInput
