import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import { inject, observer } from "mobx-react";
import { IViewStore } from "../../../store/view";
import { Form, Label } from "../../Abstracts/Form";
import styles, { ErrorMessage, Button } from "../styles";
import { removeProfileRequest } from "../../../API/users";

interface IProps {
  viewStore?: IViewStore;
}

const RemoveProfile = ({ viewStore }: IProps) => {
  const [form, setForm] = useState({
    password: { label: "Hasło", value: "" },
    confrimPassword: { label: "Powtórz hasło", value: "" }
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { password, confrimPassword } = form;
  const isOpen = viewStore.getRemoveProfileIsOpen;
  const onRequestClose = () => viewStore.toggleRemoveProfile();

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: { ...form[name], value } });
  };

  const inputs = Object.keys(form).map(key => ({ ...form[key], name: key }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.value === confrimPassword.value) {
      const error = await removeProfileRequest(password.value);
      setErrorMessage(error);
    } else {
      setErrorMessage("Hasła nie są zgodne.");
    }
  };
  return (
    <Modal style={styles} isOpen={isOpen} onRequestClose={onRequestClose}>
      <Form onSubmit={onSubmit}>
        {inputs.map(e => (
          <Label key={e.name}>
            {e.label}
            <input
              type="password"
              value={e.value}
              name={e.name}
              onChange={onFormChange}
            />
          </Label>
        ))}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button>Usuń konto</Button>
      </Form>
    </Modal>
  );
};

export default inject("viewStore", "userStore")(observer(RemoveProfile));
