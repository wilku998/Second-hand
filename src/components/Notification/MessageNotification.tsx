import React from "react";
import Date from "../Abstracts/Date";
import { Container, Avatar, NotificationInfo, Text, InterlocutorName, Content } from "./styleNotification";
import IInterlocutor from "../../interfaces/IInterlocutor";

interface IProps {
  interlocutor: IInterlocutor;
}

export default ({ interlocutor }: IProps) => {
  const { message, sendedAt } = interlocutor.lastMessage;
  const { avatar, name } = interlocutor.interlocutor;

  return (
    <Container>
      <Avatar src={avatar} />
      <Content>
        <NotificationInfo infoColor="white">
          <Date date={sendedAt} />
          <InterlocutorName>{name}</InterlocutorName>
        </NotificationInfo>
        <Text>{message}</Text>
      </Content>
    </Container>
  );
};
