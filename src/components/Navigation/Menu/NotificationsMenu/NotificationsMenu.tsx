import React from "react";
import { inject, observer } from "mobx-react";
import {
  SubMenuList,
  ButtonIcon,
  SubMenuButton,
  MenuItem,
  NotificationsInfo,
  SubMenuListItem
} from "../styleMenu";
import { readNotificationRequest } from "../../../../API/users";
import AlertCircle from "../../../Abstracts/AlertCircle";
import { IUserStore } from "../../../../store/user";
import { Link } from "react-router-dom";
import { SubMenuListItemNotification } from "./styleNotificationsMenu";
import InvisibleButton from "../../../Abstracts/InvisibleButton";
import Notification from "../../../Notification/Notification";

export interface IProps {
  isVisible: boolean;
  closeMenu: () => void;
  openMenu: (menu: "userMenu" | "messagesMenu" | "notificationsMenu") => void;
  userStore?: IUserStore;
}

const NotificationsMenu = React.forwardRef(
  ({ isVisible, closeMenu, openMenu, userStore }: IProps, ref) => {
    const notifications = userStore.getSortedNotifications;
    const user = userStore.getUser;

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

    const readAll = () => {
      readNotificationRequest("all");
    };

    return (
      <MenuItem isselected={isVisible.toString()} onClick={onClick} ref={ref}>
        <SubMenuButton>
          {user.unreadedNotificationsQuantity > 0 && (
            <AlertCircle number={user.unreadedNotificationsQuantity} />
          )}
          <ButtonIcon src="/svg/bell.svg" />
        </SubMenuButton>
        {isVisible && (
          <SubMenuList>
            {notifications.length > 0 ? (
              <>
                {notifications.map(e => (
                  <SubMenuListItemNotification
                    key={e._id}
                    data-id={e._id}
                    onClick={onNotificationClick}
                    isunreaded={!e.isReaded}
                  >
                    <Notification
                      notification={e}
                      key={e.addedAt}
                      infoColor="white"
                    />
                  </SubMenuListItemNotification>
                ))}
                {user.unreadedNotificationsQuantity > 0 && (
                  <SubMenuListItem>
                    <InvisibleButton onClick={readAll}>
                      Oznacz wszystkie jako przeczytane
                    </InvisibleButton>
                  </SubMenuListItem>
                )}
                {user.notificationsQuantity > notifications.length && (
                  <SubMenuListItem>
                    <NotificationsInfo as={Link} to="/notifications">
                      Zobacz resztę
                    </NotificationsInfo>
                  </SubMenuListItem>
                )}
              </>
            ) : (
              <SubMenuListItemNotification>
                <NotificationsInfo>Brak powiadomień</NotificationsInfo>
              </SubMenuListItemNotification>
            )}
          </SubMenuList>
        )}
      </MenuItem>
    );
  }
);

export default inject("userStore")(observer(NotificationsMenu));
