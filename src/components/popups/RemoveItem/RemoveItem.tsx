import React, { FormEvent } from "react";
import Modal from "react-modal";
import styles from "../styles";
import { Form } from "../../Abstracts/Form";
import Button_2 from "../../Abstracts/Button_2";
import { history } from "../../../app";
import { removeItemRequest } from "../../../API/items";

interface IProps {
  itemID: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const RemoveItem = ({ isOpen, onRequestClose, itemID }: IProps) => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await removeItemRequest(itemID);
    onRequestClose();
    history.push("/")
  };

  return (
    <Modal style={styles} isOpen={isOpen} onRequestClose={onRequestClose}>
      <Form onSubmit={onSubmit}>
        <span>Jesteś pewien, że chcesz usunąć ten przedmiot?</span>
        <Button_2>Usuń</Button_2>
        <Button_2 onClick={onRequestClose} role="button">
          Wróć się
        </Button_2>
      </Form>
    </Modal>
  );
};

export default RemoveItem;
