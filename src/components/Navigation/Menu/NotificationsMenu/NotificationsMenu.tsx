import React from "react";
import { inject, observer } from "mobx-react";
import {
  SubMenuList,
  ButtonIcon,
  SubMenuListButton,
  UserLabel,
  Info,
  SubMenu,
  SubMenuIconContainer
} from "../styleMenu";
import Avatar from "../../../Abstracts/Avatar";
import getItemTitle from "../../../../functions/getItemTitle";
import { readNotificationRequest } from "../../../../API/users";
import { history } from "../../../../app";
import AlertCircle from "../../../Abstracts/AlertCircle";
import { IUserStore } from "../../../../store/user";
import parseDate from "../../../../functions/parseDate";

export interface IProps {
  isVisible: boolean;
  closeMenu: () => void;
  openMenu: (menu: "userMenu" | "messagesMenu" | "notificationsMenu") => void;
  userStore?: IUserStore;
}

const NotificationsMenu = React.forwardRef(
  ({ isVisible, closeMenu, openMenu, userStore }: IProps, ref) => {
    const user = userStore.getUser;
    const unreadedNotificationsQuantity =
      userStore.unreadedNotificationsQuantity;
    const { notifications } = user;

    const onClick = () => {
      if (isVisible) {
        closeMenu();
      } else {
        openMenu("notificationsMenu");
      }
    };

    const onNotificationClick = async (e: any) => {
      const { link, id } = e.currentTarget.dataset;
      await readNotificationRequest(id);
      history.push(link);
    };

    const parsedNotifications = notifications.map(notification => {
      const { user, isReaded, addedAt } = notification;
      const object: any = {
        user,
        _id: notification._id,
        isReaded,
        addedAt: parseDate(addedAt)
      };
      switch (notification.kind) {
        case `follow`:
          (object.info = `Zabserwował cię`),
            (object.link = `/users/${notification.user._id}`);
          break;
        case `followedUserAddedItem`:
          (object.info = `Dodał przedmiot ${getItemTitle(notification.item)}`),
            (object.link = `/items/${notification.item._id}`);
          break;
        case `followedUserLiked`:
          (object.info = `Polubił przedmiot ${getItemTitle(
            notification.item
          )}`),
            (object.link = `/items/${notification.item._id}`);
          break;
        case `followedUserFollows`:
          console.log(notification.userWhoGotFollow);
          (object.info = `Zabserwował użytkownika ${notification.userWhoGotFollow.name}`),
            (object.link = `/users/${notification.userWhoGotFollow._id}`);
          break;
        case `ownItemLikedBySomeone`:
          (object.info = `Polubił twój przedmiot ${getItemTitle(
            notification.item
          )}`),
            (object.link = `/users/${notification.user._id}`);
          break;
      }
      return object;
    });

    return (
      <SubMenu onClick={onClick} ref={ref}>
        <SubMenuIconContainer>
          {unreadedNotificationsQuantity > 0 && (
            <AlertCircle number={unreadedNotificationsQuantity} />
          )}
          <ButtonIcon src="/svg/bell.svg" />
        </SubMenuIconContainer>
        {isVisible && (
          <SubMenuList>
            {notifications.length > 0 ? (
              <>
                {parsedNotifications.map(e => (
                  <li key={e._id}>
                    <SubMenuListButton
                      data-link={e.link}
                      data-id={e._id}
                      onClick={onNotificationClick}
                      color={e.isReaded ? "light" : "dark"}
                    >
                      <UserLabel>
                        <Avatar size="small" src={e.user.avatar} />
                        <span>{e.user.name}</span>
                      </UserLabel>
                      <Info>
                        {e.info}
                        <div>{e.addedAt}</div>
                      </Info>
                    </SubMenuListButton>
                  </li>
                ))}
              </>
            ) : (
              <span>Brak powiadomień</span>
            )}
          </SubMenuList>
        )}
      </SubMenu>
    );
  }
);

export default inject("userStore")(observer(NotificationsMenu));
