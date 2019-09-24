export default {
  email: {
    value: "bartoszwilk@test.pl",
    valid: true,
    label: "Email",
    type: "email",
    errorMessage: "Email jest nieprawidłowy"
  },
  name: {
    value: "Bartosz Wilk",
    valid: true,
    label: "Imię",
    type: "text",
    errorMessage: "Imię powinno mieć co najmniej 6 znaków oraz mniej niż 20"
  },
  password: {
    value: "123456",
    valid: true,
    label: "Hasło",
    type: "password",
    errorMessage: "Hasło powinno mieć co najmniej 6 znaków"
  },
  confirmPassword: {
    value: "123456",
    valid: true,
    label: "Powtórz hasło",
    type: "password",
    errorMessage: "Hasła są niezgodne"
  },
};
