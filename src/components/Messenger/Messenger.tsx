import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Chat from "./Chat/Chat";
import { getUserRequest } from "../../API/users";
import IUser from "../../interfaces/IUser";
import { IUserStore } from "../../store/user";
import { StyledMessanger, InterlocutorsTitle } from "./styleMessanger";
import { IInterlocutorsStore } from "../../store/interlocutors";
import Interlocutors from "./Interlocutors/Interlocutors";
import Container from "../Abstracts/Container";
import UserLabel from "../UserLabel/UserLabel";
import theme from "../../styles/theme";

interface IProps {
  match: any;
  userStore: IUserStore;
  interlocutorsStore: IInterlocutorsStore;
}
const Messanger = ({ match, userStore, interlocutorsStore }: IProps) => {
  const [interlocutor, setInterlocutor]: [IUser, any] = useState(undefined);
  const interlocutorID = match.params.id;
  const user = userStore.getUser;
  const interlocutors = interlocutorsStore.getInterlocutors;
  
  let messsageReaded = false;

  const interlocutorIndex = interlocutors.findIndex(e => e.interlocutor._id === interlocutorID)
  if(interlocutorIndex > -1){
    console.log(interlocutors[interlocutorIndex].isReaded)
    messsageReaded = interlocutors[interlocutorIndex].isReaded
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUserRequest(interlocutorID ? interlocutorID : interlocutors[0].interlocutor._id);
      if (fetchedUser) {
        setInterlocutor(fetchedUser.user);
      }
    };
    fetchData();
  }, [interlocutorID]);

  return (
    <Container>
      <StyledMessanger>
        <InterlocutorsTitle>Twoje rozmowy</InterlocutorsTitle>
        <UserLabel
          user={interlocutor}
          additionalStyles={`
            border-top: ${theme.lightBorder2};
            border-left: ${theme.lightBorder2};
            border-right: ${theme.lightBorder2};
          `}
        />
        <Interlocutors
          interlocutors={interlocutors.filter(e => e.lastMessage)}
        />
        <Chat user={user} interlocutor={interlocutor} messsageReaded={messsageReaded} />
      </StyledMessanger>
    </Container>
  );
};

export default inject("userStore", "interlocutorsStore")(observer(Messanger));
