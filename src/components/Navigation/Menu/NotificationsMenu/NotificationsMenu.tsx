import React from "react";
import { inject, observer } from "mobx-react";
import {
  SubMenuList,
  ButtonIcon,
  SubMenuButton,
  MenuItem,
  NotificationInfo,
  NoNotificationsInfo
} from "../styleMenu";
import getItemTitle from "../../../../functions/getItemTitle";
import { readNotificationRequest } from "../../../../API/users";
import AlertCircle from "../../../Abstracts/AlertCircle";
import { IUserStore } from "../../../../store/user";
import { Link } from "react-router-dom";
import Date from "../../../Abstracts/Date";
import { IMinifedUser } from "../../../../interfaces/IUser";
import { IMinifedItem } from "../../../../interfaces/IItem";
import { SubMenuListItemNotification } from "./styleNotificationsMenu";

export interface IProps {
  isVisible: boolean;
  closeMenu: () => void;
  openMenu: (menu: "userMenu" | "messagesMenu" | "notificationsMenu") => void;
  userStore?: IUserStore;
}

const NotificationsMenu = React.forwardRef(
  ({ isVisible, closeMenu, openMenu, userStore }: IProps, ref) => {
    const notifications = userStore.getSortedNotifications;
    const unreadedNotificationsQuantity =
      userStore.unreadedNotificationsQuantity;

    const onClick = () => {
      if (isVisible) {
        closeMenu();
      } else {
        openMenu("notificationsMenu");
      }
    };

    const onNotificationClick = async (e: any) => {
      const { id } = e.currentTarget.dataset;
      readNotificationRequest(id);
    };

    const parsedNotifications = notifications.map(notification => {
      const { user, isReaded, addedAt } = notification;
      const object: {
        user: IMinifedUser;
        _id: string;
        isReaded: boolean;
        addedAt: string;
        info?: string;
        secondLink?: { name: string; link: string };
      } = {
        user,
        _id: notification._id,
        isReaded,
        addedAt
      };

      const createSecondLinkForItem = (item: IMinifedItem) => ({
        link: `/items/${item._id}`,
        name: getItemTitle(item)
      });

      switch (notification.kind) {
        case `follow`:
          object.info = ` zabserwował cię`;
          break;
        case `followedUserAddedItem`:
          object.info = " dodał przedmiot ";
          object.secondLink = createSecondLinkForItem(notification.item);
          break;
        case `followedUserLiked`:
          object.info = ` polubił przedmiot `;
          object.secondLink = createSecondLinkForItem(notification.item);
          break;
        case `followedUserFollows`:
          object.info = ` zabserwował użytkownika `;
          object.secondLink = {
            link: `/users/${notification.userWhoGotFollow._id}`,
            name: notification.userWhoGotFollow.name
          };
          break;
        case `ownItemLikedBySomeone`:
          object.info = ` polubił twój przedmiot `;
          object.secondLink = createSecondLinkForItem(notification.item);
          break;
      }
      return object;
    });

    return (
      <MenuItem isselected={isVisible.toString()} onClick={onClick} ref={ref}>
        <SubMenuButton>
          {unreadedNotificationsQuantity > 0 && (
            <AlertCircle number={unreadedNotificationsQuantity} />
          )}
          <ButtonIcon src="/svg/bell.svg" />
        </SubMenuButton>
        {isVisible && (
          <SubMenuList>
            {notifications.length > 0 ? (
              <>
                {parsedNotifications.map(e => (
                  <SubMenuListItemNotification
                    key={e._id}
                    data-id={e._id}
                    onClick={onNotificationClick}
                    isunreaded={(!e.isReaded).toString()}
                  >
                    <div>
                      <NotificationInfo>
                        <Date date={e.addedAt} />
                      </NotificationInfo>
                      <Link to={`/users/${e.user._id}`}>{e.user.name}</Link>
                      {e.info}
                      {e.secondLink && (
                        <Link to={e.secondLink.link}>{e.secondLink.name}</Link>
                      )}
                    </div>
                  </SubMenuListItemNotification>
                ))}
              </>
            ) : (
              <SubMenuListItemNotification>
                <NoNotificationsInfo>Brak powiadomień</NoNotificationsInfo>
              </SubMenuListItemNotification>
            )}
          </SubMenuList>
        )}
      </MenuItem>
    );
  }
);

export default inject("userStore")(observer(NotificationsMenu));
