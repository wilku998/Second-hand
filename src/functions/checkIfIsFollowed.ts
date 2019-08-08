import { IUserStore } from "../store/user";

export default (userStore: IUserStore, id: string) => {
  const user = userStore.getUser;
  return user.follows.findIndex(e => e.user._id === id) > -1;
};
