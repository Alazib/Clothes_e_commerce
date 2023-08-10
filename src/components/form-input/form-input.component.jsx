import { FormInputLabel, Input, Group } from "./form-input.styles.jsx"

const FormInput = ({ label, inputProps }) => {
  return (
    <Group>
      <Input {...inputProps} />
      <FormInputLabel shrink={inputProps.value.length}>{label}</FormInputLabel>
    </Group>
  )
}

export default FormInput
