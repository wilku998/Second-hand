import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import { inject, observer } from "mobx-react";
import { IViewStore } from "../../../store/view";
import { Form, Label } from "../../Abstracts/Form";
import { removeProfileRequest } from "../../../API/users";
import { ErrorMessage, Content } from "../styles";
import Button_2 from "../../Abstracts/Button_2";
import reactModalStyles from "../../../styles/reactModalStyles";

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
    <Modal
      style={reactModalStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Content>
        <Form onSubmit={onSubmit}>
          <span>Jesteś pewien, że chcesz usunąć swój profil?</span>
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
          <Button_2>Usuń konto</Button_2>
          <Button_2 role="button" onClick={onRequestClose}>
            Wróć się
          </Button_2>
        </Form>
      </Content>
    </Modal>
  );
};

export default inject("viewStore", "userStore")(observer(RemoveProfile));
