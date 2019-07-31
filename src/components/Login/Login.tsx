import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Content,
  Button,
  Input,
  RadioGroup,
  ErrorMessage
} from "./styleLogin";
import validate from "./validate";
import initialState from "./initialState";
import { loginRequest, registerRequest } from "../../API/users";
import { Form, Label, FormInput } from "../Abstracts/Form";

export interface IProps {
  className?: string;
}

const Login = ({ className }: IProps) => {
  const [form, setForm] = useState(initialState);
  const [type, setType] = useState("register");
  const [errorMessage, setErrorMessage] = useState("");
  const { name, password, confirmPassword, email } = form;

  const inputs = Object.keys(form)
    .filter(key =>
      type === "login" ? key !== "confirmPassword" && key !== "name" : true
    )
    .map((key: "name" | "password" | "confirmPassword" | "email") => ({
      ...form[key],
      name: key
    }));

  const onTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    setErrorMessage("");
  };

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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    let formValid = true;
    let error = "";
    inputs.forEach(e => {
      if (!e.valid) {
        formValid = false;
        error = e.errorMessage;
      }
    });
    if (formValid) {
      if (type === "login") {
        var loginError = await loginRequest({
          email: email.value,
          password: password.value
        });
      } else {
        var loginError = await registerRequest({
          email: email.value,
          password: password.value,
          name: name.value
        });
      }
      if (loginError) {
        setErrorMessage(loginError);
      }
    } else if (type === "register") {
      setErrorMessage(error);
    } else {
      setErrorMessage("Podane dane są nieprawidłowe");
    }
  };

  return (
    <Container>
      <Content>
        <Form className={className} onSubmit={onSubmit}>
          {inputs.map(e => (
            <Label key={e.name}>
              {e.label}
              {type === "register" ? (
                <FormInput
                  value={e.value}
                  onChange={onFormChange}
                  name={e.name}
                  type={e.type}
                  valid={e.valid}
                />
              ) : (
                <input
                  value={e.value}
                  onChange={onFormChange}
                  name={e.name}
                  type={e.type}
                />
              )}
            </Label>
          ))}

          <RadioGroup>
            <Label>
              Logowanie
              <input
                name="type"
                type="radio"
                onChange={onTypeChange}
                value="login"
                checked={type === "login"}
              />
            </Label>
            <Label>
              Rejestracja
              <input
                name="type"
                type="radio"
                onChange={onTypeChange}
                value="register"
                checked={type === "register"}
              />
            </Label>
          </RadioGroup>
          {errorMessage !== "" && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
