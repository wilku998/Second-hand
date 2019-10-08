import React from "react";
import { Link } from "react-router-dom";
import INotification from "../../interfaces/INotification";
import Date from "../Abstracts/Date";
import parseNotification from "../../functions/parseNotification";
import { Container, Avatar, NotificationInfo, Text } from "./styleNotification";

interface IProps {
  notification: INotification;
  infoColor: string;
}

export default ({ notification, infoColor }: IProps) => {
  const { user, addedAt, secondLink, info } = parseNotification(notification);

  return (
    <Container>
      <Avatar src={user.avatar} />
      <div>
        <NotificationInfo infoColor={infoColor}>
          <Date date={addedAt} />
        </NotificationInfo>
        <Text>
          <Link to={`/users/${user._id}`}>{user.name}</Link>
          {info}
          {secondLink && <Link to={secondLink.link}>{secondLink.name}</Link>}
        </Text>
      </div>
    </Container>
  );
};
