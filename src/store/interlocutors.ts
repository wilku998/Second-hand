import { observable, computed, autorun, toJS } from "mobx";
import IInterlocutor from "../interfaces/IInterlocutor";
import { userStore } from "../app";

export interface IInterlocutorsStore {
  interlocutors: Array<IInterlocutor>;
  getInterlocutors: IInterlocutorsStore["interlocutors"];
  getInterlocutor: (_id: string) => IInterlocutor;
  getSortedAndFilteredInterlocutors: IInterlocutorsStore["interlocutors"];
  unreadedMessagesQuantity: number;
  readMessage: (roomName: string) => void;
}

export default class InterlocutorsStore {
  constructor() {
    autorun(() => {
      // console.log(this.getInterlocutors);
    });
  }

  @observable interlocutors: IInterlocutorsStore["interlocutors"] = [];

  @computed get getInterlocutors() {
    return toJS(this.interlocutors);
  }

  @computed get getSortedAndFilteredInterlocutors() {
    return toJS(
      this.interlocutors
        .filter(e => e.lastMessage)
        .sort((a, b) => {
          if (a.isReaded === b.isReaded) {
            return (
              parseInt(b.lastMessage.sendedAt) -
              parseInt(a.lastMessage.sendedAt)
            );
          } else {
            return a.isReaded ? 2 : -2;
          }
        })
    );
  }

  @computed get unreadedMessagesQuantity() {
    const user = userStore.getMinifiedUser;
    return this.interlocutors.filter(
      e =>
        !e.isReaded &&
        (e.lastMessage ? e.lastMessage.senderID !== user._id : false)
    ).length;
  }

  getInterlocutor(_id: string) {
    const indexOfInterlocutor = this.interlocutors.findIndex(
      e => e.interlocutor._id === _id
    );
    return computed(() => this.interlocutors[indexOfInterlocutor]).get();
  }

  readMessage(roomName: string) {
    const indexOfInterlocutor = this.interlocutors.findIndex(
      e => e.roomName === roomName
    );
    if (indexOfInterlocutor > -1) {
      this.interlocutors[indexOfInterlocutor].isReaded = true;
    }
  }

  addInterlocutor(interlocutor: IInterlocutor) {
    this.interlocutors.push(interlocutor);
  }
}
