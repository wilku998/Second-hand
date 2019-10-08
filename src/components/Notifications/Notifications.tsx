import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { IUserStore } from "../../store/user";
import { NotificationsList, NotificationsListItem } from "./styleNotifications";
import INotification from "../../interfaces/INotification";
import { getNotifications, readNotificationRequest } from "../../API/users";
import Container from "../Abstracts/Container";
import Notification from "../Notification/Notification";

interface IProps {
  userStore?: IUserStore;
}

const Notifications = ({ userStore }: IProps) => {
  const user = userStore.getUser;
  const { notificationsQuantity } = user;
  const [notifications, setNotifications]: [INotification[], any] = useState(
    []
  );
  const ref = useRef();

  const onNotificationClick = async (e: any) => {
    const { id } = e.currentTarget.dataset;
    await readNotificationRequest(id);
    setNotifications(
      notifications.map(e => (e._id === id ? { ...e, isReaded: true } : e))
    );
  };

  const loadNotifications = async (limit: number) => {
    const newNotifications = await getNotifications(
      notifications.length,
      limit
    );

    setNotifications([...notifications, ...newNotifications.notifications]);
  };

  const onScroll = async () => {
    const component = ref.current;
    const scrollPos = window.scrollY + window.innerHeight;
    const componentEnd = component.offsetHeight + component.offsetTop;
    if (componentEnd - scrollPos <= 200) {
      loadNotifications(3);
    }
  };

  useLayoutEffect(() => {
    if (notifications.length < notificationsQuantity) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [notifications]);

  useEffect(() => {
    loadNotifications(20);
  }, []);

  return (
    <Container>
      <NotificationsList ref={ref}>
        {notifications.map((e, i) => (
          <NotificationsListItem
            key={i}
            isReaded={e.isReaded}
            onClick={onNotificationClick}
            data-id={e._id}
          >
            <Notification notification={e} infoColor="black" />
          </NotificationsListItem>
        ))}
      </NotificationsList>
    </Container>
  );
};

export default inject("userStore")(observer(Notifications));
