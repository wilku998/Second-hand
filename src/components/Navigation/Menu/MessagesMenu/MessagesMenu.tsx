import React from "react";
import { inject, observer } from "mobx-react";
import {
  ButtonIcon,
  SubMenuList,
  SubMenuButton,
  MenuItem,
  NotificationInfo,
  SubMenuListItem,
  NoNotificationsInfo
} from "../styleMenu";
import { Link } from "react-router-dom";
import Avatar from "../../../Abstracts/Avatar";
import AlertCircle from "../../../Abstracts/AlertCircle";
import { IInterlocutorsStore } from "../../../../store/interlocutors";
import parseDate from "../../../../functions/parseDate";
import { IUserStore } from "../../../../store/user";
import Date from "../../../Abstracts/Date";
import { InterlocutorName } from "./styleMessagesMenu";

export interface IProps {
  isVisible: boolean;
  closeMenu: () => void;
  openMenu: (menu: "userMenu" | "messagesMenu" | "notificationsMenu") => void;
  interlocutorsStore?: IInterlocutorsStore;
  userStore?: IUserStore;
}
const MessagesMenu = React.forwardRef(
  (
    { isVisible, closeMenu, openMenu, interlocutorsStore, userStore }: IProps,
    ref
  ) => {
    const interlocutors = interlocutorsStore.getSortedAndFilteredInterlocutors;
    const user = userStore.getUser;
    const unreadedMessagesQuantity =
      interlocutorsStore.unreadedMessagesQuantity;

    const onClick = () => {
      if (isVisible) {
        closeMenu();
      } else {
        openMenu("messagesMenu");
      }
    };

    return (
      <MenuItem onClick={onClick} isselected={isVisible.toString()} ref={ref}>
        <SubMenuButton>
          {unreadedMessagesQuantity > 0 && (
            <AlertCircle number={unreadedMessagesQuantity} />
          )}
          <ButtonIcon src="/svg/mail.svg" />
        </SubMenuButton>
        {isVisible && (
          <SubMenuList>
            {interlocutors.length > 0 ? (
              <>
                {interlocutors.map(e => (
                  <SubMenuListItem
                    key={e.interlocutor._id}
                    isunreaded={(
                      !e.isReaded && e.lastMessage.senderID !== user._id
                    ).toString()}
                  >
                    <Link to={`/messenger/${e.interlocutor._id}`}>
                      <NotificationInfo>
                        <Date date={e.lastMessage.sendedAt} />
                        <InterlocutorName>
                          {e.interlocutor.name}
                        </InterlocutorName>
                      </NotificationInfo>
                      {e.lastMessage.message}
                    </Link>
                  </SubMenuListItem>
                ))}
              </>
            ) : (
              <SubMenuListItem>
                <NoNotificationsInfo>Brak wiadomości</NoNotificationsInfo>
              </SubMenuListItem>
            )}
          </SubMenuList>
        )}
      </MenuItem>
    );
  }
);

export default inject("interlocutorsStore", "userStore")(
  observer(MessagesMenu)
);
