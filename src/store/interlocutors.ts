import { observable, computed, autorun, toJS } from "mobx";
import IInterlocutor from "../interfaces/IInterlocutor";
import { userStore, socket } from "../app";

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
    const user = userStore.getUser;
    const sort = arr =>
      arr.sort(
        (a, b) =>
          parseInt(b.lastMessage.sendedAt) - parseInt(a.lastMessage.sendedAt)
      );
    const readed = [];
    const unreaded = this.interlocutors.filter(e => {
      if (e.lastMessage) {
        if (e.lastMessage.senderID === user._id || e.isReaded) {
          readed.push(e);
          return false;
        }
        return true;
      }
      return false;
    });

    return toJS([...sort(unreaded), ...sort(readed)]);
  }

  @computed get unreadedMessagesQuantity() {
    const id = userStore.getID;
    return this.interlocutors.filter(
      e =>
        !e.isReaded &&
        (e.lastMessage ? e.lastMessage.senderID !== id : false)
    ).length;
  }

  getInterlocutor(_id: string) {
    const indexOfInterlocutor = this.interlocutors.findIndex(
      e => e.interlocutor._id === _id
    );
    return computed(() => toJS(this.interlocutors[indexOfInterlocutor])).get();
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
    this.interlocutors = [interlocutor, ...this.interlocutors];
  }
}
