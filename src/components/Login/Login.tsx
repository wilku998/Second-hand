import React, { useState } from "react";
import {
  Container,
  Content,
  Form,
  Button,
  Input,
  RadioGroup
} from "./styleLogin";
import { loginRequest, registerRequest } from "../../API/users";
import { Link } from "react-router-dom";

export interface IProps {
  className?: string;
}
const Login = ({ className }: IProps) => {
  const [form, setForm] = useState({
    type: "register",
    name: "Skrapapapa",
    password: "12312312312",
    confirmPassword: "",
    email: "przegldarka@test.pl"
  });
  const { type, name, password, confirmPassword, email } = form;

  const onFormChange = e => {
    const propety = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [propety]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (type === "login") {
      await loginRequest({ email, password });
    } else {
      const error = await registerRequest({ email, password, name });
      console.log(error);
    }
  };

  return (
    <Container>
      <Content>
        <Form className={className} onSubmit={onSubmit}>
          <label>
            Email
            <Input
              value={email}
              onChange={onFormChange}
              name="email"
              type="text"
            />
          </label>

          {type === "register" && (
            <label>
              Imię
              <Input
                value={name}
                onChange={onFormChange}
                name="name"
                type="text"
              />
            </label>
          )}
          <label>
            Hasło
            <Input
              value={password}
              onChange={onFormChange}
              name="password"
              type="password"
            />
          </label>
          {type === "register" && (
            <label>
              Potwierdź hasło
              <Input
                value={confirmPassword}
                onChange={onFormChange}
                name="confirmPassword"
                type="password"
              />
            </label>
          )}
          <RadioGroup>
            <label>
              Logowanie
              <input
                name="type"
                type="radio"
                onChange={onFormChange}
                value="login"
                checked={type === "login"}
              />
            </label>
            <label>
              Rejestracja
              <input
                name="type"
                type="radio"
                onChange={onFormChange}
                value="register"
                checked={type === "register"}
              />
            </label>
          </RadioGroup>
          <Button>{type === "register" ? "Zarejestruj" : "Zaloguj"} się</Button>
        </Form>
        <Button>
          <Link to="/">Wróć się</Link>
        </Button>
      </Content>
    </Container>
  );
};

export default Login;
