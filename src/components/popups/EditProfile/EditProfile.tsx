import React, { useState, ChangeEvent, useEffect } from "react";
import Modal from "react-modal";
import { inject, observer } from "mobx-react";
import { IViewStore } from "../../../store/view";
import { IUserStore } from "../../../store/user";
import { Form, Label, FormInput } from "../../Abstracts/Form";
import useUserForm from "../../../hooks/useUserForm";
import initialFormStateTemplate from "../../Login/initialState";
import { updateUserRequest } from "../../../API/users";
import { IUserUpdate } from "./interfaces";
import { ErrorMessage, Content } from "../styles";
import Button_2 from "../../Abstracts/Button_2";
import reactModalStyles from "../../../styles/reactModalStyles";
import { getImageBase64Request } from "../../../API/images";
import {
  AvatarFileInput,
  AvatarContainer,
  AvatarFakeButton,
  AvatarLoader,
} from "./styleEditProfile";
import Avatar from "../../Abstracts/Avatar";

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
  const [avatar, setAvatar] = useState(user.avatar);
  const [error, setError] = useState(undefined);
  const [avatarLoading, setAvatarLoading] = useState(false);

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
      const requestError = await updateUserRequest(update, avatar);
      if (requestError) {
        setError(requestError);
      } else {
        onRequestClose();
      }
    }
  };

  const onAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const image = e.target.files[0];
    try {
      formData.append("itemImage", image, image.name);
      setAvatarLoading(true);
      const base64 = await getImageBase64Request(formData);
      setAvatar(`data:image/jpeg;base64, ${base64}`);
      setError("");
    } catch (e) {
      setError("Zdjęcie nie może być większe niż 10mb");
    }
    setAvatarLoading(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setError("");
    }
  }, [isOpen]);

  return (
    <Modal
      style={reactModalStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Content>
        <AvatarContainer>
          {avatarLoading ? (
            <AvatarLoader size={3} />
          ) : (
            <Avatar size="big" src={avatar} />
          )}
          <AvatarFileInput>
            <AvatarFakeButton>Zmiana avataru</AvatarFakeButton>
            <input
              disabled={avatarLoading}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={onAvatarChange}
            />
          </AvatarFileInput>
        </AvatarContainer>

        <Form onSubmit={onSubmit}>
          {inputs.map(e => (
            <Label key={e.label}>
              <span>{e.label}</span>
              <FormInput
                value={e.value}
                valid={e.valid}
                name={e.name}
                type={e.type}
                onChange={onFormChange}
              />
            </Label>
          ))}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button_2 disabled={avatarLoading}>Potwierdź</Button_2>
          <Button_2 role="button" onClick={onRequestClose}>
            Wróć się
          </Button_2>
        </Form>
      </Content>
    </Modal>
  );
};

export default inject("viewStore", "userStore")(observer(EditProfile));
