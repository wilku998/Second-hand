import React from "react";
import { inject, observer } from "mobx-react";
import IInterlocutor from "../../../../interfaces/IInterlocutor";
import {
  ButtonIcon,
  SubMenuList,
  UserLabel,
  Info,
  SubMenu,
  SubMenuListButton,
  SubMenuIconContainer
} from "../styleMenu";
import { Link } from "react-router-dom";
import Avatar from "../../../Abstracts/Avatar";
import AlertCircle from "../../../Abstracts/AlertCircle";
import { IInterlocutorsStore } from "../../../../store/interlocutors";
import parseDate from "../../../../functions/parseDate";
import { IUserStore } from "../../../../store/user";

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
    const interlocutors = interlocutorsStore.getInterlocutors;
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
      <SubMenu onClick={onClick} ref={ref}>
        <SubMenuIconContainer>
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
                    <SubMenuListButton
                      as={Link}
                      to={`/messenger/${e.interlocutor._id}`}
                      color={e.isReaded && e.lastMessage.senderID !== user._id}
                    >
                      <UserLabel>
                        <Avatar size="small" src={e.interlocutor.avatar} />
                        <span>{e.interlocutor.name}</span>
                      </UserLabel>
                      <Info>
                        {e.lastMessage.message}
                        <div>{parseDate(e.lastMessage.sendedAt)}</div>
                      </Info>
                    </SubMenuListButton>
                  </li>
                ))}
              </>
            ) : (
              <span>Brak wiadomości</span>
            )}
          </SubMenuList>
        )}
      </SubMenu>
    );
  }
);

export default inject("interlocutorsStore", "userStore")(
  observer(MessagesMenu)
);
