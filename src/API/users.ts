import ajax from "./ajax";
import { userStore } from "../app";
import {
  setUserStore,
  onlyAuthRequest,
  clearUserAndInterlocutorsStores
} from "./functions";
import fetchData from "./fetchData";
import { addImagesRequest } from "./images";
import {
  likeItemSocket,
  unlikeItemSocket,
  unfollowSocket,
  followSocket
} from "../sockets";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response: any = await ajax("POST", "/api/users/login", data, 200);
    setUserStore(response);
  } catch (e) {
    return "Podane dane są nieprawidłowe";
  }
};

export const getProfileRequest = async () => {
  try {
    const response = await fetch("/api/users/me");
    const data = await response.json();
    await setUserStore(data);
  } catch (e) {}
};

export const registerRequest = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response: any = await ajax("POST", "/api/users", data, 201);
    await setUserStore(response);
  } catch (e) {
    if (e.error.code === 11000) {
      return "Email jest już zajęty";
    }
  }
};

export const removeProfileRequest = async (password: string) => {
  try {
    await ajax("DELETE", "/api/users/me", { password }, 200);
    clearUserAndInterlocutorsStores();
  } catch (e) {
    return e.error.message;
  }
};

export const logoutRequest = async () => {
  try {
    await ajax("POST", "/api/users/logout", undefined, 200);
    clearUserAndInterlocutorsStores();
  } catch (e) {}
};

export const updateUserRequest = async (update: any, avatar: string) => {
  const user = userStore.getUser;
  try {
    if (avatar !== user.avatar) {
      const avatarID = await addImagesRequest([
        avatar.replace("data:image/jpeg;base64, ", "")
      ]);
      update.avatar = `/api/images/${avatarID[0]}`;
    }
    await ajax("PATCH", "/api/users/me", update, 200);
    userStore.updateUser(update);
  } catch (e) {
    if (e.error.code === 11000) {
      return "Email jest już zajęty";
    }
  }
};

const likesRequestTemplate = async (
  likedID: string,
  httpMethod: string,
  userStoreMethod: "addToArray" | "removeFromArray"
) => {
  await onlyAuthRequest(async () => {
    try {
      await ajax(httpMethod, "/api/users/me/likes", { likedID }, 200);
      userStore[userStoreMethod]("likedItems", likedID);
    } catch (e) {}
  });
};

export const likeItemRequest = async (likedID: string) => {
  try {
    await likesRequestTemplate(likedID, "PATCH", "addToArray");
    likeItemSocket(likedID);
  } catch (e) {}
};

export const unlikeItemRequest = async (likedID: string) => {
  try {
    await likesRequestTemplate(likedID, "DELETE", "removeFromArray");
    unlikeItemSocket(likedID);
  } catch (e) {}
};

const followsRequestTemplate = async (
  userID: string,
  httpMethod: string,
  userStoreMethod: "addToArray" | "removeFromArray"
) => {
  await onlyAuthRequest(async () => {
    try {
      await ajax(httpMethod, "/api/users/me/follows", { userID }, 200);
      userStore[userStoreMethod]("follows", userID);
    } catch (e) {}
  });
};

export const followUserRequest = async (userID: string) => {
  try {
    await followsRequestTemplate(userID, "PATCH", "addToArray");
    followSocket(userID);
  } catch (e) {}
};

export const unfollowUserRequest = async (userID: string) => {
  try {
    await followsRequestTemplate(userID, "DELETE", "removeFromArray");
    unfollowSocket(userID);
  } catch (e) {}
};

export const getUserRequest = async (id: string) =>
  await fetchData(id, "/api/users/");

export const getUsersCountRequest = async (query: string) => {
  try {
    const response = await fetchData(query, "/api/users/count");
    return response.count;
  } catch (e) {}
};

export const getUsersRequest = async (query: string) => {
  const users = await fetchData(query, "/api/users");
  if (!users) {
    return [];
  }
  return users;
};

export const getMostPopularUsersRequest = async () =>
  await getUsersRequest("?sortBy=followedByQuantity&order=-1&limit=3");

export const getFollowsAndLikes = async (userID: string) =>
  await fetchData(userID, "/api/users/followsAndLikes/");

export const readNotificationRequest = async (id: string) => {
  await ajax("PATCH", "/api/users/me/readNotification", { id }, 200);
  userStore.readNotification(id);
};

export const getNotifications = async (skip: number, limit: number) =>
  await fetchData(`?skip=${skip}&limit=${limit}`, "/api/user/notifications");
