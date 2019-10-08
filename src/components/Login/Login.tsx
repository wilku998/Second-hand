import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Content, Button, RadioGroup, ErrorMessage, LoginContainer } from "./styleLogin";
import initialState from "./initialState";
import { loginRequest, registerRequest } from "../../API/users";
import { Form, Label, FormInput } from "../Abstracts/Form";
import useUserForm from "../../hooks/useUserForm";

export interface IProps {
  className?: string;
}

const Login = ({ className }: IProps) => {
  const [form, onFormChange] = useUserForm(initialState);
  const [type, setType] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const { name, password, email } = form;

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
    <LoginContainer>
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
    </LoginContainer>
  );
};

export default Login;
