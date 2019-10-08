import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import {
  ButtonIcon,
  SubMenuList,
  SubMenuButton,
  MenuItem,
  SubMenuListItem,
  NotificationsInfo
} from "../styleMenu";
import { Link } from "react-router-dom";
import AlertCircle from "../../../Abstracts/AlertCircle";
import { IInterlocutorsStore } from "../../../../store/interlocutors";
import { IUserStore } from "../../../../store/user";
import InvisibleButton from "../../../Abstracts/InvisibleButton";
import MessageNotification from "../../../Notification/MessageNotification";
import { sendMessageReadedSocket } from "../../../../sockets";

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
    const [allVisible, setAllVisible] = useState(false);
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

    const onSeeRestClick = () => setAllVisible(!allVisible);

    const readAll = () => {
      interlocutors.forEach(interlocutor => {
        if (!interlocutor.isReaded) {
          sendMessageReadedSocket(interlocutor.roomName)
        }
      });
    };

    return (
      <MenuItem isselected={isVisible.toString()} ref={ref}>
        <SubMenuButton onClick={onClick}>
          {unreadedMessagesQuantity > 0 && (
            <AlertCircle number={unreadedMessagesQuantity} />
          )}
          <ButtonIcon src="/svg/mail.svg" />
        </SubMenuButton>
        {isVisible && (
          <SubMenuList>
            {interlocutors.length > 0 ? (
              <>
                {interlocutors
                  .slice(0, allVisible ? interlocutors.length : 5)
                  .map(e => (
                    <SubMenuListItem
                      onClick={onClick}
                      key={e.interlocutor._id}
                      isunreaded={
                        !e.isReaded && e.lastMessage.senderID !== user._id
                      }
                    >
                      <Link to={`/messenger/${e.interlocutor._id}`}>
                        <MessageNotification interlocutor={e} />
                      </Link>
                    </SubMenuListItem>
                  ))}
                {unreadedMessagesQuantity > 0 && (
                  <SubMenuListItem>
                    <InvisibleButton onClick={readAll}>
                      Oznacz wszystkie jako przeczytane
                    </InvisibleButton>
                  </SubMenuListItem>
                )}
                {interlocutors.length > 5 && (
                  <SubMenuListItem>
                    <InvisibleButton onClick={onSeeRestClick}>
                      {allVisible ? "Ukryj" : "Zobacz"} resztę
                    </InvisibleButton>
                  </SubMenuListItem>
                )}
              </>
            ) : (
              <SubMenuListItem>
                <NotificationsInfo>Brak wiadomości</NotificationsInfo>
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
