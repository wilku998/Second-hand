import { useState, ChangeEvent } from "react";
import validator from "validator";

const validate = (property: string, value: string, otherValue?: string) => {
  switch (property) {
    case "name":
      return value.length >= 6 && value.length <= 20;
    case "password":
      return value.length >= 6;
    case "confirmPassword":
      return value === otherValue && value.length >= 6;
    case "email":
      return validator.isEmail(value);
  }
};

export default (initialState: any) => {
  const [form, setForm] = useState(initialState);
  const { password, confirmPassword } = form;

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const property: "name" | "password" | "confirmPassword" | "email" =
      e.target.name;
    const value = e.target.value;
    let valid = validate(
      property,
      value,
      property === "confirmPassword" ? password.value : undefined
    );

    setForm({
      ...form,
      confirmPassword:
        property === "password"
          ? {
              ...confirmPassword,
              valid: validate("confirmPassword", confirmPassword.value, value)
            }
          : confirmPassword,
      [property]: { ...form[property], value, valid }
    });
  };

  return [form, onFormChange]
};
