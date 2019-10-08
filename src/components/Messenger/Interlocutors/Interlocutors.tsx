import React, { useState } from "react";
import {
  Interlocutor,
  LastMessage,
  User,
  NoMessages,
  InterlocutorAvatar,
  InterlocutorsContainer,
  MobileBackground,
  InterlocutorsList,
  InterlocutorsSearchInputContainer,
  InterlocutorsContent,
  InterlocutorsSearchInput
} from "./styleInterlocutors";
import isUnreadedMessage from "../../../functions/isUnreadedMessage";
import { Link } from "react-router-dom";
import IInterlocutor from "../../../interfaces/IInterlocutor";

export interface IProps {
  interlocutors: IInterlocutor[];
  interlocutorsVisible: boolean;
  onInterlocutorsButtonClick: () => void;
}

const Interlocutors = ({
  interlocutors,
  interlocutorsVisible,
  onInterlocutorsButtonClick
}: IProps) => {
  const [filterString, setFilterString] = useState("");

  const onSortChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterString(e.target.value);

  const filter = (interlocutors: IInterlocutor[]) =>
    interlocutors.filter(interlocutor => {
      const regExp = new RegExp(
        filterString
          .trim()
          .toLowerCase()
          .replace(/_/g, "|")
      );
      return regExp.test(interlocutor.interlocutor.name.toLowerCase());
    });

  const limitMessage = (message: string) => {
    const arr: Array<string> = [];
    message.split(" ").forEach((word: string) => {
      if (arr.join(" ").length + word.length <= 75) {
        arr.push(word);
      }
    });
    return arr.join(" ") + (message.length > 75 ? "..." : "");
  };

  return (
    <InterlocutorsContainer interlocutorsVisible={interlocutorsVisible}>
      <MobileBackground
        interlocutorsVisible={interlocutorsVisible}
        onClick={onInterlocutorsButtonClick}
      />
      <InterlocutorsContent interlocutorsVisible={interlocutorsVisible}>
        {interlocutorsVisible && (
          <InterlocutorsSearchInputContainer>
            <InterlocutorsSearchInput
              placeholder="Szukaj rozmówców"
              value={filterString}
              onChange={onSortChange}
            />
          </InterlocutorsSearchInputContainer>
        )}
        {interlocutors.length > 0 && (
          <InterlocutorsList>
            {filter(interlocutors).map(e => (
              <Interlocutor key={e.interlocutor._id}>
                <Link to={`/messenger/${e.interlocutor._id}`}>
                  <User>
                    <InterlocutorAvatar
                      size="big"
                      interlocutorsVisible={interlocutorsVisible}
                      src={e.interlocutor.avatar}
                    />
                    {interlocutorsVisible && e.interlocutor.name}
                  </User>
                  {interlocutorsVisible && (
                    <LastMessage isUnreaded={isUnreadedMessage(e)}>
                      {limitMessage(e.lastMessage.message)}
                    </LastMessage>
                  )}
                </Link>
              </Interlocutor>
            ))}
          </InterlocutorsList>
        )}
      </InterlocutorsContent>
    </InterlocutorsContainer>
  );
};

export default Interlocutors;
