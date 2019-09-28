import React from "react";
import { inject, observer } from "mobx-react";
import {
  ButtonIcon,
  SubMenuList,
  SubMenuListItemContent,
  SubMenuListItem,
  SubMenuIconContainer,
  MenuItem,
  MessageInfo,
  InterlocutorName
} from "../styleMenu";
import { Link } from "react-router-dom";
import Avatar from "../../../Abstracts/Avatar";
import AlertCircle from "../../../Abstracts/AlertCircle";
import { IInterlocutorsStore } from "../../../../store/interlocutors";
import parseDate from "../../../../functions/parseDate";
import { IUserStore } from "../../../../store/user";
import Date from "../../../Abstracts/Date";

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
      <MenuItem onClick={onClick} ref={ref}>
        <SubMenuIconContainer isselected={isVisible.toString()}>
          {unreadedMessagesQuantity > 0 && (
            <AlertCircle number={unreadedMessagesQuantity} />
          )}
          <ButtonIcon src="/svg/mail.svg" />
        </SubMenuIconContainer>
        {isVisible && (
          <SubMenuList>
            {interlocutors.length > 0 ? (
              <>
                {interlocutors.map(e => (
                  <li key={e.interlocutor._id}>
                    <SubMenuListItem
                      as={Link}
                      to={`/messenger/${e.interlocutor._id}`}
                      isunreaded={(
                        !e.isReaded && e.lastMessage.senderID !== user._id
                      ).toString()}
                    >
                      <SubMenuListItemContent>
                        <MessageInfo>
                          <Date date={e.lastMessage.sendedAt} />
                          <InterlocutorName>
                            {e.interlocutor.name}
                          </InterlocutorName>
                        </MessageInfo>
                        {e.lastMessage.message}
                      </SubMenuListItemContent>
                    </SubMenuListItem>
                  </li>
                ))}
              </>
            ) : (
              <span>Brak wiadomości</span>
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
