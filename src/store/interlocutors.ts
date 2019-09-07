import { observable, computed, autorun, toJS } from "mobx";
import IInterlocutor from "../interfaces/IInterlocutor";

export interface IInterlocutorsStore{
    interlocutors: Array<IInterlocutor>
    getInterlocutors: IInterlocutorsStore["interlocutors"]
    unreadedMessagesQuantity: number
}
export default class InterlocutorsStore {
    constructor() {
        autorun(() => {
            console.log(this.getInterlocutors);
          });
    }

    @observable interlocutors: IInterlocutorsStore["interlocutors"] = []

    @computed get getInterlocutors() {
        return toJS(this.interlocutors)
    }

    @computed get unreadedMessagesQuantity(){
        return this.interlocutors.filter(e => !e.isReaded).length
    }
}