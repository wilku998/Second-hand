import IMessage from "./IMessage";

export default interface IInterlocutor {
    isReaded: boolean;
    roomName: string;
    interlocutor: {
        avatar: string;
        name: string;
        _id: string
    };
    lastMessage?: IMessage
}P
