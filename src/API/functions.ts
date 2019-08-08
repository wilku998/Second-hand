import { userStore, history } from "../app";

export const parseResponse = (response: any) =>
  !response || Object.keys(response).length === 0 || response.error
    ? undefined
    : response;

export const setUserStore = (data: any) => {
  if (parseResponse(data.user)) {
    userStore.user = data.user;
  }
  if (parseResponse(data.ownItems)) {
    userStore.ownItems = data.ownItems;
  }
};

export const onlyAuthRequest = async (request: any) => {
  const user = userStore.getUser;
  if (!user) {
    history.push("/login");
  } else {
    await request();
  }
};
