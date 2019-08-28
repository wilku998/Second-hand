import { userStore } from "../app";
import { IInterlocutorsStore } from "../store/interlocutors";

export default (interlocutor: IInterlocutorsStore["interlocutors"][0]) => {
    const user = userStore.getUser;
    const { _id } = user;

    return !interlocutor.isReaded && interlocutor.lastMessage.senderID !== _id
}