import React, { useState } from "react";
import style, { Container, Button, Input, RadioGroup } from "./styleLogin";

export interface IProps {
  className: string;
}
const Login = ({ className }: IProps) => {
  const [type, setType] = useState("login");

  const onTypeChange = (e: any) => setType(e.target.value);

  return (
    <Container>
      <form className={className}>
        <label>
          Login
          <Input type="text" />
        </label>
        {type === "register" && (
          <label>
            Email
            <Input type="text" />
          </label>
        )}
        <label>
          Hasło
          <Input type="password" />
        </label>
        {type === "register" && (
          <label>
            Potwierdź hasło
            <Input type="password" />
          </label>
        )}
        <RadioGroup>
          <label>
            Logowanie
            <input
              name="type"
              type="radio"
              onChange={onTypeChange}
              value="login"
              checked={type === "login"}
            />
          </label>
          <label>
            Rejestracja
            <input
              name="type"
              type="radio"
              onChange={onTypeChange}
              value="register"
              checked={type === "register"}
            />
          </label>
        </RadioGroup>
        <Button>{type === "register" ? "Zarejestruj" : "Zaloguj"} się</Button>
        <Button>Wróć się</Button>
      </form>
    </Container>
  );
};

export default style(Login);
