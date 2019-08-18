import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import { inject, observer } from "mobx-react";
import { IViewStore } from "../../store/view";
import reactModalStyles from "../../styles/reactModalStyles";
import { Form, Label } from "../Abstracts/Form";
import Button_2 from "../Abstracts/Button_2";

interface IProps {
  viewStore?: IViewStore;
}

const RemoveProfile = ({ viewStore }: IProps) => {
  const [form, setForm] = useState({
    password: { label: "Hasło", value: "" },
    confrimPassword: { label: "Powtórz hasło", value: "" }
  });
  const [errorMessage, setErrorMessage] = useState("");
  const isOpen = viewStore.getRemoveProfileIsOpen;
  const onRequestClose = () => viewStore.toggleRemoveProfile();

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: { ...form[name], value } });
  };

  const inputs = Object.keys(form).map(key => ({ ...form[key], name: key }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password.value === form.confrimPassword.value) {
        
    } else {
      setErrorMessage("Hasła nie są zgodne.");
    }
  };
  return (
    <Modal
      style={reactModalStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
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
        {errorMessage && <span>{errorMessage}</span>}
        <Button_2>Usuń konto</Button_2>
      </Form>
    </Modal>
  );
};

export default inject("viewStore", "userStore")(observer(RemoveProfile));
