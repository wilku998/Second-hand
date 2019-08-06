import ajax from "./ajax";
import { userStore } from "../app";
import { parseResponse, setUserStore } from "./functions";
import fetchData from "./fetchData";
import IUser from "../interfaces/IUser";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response: any = await ajax("POST", "/api/users/login", data, 200);
    setUserStore(response);
  } catch (e) {
    console.log(e);
    return "Podane dane są nieprawidłowe";
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

export const getProfileRequest = async () => {
  try {
    const response = await fetch("/api/users/me");
    const data = await response.json();
    setUserStore(data);
  } catch (e) {}
};

export const logoutRequest = async () => {
  try {
    await ajax("POST", "/api/users/logout", undefined, 200);
    userStore.user = undefined;
    userStore.ownItems = [];
  } catch (e) {}
};

export const updateUserRequest = async (update: any) => {
  try {
    const updatedUser: IUser = await ajax("PATCH", "/api/users/me", update, 200);
    userStore.user = updatedUser;
  } catch (e) {
    if (e.error.code === 11000) {
      return "Email jest już zajęty";
    }
  }
};

export const likeItemRequest = (id: string) => {
  const user = userStore.getUser;
  const { likedItems } = user;
  return updateUserRequest({ likedItems: [...likedItems, { item: id }] });
};

export const unlikeItemRequest = async (id: string) => {
  const user = userStore.getUser;
  const { likedItems } = user;
  return updateUserRequest({
    likedItems: likedItems.filter(e => e.item._id !== id)
  });
};

export const getUserRequest = async (id: string) =>
  await fetchData(id, "/api/users/");

export const getUsersRequest = async () => await fetchData("", "/api/users");
