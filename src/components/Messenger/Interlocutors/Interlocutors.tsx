import React from "react";
import { IInterlocutorsStore } from "../../../store/interlocutors";
import style, {
  Interlocutor,
  LastMessage,
  User,
  InterlocutorsContainer,
  NoMessages
} from "./styleInterlocutors";
import Avatar from "../../Abstracts/Avatar";
import isUnreadedMessage from "../../../functions/isUnreadedMessage";

export interface IProps {
  interlocutors: IInterlocutorsStore["interlocutors"];
  className?: string;
}

const Interlocutors = ({ interlocutors, className }: IProps) => {
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
    <section className={className}>
      <InterlocutorsContainer>
        {interlocutors.length > 0 ? (
          interlocutors.map(e => (
            <Interlocutor
              to={`/messenger/${e.interlocutor._id}`}
              key={e.interlocutor._id}
            >
              <User>
                <Avatar size="big" src={e.interlocutor.avatar} />
                {e.interlocutor.name}
              </User>
              <LastMessage isUnreaded={isUnreadedMessage(e)}>
                {limitMessage(e.lastMessage.message)}
              </LastMessage>
            </Interlocutor>
          ))
        ) : (
          <NoMessages>Brak rozmów</NoMessages>
        )}
      </InterlocutorsContainer>
    </section>
  );
};

export default style(Interlocutors);
