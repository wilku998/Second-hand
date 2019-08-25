import ajax from "./ajax";
import { userStore } from "../app";
import {
  parseResponse,
  setUserStore,
  onlyAuthRequest,
  clearUserAndInterlocutorsStores
} from "./functions";
import fetchData from "./fetchData";
import IUser from "../interfaces/IUser";
import { getInterlocutorsRequest } from "./messangerRooms";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response: any = await ajax(
      "POST",
      "/api/users/login",
      data,
      200
    );
    setUserStore(response);
  } catch (e) {
    console.log(e);
    return "Podane dane są nieprawidłowe";
  }
};

export const getProfileRequest = async () => {
  try {
    const response = await fetch("/api/users/me");
    const data = await response.json();
    setUserStore(data);
  } catch (e) {
    console.log(e);
  }
};

export const registerRequest = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response: any = await ajax("POST", "/api/users", data, 201);
    userStore.user = parseResponse(response);
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

export const updateUserRequest = async (update: any) => {
  try {
    await ajax("PATCH", "/api/users/me", update, 200);
    const user = userStore.getUser;
    userStore.user = {
      ...user,
      ...update
    };
  } catch (e) {
    if (e.error.code === 11000) {
      return "Email jest już zajęty";
    }
  }
};

export const likeItemRequest = async (likedID: string) => {
  await onlyAuthRequest(async () => {
    const newLikedItems: IUser["likedItems"] = await ajax(
      "PATCH",
      "/api/users/me/likes",
      { likedID },
      200
    );
    userStore.user.likedItems = newLikedItems;
  });
};

export const unlikeItemRequest = async (likedID: string) => {
  await onlyAuthRequest(async () => {
    const newLikedItems: IUser["likedItems"] = await ajax(
      "DELETE",
      "/api/users/me/likes",
      { likedID },
      200
    );
    userStore.user.likedItems = newLikedItems;
  });
};

export const followUserRequest = async (userID: string) => {
  await onlyAuthRequest(async () => {
    const newFollows: IUser["follows"] = await ajax(
      "PATCH",
      "/api/users/me/follows",
      { userID },
      200
    );
    userStore.user.follows = newFollows;
  });
};

export const unfollowUserRequest = async (userID: string) => {
  await onlyAuthRequest(async () => {
    const newFollows: IUser["follows"] = await ajax(
      "DELETE",
      "/api/users/me/follows",
      { userID },
      200
    );
    userStore.user.follows = newFollows;
  });
};

export const getUserRequest = async (id: string) =>
  await fetchData(id, "/api/users/");

export const getUsersRequest = async (query: string) => {
  const users = await fetchData(`?name=${query}`, "/api/users");
  if (!users) {
    return [];
  }
  return users;
};
