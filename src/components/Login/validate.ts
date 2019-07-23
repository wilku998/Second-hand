import validator from "validator";

export default (property: string, value: string, otherValue?: string) => {
    switch (property) {
        case "name":
          return value.length >= 6;
        case "password":
          return value.length >= 6;
        case "confirmPassword":
          return value === otherValue && value.length >= 6;
        case "email":
          return validator.isEmail(value);
      }
}