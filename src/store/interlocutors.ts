import { observable, computed, autorun, toJS } from "mobx";
import IMessage from "../interfaces/IMessage";

export interface IInterlocutorsStore{
    interlocutors: Array<{
        isReaded: boolean;
        roomName: string;
        interlocutor: {
            avatar: string;
            name: string;
            _id: string
        };
        lastMessage?: IMessage
    }>
    getInterlocutors: IInterlocutorsStore["interlocutors"]
}
export default class InterlocutorsStore {
    constructor() {
        autorun(() => {
            // console.log(this.getInterlocutors);
          });
    }

    @observable interlocutors: IInterlocutorsStore["interlocutors"] = []

    @computed get getInterlocutors() {
        return toJS(this.interlocutors)
    }
}