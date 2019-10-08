export default {
  email: {
    value: "",
    valid: false,
    label: "Email",
    type: "email",
    errorMessage: "Email jest nieprawidłowy"
  },
  name: {
    value: "",
    valid: false,
    label: "Imię",
    type: "text",
    errorMessage: "Imię powinno mieć co najmniej 6 znaków oraz mniej niż 20"
  },
  password: {
    value: "",
    valid: false,
    label: "Hasło",
    type: "password",
    errorMessage: "Hasło powinno mieć co najmniej 6 znaków"
  },
  confirmPassword: {
    value: "",
    valid: false,
    label: "Powtórz hasło",
    type: "password",
    errorMessage: "Hasła są niezgodne"
  },
};
