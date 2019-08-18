import React, { useState } from "react";
import Modal from "react-modal";
import { inject, observer } from "mobx-react";
import { IViewStore } from "../../store/view";
import { IUserStore } from "../../store/user";
import { Button } from "./styleEditProfile";
import { Form, Label, FormInput } from "../Abstracts/Form";
import useUserForm from "../../hooks/useUserForm";
import initialFormStateTemplate from "../Login/initialState";
import { updateUserRequest } from "../../API/users";
import { IUserUpdate } from "./interfaces";
import reactModalStyles from "../../styles/reactModalStyles";

Modal.setAppElement("#root");

interface IProps {
  viewStore?: IViewStore;
  userStore?: IUserStore;
}

const initialFormState = { ...initialFormStateTemplate };
initialFormState.password.label = "Nowe hasło";
initialFormState.confirmPassword.label = "Powtórz nowe hasło";

const EditProfile = ({ viewStore, userStore }: IProps) => {
  const isOpen = viewStore.getEditProfileIsOpen;
  const user = userStore.getUser;
  const formKeys = Object.keys(initialFormState);
  formKeys.forEach((key: "name" | "email" | "password" | "confirmPassword") => {
    initialFormState[key] = {
      ...initialFormState[key],
      value: key === "password" || key === "confirmPassword" ? "" : user[key],
      valid: key !== "password" && key !== "confirmPassword"
    };
  });
  const [form, onFormChange] = useUserForm(initialFormState);
  const [error, setError] = useState(undefined);

  const onRequestClose = () => viewStore.toggleEditProfile();
  const inputs = formKeys.map(key => ({ ...form[key], name: key }));

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const invalidProperty = inputs.find(e => !e.valid);
    if (
      invalidProperty &&
      (invalidProperty.name === "password" ||
      invalidProperty.name === "confirmPassword"
        ? form.password.value !== ""
        : true)
    ) {
      setError(invalidProperty.errorMessage);
    } else {
      const update: IUserUpdate = {};
      inputs.forEach(
        ({
          name,
          value
        }: {
          name: "password" | "confirmPassowrd" | "email" | "name";
          value: string;
        }) => {
          if (name !== "confirmPassowrd" && value !== "") {
            update[name] = value;
          }
        }
      );
      const requestError = await updateUserRequest(update);
      if(requestError){
        setError(requestError)
      }else{
        onRequestClose();
      }
    }
  };

  return (
    <Modal style={reactModalStyles} isOpen={isOpen} onRequestClose={onRequestClose}>
      <Form onSubmit={onSubmit}>
        {inputs.map(e => (
          <Label key={e.label}>
            {e.label}
            <FormInput
              value={e.value}
              valid={e.valid}
              name={e.name}
              type={e.type}
              onChange={onFormChange}
            />
          </Label>
        ))}
        {error && <span>{error}</span>}
        <Button>Potwierdź</Button>
      </Form>
    </Modal>
  );
};

export default inject("viewStore", "userStore")(observer(EditProfile));
